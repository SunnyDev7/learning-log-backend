import { Activity } from "../models/activity.models.js";
import { Category } from "../models/category.models.js";
import { getTodayDate } from "../utils/dateUtils.js";

export const createActivity = async (req, res, next) => {
  try {
    const { categoryId, duration, description, date, details } = req.body;

    // Verify category belongs to user
    const category = await Category.findOne({
      _id: categoryId,
      userId: req.user.id,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const activity = await Activity.create({
      userId: req.user.id,
      categoryId,
      duration,
      description: description || category.label,
      date: date || getTodayDate(),
      details,
    });

    await activity.populate("categoryId", "label icon color");

    res.status(201).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    next(error);
  }
};

export const getActivities = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    let query = { userId: req.user.id };

    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }

    const activities = await Activity.find(query)
      .populate("categoryId", "label icon color")
      .sort("-date -timestamp");

    res.json({
      success: true,
      data: activities,
    });
  } catch (error) {
    next(error);
  }
};
