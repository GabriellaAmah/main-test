import { ProductController } from "../product.controller"
import { ProductRepository } from "../../../models/product.model"
import { Request, Response } from "express"

describe("ProductController", () => {
    let productController: ProductController
    let mockResponse = {
        status: () => {
            return {
                json: (val: any) => val
            }
        }
    } as Response

    beforeEach(() => {
        productController = new ProductController({
            service: {
                createProduct: jest.fn(async (val: any) => val),
                getSingleProduct: jest.fn(async (id: string) => ({ _id: id })),
                updateSingleProduct: jest.fn(),
                deleteSingleProduct: jest.fn(),
                getAllProduct: jest.fn(async (query) => ({ ...query })),
                repo: {} as ProductRepository
            }
        })
    })

    describe("createProduct", () => {
        it("should successfully create a product", async () => {
            const mockRequest = {
                body: {
                    name: "dummy-name",
                    description: "dummy-description",
                    price: 30,
                    imageUrl: "dummy-url"
                }
            } as Request
            const data = await productController.createProduct(mockRequest, mockResponse)

            expect(data).toEqual({
                payload: {
                    name: "dummy-name",
                    description: "dummy-description",
                    price: 30,
                    imageUrl: "dummy-url"
                },
                status: "success",
                message: "product successfully created"
            })
        })

        it("should fail to successfully create a product", async () => {
            const mockRequest = {
                body: {
                    name: "dummy-name",
                    description: "dummy-description",
                    price: 30,
                    imageUrl: "dummy-url"
                }
            } as Request

            jest.spyOn(productController.service, "createProduct").mockImplementation(async () => Promise.reject(new Error()))
            const data = await productController.createProduct(mockRequest, mockResponse)

            expect(data).toEqual({
                status: "failed",
                message: "An error occurred while creating product"
            })
        })
    })

    describe("getSingleProduct", () => {
        it("should successfully get a single product", async () => {
            const mockRequest = {
                params: {
                    id: "demo-id"
                }
            } as unknown as Request

            const data = await productController.getSingleProduct(mockRequest, mockResponse)

            expect(data).toEqual({
                payload: {
                    _id: "demo-id",
                },
                message: "product successfully gotten",
                status: "success"
            })
        })

        it("should fail to successfully get a single product", async () => {
            const mockRequest = {
                params: {
                    id: "demo-id"
                }
            } as unknown as Request

            jest.spyOn(productController.service, "getSingleProduct").mockImplementation(async () => Promise.reject(new Error()))
            const data = await productController.getSingleProduct(mockRequest, mockResponse)

            expect(data).toEqual({
                status: "failed",
                message: "An error occurred while getting product"
            })
        })
    })

    describe("updateSingleProduct", () => {
        it("should successfully update a single product", async () => {

            const mockRequest = {
                params: {
                    id: "demo-id"
                }
            } as unknown as Request


            const data = await productController.updateProduct(mockRequest, mockResponse)

            expect(data).toEqual({
                message: "product successfully updated",
                status: "success"
            })
        })

        it("should fail to successfully update a single product", async () => {

            const mockRequest = {
                params: {
                    id: "demo-id"
                }
            } as unknown as Request


            jest.spyOn(productController.service, "updateSingleProduct").mockImplementation(async () => Promise.reject(new Error()))
            const data = await productController.updateProduct(mockRequest, mockResponse)

            expect(data).toEqual({
                status: "failed",
                message: "An error occurred while updating product"
            })
        })
    })

    describe("deleteSingleProduct", () => {
        it("should successfully delete a single product", async () => {

            const mockRequest = {
                params: {
                    id: "demo-id"
                }
            } as unknown as Request

            const data = await productController.deleteProduct(mockRequest, mockResponse)

            expect(data).toEqual({
                message: "product successfully deleted",
                status: "success"
            })

        })

        it("should fail to successfully delete a single product", async () => {

            const mockRequest = {
                params: {
                    id: "demo-id"
                }
            } as unknown as Request

            jest.spyOn(productController.service, "deleteSingleProduct").mockImplementation(async () => Promise.reject(new Error()))
            const data = await productController.deleteProduct(mockRequest, mockResponse)

            expect(data).toEqual({
                message: "An error occurred while deleting product",
                status: "failed"
            })

        })

    })

    describe("getAllProduct", () => {
        it("should successfully get all product", async () => {

            const mockRequest = {
                query: {
                    id: "demo-id"
                }
            } as unknown as Request

           const data = await productController.getAllProduct(mockRequest, mockResponse)

           expect(data).toEqual({
            status: "success",
            payload: {
                id: "demo-id"
            },
            message: "product successfully gotten",
           })
        })

        it("should fail to successfully get all product", async () => {

            const mockRequest = {
                query: {
                    id: "demo-id"
                }
            } as unknown as Request

            jest.spyOn(productController.service, "getAllProduct").mockImplementation(async () => Promise.reject(new Error()))
           const data = await productController.getAllProduct(mockRequest, mockResponse)

           expect(data).toEqual({
            status: "failed",
             message: "An error occurred while getting products"
           })
        })
    })
})