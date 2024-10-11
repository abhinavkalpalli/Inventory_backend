import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import { IuserController } from "./interfaces/IuserController";
import bcrypt from "bcrypt";
import verificationService from "../services/verificationService";
import generateJwt, { Payload } from "../middleware/jwt";
import { ObjectId } from "mongodb";


export default class userController implements IuserController {
  private _userService: userService;
  private _verificationService: verificationService;
  constructor() {
    this._userService = new userService();
    this._verificationService = new verificationService();
  }
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = { email, password: hashedPassword };
      const userData = await this._userService.register(data);
      if (userData == null) {
        return res.status(402).json({ message: "User already exists" });
      } else {
        const otp = this._verificationService.generateOtp();
        await this._verificationService.SendOtpEmail(
          email,
          "Your OTP Code",
          otp
        );
        return res.status(201).json({
          message: "Admin registered successfully and OTP sent",
          email,
          otp,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });
    }
  }
  async otpVerify(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const data = await this._userService.otpVerify(email);
      if (data) {
        return res.status(200).json({ message: "verified" });
      } else {
        return res.status(400).json({ message: "Not verified" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });
    }
  }
  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.query;
      const otp = await this._verificationService.generateOtp();
      const data = await this._verificationService.SendOtpEmail(
        email as string,
        "This is your new Otp",
        otp
      );
      return res.status(200).json({ message: "otp sent", otp });
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const data = await this._userService.login(email);
      if (data) {
        const password2 = data.password;
        const isMatch = await bcrypt.compare(password, password2);
        if (isMatch) {
          const { email } = data;
          let tokens = await generateJwt(data as Payload);
          return res.status(200).json({
            message: "User Logged in",
            email,
            tokens,
          });
        } else {
          return res.status(402).json({ message: "Password did not match" });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });
    }
  }
  async addProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, quantity, price, image } = req.body;
      const data = { name, description, quantity, price, image };
      const product = await this._userService.addProduct(data);
      if (product) {
        return res.status(200).json({
          message: "Product added",
          product,
        });
      } else {
        return res.status(402).json({ message: "Product already exists" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });
    }
  }
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this._userService.getProducts();
      return res.status(200).json({
        products,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });
    }
  }
  async addCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, address, mobile } = req.body;
      const data = { name, address, mobile };
      const customer = await this._userService.addCustomer(data);
      if (customer) {
        return res.status(200).json({
          message: "Customer added",
          customer,
        });
      } else {
        return res.status(402).json({ message: "Customer already exists" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });
    }
  }
  async getCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await this._userService.getCustomers();
      return res.status(200).json({
        customers,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });
    }
  }
  async sellProduct(req: Request, res: Response, next: NextFunction) {
      try {
        const {productId,quantity,customerId,date,totalPrice}=req.body
        const data={productId,quantity,customerId,date,totalPrice}
        const sale= await this._userService.sellProduct(data)
        return res.status(200).json({
            message:'Item sold'
          });
      } catch (error) {
      return res.status(500).json({ message: "Internal Error" });

      }
  }
  async editProduct(req: Request, res: Response, next: NextFunction){
      try {
        const {_id,name,quantity,image,description}=req.body
        const data={_id,name,quantity,image,description}
        const product=await this._userService.editProduct(data)
        return res.status(200).json({
            message:'Product Updated',
            product
          });
      } catch (error) {
        return res.status(500).json({ message: "Internal Error" });
      }
  }
  async getSalesReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { date, productId, customerId } = req.query;
  
      // Convert productId and customerId to ObjectId if they are strings
      const data = {
        date: date as string | undefined,
        productId: typeof productId === 'string' ? new ObjectId(productId) : undefined,
        customerId: typeof customerId === 'string' ? new ObjectId(customerId) : undefined,
      };
      const report = await this._userService.getsalesReport(data);
  
      return res.status(200).json({ message: 'Report Fetched', report });
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });
    }
  }
  async sendMail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, salesReport } = req.body;

      // Prepare subject and HTML content for the sales report
      const subject = 'Sales Report';
      const salesReportContent = this.formatSalesReport(salesReport); // Format your report data for email

      // Call the method to send email
      await this._verificationService.SendReportEmail(email, subject, salesReportContent);

      return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Internal Error" });
    }
  }

  private formatSalesReport(salesReport: any): string {
    // Convert sales report data into a string or HTML format
    // Example: Create a simple HTML table or text summary
    let reportHTML = '<h3>Your Sales Report</h3>';
    reportHTML += '<table border="1"><tr><th>Date</th><th>Product</th><th>Customer</th><th>Quantity</th><th>Total</th></tr>';
    
    salesReport.forEach((report: any) => {
      reportHTML += `<tr>
        <td>${new Date(report.date).toLocaleDateString()}</td>
        <td>${report.productId.name}</td>
        <td>${report.customerId.name}</td>
        <td>${report.quantity}</td>
        <td>${report.totalPrice}</td>
      </tr>`;
    });
    reportHTML += '</table>';
    return reportHTML; // Return formatted HTML report
  }
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
        const {email}=req.body
        const user=await this._userService.forgotPassword(email)
        if(user){
          const otp=await this._verificationService.generateOtp()
          const data = await this._verificationService.SendOtpEmail(
            email,
            "This is for your forgot password",
            otp
          );
          return res
            .status(200)
            .json({ message: "otp sent", email, otp});
  
        }
        return res.status(404).json({ message: "User do not exist" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });

    }
  }
  async passwordReset(req: Request, res: Response, next: NextFunction) {
    try {
      const {email,password}=req.body
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const data=await this._userService.passwordReset(email,hashedPassword)
      if(data){
        return res
      .status(200)
      .json({ message: "Password Changed"});
      }
      return res.status(500).json({ message: "Internal Error" }); 
      
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" }); 
    }
  }
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const {productId}=req.body
        const data=await this._userService.deleteProduct(productId)
        if(data){
          return res
          .status(200)
          .json({ message: "Product deleted"});
        }
      return res.status(500).json({ message: "Internal Error" }); 
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" }); 
      
    }
  }
}

