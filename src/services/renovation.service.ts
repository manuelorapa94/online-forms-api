import RenovationRepo from "../repositories/renovation.repositories";
import { TRenovation } from "../models/renovation.model";

export default class RenovationSvc {
  static createRenovation(renovation: TRenovation) {
    return RenovationRepo.createRenovation(renovation);
  }

  static async getRenovationById(id: string) {
    return await RenovationRepo.getRenovationById(id);
  }

  static updateRenovationStatus(id: string, status: boolean) {
    return RenovationRepo.updateRenovationStatus(id, status);
  }

  static async getAllRenovation() {
    return await RenovationRepo.getAllRenovation();
  }
}
