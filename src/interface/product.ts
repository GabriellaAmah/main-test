import {Connection, Document} from "mongoose";

export interface IProduct {
    name: string
    price: number
    description: number,
    imageUrl: string
}

export interface BaseModel<T> {
  _id?: string
createdAt?: Date
deleted_at?: Date
UpdatedAt?: Date
}

export interface IProductModel extends IProduct, BaseModel<IProduct> {}
