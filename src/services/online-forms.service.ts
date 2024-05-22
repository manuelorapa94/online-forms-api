import { IOnlineFormsSearch } from "../models/online-forms.model";
import OnlineFormsRepo from "../repositories/online-forms.repositories";

export default class OnlineFormsSvc {
  static async displayAllFormsSent() {
    return await OnlineFormsRepo.displayAllFormsSent();
  }

  static async getOnlineFormsByStatusFalse() {
    return await OnlineFormsRepo.getOnlineFormsByStatusFalse();
  }

  static async getOnlineFormsByStatusTrue() {
    return await OnlineFormsRepo.getOnlineFormsByStatusTrue();
  }

  static async getOnlineFormsByResidentId(id: string) {
    return await OnlineFormsRepo.getOnlineFormsByResidentId(id);
  }

  static async getOnlineFormsById(id: string) {
    return await OnlineFormsRepo.getOnlineFormsById(id);
  }

  static async getByPageSearch({ page = 0, limit = 10, search = "", site_id, resident_id, form_type } = {} as IOnlineFormsSearch) {
    return await OnlineFormsRepo.getByPageSearch({ page, limit, search, site_id, resident_id, form_type });
  }
}
