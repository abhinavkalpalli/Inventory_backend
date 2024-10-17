import { Customer } from "../models/customerModel";
import { Product } from "../models/produtModel";
import { Sales } from "../models/salesModel";
import { User } from "../models/userModel";
import userRepository from "../repositories/userRepository";
import { IuserService } from "./interfaces/IuserService";

export default class userService implements IuserService {
  private _userRepository: userRepository;

  constructor() {
    this._userRepository = new userRepository();
  }
  async register(userData: Partial<User>): Promise<User | null> {
    try {
      return await this._userRepository.register(userData);
    } catch (error) {
      throw error;
    }
  }
  async otpVerify(email: Partial<User>): Promise<User | null> {
    try {
      return this._userRepository.otpVerify(email);
    } catch (error) {
      throw error;
    }
  }
  async login(email: Partial<User>): Promise<User | null> {
    try {
      return await this._userRepository.login(email);
    } catch (error) {
      throw error;
    }
  }
  async addProduct(data: Partial<Product>): Promise<Product | null> {
    try {
      return await this._userRepository.addProduct(data);
    } catch (error) {
      throw error;
    }
  }
  async getProducts(): Promise<Product[] | null> {
    try {
      return await this._userRepository.getProducts();
    } catch (error) {
      throw error;
    }
  }
  async addCustomer(data: Partial<Customer>): Promise<Customer | null> {
    try {
      return await this._userRepository.addCustomer(data);
    } catch (error) {
      throw error;
    }
  }
  async getCustomers(): Promise<Customer[] | null> {
    try {
      return await this._userRepository.getCustomers();
    } catch (error) {
      throw error;
    }
  }
  async sellProduct(data: Partial<Sales>): Promise<Sales | null> {
    try {
      return await this._userRepository.sellProduct(data);
    } catch (error) {
      throw error;
    }
  }
  async editProduct(data: Partial<Product>): Promise<Product | null> {
    try {
      return await this._userRepository.editProduct(data);
    } catch (error) {
      throw error;
    }
  }
  async getsalesReport(data: Partial<Sales>): Promise<Sales[] | null> {
    try {
      return await this._userRepository.getsalesReport(data);
    } catch (error) {
      throw error;
    }
  }
  async passwordReset(email: string, password: string): Promise<User | null> {
    try {
      return await this._userRepository.passwordReset(email, password);
    } catch (error) {
      throw error;
    }
  }
  async forgotPassword(email: string): Promise<User | null> {
    try {
      return await this._userRepository.forgotPassword(email);
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct(productId: string): Promise<Product | null> {
    try {
      return await this._userRepository.deleteProduct(productId);
    } catch (error) {
      throw error;
    }
  }
}
