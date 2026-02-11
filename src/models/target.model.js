import mongoose from "mongoose";

const targetSchemma = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  weeklyHours: {
    min: { type: Number, default: 30, min: 0, max: 168 },
    max: { type: Number, default: 48, min: 0, max: 168 },
  },
  activeDaysPerWeek: {
    min: { type: Number, default: 5, min: 0, max: 7 },
    max: { type: Number, default: 6, min: 0, max: 7 },
  },
  dsaProblemsPerWeek: {
    min: { type: Number, default: 10, min: 0 },
    max: { type: Number, default: 12, min: 0 },
  },
  germanHoursPerWeek: {
    type: Number,
    default: 4,
    min: 0,
    max: 168,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Target = mongoose.model("Target", targetSchemma);
