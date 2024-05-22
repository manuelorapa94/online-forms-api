import { ObjectId } from "mongodb";

export type TGiroApplication = {
  _id?: ObjectId;
  site_id: ObjectId;
  resident_id: ObjectId;
  bank: string;
  payment_limit: string;
  name_billing_org: string;
  billing_org_customer_reference_no1: string;
  effective_date: Date;
  name: string;
  account_no: string;
  contact_no: string;
  company_stamp: string;
  swift_bic1: string;
  billing_ord_account_no: string;
  swift_bic2: string;
  account_no_to_be_debited: string;
  billing_org_customer_reference_no2: string;
  billing_organisation: string[];
  signatory_password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class MGiroApplication implements Partial<TGiroApplication> {
  _id?: ObjectId;
  bank: string;
  payment_limit: string;
  name_billing_org: string;
  billing_org_customer_reference_no1: string;
  effective_date: Date;
  name: string;
  account_no: string;
  contact_no: string;
  company_stamp: string;
  swift_bic1: string;
  billing_ord_account_no: string;
  swift_bic2: string;
  account_no_to_be_debited: string;
  billing_org_customer_reference_no2: string;
  billing_organisation: string[];
  signatory_password: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    {
      _id = new ObjectId(),
      bank = "",
      payment_limit = "",
      name_billing_org = "",
      billing_org_customer_reference_no1 = "",
      effective_date,
      name = "",
      account_no = "",
      contact_no = "",
      company_stamp = "",
      swift_bic1 = "",
      billing_ord_account_no = "",
      swift_bic2 = "",
      account_no_to_be_debited = "",
      billing_org_customer_reference_no2 = "",
      billing_organisation = [],
      signatory_password = "",
      createdAt = new Date(),
      updatedAt,
    } = {} as TGiroApplication,
  ) {
    this._id = _id;
    this.bank = bank;
    this.payment_limit = payment_limit;
    this.name_billing_org = name_billing_org;
    this.billing_org_customer_reference_no1 = billing_org_customer_reference_no1;
    this.effective_date = effective_date;
    this.name = name;
    this.account_no = account_no;
    this.contact_no = contact_no;
    this.company_stamp = company_stamp;
    this.swift_bic1 = swift_bic1;
    this.billing_ord_account_no = billing_ord_account_no;
    this.swift_bic2 = swift_bic2;
    this.account_no_to_be_debited = account_no_to_be_debited;
    this.billing_org_customer_reference_no2 = billing_org_customer_reference_no2;
    this.billing_organisation = billing_organisation;
    this.signatory_password = signatory_password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
