import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        maxlength: 50,
        unique: true,
    },
    image: {
        type: String,
        required: [true, "Category image is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categorySchema);