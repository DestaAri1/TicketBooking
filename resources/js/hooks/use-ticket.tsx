import { TicketFormData } from '@/types';
import { useForm } from '@inertiajs/react';
import { ChangeEvent, FocusEvent, useRef, useState } from 'react';

// Menambahkan interface untuk status validasi field
interface FieldStatus {
    isValid: boolean;
    touched: boolean;
}

export const useTicketForm = () => {
    const {
        data,
        setData,
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

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [fieldStatus, setFieldStatus] = useState<Record<string, FieldStatus>>({
        title: { isValid: false, touched: false },
        artist: { isValid: false, touched: false },
        date: { isValid: false, touched: false },
        time: { isValid: false, touched: false },
        venue: { isValid: false, touched: false },
        price: { isValid: false, touched: false },
        description: { isValid: false, touched: false },
        image: { isValid: false, touched: false },
    });

    const [imagePreview, setImagePreview] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'title': {
                if (!value.trim()) return 'Judul konser wajib diisi';
                if (value.length > 255) return 'Judul konser maksimal 255 karakter';
                return '';
            }
            case 'artist': {
                if (!value.trim()) return 'Nama artis wajib diisi';
                if (value.length > 255) return 'Nama artis maksimal 255 karakter';
                return '';
            }
            case 'venue': {
                if (!value.trim()) return 'Lokasi venue wajib diisi';
                if (value.length > 255) return 'Lokasi venue maksimal 255 karakter';
                return '';
            }
            case 'date': {
                if (!value.trim()) return 'Tanggal konser wajib diisi';
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateRegex.test(value) || isNaN(Date.parse(value))) return 'Format tanggal tidak valid';
                return '';
            }
            case 'time': {
                if (!value.trim()) return 'Jam konser wajib diisi';
                return '';
            }
            case 'price': {
                if (!value.trim()) return 'Harga tiket wajib diisi';
                if (isNaN(Number(value))) return 'Harga tiket harus berupa angka';
                if (Number(value) <= 0) return 'Harga tiket harus lebih dari 0';
                return '';
            }
            case 'description': {
                if (!value.trim()) return 'Deskripsi konser wajib diisi';
                return '';
            }
            case 'image': {
                if (!imagePreview && !value) return 'Poster konser wajib diunggah';
                return '';
            }
            default:
                return '';
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);

        const error = validateField(name, value);
        if (error) {
            setErrors((prev) => ({ ...prev, [name]: error }));
            setFieldStatus((prev) => ({
                ...prev,
                [name]: { ...prev[name], isValid: false },
            }));
        } else {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
            setFieldStatus((prev) => ({
                ...prev,
                [name]: { ...prev[name], isValid: true },
            }));
        }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFieldStatus((prev) => ({
            ...prev,
            [name]: { ...prev[name], touched: true },
        }));

        const error = validateField(name, value);
        if (error) {
            setErrors((prev) => ({ ...prev, [name]: error }));
            setFieldStatus((prev) => ({
                ...prev,
                [name]: { ...prev[name], isValid: false },
            }));
        } else {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
            setFieldStatus((prev) => ({
                ...prev,
                [name]: { ...prev[name], isValid: true },
            }));
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        setFieldStatus((prev) => ({
            ...prev,
            image: { ...prev.image, touched: true },
        }));

        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors((prev) => ({
                    ...prev,
                    image: 'Ukuran file tidak boleh melebihi 5MB',
                }));
                setFieldStatus((prev) => ({
                    ...prev,
                    image: { ...prev.image, isValid: false },
                }));
                return;
            }

            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp'];

            if (!validImageTypes.includes(file.type)) {
                setErrors((prev) => ({
                    ...prev,
                    image: 'File harus berupa gambar (JPG, PNG, GIF, WEBP, SVG, BMP)',
                }));
                setFieldStatus((prev) => ({
                    ...prev,
                    image: { ...prev.image, isValid: false },
                }));
                return;
            }

            setErrors((prev) => {
                const updated = { ...prev };
                delete updated.image;
                return updated;
            });

            setFieldStatus((prev) => ({
                ...prev,
                image: { ...prev.image, isValid: true },
            }));

            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                setData('imagePreview', base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        let isFormValid = true;

        Object.keys(data).forEach((key) => {
            if (key !== 'imagePreview') {
                const fieldName = key as keyof TicketFormData;
                const value = data[fieldName];
                const error = validateField(fieldName as string, value as string);

                if (error) {
                    newErrors[fieldName as string] = error;
                    isFormValid = false;
                    setFieldStatus((prev) => ({
                        ...prev,
                        [fieldName as string]: {
                            ...prev[fieldName as string],
                            isValid: false,
                            touched: true,
                        },
                    }));
                } else {
                    setFieldStatus((prev) => ({
                        ...prev,
                        [fieldName as string]: {
                            ...prev[fieldName as string],
                            isValid: true,
                            touched: true,
                        },
                    }));
                }
            }
        });

        setErrors(newErrors);
        return isFormValid;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            const firstErrorElement = document.querySelector('[aria-invalid="true"]');
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        post(route('create-ticket'), {
            preserveScroll: true,
            preserveState: true,
            onError: (serverErrors) => {
                Object.keys(serverErrors).forEach((key) => {
                    setFieldStatus((prev) => ({
                        ...prev,
                        [key]: { ...prev[key], isValid: false, touched: true },
                    }));
                });
                setErrors((prev) => ({ ...prev, ...serverErrors }));
            },
        });
    };

    const combinedErrors = { ...errors, ...serverErrors } as Record<string, string>;

    return {
        formData: data,
        errors: combinedErrors,
        fieldStatus,
        processing,
        imagePreview,
        fileInputRef,
        handleChange,
        handleBlur,
        handleImageChange,
        handleSubmit,
    };
};
