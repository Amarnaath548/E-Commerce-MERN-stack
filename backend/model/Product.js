import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title:{
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: 100,
    },
    price:{
        type: Number,
        required: [true, "Price is required"],
        min: 0,
    },
    description:{
        type: String,
        trim: true,
        maxlength: 1000,
        required: [true, "Description is required"],
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category ID is required"],
    },
    images:[{
        type: String,
        required: [true, "At least one image is required"],
    }],
    }
  ,
  {
    timestamps: true,
  }
);

productSchema.index( { category: 1 , createdAt: -1 } );

export default mongoose.model("Product", productSchema);