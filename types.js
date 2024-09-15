const { z } = require("zod");

const userSignUpSchema = z.object({
  username: z
    .string()
    .email()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(30, { message: "Must be 30 or less characters long" }),
  firstName: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" })
    .max(50, { message: "Must be 50 or less characters long" }),
  lastName: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" })
    .max(50, { message: "Must be 50 or less characters long" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

const userSignInSchema = z.object({
  username: z
    .string()
    .email()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(30, { message: "Must be 30 or less characters long" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

const userUpdateSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Must be 8 or more characters long" })
    .optional(),
  firstName: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" })
    .max(50, { message: "Must be 50 or less characters long" })
    .optional(),
  lastName: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" })
    .max(50, { message: "Must be 50 or less characters long" })
    .optional(),
});

module.exports = {
  userSignUpSchema,
  userSignInSchema,
  userUpdateSchema,
};
