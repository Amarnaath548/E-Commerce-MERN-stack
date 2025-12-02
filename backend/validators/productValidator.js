import { body } from "express-validator";

export const productValidator = [
  body("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title can be at most 100 characters long"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("description")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 1000 })
    .withMessage("Description can be at most 1000 characters long"),
  body("category")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid Category ID"),
  body("images")
    .custom((value, { req }) => {
      if (!req.files || req.files.length === 0) {
        throw new Error("At least one product image is required");
      }
      return true;
    }),
];
