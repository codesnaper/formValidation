import { FormValidation, Validations } from "../model";
export declare const useFormValidation: <T extends Record<keyof T, any> = {}>(options?: {
    validations?: Partial<Record<keyof T, import("../model").Validation<T>>>;
    initialValues?: Partial<T>;
    onSubmit?: () => void;
}) => FormValidation<T>;
