// components/TicketFormInputs.tsx
import { Input } from '@/components/ui/input';
import { TicketFormData } from '@/types';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Calendar, Clock, CreditCard, FileText, MapPin, Music, User } from 'lucide-react';
import React, { ChangeEvent } from 'react';
import { Textarea } from '../ui/text-area';

interface TicketFormInputsProps {
    formData: TicketFormData;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const TicketFormInputs: React.FC<TicketFormInputsProps> = ({ formData, handleChange }) => {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div>
                <Label className="mb-1 flex items-center text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                    <Music className="mr-1 h-3 w-3 flex-shrink-0 text-purple-600 sm:mr-2 sm:h-4 sm:w-4" />
                    Nama Konser
                </Label>
                <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Contoh: Red Velvet World Tour 2025"
                    className="w-full border-gray-300 text-sm transition-all duration-300 focus-visible:border-purple-500 focus-visible:ring-purple-500/30 sm:text-base"
                    required
                />
            </div>

            <div>
                <Label className="mb-1 flex items-center text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                    <User className="mr-1 h-3 w-3 flex-shrink-0 text-purple-600 sm:mr-2 sm:h-4 sm:w-4" />
                    Artis/Penampil
                </Label>
                <Input
                    type="text"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    placeholder="Nama artis atau band"
                    className="w-full border-gray-300 text-sm transition-all duration-300 focus-visible:border-purple-500 focus-visible:ring-purple-500/30 sm:text-base"
                    required
                />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div>
                    <Label className="mb-1 flex items-center text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                        <Calendar className="mr-1 h-3 w-3 flex-shrink-0 text-purple-600 sm:mr-2 sm:h-4 sm:w-4" />
                        Tanggal
                    </Label>
                    <div className="relative">
                        <Input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full border-gray-300 text-sm transition-all duration-300 focus-visible:border-purple-500 focus-visible:ring-purple-500/30 sm:text-base"
                            required
                        />
                    </div>
                </div>

                <div>
                    <Label className="mb-1 flex items-center text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                        <Clock className="mr-1 h-3 w-3 flex-shrink-0 text-purple-600 sm:mr-2 sm:h-4 sm:w-4" />
                        Jam
                    </Label>
                    <div className="relative">
                        <Input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full border-gray-300 text-sm transition-all duration-300 focus-visible:border-purple-500 focus-visible:ring-purple-500/30 sm:text-base"
                            required
                        />
                    </div>
                </div>
            </div>

            <div>
                <Label className="mb-1 flex items-center text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                    <MapPin className="mr-1 h-3 w-3 flex-shrink-0 text-purple-600 sm:mr-2 sm:h-4 sm:w-4" />
                    Lokasi/Venue
                </Label>
                <Input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    placeholder="Contoh: Jakarta International Stadium"
                    className="w-full border-gray-300 text-sm transition-all duration-300 focus-visible:border-purple-500 focus-visible:ring-purple-500/30 sm:text-base"
                    required
                />
            </div>

            <div>
                <Label className="mb-1 flex items-center text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                    <CreditCard className="mr-1 h-3 w-3 flex-shrink-0 text-purple-600 sm:mr-2 sm:h-4 sm:w-4" />
                    Harga Tiket (Rp)
                </Label>
                <Input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Contoh: 500000"
                    className="w-full border-gray-300 text-sm transition-all duration-300 focus-visible:border-purple-500 focus-visible:ring-purple-500/30 sm:text-base"
                    required
                />
            </div>

            <div>
                <Label className="mb-1 flex items-center text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                    <FileText className="mr-1 h-3 w-3 flex-shrink-0 text-purple-600 sm:mr-2 sm:h-4 sm:w-4" />
                    Deskripsi
                </Label>
                <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Jelaskan detail acara konser"
                    className="w-full resize-none rounded-md border border-gray-300 p-2 text-sm transition-all duration-300 focus:border-purple-500 focus:ring-purple-500/30 sm:text-base"
                />
            </div>
        </div>
    );
};
