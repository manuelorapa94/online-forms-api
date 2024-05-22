import { ClientSession, ObjectId } from "mongodb";
import { TGiroApplication, MGiroApplication } from "../models/giro-application.model";
import { getDB } from "../utils/mongo";
import { newDateTimezone } from "../utils/format-date.util";
import { convertObjectIdUtil } from "../utils/object-id.util";
import hashPasswordUtil from "../utils/hash-password.util";

export default class GiroApplicationRepo {
  static collection() {
    return getDB().collection("giro-application");
  }

  static statusCollection() {
    return getDB().collection("online-forms-status");
  }

  //Create Giro Application
  static async createGiroApplication(giroApplication: TGiroApplication, session?: ClientSession) {
    try {
      //Add effective date convertion
      giroApplication.effective_date = newDateTimezone(giroApplication.effective_date);
      if (giroApplication.site_id) giroApplication.site_id = await convertObjectIdUtil(giroApplication.site_id);
      if (giroApplication.resident_id) giroApplication.resident_id = await convertObjectIdUtil(giroApplication.resident_id);

      if (giroApplication.signatory_password) giroApplication.signatory_password = await hashPasswordUtil(giroApplication.signatory_password);

      const ucaInsertResult = await this.collection().insertOne(new MGiroApplication(giroApplication), { session });

      if (!ucaInsertResult.acknowledged) {
        throw new Error("ga insert failed");
      }

      const { site_id, resident_id, ...giroApplicationWithoutIds } = giroApplication;

      const statusInsertResult = await this.statusCollection().insertOne({
        _id: ucaInsertResult.insertedId,
        site_id: giroApplication.site_id,
        resident_id: giroApplication.resident_id,
        forms_type: "giro-application",
        status: null,
        createdAt: new Date(),
        updatedAt: null,
        lookup_data: [giroApplicationWithoutIds],
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

  //Get Giro Application By Id with join status and display all
  static async getGiroApplicationById(id: string, session?: ClientSession) {
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
              bank: 1,
              payment_limit: 1,
              name_billing_org: 1,
              billing_org_customer_reference_no1: 1,
              effective_date: 1,
              name: 1,
              account_no: 1,
              contact_no: 1,
              company_stamp: 1,
              swift_bic1: 1,
              billing_ord_account_no: 1,
              swift_bic2: 1,
              account_no_to_be_debited: 1,
              billing_org_customer_reference_no2: 1,
              billing_organisation: 1,
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

  //Update Giro Application Status
  static async updateGiroApplicationStatus(id: string, status: boolean, session?: ClientSession) {
    try {
      return await this.statusCollection().updateOne({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date() } }, { session });
    } catch (error) {
      return Promise.reject("Server internal error.");
    }
  }

  //Get All Giro Application with join status and display all
  static async getAllGiroApplication(session?: ClientSession) {
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
              bank: 1,
              payment_limit: 1,
              name_billing_org: 1,
              billing_org_customer_reference_no1: 1,
              effective_date: 1,
              name: 1,
              account_no: 1,
              contact_no: 1,
              company_stamp: 1,
              swift_bic1: 1,
              billing_ord_account_no: 1,
              swift_bic2: 1,
              account_no_to_be_debited: 1,
              billing_org_customer_reference_no2: 1,
              billing_organisation: 1,
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
