import CarParkLabelRepo from "../repositories/car-park-label.repositories";
import { TCarParkLabel } from "../models/car-park-label.model";

export default class CarParkLabelSvc {
  static createCarParkLabel(carParkLabel: TCarParkLabel) {
    return CarParkLabelRepo.createCarParkLabel(carParkLabel);
  }

  static async getCarParkLabelById(id: string) {
    return await CarParkLabelRepo.getCarParkLabelById(id);
  }

  static updateCarParkLabelStatus(id: string, status: boolean) {
    return CarParkLabelRepo.updateCarParkLabelStatus(id, status);
  }

  static async getAllCarParkLabel() {
    return await CarParkLabelRepo.getAllCarParkLabel();
  }
}
