import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  label: {
    type: String,
    required: [true, "Category label is required"],
    trim: true,
    maxlength: [50, "Label cannot exceed 50 characters"],
  },
  icon: {
    type: String,
    required: true,
    default: "📝",
  },
  color: {
    type: String,
    required: true,
    default: "hsl(215, 14%, 50%)",
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, "Description cannot exceed 200 characters"],
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for efficient queries
categorySchema.index({ userId: 1, order: 1 });

export const Category = mongoose.model("Category", categorySchema);
