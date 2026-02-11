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

export const getWeeklyStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const today = getTodayDate();
    const weekStart = getWeekStart(today);
    const weekEnd = getWeekEnd(today);

    const categories = await Category.find({ userId });
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const result = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      const activities = await Activity.find({ userId, date: dateStr });

      const categoryMinutes = {};
      categories.forEach((cat) => {
        categoryMinutes[cat._id.toString()] = 0;
      });

      activities.forEach((activity) => {
        const catId = activity.categoryId.toString();
        if (categoryMinutes[catId] !== undefined) {
          categoryMinutes[catId] += activity.duration;
        }
      });

      result.push({
        day: days[i],
        date: dateStr,
        categories: categoryMinutes,
      });
    }

    // Calculate active days //TODO: Not working
    const activeDays = result.filter(
      (d) => Object.values(d.categories).reduce((a, b) => a + b, 0) >= 30,
    ).length;

    res.json({
      success: true,
      data: {
        days: result,
        activeDays,
        categories: categories.map((c) => ({
          id: c._id,
          label: c.label,
          icon: c.icon,
          color: c.color,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getDailyStats = async (req, res, next) => {
  try {
    const { date } = req.params;
    const userId = req.user.id;

    const activities = await Activity.find({
      userId,
      date,
    }).populate("categoryId", "label icon color");

    const totalTime = activities.reduce((sum, a) => sum + a.duration, 0);

    const categories = {};
    activities.forEach((a) => {
      const catId = a.categoryId._id.toString();
      categories[catId] = (categories[catId] || 0) + a.duration;
    });

    res.json({
      success: true,
      data: {
        date,
        totalTime,
        activities,
        categories,
      },
    });
  } catch (error) {
    next(error);
  }
};
