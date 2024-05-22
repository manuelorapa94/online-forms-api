import { Request, Response } from "express";
import UCASvc from "../services/update-correspondence-address.service";
import Joi from "joi";
import { TUCA } from "../models/update-correspondence-address.model";

export default class UCACtrl {
  static async createUCA(req: Request, res: Response) {
    // const { name_sp, unit, residential, mobile, office, for_sp_name } = req.body;

    const payload = req.body as TUCA;

    const schema = Joi.object({
      site_id: Joi.string().required(),
      resident_id: Joi.string().required(),
      name_sp: Joi.string().required(),
      unit: Joi.string().required(),
      residential: Joi.string().required(),
      mobile: Joi.string().required(),
      office: Joi.string().required(),
      for_sp_name: Joi.string().required(),
      effective_date: Joi.date().required(),
      signatory_password: Joi.string().required(),
    });

    const { error } = schema.validate(payload);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const result = await UCASvc.createUCA(payload);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async updateUCAStatus(req: Request, res: Response) {
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
      const result = await UCASvc.updateUCAStatus(_id, status);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getAllUCA(req: Request, res: Response) {
    try {
      const result = await UCASvc.getAllUCA();
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getUCAById(req: Request, res: Response) {
    const _id = req.params.id as string;

    try {
      const result = await UCASvc.getUCAById(_id);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
