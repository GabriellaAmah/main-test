import { Schema, model} from "mongoose"
import { IProductModel } from "../interface/product"
import {BaseRepository} from "./base-repo"


const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true}
}, {timestamps: true, versionKey:false})


export class ProductRepository extends BaseRepository<IProductModel> {
    constructor(){
        super("product", productSchema)
    }
}

export default model<IProductModel>("product", productSchema)