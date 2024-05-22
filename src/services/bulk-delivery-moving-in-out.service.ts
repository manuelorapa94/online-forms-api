import BDMioRepo from "../repositories/bulk-delivery-moving-in-out.repositories";
import { TBDMio } from "../models/bulk-delivery-moving-in-out.model";

export default class BDMioSvc {
  static createBulkDeliveryMovingInOut(bdmio: TBDMio) {
    return BDMioRepo.createBulkDeliveryMovingInOut(bdmio);
  }

  static async getBulkDeliveryMovingInOutById(id: string) {
    return await BDMioRepo.getBulkDeliveryMovingInOutById(id);
  }

  static updateBulkDeliveryMovingInOutStatus(id: string, status: boolean) {
    return BDMioRepo.updateBulkDeliveryMovingInOutStatus(id, status);
  }

  static async getAllBulkDeliveryMovingInOut() {
    return await BDMioRepo.getAllBulkDeliveryMovingInOut();
  }
}
