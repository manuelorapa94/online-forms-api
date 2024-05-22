import { ObjectId } from "mongodb";

export type TBDMio = {
  _id?: ObjectId;
  site_id?: ObjectId;
  resident_id?: ObjectId;
  name: string;
  nric_passport: string;
  unit: string;
  email: string;
  contact_no: string;
  contractor: string;
  title_date: Date;
  arrival_time: string;
  agree_name: string;
  damages: boolean;
  incident: boolean;
  debris: boolean;
  if_yes: string;
  inspected_by: string;
  inspected_date: Date;
  signatory_password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class MBDMio implements Partial<TBDMio> {
  _id?: ObjectId;
  name: string;
  nric_passport: string;
  unit: string;
  email: string;
  contact_no: string;
  contractor: string;
  title_date?: Date;
  arrival_time: string;
  agree_name: string;
  damages?: boolean;
  incident?: boolean;
  debris?: boolean;
  if_yes: string;
  inspected_by: string;
  inspected_date?: Date;
  signatory_password: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    {
      _id = new ObjectId(),
      name = "",
      nric_passport = "",
      unit = "",
      email = "",
      contact_no = "",
      contractor = "",
      title_date,
      arrival_time = "",
      agree_name = "",
      damages,
      incident,
      debris,
      if_yes = "",
      inspected_by = "",
      inspected_date,
      signatory_password = "",
      createdAt = new Date(),
      updatedAt,
    } = {} as Partial<TBDMio>,
  ) {
    this._id = _id;
    this.name = name;
    this.nric_passport = nric_passport;
    this.unit = unit;
    this.email = email;
    this.contact_no = contact_no;
    this.contractor = contractor;
    this.title_date = title_date;
    this.arrival_time = arrival_time;
    this.agree_name = agree_name;
    this.damages = damages;
    this.incident = incident;
    this.debris = debris;
    this.if_yes = if_yes;
    this.inspected_by = inspected_by;
    this.inspected_date = inspected_date;
    this.signatory_password = signatory_password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
