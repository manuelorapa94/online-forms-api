import { ObjectId } from "mongodb";

export type TRenovation = {
  _id?: ObjectId;
  site_id?: ObjectId;
  resident_id?: ObjectId;
  name: string;
  nric_passport: string;
  unit: string;
  email: string;
  contact_no: string;
  cheque_no: string;
  title_date: Date;
  company: string;
  address: string;
  pic: string;
  contact: string;
  from_date: Date;
  to_date: Date;
  scope: string;
  description: string;
  is_approved: boolean;
  ma_name: string;
  sign_date: Date;
  damages: boolean;
  incident: boolean;
  debris: boolean;
  if_yes: string;
  inspected_by: string;
  inspected_date: Date;
  terms_condition_date: Date;
  terms_condition_name: string;
  signatory_password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class MRenovation implements Partial<TRenovation> {
  _id?: ObjectId;
  name: string;
  nric_passport: string;
  unit: string;
  email: string;
  contact_no: string;
  cheque_no: string;
  title_date?: Date;
  company: string;
  address: string;
  pic: string;
  contact: string;
  from_date?: Date;
  to_date?: Date;
  scope: string;
  description: string;
  is_approved: boolean;
  ma_name: string;
  sign_date?: Date;
  damages: boolean;
  incident: boolean;
  debris: boolean;
  if_yes: string;
  inspected_by: string;
  inspected_date?: Date;
  terms_condition_date?: Date;
  terms_condition_name: string;
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
      cheque_no = "",
      title_date,
      company = "",
      address = "",
      pic = "",
      contact = "",
      from_date,
      to_date,
      scope = "",
      description = "",
      is_approved = false,
      ma_name = "",
      sign_date,
      damages = false,
      incident = false,
      debris = false,
      if_yes = "",
      inspected_by = "",
      inspected_date,
      terms_condition_date,
      terms_condition_name = "",
      signatory_password = "",
      createdAt = new Date(),
      updatedAt,
    } = {} as Partial<TRenovation>,
  ) {
    this._id = _id;
    this.name = name;
    this.nric_passport = nric_passport;
    this.unit = unit;
    this.email = email;
    this.contact_no = contact_no;
    this.cheque_no = cheque_no;
    this.title_date = title_date;
    this.company = company;
    this.address = address;
    this.pic = pic;
    this.contact = contact;
    this.from_date = from_date;
    this.to_date = to_date;
    this.scope = scope;
    this.description = description;
    this.is_approved = is_approved;
    this.ma_name = ma_name;
    this.sign_date = sign_date;
    this.damages = damages;
    this.incident = incident;
    this.debris = debris;
    this.if_yes = if_yes;
    this.inspected_by = inspected_by;
    this.inspected_date = inspected_date;
    this.terms_condition_date = terms_condition_date;
    this.terms_condition_name = terms_condition_name;
    this.signatory_password = signatory_password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
