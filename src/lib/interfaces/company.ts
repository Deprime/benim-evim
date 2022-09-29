import type IUser from "./user";
export default interface ICompany {
  id: number,
  head_id?: number,
  title: string,
  inn: string,
  license?: string,
  description?: string,
  address?: string,
  logo?: string,
  poster?: string,
  is_active: boolean,

  created_at?: string,
  updated_at?: string,
  deleted_at?: string,
  head?: IUser,
}
