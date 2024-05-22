import { ClientSession, ObjectId } from "mongodb";
import { TUCA, MUCA } from "../models/update-correspondence-address.model";
import { getDB } from "../utils/mongo";
import { newDateTimezone } from "../utils/format-date.util";
import { convertObjectIdUtil } from "../utils/object-id.util";
import hashPasswordUtil from "../utils/hash-password.util";

export default class UCARepo {
  static collection() {
    return getDB().collection("update-correspondence-address");
  }

  static statusCollection() {
    return getDB().collection("online-forms-status");
  }

  //Create UCA
  static async createUCA(uca: TUCA, session?: ClientSession) {
    try {
      //Add effective date convertion
      uca.effective_date = newDateTimezone(uca.effective_date);

      if (uca.site_id) uca.site_id = await convertObjectIdUtil(uca.site_id);
      if (uca.resident_id) uca.resident_id = await convertObjectIdUtil(uca.resident_id);

      if (uca.signatory_password) uca.signatory_password = await hashPasswordUtil(uca.signatory_password);

      const ucaInsertResult = await this.collection().insertOne(new MUCA(uca), { session });

      if (!ucaInsertResult.acknowledged) {
        throw new Error("UCA insert failed");
      }

      const { site_id, resident_id, ...ucaWithoutIds } = uca;

      const statusInsertResult = await this.statusCollection().insertOne({
        _id: ucaInsertResult.insertedId,
        site_id: uca.site_id,
        resident_id: uca.resident_id,
        forms_type: "update-correspondence-address",
        status: null,
        createdAt: new Date(),
        updatedAt: null,
        lookup_data: [ucaWithoutIds], // Use the shallow copy here
      });

      if (!statusInsertResult.acknowledged) {
        throw new Error("Status insert failed");
      }

      return {
        acknowledged: true,
        insertedId: ucaInsertResult.insertedId,
      };
    } catch (error) {
      return Promise.reject("Server internal error.");
    }
  }

  //Get UCA By Id and join with status
  static async getUCAById(id: string, session?: ClientSession) {
    try {
      return await this.collection()
        .aggregate([
          {
            $match: { _id: new ObjectId(id) },
          },
          {
            $lookup: {
              from: "online-forms-status",
              localField: "_id",
              foreignField: "_id",
              as: "status",
            },
          },
          {
            $unwind: "$status",
          },
          {
            $project: {
              _id: 1,
              name_sp: 1,
              unit: 1,
              residential: 1,
              mobile: 1,
              office: 1,
              effective_date: 1,
              for_sp_name: 1,
              status: "$status.status",
              createdAt: "$status.createdAt",
              updatedAt: "$status.updatedAt",
            },
          },
        ])
        .toArray();
    } catch (error) {
      return Promise.reject("Server internal error.");
    }
  }

  //Update UCA Status
  static async updateUCAStatus(id: string, status: boolean, session?: ClientSession) {
    try {
      return await this.statusCollection().updateOne({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date() } }, { session });
    } catch (error) {
      return Promise.reject("Server internal error.");
    }
  }

  //Get All UCA join with status
  static async getAllUCA(session?: ClientSession) {
    try {
      return await this.collection()
        .aggregate([
          {
            $lookup: {
              from: "online-forms-status",
              localField: "_id",
              foreignField: "_id",
              as: "status",
            },
          },
          {
            $unwind: "$status",
          },
          {
            $project: {
              _id: 1,
              name_sp: 1,
              unit: 1,
              residential: 1,
              mobile: 1,
              office: 1,
              effective_date: 1,
              for_sp_name: 1,
              status: "$status.status",
              createdAt: "$status.createdAt",
              updatedAt: "$status.updatedAt",
            },
          },
        ])
        .toArray();
    } catch (error) {
      return Promise.reject("Server internal error.");
    }
  }
}
