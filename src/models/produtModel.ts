import { Schema, Document, model } from "mongoose";

export interface Product extends Document {
  name: string;
  description: string;
  quantity: number;
  image: string;
  price: number;
  isListed:boolean
}
export default model<Product>(
  "Products",
  new Schema<Product>(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      isListed:{type:Boolean,default:true}
    },
    { timestamps: true }
  )
);
