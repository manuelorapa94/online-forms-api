import { Request, Response } from "express";
import OnlineFormsSvc from "../services/online-forms.service";
import Joi from "joi";
import { ObjectId } from "mongodb";

export default class OnlineFormsCtrl {
  static async displayAllFormsSent(req: Request, res: Response) {
    try {
      const result = await OnlineFormsSvc.displayAllFormsSent();
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getOnlineFormsByStatusFalse(req: Request, res: Response) {
    try {
      const result = await OnlineFormsSvc.getOnlineFormsByStatusFalse();
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getOnlineFormsByStatusTrue(req: Request, res: Response) {
    try {
      const result = await OnlineFormsSvc.getOnlineFormsByStatusTrue();
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getOnlineFormsByResidentId(req: Request, res: Response) {
    try {
      const result = await OnlineFormsSvc.getOnlineFormsByResidentId(req.params.id);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getOnlineFormsById(req: Request, res: Response) {
    try {
      const result = await OnlineFormsSvc.getOnlineFormsById(req.params.id);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getByPageSearch(req: Request, res: Response) {
    try {
      const page = req.query.page as string;
      const limit = req.query.limit as string;
      const search = req.query.search as string;
      const site_id = req.query.site_id as string | ObjectId;
      const resident_id = req.query.resident_id as string | ObjectId;
      const form_type = req.query.form_type as string;

      const schema = Joi.object({
        page: Joi.number().optional().allow(null, "").default(1),
        limit: Joi.number().optional().allow(null, "").default(10),
        search: Joi.string().optional().allow("", null),
        site_id: Joi.string().hex().optional().allow("", null),
        resident_id: Joi.string().hex().optional().allow("", null),
        form_type: Joi.string().optional().allow("", null),
      });

      const { error, value } = schema.validate({ page, limit, search, site_id, resident_id, form_type });
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      try {
        const result = await OnlineFormsSvc.getByPageSearch({
          page: Number(value.page),
          limit: Number(value.limit),
          search: value.search,
          site_id: value.site_id,
          resident_id: value.resident_id,
          form_type: value.form_type,
        });
        return res.json(result);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
