import { body } from "express-validator";

export const categoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isString()
    .withMessage("Category name must be a string")
    .isLength({ max: 50 })
    .withMessage("Category name must not exceed 50 characters"),
  body("image")
    .notEmpty()
    .withMessage("Category image is required")
    .isString()
    .withMessage("Category image must be a string")
    .isURL()
    .withMessage("Each image must be a valid URL"),
];
