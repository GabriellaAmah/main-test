import mongoose, { Models, Schema, Document } from "mongoose"
import { BaseModel } from "../interface/product";


export class BaseRepository<TModel>{

  name: string
  schema: Schema
  model: any

  constructor(name: string, schema: Schema) {
    this.name = name;
    this.schema = schema;

    this.model = mongoose.model(name, schema)
  }

  async create(values: TModel): Promise<BaseModel<TModel>> {
    try {
      const [doc] = await this.model.create([values])
      const data = await doc.save()

      return data
    } catch (err) {
      return Promise.reject(err)
    }

  }

  async findOne(query: BaseModel<TModel>): Promise<BaseModel<TModel>> {
    try {
      const data = await this.model.findOne({
        ...query
      })

      return data
    } catch (err) {
      return Promise.reject(err)
    }

  }

  async updateOne(query: { _id: string }, values: BaseModel<TModel>): Promise<BaseModel<TModel>> {
    try {
      const data = await this.model.updateOne({
        ...query
      }, { ...values })

      return data
    } catch (err) {
      return Promise.reject(err)
    }

  }

  async destroy(query: { _id: string }): Promise<void> {
    try {
      await this.model.findOneAndDelete({
        ...query
      })

    } catch (err) {
      return Promise.reject(err)
    }

  }

  async findAndPaginate(query: BaseModel<TModel>, pagination: { page: number, limit: number, sort: string }) {
    try {
      const page = Number(pagination.page) - 1 || 0;
      const limit = Number(pagination.limit) || 20;
      const offset = page * limit;
      const sort = pagination.sort || "createdAt";

      const count = await this.model.countDocuments({ ...query })

      const data = await this.model.find({ ...query })
        .limit(limit)
        .skip(offset)
        .sort(sort)
        .exec()

      const resolveValue = {
          page: page + 1,
          limit,
          sort,
          docs: data
        };
    
      return {
        ...resolveValue,
        totalDocs: count,
        totalPages: Math.ceil(count / limit),
        hasPrevPage: page > 0,
        hasNextPage: (page + 1) * limit < count,
        offset: page * limit,
        prevPage: page ? page : null,
        nextPage: page + 2 < Math.ceil(count / limit) ? page + 2 : null
      }
    } catch (err) {
      return Promise.reject(err)
    }

  }
}
