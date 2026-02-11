import { Category } from "../models/category.models.js";
import { Activity } from "../models/activity.models.js";
import {
  calculateStreak,
  calculateGoalProgress,
} from "../utils/statsCalculator.js";
import {
  getTodayDate,
  getWeekStart,
  getWeekEnd,
  getMonthEnd,
} from "../utils/dateUtils.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const today = getTodayDate();

    // Calculate streaks
    const streakData = await calculateStreak(userId);

    // Weekly hours
    const weekStart = getWeekStart(today);
    const weekEnd = getWeekEnd(today);

    const weeklyActivities = await Activity.find({
      userId,
      date: { $gte: weekStart, $lte: weekEnd },
    });

    const weeklyMinutes = weeklyActivities.reduce(
      (sum, a) => sum + a.duration,
      0,
    );
    const weeklyHours = weeklyMinutes / 60;

    // Monthly hours
    const monthStart = today.substring(0, 7) + "-01";
    const monthEnd = getMonthEnd(today);

    const monthlyActivities = await Activity.find({
      userId,
      date: { $gte: monthStart, $lte: monthEnd },
    });

    const monthlyMinutes = monthlyActivities.reduce(
      (sum, a) => sum + a.duration,
      0,
    );
    const monthlyHours = monthlyMinutes / 60;

    // Goal progress
    const goalProgress = await calculateGoalProgress(userId);

    res.json({
      success: true,
      data: {
        currentStreak: streakData.currentStreak,
        longestStreak: streakData.longestStreak,
        totalDaysActive: streakData.totalDaysActive,
        weeklyHours,
        monthlyHours,
        goalProgress,
      },
    });
  } catch (error) {
    next(error);
  }
};
