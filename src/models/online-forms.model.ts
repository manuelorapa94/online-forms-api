import { ObjectId } from "mongodb";

export interface IOnlineFormsSearch {
  page?: number;
  limit?: number;
  search?: string;
  site_id?: string | ObjectId;
  resident_id?: string | ObjectId;
  form_type?: string | ObjectId;
}
