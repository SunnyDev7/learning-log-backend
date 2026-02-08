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

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ userId: req.user.id }).sort(
      "order",
    );

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }

  // const userId = req.params.id;

  // if (!req.user) {
  //   return res.status(401).json({ status: "false", message: "Unauthorized" });
  // }

  // const category = await Category.find({ userId });

  // res.status(200).json({ category });
  //};
};

export const updateCategories = async (req, res, next) => {
  try {
    let category = await Category.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true },
    );

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
