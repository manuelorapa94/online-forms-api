import { ObjectId } from "mongodb";

export type Vehicle = {
  tick: boolean;
  vehicle_no: string;
  vehicle_registration_no: string;
  invehicle_unit_no: string;
  car_park_charges: string;
};

export type Reasons = {
  new: boolean;
  changes: boolean;
  old: boolean;
  loss: boolean;
};

export type Documents = {
  owner: boolean;
  tenant: boolean;
  company: boolean;
  rental: boolean;
};

export type TCarParkLabel = {
  _id?: ObjectId;
  site_id?: ObjectId;
  resident_id?: ObjectId;
  name: string;
  block_no: string;
  unit_no: string;
  contact_no_home: string;
  contact_no_mobile: string;
  owner_tenant: string;
  reasons: Reasons[];
  vehicles: Vehicle[];
  documents: Documents[];
  signatory_password: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: boolean;
};

export type TCarParkLabelUpdateStatus = {
  _id?: ObjectId | string;
  status?: boolean;
  updatedAt?: Date;
};

export class MCarParkLabel implements Partial<TCarParkLabel> {
  _id?: ObjectId;
  name: string;
  block_no: string;
  unit_no: string;
  contact_no_home: string;
  contact_no_mobile: string;
  owner_tenant: string;
  reasons: Reasons[];
  vehicles: Vehicle[];
  documents: Documents[];
  signatory_password: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    {
      _id = new ObjectId(),
      name = "",
      block_no = "",
      unit_no = "",
      contact_no_home = "",
      contact_no_mobile = "",
      owner_tenant = "",
      reasons = [],
      vehicles = [],
      documents = [],
      signatory_password = "",
      createdAt = new Date(),
      updatedAt,
    } = {} as Partial<TCarParkLabel>,
  ) {
    this._id = _id;
    this.name = name;
    this.block_no = block_no;
    this.unit_no = unit_no;
    this.contact_no_home = contact_no_home;
    this.contact_no_mobile = contact_no_mobile;
    this.owner_tenant = owner_tenant;
    this.reasons = reasons;
    this.vehicles = vehicles;
    this.documents = documents;
    this.signatory_password = signatory_password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
