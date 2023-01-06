"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormValidation = void 0;
const react_1 = require("react");
const useFormValidation = (options) => {
    const [data, setData] = (0, react_1.useState)(((options === null || options === void 0 ? void 0 : options.initialValues) || {}));
    const [errors, setErrors] = (0, react_1.useState)({});
    const onInputChangeField = (key, sanitizeFn) => (e) => {
        window.alert(e.target.type);
        if (e.target.type === 'checkbox') {
            setData(Object.assign(Object.assign({}, data), { [key]: e.target.checked }));
        }
        else if (e.target.type === 'file') {
            setData(Object.assign(Object.assign({}, data), { [key]: e.target.files }));
        }
        else {
            const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
            setData(Object.assign(Object.assign({}, data), { [key]: value }));
        }
    };
    const setValueChange = (key, value) => {
        setData(Object.assign(Object.assign({}, data), { [key]: value }));
    };
    const submitForm = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        e.preventDefault();
        const validations = options === null || options === void 0 ? void 0 : options.validations;
        if (validations) {
            let valid = true;
            const newErrors = {};
            for (const key in validations) {
                const value = data[key];
                const validation = validations[key];
                if (((_a = validation === null || validation === void 0 ? void 0 : validation.required) === null || _a === void 0 ? void 0 : _a.value) && !value) {
                    valid = false;
                    newErrors[key] = (_b = validation === null || validation === void 0 ? void 0 : validation.required) === null || _b === void 0 ? void 0 : _b.message;
                }
                const pattern = validation === null || validation === void 0 ? void 0 : validation.pattern;
                if ((pattern === null || pattern === void 0 ? void 0 : pattern.value) && !RegExp(pattern.value).test(value)) {
                    valid = false;
                    newErrors[key] = pattern.message;
                }
                const custom = validation === null || validation === void 0 ? void 0 : validation.custom;
                if ((custom === null || custom === void 0 ? void 0 : custom.isValid) && !custom.isValid(value, data)) {
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
        if (options === null || options === void 0 ? void 0 : options.onSubmit) {
            options.onSubmit();
        }
    });
    const refreshError = () => {
        setErrors({});
    };
    return {
        data,
        onInputChangeField,
        submitForm,
        setValueChange,
        errors,
        refreshError
    };
};
exports.useFormValidation = useFormValidation;
