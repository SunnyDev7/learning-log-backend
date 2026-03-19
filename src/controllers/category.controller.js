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
    let categories = await Category.find({ userId: req.user.id }).sort(
      "order",
    );

    // Seed default categories for new users
    if (categories.length === 0) {
      categories = await Category.insertMany([
        { userId: req.user.id, label: "Web Development", icon: "💻", color: "hsl(210, 100%, 50%)", isDefault: true, order: 0 },
        { userId: req.user.id, label: "Reading", icon: "📖", color: "hsl(25, 95%, 53%)", order: 1 },
        { userId: req.user.id, label: "Workout", icon: "💪", color: "hsl(160, 70%, 40%)", order: 2 },
      ]);
    }

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

export const updateCategory = async (req, res, next) => {
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

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if this is the last category
    const count = await Category.countDocuments({ userId: req.user.id });
    if (count <= 1) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete the last category",
      });
    }

    await category.deleteOne();

    res.json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const reorderCategories = async (req, res, next) => {
  try {
    const { categoryIds } = req.body;

    // Update order for each category
    const updates = categoryIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id, userId: req.user.id },
        update: { order: index },
      },
    }));

    await Category.bulkWrite(updates);

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
};
