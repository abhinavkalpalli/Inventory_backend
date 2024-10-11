import mongoose, { Document, Schema } from 'mongoose';

export interface Sales extends Document{
    customerId:mongoose.Types.ObjectId,
    productId:mongoose.Types.ObjectId,
    quantity:number,
    date:String,
    totalPrice:number
}
const salesSchema=new Schema<Sales>({
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'Customers'
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:'Products'
    },
    quantity:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    }

})
const Sale=mongoose.model<Sales>('Sales',salesSchema)
export default Sale
