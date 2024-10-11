import { NextFunction,Request,Response } from "express";
export interface IuserController{
    register(req:Request,res:Response,next:NextFunction):void   
    otpVerify(req:Request,res:Response,next:NextFunction):void 
    resendOtp(req:Request,res:Response,next:NextFunction):void 
    login(req:Request,res:Response,next:NextFunction):void   
    addProduct(req:Request,res:Response,next:NextFunction):void   
    getProducts(req:Request,res:Response,next:NextFunction):void   
    addCustomer(req:Request,res:Response,next:NextFunction):void
    getCustomers(req:Request,res:Response,next:NextFunction):void 
    sellProduct(req:Request,res:Response,next:NextFunction):void   
    editProduct(req:Request,res:Response,next:NextFunction):void   
    getSalesReport(req:Request,res:Response,next:NextFunction):void   
    sendMail(req:Request,res:Response,next:NextFunction):void   
    forgotPassword(req:Request,res:Response,next:NextFunction):void  
    passwordReset(req:Request,res:Response,next:NextFunction):void  
    deleteProduct(req:Request,res:Response,next:NextFunction):void  

}