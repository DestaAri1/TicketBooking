// useTicketForm.tsx
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
        image: (value: string) => {
            if (!imagePreview && !value) return 'Poster konser wajib diunggah';
            return '';
        },
    };

    // Use our custom validation hook
    const validation = useFormValidation(formData, validationRules);

    const [imagePreview, setImagePreview] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

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

            setImageFile(file);
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

    const handleSubmit = () => {
        if (!validation.validateForm()) {
            const firstErrorElement = document.querySelector('[aria-invalid="true"]');
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        post(route('create-ticket'), {
            preserveScroll: true,
            preserveState: true,
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    validation.setFieldStatus((prev) => ({
                        ...prev,
                        [key]: { ...prev[key], isValid: false, touched: true },
                    }));
                });
                validation.setErrors((prev) => ({ ...prev, ...errors }));
            },
        });
    };

    const combinedErrors = { ...validation.errors, ...serverErrors } as Record<string, string>;

    return {
        formData,
        errors: combinedErrors,
        fieldStatus: validation.fieldStatus,
        processing,
        imagePreview,
        fileInputRef,
        handleChange,
        handleBlur,
        handleImageChange,
        handleSubmit,
    };
};
