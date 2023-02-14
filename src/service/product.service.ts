import { BaseModel, IProduct, IProductModel } from "../interface/product"
import {ProductRepository} from "../models/product.model"
import {produceError} from "../helpers/error" 

class ProductService{
    repo: ProductRepository 

    constructor({
        repo = new ProductRepository()
    } = {}){
        this.repo = repo;
    }

    async createProduct(product: IProduct): Promise<BaseModel<IProductModel>>{
        const newProduct = await this.repo.create({...product})
        return newProduct
    }

    async getSingleProduct(id: string): Promise<BaseModel<IProductModel>>{
        let data = await this.repo.findOne({_id: id})
        return data
    }

    async updateSingleProduct(id: string, values: IProductModel): Promise<void>{
        const productExists = await this.repo.findOne({_id: id})

        if(!productExists){
            throw produceError(404, "product does not exists")
        }

        await this.repo.updateOne({_id: id}, {...values})

    }

    async deleteSingleProduct(id: string): Promise<void>{
        const productExists = await this.repo.findOne({_id: id})

        if(!productExists){
            throw produceError(404, "product does not exists")
        }

        await this.repo.destroy({_id: id})
    }

    async getAllProduct(query: IProductModel & { page: number, limit: number, sort: string }): Promise<any>{
        let queryValues = query as IProductModel
        const paginateValues = {
            page: query.page,
            limit: query.limit,
            sort: query.sort
        }
        
        const products = await this.repo.findAndPaginate(queryValues, paginateValues)

        return products

    }
}

export default  ProductService