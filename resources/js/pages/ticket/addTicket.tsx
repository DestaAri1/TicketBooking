// TicketForm.tsx
import { TicketFormInputs } from '@/components/ticket/ticket-input';
import { Input } from '@/components/ui/input';
import { useTicketForm } from '@/hooks/use-ticket';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Image as ImageIcon, Music } from 'lucide-react';
import { JSX } from 'react';

export interface TicketFormData {
    title: string;
    artist: string;
    date: string;
    time: string;
    venue: string;
    price: string;
    description: string;
    image:string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ticket',
        href: route('ticket'),
    },
    {
        title: 'Add Ticket',
        href: route('add-ticket'),
    },
];

export default function AddTicket(): JSX.Element {
    const { formData, imagePreview, fileInputRef, handleChange, handleImageChange, handleSubmit } = useTicketForm();


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Ticket" />

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Card */}

                {/* Content Card */}
                <div className="rounded-lg bg-white p-4 transition-all duration-300 sm:p-6 md:p-8">
                    <div className="w-full">
                        {/* Main Form Content */}
                        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
                            <TicketFormInputs formData={formData} handleChange={handleChange} />

                            {/* Right Column - Image Upload */}
                            <div className="mt-6 lg:mt-0">
                                <label className="mb-1 flex items-center text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                                    <ImageIcon className="mr-1 h-3 w-3 flex-shrink-0 text-purple-600 sm:mr-2 sm:h-4 sm:w-4" />
                                    Poster Konser
                                </label>

                                <div
                                    className={`border-2 ${imagePreview ? 'border-purple-400' : 'border-dashed border-gray-300'} cursor-pointer rounded-lg p-3 text-center transition-all duration-300 hover:border-purple-500 sm:p-4`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {!imagePreview ? (
                                        <div className="space-y-2 py-4 sm:py-8">
                                            <div className="mx-auto flex h-16 w-16 transform items-center justify-center rounded-full bg-purple-100 transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20">
                                                <ImageIcon className="h-8 w-8 text-purple-500 sm:h-10 sm:w-10" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-700 sm:text-base">Klik untuk mengunggah gambar</p>
                                            <p className="text-xs text-gray-500 sm:text-sm">JPG, PNG atau GIF (Maks. 5MB)</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2 py-2 sm:space-y-3">
                                            <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-lg shadow-md">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="h-full w-full object-cover transition-all duration-300"
                                                />
                                            </div>
                                            <p className="text-xs font-medium text-purple-600 transition-colors duration-300 hover:text-purple-800 sm:text-sm">
                                                Klik untuk mengubah gambar
                                            </p>
                                        </div>
                                    )}

                                    <Input ref={fileInputRef} type="file" accept="image/*" name="image" className="hidden" onChange={handleImageChange} />
                                </div>

                                {/* Ticket Preview Card */}
                                {imagePreview && (
                                    <div className="mt-4 sm:mt-6">
                                        <div className="rounded-lg border border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 p-3 transition-all duration-300 sm:p-4">
                                            <h3 className="mb-2 flex items-center text-sm font-medium text-purple-800 sm:mb-3 sm:text-base">
                                                <Music className="mr-1 h-3 w-3 flex-shrink-0 sm:mr-2 sm:h-4 sm:w-4" />
                                                Preview Tiket
                                            </h3>

                                            <div className="relative overflow-hidden rounded-lg bg-white p-3 shadow-md transition-all duration-300 sm:p-4">
                                                {/* Decorative Element */}
                                                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-24 w-24 rounded-full bg-purple-100 opacity-50 sm:h-32 sm:w-32"></div>

                                                <div className="relative z-10">
                                                    <div className="mb-3 flex items-center space-x-3 sm:mb-4 sm:space-x-4">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md transition-all duration-300 sm:h-14 sm:w-14">
                                                            <Music className="h-6 w-6 text-white sm:h-8 sm:w-8" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-base font-bold tracking-tight text-gray-900 sm:text-lg">
                                                                {formData.title || 'Nama Konser'}
                                                            </h3>
                                                            <p className="text-sm text-purple-600 sm:text-base">{formData.artist || 'Nama Artis'}</p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-2 text-xs sm:gap-3 sm:text-sm">
                                                        <div className="rounded bg-gray-50 p-1.5 transition-all duration-300 sm:p-2">
                                                            <span className="text-2xs block text-gray-500 sm:text-xs">Tanggal:</span>
                                                            <p className="truncate font-medium">{formData.date || '--/--/----'}</p>
                                                        </div>
                                                        <div className="rounded bg-gray-50 p-1.5 transition-all duration-300 sm:p-2">
                                                            <span className="text-2xs block text-gray-500 sm:text-xs">Jam:</span>
                                                            <p className="truncate font-medium">{formData.time || '--:--'}</p>
                                                        </div>
                                                        <div className="rounded bg-gray-50 p-1.5 transition-all duration-300 sm:p-2">
                                                            <span className="text-2xs block text-gray-500 sm:text-xs">Lokasi:</span>
                                                            <p className="truncate font-medium">{formData.venue || 'Venue'}</p>
                                                        </div>
                                                        <div className="rounded bg-gray-50 p-1.5 transition-all duration-300 sm:p-2">
                                                            <span className="text-2xs block text-gray-500 sm:text-xs">Harga:</span>
                                                            <p className="truncate font-medium">
                                                                {formData.price ? `Rp ${parseInt(formData.price).toLocaleString('id-ID')}` : 'Rp 0'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="mt-6 flex flex-col justify-end gap-2 sm:mt-8 sm:flex-row sm:gap-3">
                            <button
                                type="button"
                                className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-200 sm:w-auto sm:px-6 sm:py-2.5"
                                onClick={() => window.history.back()}
                            >
                                Kembali
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-purple-700 sm:w-auto sm:px-6 sm:py-2.5"
                            >
                                Simpan Tiket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
