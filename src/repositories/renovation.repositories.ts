import { ClientSession, ObjectId } from "mongodb";
import { TRenovation, MRenovation } from "../models/renovation.model";
import { getDB } from "../utils/mongo";
import { newDateTimezone } from "../utils/format-date.util";
import { convertObjectIdUtil } from "../utils/object-id.util";
import hashPasswordUtil from "../utils/hash-password.util";

export default class RenovationRepo {
  static collection() {
    return getDB().collection("renovation");
  }

  static statusCollection() {
    return getDB().collection("online-forms-status");
  }

  //Create Renovation
  static async createRenovation(renovation: TRenovation, session?: ClientSession) {
    try {
      renovation.title_date = newDateTimezone(renovation.title_date);
      renovation.from_date = newDateTimezone(renovation.from_date);
      renovation.to_date = newDateTimezone(renovation.to_date);
      renovation.sign_date = newDateTimezone(renovation.sign_date);
      renovation.inspected_date = newDateTimezone(renovation.inspected_date);
      renovation.terms_condition_date = newDateTimezone(renovation.terms_condition_date);

      if (renovation.site_id) renovation.site_id = await convertObjectIdUtil(renovation.site_id);
      if (renovation.resident_id) renovation.resident_id = await convertObjectIdUtil(renovation.resident_id);

      if (renovation.signatory_password) renovation.signatory_password = await hashPasswordUtil(renovation.signatory_password);

      const ucaInsertResult = await this.collection().insertOne(new MRenovation(renovation), { session });

      if (!ucaInsertResult.acknowledged) {
        throw new Error("renovation insert failed");
      }

      const { site_id, resident_id, ...renovationWithoutIds } = renovation;

      const statusInsertResult = await this.statusCollection().insertOne({
        _id: ucaInsertResult.insertedId,
        site_id: renovation.site_id,
        resident_id: renovation.resident_id,
        forms_type: "renovation",
        status: null,
        createdAt: new Date(),
        updatedAt: null,
        lookup_data: [renovationWithoutIds],
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

  //Get Renovation By Id with join status and display all
  static async getRenovationById(id: string, session?: ClientSession) {
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
              name: 1,
              nric_passport: 1,
              unit: 1,
              email: 1,
              contact_no: 1,
              cheque_no: 1,
              title_date: 1,
              company: 1,
              address: 1,
              pic: 1,
              contact: 1,
              from_date: 1,
              to_date: 1,
              scope: 1,
              description: 1,
              is_approved: 1,
              ma_name: 1,
              sign_date: 1,
              damages: 1,
              incident: 1,
              debris: 1,
              if_yes: 1,
              inspected_by: 1,
              inspected_date: 1,
              terms_condition_date: 1,
              terms_condition_name: 1,
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

  //Update Renovation Status
  static async updateRenovationStatus(id: string, status: boolean, session?: ClientSession) {
    try {
      return await this.statusCollection().updateOne({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date() } }, { session });
    } catch (error) {
      return Promise.reject("Server internal error.");
    }
  }

  //Get All Renovation with join status and display all
  static async getAllRenovation(session?: ClientSession) {
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
              name: 1,
              nric_passport: 1,
              unit: 1,
              email: 1,
              contact_no: 1,
              cheque_no: 1,
              title_date: 1,
              company: 1,
              address: 1,
              pic: 1,
              contact: 1,
              from_date: 1,
              to_date: 1,
              scope: 1,
              description: 1,
              is_approved: 1,
              ma_name: 1,
              sign_date: 1,
              damages: 1,
              incident: 1,
              debris: 1,
              if_yes: 1,
              inspected_by: 1,
              inspected_date: 1,
              terms_condition_date: 1,
              terms_condition_name: 1,
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
