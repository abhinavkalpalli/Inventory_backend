import Customers, { Customer } from "../models/customerModel";
import Products, { Product } from "../models/produtModel";
import Sale, { Sales } from "../models/salesModel";
import Users, { User } from "../models/userModel";
import { IuserRepository } from "./interfaces/IuserRepository";
import { ObjectId } from "mongodb";


export default class userRepository implements IuserRepository {
  async register(userData: Partial<User>): Promise<User | null> {
    try {
      const data = await Users.findOne({ email: userData.email });
      if (data) {
        return null;
      }
      return await Users.create(userData);
    } catch (err) {
      throw err;
    }
  }
  async otpVerify(email: Partial<User>): Promise<User | null> {
    try {
      let data = await Users.findOne({ email });
      if (data) {
        data.isVerified = true;
        data.save();
        return data;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  async login(email: Partial<User>): Promise<User | null> {
    try {
      return await Users.findOne({ email, isVerified: true });
    } catch (error) {
      throw error;
    }
  }
  async addProduct(data: Partial<Product>): Promise<Product | null> {
    try {
      let product = await Products.findOne({ name: data.name,isListed:true });
      if (product) {
        return null;
      }
      return await Products.create(data);
    } catch (error) {
      throw error;
    }
  }
  async getProducts(): Promise<Product[] | null> {
    try {
      return await Products.find({isListed:true});
    } catch (error) {
      throw error;
    }
  }
  async addCustomer(data: Partial<Customer>): Promise<Customer | null> {
    try {
      let customer = await Customers.findOne({ mobile: data.mobile });
      if (customer) {
        return null;
      }
      return await Customers.create(data);
    } catch (error) {
      throw error;
    }
  }
  async getCustomers(): Promise<Customer[] | null> {
    try {
      return await Customers.find({isListed:true});
    } catch (error) {
      throw error;
    }
  }
  async sellProduct(data: Partial<Sales>): Promise<Sales | null> {
    try {
      let product = await Products.findById(data.productId);

      if (!product) {
        throw new Error("Product not found");
      }
      
      const quantity = data.quantity ?? 0; // Provide a default value if undefined
      
      if (quantity === 0 || product.quantity < quantity) {
        throw new Error("Invalid quantity or not enough stock to complete the sale");
      }
      
      // Update product quantity
      product.quantity -= quantity;
      
      // Save the updated product
      await product.save();

      // Save the updated product
      await product.save();

      return await Sale.create(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async editProduct(data: Partial<Product>): Promise<Product | null> {
    try {
      const product = await Products.findById(data._id);
      
      // Check if the product exists
      if (!product) {
        throw new Error("Product not found");
      }
  
      // Update product fields with new values if provided
      product.name = data.name || product.name; // Only update if a new value is provided
      product.description = data.description || product.description; // Same for description
      product.quantity = data.quantity !== undefined ? data.quantity : product.quantity; // Check if quantity is provided
      product.price = data.price !== undefined ? data.price : product.price; // Check if price is provided
      product.image = data.image !== undefined ? data.image : product.image; // Check if price is provided

  
      // Save the updated product to the database
      await product.save();
  
      // Return the updated product
      return product;
    } catch (error) {
      throw error
    }
  }
  async getsalesReport(data: Partial<Sales>): Promise<Sales[] | null> {
    try {
      const query: any = {};
      if (data.date) query.date = data.date;
      if (data.productId) query.productId = new ObjectId(data.productId);
      if (data.customerId) query.customerId = new ObjectId(data.customerId);
  
      const report = await Sale.find(query)
        .populate({ path: 'productId', select: 'name' })
        .populate({ path: 'customerId', select: 'name' });
  
      return report;
    } catch (error) {
      throw error;
    }
  }
  async passwordReset(email: string, password: string): Promise<User | null> {
    try {
      const user=await Users.findOne({email})
      if(user){
        user.password=password
        user.save()
        return user
      }
      return null
    } catch (error) {
      throw error
    }
  }
  async forgotPassword(email: string): Promise<User | null> {
    try {
      const user=await Users.findOne({email})
      if(user){
        return user
      }
      return null
    } catch (error) {
     throw error 
    }
  }
  async deleteProduct(productId: string): Promise<Product | null> {
    try {
      const product=await Products.findById(productId)
      if(product){
        product.isListed=false
        product.save()
        return product
      }
      return null
    } catch (error) {
      throw error
    }
  }
}
