import UCARepo from "../repositories/update-correspondence-address.repositories";
import { TUCA } from "../models/update-correspondence-address.model";

export default class UCASvc {
  static createUCA(tuca: TUCA) {
    return UCARepo.createUCA(tuca);
  }

  static updateUCAStatus(id: string, status: boolean) {
    return UCARepo.updateUCAStatus(id, status);
  }

  static async getAllUCA() {
    return await UCARepo.getAllUCA();
  }

  static async getUCAById(id: string) {
    return await UCARepo.getUCAById(id);
  }
}
