// useFormValidation.tsx
import { ChangeEvent, FocusEvent, useState } from 'react';

export interface FieldStatus {
    isValid: boolean;
    touched: boolean;
}

export type ValidatorFunction = (value: string) => string;

export interface ValidationRules {
    [key: string]: ValidatorFunction;
}

export const useFormValidation = <T extends Record<string, unknown>>(initialData: T, validationRules: ValidationRules) => {
    const [data, setData] = useState<T>(initialData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [fieldStatus, setFieldStatus] = useState<Record<string, FieldStatus>>(
        Object.keys(initialData).reduce(
            (acc, key) => {
                return {
                    ...acc,
                    [key]: { isValid: false, touched: false },
                };
            },
            {} as Record<string, FieldStatus>,
        ),
    );

    const validateField = (name: string, value: string): string => {
        if (!validationRules[name]) return '';
        return validationRules[name](value);
    };

    // Changed to accept both ChangeEvent and FocusEvent with a generic type
    const handleInputEvent = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));

        // If this is a blur event, mark the field as touched
        if (e.type === 'blur') {
            setFieldStatus((prev) => ({
                ...prev,
                [name]: { ...(prev[name] || { isValid: false, touched: false }), touched: true },
            }));
        }

        const error = validateField(name, value);
        if (error) {
            setErrors((prev) => ({ ...prev, [name]: error }));
            setFieldStatus((prev) => ({
                ...prev,
                [name]: { ...(prev[name] || { isValid: false, touched: false }), isValid: false },
            }));
        } else {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
            setFieldStatus((prev) => ({
                ...prev,
                [name]: { ...(prev[name] || { isValid: false, touched: false }), isValid: true },
            }));
        }

        return value;
    };

    // Separate methods for API consistency, but they both call the same function
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputEvent(e);
    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputEvent(e);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        let isFormValid = true;

        Object.keys(data).forEach((key) => {
            const value = String(data[key] || '');
            const error = validateField(key, value);

            if (error) {
                newErrors[key] = error;
                isFormValid = false;
                setFieldStatus((prev) => ({
                    ...prev,
                    [key]: {
                        ...(prev[key] || { isValid: false, touched: false }),
                        isValid: false,
                        touched: true,
                    },
                }));
            } else {
                setFieldStatus((prev) => ({
                    ...prev,
                    [key]: {
                        ...(prev[key] || { isValid: false, touched: false }),
                        isValid: true,
                        touched: true,
                    },
                }));
            }
        });

        setErrors(newErrors);
        return isFormValid;
    };

    const setCustomData = (name: keyof T, value: unknown) => {
        setData((prev) => ({ ...prev, [name]: value }));

        // Validate if there's a validation rule
        if (validationRules[name as string]) {
            const error = validateField(name as string, String(value || ''));
            if (error) {
                setErrors((prev) => ({ ...prev, [name as string]: error }));
                setFieldStatus((prev) => ({
                    ...prev,
                    [name as string]: { ...(prev[name as string] || { isValid: false, touched: false }), isValid: false },
                }));
            } else {
                setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[name as string];
                    return newErrors;
                });
                setFieldStatus((prev) => ({
                    ...prev,
                    [name as string]: { ...(prev[name as string] || { isValid: false, touched: false }), isValid: true },
                }));
            }
        }
    };

    return {
        data,
        setData: setCustomData,
        errors,
        setErrors,
        fieldStatus,
        setFieldStatus,
        validateField,
        handleChange,
        handleBlur,
        validateForm,
    };
};
