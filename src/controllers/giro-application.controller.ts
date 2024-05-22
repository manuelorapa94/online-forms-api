import { Request, Response } from "express";
import GiroApplicationSvc from "../services/giro-application.service";
import Joi from "joi";
import { TGiroApplication } from "../models/giro-application.model";

export default class GiroApplicationCtrl {
  static async createGiroApplication(req: Request, res: Response) {
    const payload = req.body as TGiroApplication;

    const schema = Joi.object({
      site_id: Joi.string().required(),
      resident_id: Joi.string().required(),
      bank: Joi.string().required(),
      payment_limit: Joi.string().required(),
      name_billing_org: Joi.string().required(),
      billing_org_customer_reference_no1: Joi.string().required(),
      effective_date: Joi.date().required(),
      name: Joi.string().required(),
      account_no: Joi.string().required(),
      contact_no: Joi.string().required(),
      company_stamp: Joi.string().required(),
      swift_bic1: Joi.string().required(),
      billing_ord_account_no: Joi.string().required(),
      swift_bic2: Joi.string().required(),
      account_no_to_be_debited: Joi.string().required(),
      billing_org_customer_reference_no2: Joi.string().required(),
      billing_organisation: Joi.array().required(),
      signatory_password: Joi.string().required(),
    });

    const { error } = schema.validate(payload);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const result = await GiroApplicationSvc.createGiroApplication(payload);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async updateGiroApplicationStatus(req: Request, res: Response) {
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
      const result = await GiroApplicationSvc.updateGiroApplicationStatus(_id, status);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getAllGiroApplication(req: Request, res: Response) {
    try {
      const result = await GiroApplicationSvc.getAllGiroApplication();
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  //Get Giro Application By Id
  static async getGiroApplicationById(req: Request, res: Response) {
    const _id = req.params.id as string;

    try {
      const result = await GiroApplicationSvc.getGiroApplicationById(_id);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
