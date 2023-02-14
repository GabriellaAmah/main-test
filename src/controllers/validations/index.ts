import { NextFunction, Response, Request } from "express"
import joi from "joi"
import { handleValidationError } from "../../helpers/error"

export const validateCreateProduct = (req: Request, res: Response, next: NextFunction): any => {
    const schema = joi.object({
        name: joi.string()
        .required()
        .label("Product name"),

        description: joi.string()
        .required()
        .label("Product description"),

        imageUrl: joi.string()
        .required()
        .label("Product imageUrl"),

        price: joi.number()
        .min(0)
        .required()
        .label("Product price")
    })

   return handleValidationError(req, res, next, schema.validate(req.body))
}

export const validateUpdateProduct = (req: Request, res: Response, next: NextFunction): any => {
    const schema = joi.object({
        name: joi.string()
        .label("Product name"),

        description: joi.string()
        .label("Product description"),

        imageUrl: joi.string()
        .label("Product imageUrl"),

        price: joi.number()
        .min(0)
        .label("Product price")
    })

   return handleValidationError(req, res, next, schema.validate(req.body))
}

export const validateProductId = (req: Request, res: Response, next: NextFunction): any => {
    const schema = joi.object({
        id: joi.string()
        .required()
        .label("Product is")
    })

   return handleValidationError(req, res, next, schema.validate(req.params))
}

export const validateGetAllProducts = (req: Request, res: Response, next: NextFunction): any => {
    const schema = joi.object({
        name: joi.string()
        .label("Product name"),

        description: joi.string()
        .label("Product description"),

        imageUrl: joi.string()
        .label("Product imageUrl"),

        price: joi.number()
        .min(0)
        .label("Product price"),

        limit: joi.number()
        .label("pagination limit"),

        page: joi.number()
        .label("pagination page")
    })

   return handleValidationError(req, res, next, schema.validate(req.query))
}