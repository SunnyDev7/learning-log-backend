import { Category } from "../models/category.models.js";
import { Activity } from "../models/activity.models.js";
import { getTodayDate } from "./dateUtils.js";

// Calculate streak
export const calculateStreak = async (userId) => {
  // Get all activities grouped by date with total >= 30 minutes
  const dailyTotals = await Activity.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$date",
        totalMinutes: { $sum: "$duration" },
      },
    },
    { $match: { totalMinutes: { $gte: 30 } } },
    { $sort: { _id: -1 } },
  ]);

  const logDates = new Set(dailyTotals.map((d) => d._id));
  const today = getTodayDate();

  // Current streak
  let currentStreak = 0;
  let checkDate = parseLocalDate(today);

  while (true) {
    const dateStr = toLocalDateString(checkDate);
    if (logDates.has(dateStr)) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (currentStreak === 0 && dateStr === today) {
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  // Longest streak
  const allDates = Array.from(logDates).sort();
  let longestStreak = 0;
  let tempStreak = 0;

  for (let i = 0; i < allDates.length; i++) {
    if (i === 0) {
      tempStreak = 1;
    } else {
      const prevDate = parseLocalDate(allDates[i - 1]);
      const currDate = parseLocalDate(allDates[i]);
      const diffDays = Math.round(
        (currDate - prevDate) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);
  }

  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
    totalDaysActive: logDates.size,
  };
};
