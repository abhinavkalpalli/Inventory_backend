import { Schema, Document, model } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
  isVerified: boolean;
}
const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});
export default model<User>("Users", userSchema);
