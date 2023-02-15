import { IProduct, IProductModel } from "../../interface/product"
import ProductService from "../product.service"
import {Schema} from "mongoose"

describe("ProductService", () => {
    let productService: ProductService

    beforeEach(() => {
        productService  =  new ProductService({
            repo: {
               create: jest.fn(async (val) => val ),
               findOne: jest.fn(async (query) => query),
               updateOne: jest.fn(async (query, values) => ({...query, ...values})),
               destroy: jest.fn(),
               findAndPaginate: jest.fn(async (query, values) => ({...query, ...values})),
               name: "dummy-model",
               model: "dummy-model"
            }
        })
    })

    describe("createProduct", () => {
        it("should successfully create a product", async () => {
            const data  = await productService.createProduct({
                name: "dummy-name",
                description: "dummy-description",
                price: 30,
                imageUrl: "dummy-url"
            })

            expect(data).toEqual({
                name: "dummy-name",
                description: "dummy-description",
                price: 30,
                imageUrl: "dummy-url"
            })
        })
    })

    describe("getSingleProduct", () => {
        it("should successfully get a single product", async () => {
            const data  = await productService.getSingleProduct("demo-id")

            expect(data).toEqual({
               _id: "demo-id"
            })
        })
    })

    describe("updateSingleProduct", () => {
        it("should successfully update a single product", async () => {

           await productService.updateSingleProduct("demo-id", {price: 80} as IProduct)

            expect(productService.repo.findOne).toBeCalledTimes(1)
            expect(productService.repo.updateOne).toBeCalledTimes(1)
        })
    })

    describe("deleteSingleProduct", () => {
        it("should successfully delete a single product", async () => {

           await productService.deleteSingleProduct("demo-id")

            expect(productService.repo.findOne).toBeCalledTimes(1)
            expect(productService.repo.destroy).toBeCalledTimes(1)
        })
    })

    describe("getAllProduct", () => {
        it("should successfully get all product", async () => {

           const data = await productService.getAllProduct({price: 80, name:"dummy"} as IProductModel &  { page: number, limit: number, sort: string })

           expect(data).toEqual({price: 80, name: "dummy"})
        })
    })
})