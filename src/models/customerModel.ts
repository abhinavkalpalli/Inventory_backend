import { Schema, Document, model } from "mongoose";

export interface Customer extends Document {
  name: string;
  address: string;
  mobile: number;
  isListed: boolean;
}
export default model<Customer>(
  "Customers",
  new Schema<Customer>(
    {
      name: { type: String, required: true },
      address: { type: String, required: true },
      mobile: { type: Number, required: true },
      isListed: { type: Boolean, default: true },
    },
    { timestamps: true }
  )
);
