import { Category } from "../models/category.models.js";
import { Activity } from "../models/activity.models.js";
import { getTodayDate } from "../utils/dateUtils.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const today = getTodayDate();

    // Calculate streaks
    const streakData = await calculateStreak(userId);

    
  } catch (error) {}
};
