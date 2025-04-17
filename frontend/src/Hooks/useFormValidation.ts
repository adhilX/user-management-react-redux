import { useState } from "react";
import { ZodSchema } from "zod";

type UseFormValidationProps<T> = {
  initialValues: T;
  schema: ZodSchema<T>;
};

export function useFormValidation<T extends Record<string, any>>({
  initialValues,
  schema,
}: UseFormValidationProps<T>) {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof T, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof T;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  return {
    formData,
    setFormData,
    handleChange,
    validate,
    errors,
    setErrors,
  };
}
