import { Request, Response } from "express";
import RenovationSvc from "../services/renovation.service";
import Joi from "joi";
import { TRenovation } from "../models/renovation.model";

export default class RenovationCtrl {
  static async createRenovation(req: Request, res: Response) {
    const payload = req.body as TRenovation;

    const schema = Joi.object({
      site_id: Joi.string().required(),
      resident_id: Joi.string().required(),
      name: Joi.string().required(),
      nric_passport: Joi.string().required(),
      unit: Joi.string().required(),
      email: Joi.string().required(),
      contact_no: Joi.string().required(),
      cheque_no: Joi.string().required(),
      title_date: Joi.date().required(),
      company: Joi.string().required(),
      address: Joi.string().required(),
      pic: Joi.string().required(),
      contact: Joi.string().required(),
      from_date: Joi.date().required(),
      to_date: Joi.date().required(),
      scope: Joi.string().required(),
      description: Joi.string().required(),
      is_approved: Joi.boolean().required(),
      ma_name: Joi.string().required(),
      sign_date: Joi.date().required(),
      damages: Joi.boolean().required(),
      incident: Joi.boolean().required(),
      debris: Joi.boolean().required(),
      if_yes: Joi.string().required(),
      inspected_by: Joi.string().required(),
      inspected_date: Joi.date().required(),
      terms_condition_date: Joi.date().required(),
      terms_condition_name: Joi.string().required(),
      signatory_password: Joi.string().required(),
    });

    const { error } = schema.validate(payload);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const result = await RenovationSvc.createRenovation(payload);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getRenovationById(req: Request, res: Response) {
    const _id = req.params.id as string;

    try {
      const result = await RenovationSvc.getRenovationById(_id);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async updateRenovationStatus(req: Request, res: Response) {
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
      const result = await RenovationSvc.updateRenovationStatus(_id, status);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getAllRenovation(req: Request, res: Response) {
    try {
      const result = await RenovationSvc.getAllRenovation();
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
