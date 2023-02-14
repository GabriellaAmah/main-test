import { IProductModel } from "../../interface/product";
import ProductService from "../../service/product.service";
import {Request, Response} from "express"

class ProductController{
    service: ProductService

    constructor({
        service = new ProductService()
    } = {}){
        this.service = service
    }


    async createProduct(req: Request, res: Response){
        try{
            const product  = await this.service.createProduct(req.body)

            return res.status(201).json({
                status: "success",
                payload: product,
                message: "product successfully created",
            })
        }catch(error: any){
            return res.status(error.code || 500).json({
                status: "failed",
                message: error.code ? error.message : "An error occurred while creating product"
            })
        }
    }

    async getSingleProduct(req: Request, res: Response){
        try{
            const {id} = req.params as any
            const product  = await this.service.getSingleProduct(id)

            return res.status(200).json({
                status: "success",
                payload: product,
                message: "product successfully gotten",
            })
        }catch(error: any){
            return res.status(error.code || 500).json({
                status: "failed",
                message: error.code ? error.message : "An error occurred while getting product"
            })
        }
    }

    async updateProduct(req: Request, res: Response){
        try{
            const {id} = req.params as any
            const body = req.body as unknown as IProductModel

            console.log("bodyy", body)
            const product  = await this.service.updateSingleProduct(id, body)

            return res.status(201).json({
                status: "success",
                payload: product,
                message: "product successfully updated",
            })
        }catch(error: any){
            return res.status(error.code || 500).json({
                status: "failed",
                message: error.code ? error.message : "An error occurred while updating product"
            })
        }
    }

    async deleteProduct(req: Request, res: Response){
        try{
            const {id} = req.params as any
             await this.service.deleteSingleProduct(id)

            return res.status(200).json({
                status: "success",
                message: "product successfully deleted",
            })
        }catch(error: any){
            return res.status(error.code || 500).json({
                status: "failed",
                message: error.code ? error.message : "An error occurred while deleting product"
            })
        }
    }

    async getAllProduct(req: Request, res: Response){
        try{
          const query = req.query as any 

            const products  = await this.service.getAllProduct(query)

            return res.status(200).json({
                status: "success",
                payload: products,
                message: "product successfully gotten",
            })
        }catch(error: any){
            console.log("error", error)
            return res.status(error.code || 500).json({
                status: "failed",
                message: error.code ? error.message : "An error occurred while getting products"
            })
        }
    }
}

export default new ProductController()