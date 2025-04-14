// hooks/useTicketForm.ts
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
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        // Create FormData object for file upload
        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('artist', formData.artist);
        submitData.append('date', formData.date);
        submitData.append('time', formData.time);
        submitData.append('venue', formData.venue);
        submitData.append('price', formData.price);
        submitData.append('description', formData.description);

        // Append the image file if it exists
        if (imageFile) {
            submitData.append('image', imageFile);
        }

        // Log for debugging
        console.group('Ticket Form Submission');
        console.log('Form data:', formData);
        console.log('Image file:', imageFile);
        console.groupEnd();

        // Use Inertia.js to submit the form (with file)
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
