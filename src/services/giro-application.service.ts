import GiroApplicationRepo from "../repositories/giro-application.repositories";
import { TGiroApplication } from "../models/giro-application.model";

export default class GiroApplicationSvc {
  static createGiroApplication(giroApplication: TGiroApplication) {
    return GiroApplicationRepo.createGiroApplication(giroApplication);
  }

  static async getGiroApplicationById(id: string) {
    return await GiroApplicationRepo.getGiroApplicationById(id);
  }

  static updateGiroApplicationStatus(id: string, status: boolean) {
    return GiroApplicationRepo.updateGiroApplicationStatus(id, status);
  }

  static async getAllGiroApplication() {
    return await GiroApplicationRepo.getAllGiroApplication();
  }
}
