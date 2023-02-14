import { Router} from "express"
import productController from "../controllers/product/product.controller"
import {validateCreateProduct, validateUpdateProduct, validateProductId, validateGetAllProducts} from "../controllers/validations"
const router = Router()

router.route("/product")
.post(validateCreateProduct, productController.createProduct.bind(productController))
.get(validateGetAllProducts, productController.getAllProduct.bind(productController))

router.route("/product/:id")
.get(validateProductId, productController.getSingleProduct.bind(productController))
.patch(validateProductId, validateUpdateProduct, productController.updateProduct.bind(productController))
.delete(validateProductId, productController.deleteProduct.bind(productController))


export default router