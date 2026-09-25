import { z } from "zod";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // https://zod.dev/error-formatting — flat schemas use z.flattenError().
      // formErrors: lỗi cả body. fieldErrors: lỗi từng field.
      const { formErrors, fieldErrors } = z.flattenError(result.error);
      const flatErrors = [...formErrors, ...Object.values(fieldErrors).flat()];

      return res.status(400).json({ message: flatErrors.join(", ") });
    }

    req.body = result.data;
    next();
  };
};
