import { NextFunction,Request,Response } from "express";
import { User } from "../../models/userModel";
import { Product } from "../../models/produtModel";
import { Customer } from "../../models/customerModel";
import { Sales } from "../../models/salesModel";

export interface IuserRepository{
    register(userData:Partial<User>):Promise<User|null>
    otpVerify(email:Partial<User>):Promise<User|null>
    login(email:Partial<User>):Promise<User|null>
    addProduct(data:Partial<Product>):Promise<Product|null>
    getProducts():Promise<Product[]|null>
    addCustomer(data:Partial<Customer>):Promise<Customer|null>
    getCustomers():Promise<Customer[]|null>
    sellProduct(data:Partial<Sales>):Promise<Sales|null>
    editProduct(data:Partial<Product>):Promise<Product|null>
    getsalesReport(data:Partial<Sales>):Promise<Sales[]|null>
    passwordReset(email:string,password:string):Promise<User|null>
    forgotPassword(email:string):Promise<User|null>
    deleteProduct(productId:string):Promise<Product|null>




}