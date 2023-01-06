import { ChangeEvent, FormEvent } from "react";
export type Validation<T> = {
    required?: {
        value: boolean;
        message: string;
    };
    pattern?: {
        value: string;
        message: string;
    };
    custom?: {
        isValid: (value: any, data: T) => boolean;
        message: string;
    };
};
export type Validations<T extends {}> = Partial<Record<keyof T, Validation<T>>>;
export type ErrorRecord<T> = Partial<Record<keyof T, string>>;
export type FormValidation<T> = {
    data: T;
    errors: ErrorRecord<T>;
    onInputChangeField: <S extends unknown>(key: keyof T, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void;
    submitForm: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    setValueChange: (key: keyof T, value: any) => void;
    refreshError: () => void;
};
