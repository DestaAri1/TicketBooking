import { Link } from '@inertiajs/react';
import { CirclePlus, Download } from 'lucide-react';

export default function TicketActions() {
    return (
        <div className="flex gap-2">
            <Link
                href="/dashboard/reports/tickets"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
                <Download className="mr-1.5 h-4 w-4" />
                Export
            </Link>
            <Link
                href="/dashboard/ticket/add-ticket"
                className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700"
            >
                <CirclePlus className="mr-1.5 h-4 w-4" />
                Add Ticket
            </Link>
        </div>
    );
}
