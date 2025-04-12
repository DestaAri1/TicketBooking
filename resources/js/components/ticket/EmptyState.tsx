import { Link } from '@inertiajs/react';
import { CirclePlus, Music } from 'lucide-react';

interface EmptyStateProps {
    searchQuery: string;
}

export default function EmptyState({ searchQuery }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center">
            <Music className="h-10 w-10 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets found</h3>
            <p className="mt-1 text-sm text-gray-500">
                {searchQuery ? 'Try adjusting your search or filters' : 'Get started by creating a new ticket'}
            </p>
            {!searchQuery && (
                <Link
                    href="/dashboard/ticket/add-ticket"
                    className="mt-3 inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700"
                >
                    <CirclePlus className="mr-1.5 h-4 w-4" />
                    Add Ticket
                </Link>
            )}
        </div>
    );
}
