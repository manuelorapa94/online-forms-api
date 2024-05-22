import { ClientSession, ObjectId } from "mongodb";
import { getDB } from "../utils/mongo";
import { newDateTimezone } from "../utils/format-date.util";
import { IOnlineFormsSearch } from "../models/online-forms.model";
import { convertObjectIdUtil } from "../utils/object-id.util";

export default class OnlineFormsRepo {
  static statusCollection() {
    return getDB().collection("online-forms-status");
  }

  //Display all Online Forms that sent
  static async displayAllFormsSent() {
    try {
      return await this.statusCollection().find().toArray();
    } catch (error) {
      return Promise.reject("Server internal error.");
    }
  }

  //Get Online Forms where status is false for not approved
  static async getOnlineFormsByStatusFalse() {
    try {
      return await this.statusCollection().find({ status: false }).toArray();
    } catch (error) {
      return Promise.reject("Server internal error.");
    }
  }

  //Get Online Forms where residentId is equal to residentId display all forms sent by resident
  static async getOnlineFormsByResidentId(id: string) {
    try {
      return await this.statusCollection()
        .find({ resident_id: new ObjectId(id) })
        .toArray();
    } catch (error) {
      return Promise.reject("Server internal error.");
    }
  }

  //Get Online Forms by Id
  static async getOnlineFormsById(id: string) {
    try {
      return await this.statusCollection().findOne({ _id: new ObjectId(id) });
    } catch (error) {
      return Promise.reject("Server internal error.");
    }
  }

  //Get Add data getByPageSearch for Online Forms
  static async getByPageSearch({ page = 0, limit = 10, search = "", site_id, resident_id, form_type } = {} as IOnlineFormsSearch) {
    // Ensure page is at least 1
    let defaultQuery = {};

    if (site_id) site_id = await convertObjectIdUtil(site_id);
    if (resident_id) resident_id = await convertObjectIdUtil(resident_id);

    if (site_id && resident_id && form_type) {
      site_id = await convertObjectIdUtil(site_id);
      resident_id = await convertObjectIdUtil(resident_id);
      defaultQuery = { site_id, resident_id, form_type };
    } else if (site_id && resident_id) {
      site_id = await convertObjectIdUtil(site_id);
      resident_id = await convertObjectIdUtil(resident_id);
      defaultQuery = { site_id, resident_id };
    } else if (site_id && form_type) {
      site_id = await convertObjectIdUtil(site_id);
      defaultQuery = { site_id, form_type };
    } else if (resident_id && form_type) {
      resident_id = await convertObjectIdUtil(resident_id);
      defaultQuery = { resident_id, form_type };
    } else if (site_id) {
      site_id = await convertObjectIdUtil(site_id);
      defaultQuery = { site_id };
    } else if (resident_id) {
      resident_id = await convertObjectIdUtil(resident_id);
      defaultQuery = { resident_id };
    } else if (form_type) {
      defaultQuery = { form_type };
    } else {
      defaultQuery = search ? { $text: { $search: search } } : {};
    }

    page = Math.max(page, 1);
    const skip = (page - 1) * limit;
    // const defaultQuery = search ? { $text: { $search: search } } : { defaultQuery };

    try {
      const items = await this.statusCollection()
        .aggregate([
          {
            $match: defaultQuery,
          },
          {
            $sort: { _id: -1 },
          },
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
        ])
        .toArray();

      const length = await this.statusCollection().countDocuments(defaultQuery);

      // Start index calculation adjusted to be within range
      const startIndex = length > 0 ? skip + 1 : 0;
      const endIndex = Math.min(startIndex + items.length - 1, length);

      return {
        items,
        pages: Math.ceil(length / limit),
        pageRange: `${startIndex}-${endIndex} of ${length}`,
      };
    } catch (error) {
      return Promise.reject("Server internal error.");
    }
  }

  //Get Online Forms where status is true for approved
  static async getOnlineFormsByStatusTrue() {
    try {
      return await this.statusCollection().find({ status: true }).toArray();
    } catch (error) {
      return Promise.reject("Server internal error.");
    }
  }
}
