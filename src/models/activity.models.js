import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: {
    //TODO: check if this is required by client
    type: String,
    required: [true, "Description is required"],
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"],
    min: [1, "Duration must be at least 1 minute"],
  },
  date: {
    type: String,
    required: true,
    //match: [/^\\d{4}-\\d{2}-\\d{2}$/, "Date must be in YYYY-MM-DD format"],
  },
  details: {
    //TODO: check if this is required by client
    moduleName: { type: String, trim: true },
    problemCount: { type: Number, min: 0 },
    platform: { type: String, trim: true },
    courseName: { type: String, trim: true },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Compound indexes for efficient queries
activitySchema.index({ userId: 1, date: 1 });
activitySchema.index({ userId: 1, date: -1 });
activitySchema.index({ userId: 1, categoryId: 1 });

export const Activity = mongoose.model("Activity", activitySchema);
