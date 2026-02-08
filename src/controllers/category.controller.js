import { Category } from "../models/category.models.js";

export const createCategory = async (req, res, next) => {
  try {
    const { label, icon, color, description } = req.body;

    // Get max order
    const maxOrder = await Category.findOne({ userId: req.user.id })
      .sort("-order")
      .select("order");

    const order = maxOrder ? maxOrder.order + 1 : 0;

    const category = await Category.create({
      userId: req.user.id,
      label,
      icon: icon || "📝",
      color: color || "hsl(215, 14%, 50%)",
      description,
      order,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
