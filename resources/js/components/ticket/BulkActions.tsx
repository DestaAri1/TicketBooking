import { CheckCircle, Trash2 } from 'lucide-react';

interface BulkActionsProps {
    selectedTickets: number[];
    onDelete: () => void;
}

export default function BulkActions({ selectedTickets, onDelete }: BulkActionsProps) {
    if (selectedTickets.length === 0) return null;

    return (
        <div className="mb-4 flex items-center justify-between rounded-md bg-gray-50 p-3">
            <span className="text-sm font-medium text-gray-700">
                {selectedTickets.length} {selectedTickets.length === 1 ? 'ticket' : 'tickets'} selected
            </span>
            <div className="flex space-x-2">
                <button
                    onClick={onDelete}
                    className="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete Selected
                </button>
                <button className="inline-flex items-center rounded-md bg-gray-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-700">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Change Status
                </button>
            </div>
        </div>
    );
}
