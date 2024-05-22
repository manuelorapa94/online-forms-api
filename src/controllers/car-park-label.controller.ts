import { Request, Response } from "express";
import CarParkLabelSvc from "../services/car-park-label.service";
import Joi from "joi";
import { TCarParkLabel } from "../models/car-park-label.model";

export default class CarParkLabelCtrl {
  static async createCarParkLabel(req: Request, res: Response) {
    const payload = req.body as TCarParkLabel;

    const schema = Joi.object({
      site_id: Joi.string().required(),
      resident_id: Joi.string().required(),
      name: Joi.string().required(),
      block_no: Joi.string().required(),
      unit_no: Joi.string().required(),
      contact_no_home: Joi.string().required(),
      contact_no_mobile: Joi.string().required(),
      owner_tenant: Joi.string().required(),
      reasons: Joi.array().required(),
      vehicles: Joi.array().required(),
      documents: Joi.array().required(),
      signatory_password: Joi.string().required(),
    });

    const { error } = schema.validate(payload);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const result = await CarParkLabelSvc.createCarParkLabel(payload);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async updateCarParkLabelStatus(req: Request, res: Response) {
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
      const result = await CarParkLabelSvc.updateCarParkLabelStatus(_id, status);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getAllCarParkLabel(req: Request, res: Response) {
    try {
      const result = await CarParkLabelSvc.getAllCarParkLabel();
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  //Get Car Park Label By Id
  static async getCarParkLabelById(req: Request, res: Response) {
    const _id = req.params.id as string;

    try {
      const result = await CarParkLabelSvc.getCarParkLabelById(_id);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
