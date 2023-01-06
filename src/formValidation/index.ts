import { ChangeEvent, FormEvent, useState } from "react";
import { ErrorRecord, FormValidation, Validations } from "../model";

export const useFormValidation = <T extends Record<keyof T, any> = {}>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}): FormValidation<T> => {
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  const onInputChangeField = <S extends unknown>(
    key: keyof T,
    sanitizeFn?: (value: string) => S
  ) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    window.alert(e.target.type)
    if (e.target.type === 'checkbox') {
      setData({
        ...data,
        [key]: e.target.checked as boolean,
      });
    } else if (e.target.type === 'file') {
      setData({
        ...data,
        [key]: e.target.files,
      });
    } else {
      const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
      setData({
        ...data,
        [key]: value,
      });
    }

  };

  const setValueChange = (key: keyof T, value: any) => {
    setData({
      ...data,
      [key]: value,
    });
  }

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors: ErrorRecord<T> = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value, data)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }
      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  const refreshError = () => {
    setErrors({})
  }

  return {
    data,
    onInputChangeField,
    submitForm,
    setValueChange,
    errors,
    refreshError
 };
};