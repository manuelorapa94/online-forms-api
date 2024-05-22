import { ClientSession, ObjectId } from "mongodb";
import { TBDMio, MBDMio } from "../models/bulk-delivery-moving-in-out.model";
import { getDB } from "../utils/mongo";
import { newDateTimezone } from "../utils/format-date.util";
import { convertObjectIdUtil } from "../utils/object-id.util";
import hashPasswordUtil from "../utils/hash-password.util";

export default class BDMioRepo {
  static collection() {
    return getDB().collection("bulk-delivery-moving-in-out");
  }

  static statusCollection() {
    return getDB().collection("online-forms-status");
  }

  //Create Bulk Delivery Moving In Out
  static async createBulkDeliveryMovingInOut(bdmio: TBDMio, session?: ClientSession) {
    try {
      bdmio.title_date = newDateTimezone(bdmio.title_date);
      bdmio.inspected_date = newDateTimezone(bdmio.inspected_date);

      if (bdmio.site_id) bdmio.site_id = await convertObjectIdUtil(bdmio.site_id);
      if (bdmio.resident_id) bdmio.resident_id = await convertObjectIdUtil(bdmio.resident_id);

      if (bdmio.signatory_password) bdmio.signatory_password = await hashPasswordUtil(bdmio.signatory_password);

      const ucaInsertResult = await this.collection().insertOne(new MBDMio(bdmio), { session });

      if (!ucaInsertResult.acknowledged) {
        throw new Error("BDMio insert failed");
      }

      const { site_id, resident_id, ...bdmioWithoutIds } = bdmio;

      const statusInsertResult = await this.statusCollection().insertOne({
        _id: ucaInsertResult.insertedId,
        site_id: bdmio.site_id,
        resident_id: bdmio.resident_id,
        forms_type: "bulk-delivery-moving-in-out",
        status: null,
        createdAt: new Date(),
        updatedAt: null,
        lookup_data: [bdmioWithoutIds],
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

  //Get Bulk Delivery Moving In Out By Id and join with status and display all
  static async getBulkDeliveryMovingInOutById(id: string, session?: ClientSession) {
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
              contractor: 1,
              title_date: 1,
              arrival_time: 1,
              agree_name: 1,
              damages: 1,
              incident: 1,
              debris: 1,
              if_yes: 1,
              inspected_by: 1,
              inspected_date: 1,
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

  //Update Bulk Delivery Moving In Out Status
  static async updateBulkDeliveryMovingInOutStatus(id: string, status: boolean, session?: ClientSession) {
    try {
      return await this.statusCollection().updateOne({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date() } }, { session });
    } catch (error) {
      return Promise.reject("Server internal error.");
    }
  }

  //Get All Bulk Delivery Moving In Out and join with status and display all
  static async getAllBulkDeliveryMovingInOut(session?: ClientSession) {
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
              contractor: 1,
              title_date: 1,
              arrival_time: 1,
              agree_name: 1,
              damages: 1,
              incident: 1,
              debris: 1,
              if_yes: 1,
              inspected_by: 1,
              inspected_date: 1,
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
