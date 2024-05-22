import { ObjectId } from "mongodb";

export type TUCA = {
  _id?: ObjectId;
  site_id?: ObjectId;
  resident_id?: ObjectId;
  name_sp: string;
  unit: string;
  residential: string;
  mobile: string;
  office: string;
  effective_date: Date;
  for_sp_name: string;
  signatory_password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class MUCA implements Partial<TUCA> {
  _id?: ObjectId;
  name_sp: string;
  unit: string;
  residential: string;
  mobile: string;
  office: string;
  effective_date: Date;
  for_sp_name: string;
  signatory_password: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    {
      _id = new ObjectId(),
      name_sp = "",
      unit = "",
      residential = "",
      mobile = "",
      office = "",
      effective_date,
      for_sp_name = "",
      signatory_password = "",
      createdAt = new Date(),
      updatedAt,
    } = {} as TUCA,
  ) {
    this._id = _id;
    this.name_sp = name_sp;
    this.unit = unit;
    this.residential = residential;
    this.mobile = mobile;
    this.office = office;
    this.effective_date = effective_date;
    this.for_sp_name = for_sp_name;
    this.signatory_password = signatory_password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
