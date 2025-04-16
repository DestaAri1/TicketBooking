import { TicketFormData } from '@/types';
import { router } from '@inertiajs/react';
import { ChangeEvent, useRef, useState } from 'react';

export const useTicketForm = () => {
    const [formData, setFormData] = useState<TicketFormData>({
        title: '',
        artist: '',
        date: '',
        time: '',
        venue: '',
        price: '',
        description: '',
        image: '',
    });

    const [imagePreview, setImagePreview] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                // Also update formData with the base64 string
                setFormData((prev) => ({ ...prev, imagePreview: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        // Create data object for submission including the base64 image
        const submitData = {
            ...formData,
            imagePreview: imagePreview,
        };

        // Log for debugging
        console.group('Ticket Form Submission');
        console.log('Form data:', submitData);
        console.groupEnd();

        // Use Inertia.js to submit the form with the base64 image data
        router.post(route('create-ticket'), submitData);
    };

    return {
        formData,
        imagePreview,
        fileInputRef,
        handleChange,
        handleImageChange,
        handleSubmit,
    };
};
