import { XCircle } from 'lucide-react';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    selectedTicketToDelete: number | null;
    selectedTickets: number[];
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteConfirmationModal({
    isOpen,
    selectedTicketToDelete,
    selectedTickets,
    onClose,
    onConfirm,
}: DeleteConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm">
            <div className="animate-fadeIn w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all">
                <div className="flex items-start gap-3">
                    <div className="mt-1">
                        <XCircle className="h-8 w-8 text-red-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">Confirm Deletion</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            {selectedTicketToDelete
                                ? 'Are you sure you want to delete this ticket? This action cannot be undone.'
                                : `Are you sure you want to delete ${selectedTickets.length} selected tickets? This action cannot be undone.`}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
