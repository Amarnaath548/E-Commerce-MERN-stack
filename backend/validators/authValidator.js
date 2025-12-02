import { body } from "express-validator";

export const registerValidator = [
    body("name")
        .trim().notEmpty().withMessage("Name is required")
        .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
    body("email")
        .trim().notEmpty().withMessage("Email is required")
        .isEmail().withMessage("please provide a valid email address"),
    body("password")
        .trim().notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("avatar")
    .custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Avatar image is required');
        }
        return true;
    }),
];

export const loginValidator = [
    body("email")
        .trim().notEmpty().withMessage("Email is required")
        .isEmail().withMessage("please provide a valid email address"),
    body("password")
        .trim().notEmpty().withMessage("Password is required"),
];
