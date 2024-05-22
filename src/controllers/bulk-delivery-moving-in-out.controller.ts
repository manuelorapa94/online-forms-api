import { Request, Response } from "express";
import BDMioSvc from "../services/bulk-delivery-moving-in-out.service";
import Joi from "joi";
import { TBDMio } from "../models/bulk-delivery-moving-in-out.model";

export default class BDMioCtrl {
  static async createBulkDeliveryMovingInOut(req: Request, res: Response) {
    const payload = req.body as TBDMio;

    const schema = Joi.object({
      site_id: Joi.string().required(),
      resident_id: Joi.string().required(),
      name: Joi.string().required(),
      nric_passport: Joi.string().required(),
      unit: Joi.string().required(),
      email: Joi.string().required(),
      contact_no: Joi.string().required(),
      contractor: Joi.string().required(),
      title_date: Joi.date().required(),
      arrival_time: Joi.string().required(),
      agree_name: Joi.string().required(),
      damages: Joi.boolean().required(),
      incident: Joi.boolean().required(),
      debris: Joi.boolean().required(),
      if_yes: Joi.string().required(),
      inspected_by: Joi.string().required(),
      inspected_date: Joi.date().required(),
      signatory_password: Joi.string().required(),
    });

    const { error } = schema.validate(payload);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const result = await BDMioSvc.createBulkDeliveryMovingInOut(payload);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async updateBulkDeliveryMovingInOutStatus(req: Request, res: Response) {
    const { status } = req.body;
    const _id = req.params.id as string;

    const schema = Joi.object({
      status: Joi.boolean().required(),
    });

    const { error } = schema.validate({ status });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const result = await BDMioSvc.updateBulkDeliveryMovingInOutStatus(_id, status);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getAllBulkDeliveryMovingInOut(req: Request, res: Response) {
    try {
      const result = await BDMioSvc.getAllBulkDeliveryMovingInOut();
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getBulkDeliveryMovingInOutById(req: Request, res: Response) {
    const _id = req.params.id as string;

    try {
      const result = await BDMioSvc.getBulkDeliveryMovingInOutById(_id);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
