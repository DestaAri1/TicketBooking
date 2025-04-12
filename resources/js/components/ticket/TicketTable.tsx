import { Ticket } from '@/types';
import { Link } from '@inertiajs/react';
import { Calendar, Clock, Edit, Eye, MapPin, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import EmptyState from './EmptyState';

interface TicketTableProps {
    tickets: Ticket[];
    selectedTickets: number[];
    toggleSelectAll: () => void;
    toggleSelectTicket: (id: number) => void;
    onDelete: (id: number) => void;
    searchQuery: string;
}

export default function TicketTable({ tickets, selectedTickets, toggleSelectAll, toggleSelectTicket, onDelete, searchQuery }: TicketTableProps) {
    return (
        <div className="mx-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                <input
                                    type="checkbox"
                                    checked={selectedTickets.length === tickets.length && tickets.length > 0}
                                    onChange={toggleSelectAll}
                                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                Event Details
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                Date & Time
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                Venue
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                Price & Sales
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                Status
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-right text-xs font-medium text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {tickets.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="py-8 text-center text-sm text-gray-500">
                                    <EmptyState searchQuery={searchQuery} />
                                </td>
                            </tr>
                        ) : (
                            tickets.map((ticket) => (
                                <tr key={ticket.id} className={selectedTickets.includes(ticket.id) ? 'bg-purple-50' : 'hover:bg-gray-50'}>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedTickets.includes(ticket.id)}
                                            onChange={() => toggleSelectTicket(ticket.id)}
                                            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                        />
                                    </td>
                                    <td className="px-3 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <img src={ticket.imageUrl} alt={ticket.title} className="h-10 w-10 rounded-md object-cover" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="font-medium text-gray-900">{ticket.title}</div>
                                                <div className="text-sm text-gray-500">{ticket.artist}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <Calendar className="mr-1 h-3 w-3 text-gray-400" />
                                                {ticket.date}
                                            </div>
                                            <div className="mt-1 flex items-center">
                                                <Clock className="mr-1 h-3 w-3 text-gray-400" />
                                                {ticket.time}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <MapPin className="mr-1 h-3 w-3 text-gray-400" />
                                            <span className="max-w-xs truncate">{ticket.venue}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap">
                                        <div className="font-medium text-gray-900">Rp {ticket.price.toLocaleString('id-ID')}</div>
                                        <div className="text-sm text-gray-500">{ticket.sales.toLocaleString()} tickets sold</div>
                                    </td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap">
                                        <StatusBadge status={ticket.status} />
                                    </td>
                                    <td className="px-3 py-4 text-right text-sm font-medium whitespace-nowrap">
                                        <div className="flex justify-end space-x-2">
                                            <Link
                                                href={`/dashboard/ticket/view/${ticket.id}`}
                                                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                                title="View"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                href={`/dashboard/ticket/edit/${ticket.id}`}
                                                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => onDelete(ticket.id)}
                                                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {tickets.length > 0 && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Previous
                        </button>
                        <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">{tickets.length}</span> of{' '}
                                <span className="font-medium">{tickets.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    1
                                </button>
                                <button className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
