// useTicketForm.tsx - Fixed version
import { TicketFormData } from '@/types';
import { useForm } from '@inertiajs/react';
import { ChangeEvent, FocusEvent, useRef, useState } from 'react';
import { useFormValidation, ValidationRules } from './use-formValidation';

export const useTicketForm = () => {
    const {
        data: formData,
        setData: setFormData,
        errors: serverErrors,
        post,
        put,
        processing,
    } = useForm<TicketFormData & { imagePreview?: string }>({
        title: '',
        artist: '',
        date: '',
        time: '',
        venue: '',
        price: '',
        description: '',
        image: '',
    });

    // Define ticket form validation rules
    const validationRules: ValidationRules = {
        title: (value: string) => {
            if (!value.trim()) return 'Judul konser wajib diisi';
            if (value.length > 255) return 'Judul konser maksimal 255 karakter';
            return '';
        },
        artist: (value: string) => {
            if (!value.trim()) return 'Nama artis wajib diisi';
            if (value.length > 255) return 'Nama artis maksimal 255 karakter';
            return '';
        },
        venue: (value: string) => {
            if (!value.trim()) return 'Lokasi venue wajib diisi';
            if (value.length > 255) return 'Lokasi venue maksimal 255 karakter';
            return '';
        },
        date: (value: string) => {
            if (!value.trim()) return 'Tanggal konser wajib diisi';
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(value) || isNaN(Date.parse(value))) return 'Format tanggal tidak valid';
            return '';
        },
        time: (value: string) => {
            if (!value.trim()) return 'Jam konser wajib diisi';
            return '';
        },
        price: (value: string) => {
            if (!value.trim()) return 'Harga tiket wajib diisi';
            if (isNaN(Number(value))) return 'Harga tiket harus berupa angka';
            if (Number(value) <= 0) return 'Harga tiket harus lebih dari 0';
            return '';
        },
        description: (value: string) => {
            if (!value.trim()) return 'Deskripsi konser wajib diisi';
            return '';
        },
    };

    // Use our custom validation hook
    const validation = useFormValidation(formData, validationRules);

    const [imagePreview, setImagePreview] = useState<string>('');

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // New function to validate all fields for initial data
    const validateInitialData = (data: Partial<TicketFormData>) => {
        const fieldsToUpdate = Object.keys(data) as Array<keyof TicketFormData>;

        // Mark all fields as touched and validate them
        const newFieldStatus = { ...validation.fieldStatus };
        const newErrors = { ...validation.errors };

        fieldsToUpdate.forEach((field) => {
            const value = data[field];
            // Check if value is defined and field has validation rules
            if (value !== undefined && value !== null && field in validationRules) {
                // Mark the field as touched
                newFieldStatus[field] = {
                    ...newFieldStatus[field],
                    touched: true,
                };

                // Validate the field - safely convert to string
                const errorMessage = validationRules[field](String(value));
                if (errorMessage) {
                    newErrors[field] = errorMessage;
                    newFieldStatus[field].isValid = false;
                } else {
                    // Remove any existing error
                    delete newErrors[field];
                    newFieldStatus[field].isValid = true;
                }
            }
        });

        // Update validation state
        validation.setFieldStatus(newFieldStatus);
        validation.setErrors(newErrors);

        // Update validation data safely
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                validation.setData(key as keyof TicketFormData, String(value));
            } else {
                // Handle null or undefined values - set as empty string
                validation.setData(key as keyof TicketFormData, '');
            }
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(name as keyof typeof formData, value);
        validation.handleChange(e);
    };

    // Fixed type to match FocusEvent explicitly
    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        validation.handleBlur(e);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        validation.setFieldStatus((prev) => ({
            ...prev,
            image: { ...prev.image, touched: true },
        }));

        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                validation.setErrors((prev) => ({
                    ...prev,
                    image: 'Ukuran file tidak boleh melebihi 5MB',
                }));
                validation.setFieldStatus((prev) => ({
                    ...prev,
                    image: { ...prev.image, isValid: false },
                }));
                return;
            }

            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp'];

            if (!validImageTypes.includes(file.type)) {
                validation.setErrors((prev) => ({
                    ...prev,
                    image: 'File harus berupa gambar (JPG, PNG, GIF, WEBP, SVG, BMP)',
                }));
                validation.setFieldStatus((prev) => ({
                    ...prev,
                    image: { ...prev.image, isValid: false },
                }));
                return;
            }

            validation.setErrors((prev) => {
                const updated = { ...prev };
                delete updated.image;
                return updated;
            });

            validation.setFieldStatus((prev) => ({
                ...prev,
                image: { ...prev.image, isValid: true },
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                setFormData('imagePreview', base64String);
                validation.setData('image', file.name); // Update validation data for image
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (url = route('create-ticket'), method = 'post') => {
        if (!validation.validateForm()) {
            const firstErrorElement = document.querySelector('[aria-invalid="true"]');
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        const submitOptions = {
            preserveScroll: true,
            preserveState: true,
            onError: (errors: Record<string, string>) => {
                Object.keys(errors).forEach((key) => {
                    validation.setFieldStatus((prev) => ({
                        ...prev,
                        [key]: { ...prev[key], isValid: false, touched: true },
                    }));
                });
                validation.setErrors((prev) => ({ ...prev, ...errors }));
            },
        };

        if (method === 'post') {
            post(url, submitOptions);
        } else if (method === 'put') {
            put(url, submitOptions);
        }
    };

    const combinedErrors = { ...validation.errors, ...serverErrors } as Record<string, string>;

    return {
        formData,
        setFormData: (data: Partial<TicketFormData>) => {
            // First, update the form data
            Object.entries(data).forEach(([key, value]) => {
                // Handle null values by converting them to empty strings
                const safeValue = value === null || value === undefined ? '' : value;
                setFormData(key as keyof TicketFormData, safeValue);
            });

            // Then validate all fields
            validateInitialData(data);
        },
        errors: combinedErrors,
        fieldStatus: validation.fieldStatus,
        processing,
        imagePreview,
        setImagePreview,
        fileInputRef,
        handleChange,
        handleBlur,
        handleImageChange,
        handleSubmit,
        // Export the validateInitialData function for direct use in components
        validateInitialData,
    };
};
