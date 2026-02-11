import { Target } from "../models/target.model.js";

export const getTargets = async (req, res, next) => {
  try {
    let targets = await Target.findOne({ userId: req.user.id });

    if (!targets) {
      // Create default targets if not exist
      targets = await Target.create({
        userId: req.user.id,
      });
    }

    res.json({
      success: true,
      data: targets,
    });
  } catch (error) {
    next(error);
  }
};
