import type ICurrency from "./currency";
import type IRentType from "./rent-type";
import type IEstateType from "./estate-type";
import type ICompany from "./company";
import type IBuilder from "./builder";
import type IUser from "./user";
import type ISettlement from "./settlement";
import type IEstateStatus from "./estate-status";
import type IPhoto from "./photo";

export default interface IEstate {
  id: number,
  author_id: number,
  company_id: number,
  builder_id: number,
  settlement_id: number,
  status_id: number,

  title?: string,
  full_title?: string,
  short_title?: string,
  seo_title?: string,

  address?: string,
  suggested_address?: string,
  description: string,
  coords: [number],
  price: number,
  currency_id: number,
  rent_type_id: number,
  estate_type_id: number,
  area: number,
  room_count: number,
  level: number,
  total_levels: number,
  video_link?: string,
  published_at?: string,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,

  rent_type: IRentType,
  estate_type: IEstateType,
  company: ICompany,
  author: IUser,
  builder: IBuilder,
  settlement: ISettlement,
  status: IEstateStatus,
  currency: ICurrency,
  photos: [IPhoto],
}
