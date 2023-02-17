import { NextFunction, Response, Request } from "express"

class ErrorResponse extends Error{
    code: number
    constructor(code: number, message: string){
        super()
        this.code = code;
        this.message = message
    }
}

export function produceError(code: number, message: string): ErrorResponse{
   return new ErrorResponse( code, message);
   
}

export const handleValidationError = async (req: Request, res: Response, next: NextFunction, validation: any): Promise<void | Response> => {
    try {
      const validate = await validation;
      if (validate.error) {
        throw validate.error;
      }
      next();
    } catch (error: any) {
        return res.status(412).json({
            status: "failed",
            message:  error.details[0].message
        })
    }
  };