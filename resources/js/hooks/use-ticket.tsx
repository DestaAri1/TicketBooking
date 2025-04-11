// hooks/useTicketForm.ts
import { TicketFormData } from '@/types';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';

export const useTicketForm = () => {
    const [formData, setFormData] = useState<TicketFormData>({
        title: '',
        artist: '',
        date: '',
        time: '',
        venue: '',
        price: '',
        description: '',
    });

    const [imagePreview, setImagePreview] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted', formData);
        // Here you would add the API call to submit the ticket data
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
