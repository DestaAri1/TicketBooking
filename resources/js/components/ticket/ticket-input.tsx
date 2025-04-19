import { Input } from '@/components/ui/input';
import { TicketFormData } from '@/types';
import { Check } from 'lucide-react';
import { ChangeEvent, FocusEvent } from 'react';

interface TicketFormInputsProps {
    formData: TicketFormData;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    errors: Record<string, string>;
    fieldStatus: Record<string, { isValid: boolean; touched: boolean }>;
}

export const TicketFormInputs = ({ formData, handleChange, handleBlur, errors, fieldStatus }: TicketFormInputsProps) => {
    // Helper untuk menentukan tampilan input
    const getInputClassName = (fieldName: string) => {
        const status = fieldStatus[fieldName];
        const hasError = errors[fieldName] && status?.touched;
        const isValid = status?.isValid && status?.touched;

        const baseClasses = 'w-full rounded-md border px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2';

        if (hasError) {
            return `${baseClasses} border-red-300 bg-red-50 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-200`;
        } else if (isValid) {
            return `${baseClasses} border-green-300 bg-green-50 text-green-900 placeholder-green-300 focus:border-green-500 focus:ring-green-200`;
        } else {
            return `${baseClasses} border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-200`;
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Title */}
            <div className="relative">
                <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
                    Judul Konser
                </label>
                <div className="relative">
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Masukkan judul konser"
                        className={getInputClassName('title')}
                        aria-invalid={errors.title ? 'true' : 'false'}
                    />
                    {fieldStatus.title.isValid && fieldStatus.title.touched && (
                        <div className="absolute top-1/2 right-2 -translate-y-1/2">
                            <Check className="h-5 w-5 text-green-500" />
                        </div>
                    )}
                </div>
                {errors.title && fieldStatus.title.touched && <p className="mt-1 text-xs font-medium text-red-600">{errors.title}</p>}
            </div>

            {/* Artist */}
            <div className="relative">
                <label htmlFor="artist" className="mb-1 block text-sm font-medium text-gray-700">
                    Nama Artis
                </label>
                <div className="relative">
                    <Input
                        id="artist"
                        name="artist"
                        type="text"
                        value={formData.artist}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Masukkan nama artis"
                        className={getInputClassName('artist')}
                        aria-invalid={errors.artist ? 'true' : 'false'}
                    />
                    {fieldStatus.artist.isValid && fieldStatus.artist.touched && (
                        <div className="absolute top-1/2 right-2 -translate-y-1/2">
                            <Check className="h-5 w-5 text-green-500" />
                        </div>
                    )}
                </div>
                {errors.artist && fieldStatus.artist.touched && <p className="mt-1 text-xs font-medium text-red-600">{errors.artist}</p>}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Date */}
                <div className="relative">
                    <label htmlFor="date" className="mb-1 block text-sm font-medium text-gray-700">
                        Tanggal
                    </label>
                    <div className="relative">
                        <Input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={getInputClassName('date')}
                            aria-invalid={errors.date ? 'true' : 'false'}
                        />
                        {fieldStatus.date.isValid && fieldStatus.date.touched && (
                            <div className="absolute top-1/2 right-2 -translate-y-1/2">
                                <Check className="h-5 w-5 text-green-500" />
                            </div>
                        )}
                    </div>
                    {errors.date && fieldStatus.date.touched && <p className="mt-1 text-xs font-medium text-red-600">{errors.date}</p>}
                </div>

                {/* Time */}
                <div className="relative">
                    <label htmlFor="time" className="mb-1 block text-sm font-medium text-gray-700">
                        Jam
                    </label>
                    <div className="relative">
                        <Input
                            id="time"
                            name="time"
                            type="time"
                            value={formData.time}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={getInputClassName('time')}
                            aria-invalid={errors.time ? 'true' : 'false'}
                        />
                        {fieldStatus.time.isValid && fieldStatus.time.touched && (
                            <div className="absolute top-1/2 right-2 -translate-y-1/2">
                                <Check className="h-5 w-5 text-green-500" />
                            </div>
                        )}
                    </div>
                    {errors.time && fieldStatus.time.touched && <p className="mt-1 text-xs font-medium text-red-600">{errors.time}</p>}
                </div>
            </div>

            {/* Venue */}
            <div className="relative">
                <label htmlFor="venue" className="mb-1 block text-sm font-medium text-gray-700">
                    Lokasi Venue
                </label>
                <div className="relative">
                    <Input
                        id="venue"
                        name="venue"
                        type="text"
                        value={formData.venue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Masukkan lokasi venue"
                        className={getInputClassName('venue')}
                        aria-invalid={errors.venue ? 'true' : 'false'}
                    />
                    {fieldStatus.venue.isValid && fieldStatus.venue.touched && (
                        <div className="absolute top-1/2 right-2 -translate-y-1/2">
                            <Check className="h-5 w-5 text-green-500" />
                        </div>
                    )}
                </div>
                {errors.venue && fieldStatus.venue.touched && <p className="mt-1 text-xs font-medium text-red-600">{errors.venue}</p>}
            </div>

            {/* Price */}
            <div className="relative">
                <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
                    Harga Tiket (Rp)
                </label>
                <div className="relative">
                    <Input
                        id="price"
                        name="price"
                        type="text"
                        value={formData.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Masukkan harga tiket"
                        className={getInputClassName('price')}
                        aria-invalid={errors.price ? 'true' : 'false'}
                    />
                    {fieldStatus.price.isValid && fieldStatus.price.touched && (
                        <div className="absolute top-1/2 right-2 -translate-y-1/2">
                            <Check className="h-5 w-5 text-green-500" />
                        </div>
                    )}
                </div>
                {errors.price && fieldStatus.price.touched && <p className="mt-1 text-xs font-medium text-red-600">{errors.price}</p>}
            </div>

            {/* Description */}
            <div className="relative">
                <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                    Deskripsi Konser
                </label>
                <div className="relative">
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Masukkan deskripsi konser"
                        rows={4}
                        className={`${getInputClassName('description')} resize-none`}
                        aria-invalid={errors.description ? 'true' : 'false'}
                    />
                    {fieldStatus.description.isValid && fieldStatus.description.touched && (
                        <div className="absolute top-5 right-2">
                            <Check className="h-5 w-5 text-green-500" />
                        </div>
                    )}
                </div>
                {errors.description && fieldStatus.description.touched && (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.description}</p>
                )}
            </div>
        </div>
    );
};
