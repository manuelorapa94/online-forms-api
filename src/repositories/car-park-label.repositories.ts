import { ClientSession, ObjectId } from "mongodb";
import { TCarParkLabel, MCarParkLabel } from "../models/car-park-label.model";
import { getDB } from "../utils/mongo";
import { convertObjectIdUtil } from "../utils/object-id.util";
import hashPasswordUtil from "../utils/hash-password.util";

export default class CarParkLabelRepo {
  static collection() {
    return getDB().collection("car-park-label");
  }

  static statusCollection() {
    return getDB().collection("online-forms-status");
  }

  //Create Car Park Label
  static async createCarParkLabel(carParkLabel: TCarParkLabel, session?: ClientSession) {
    try {
      if (carParkLabel.site_id) carParkLabel.site_id = await convertObjectIdUtil(carParkLabel.site_id);
      if (carParkLabel.resident_id) carParkLabel.resident_id = await convertObjectIdUtil(carParkLabel.resident_id);

      if (carParkLabel.signatory_password) carParkLabel.signatory_password = await hashPasswordUtil(carParkLabel.signatory_password);

      const ucaInsertResult = await this.collection().insertOne(new MCarParkLabel(carParkLabel), { session });

      if (!ucaInsertResult.acknowledged) {
        throw new Error("cpl insert failed");
      }

      const { site_id, resident_id, ...carParkLabelWithoutIds } = carParkLabel;

      const statusInsertResult = await this.statusCollection().insertOne({
        _id: ucaInsertResult.insertedId,
        site_id: carParkLabel.site_id,
        resident_id: carParkLabel.resident_id,
        forms_type: "car-park-label",
        status: null,
        createdAt: new Date(),
        updatedAt: null,
        lookup_data: [carParkLabelWithoutIds],
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

  //Get Car Park Label By Id with join status and display all
  static async getCarParkLabelById(id: string, session?: ClientSession) {
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
              block_no: 1,
              unit_no: 1,
              contact_no_home: 1,
              contact_no_mobile: 1,
              owner_tenant: 1,
              reasons: 1,
              vehicles: 1,
              documents: 1,
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

  //Update Car Park Label Status
  static async updateCarParkLabelStatus(id: string, status: boolean, session?: ClientSession) {
    try {
      return await this.statusCollection().updateOne({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date() } }, { session });
    } catch (error) {
      return Promise.reject("Server internal error.");
    }
  }

  //Get All Car Park Label with join status and display all
  static async getAllCarParkLabel(session?: ClientSession) {
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
              block_no: 1,
              unit_no: 1,
              contact_no_home: 1,
              contact_no_mobile: 1,
              owner_tenant: 1,
              reasons: 1,
              vehicles: 1,
              documents: 1,
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
