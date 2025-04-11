// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Ticket as Tickets } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AlertCircle, Calendar, CheckCircle, ChevronDown, CirclePlus, Clock, Download, Edit, Eye, Filter, MapPin, Music, Search, Trash2, XCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ticket',
        href: '/dashboard/ticket',
    },
];

const sampleTickets: Tickets[] = [
    {
        id: 1,
        title: 'Summer Music Festival',
        artist: 'Various Artists',
        date: '20 Jun 2025',
        time: '16:00',
        venue: 'Grand Park Arena',
        price: 850000,
        status: 'active',
        sales: 2145,
        imageUrl: '/api/placeholder/600/800',
        createdAt: '2025-03-15',
    },
    {
        id: 2,
        title: 'Rock Sensation Concert',
        artist: 'The Amplifiers',
        date: '15 Jul 2025',
        time: '19:30',
        venue: 'Echo Stadium',
        price: 750000,
        status: 'active',
        sales: 1832,
        imageUrl: '/api/placeholder/600/800',
        createdAt: '2025-03-18',
    },
    {
        id: 3,
        title: 'Classical Symphony Night',
        artist: 'Metropolitan Orchestra',
        date: '5 Aug 2025',
        time: '20:00',
        venue: 'Royal Concert Hall',
        price: 1200000,
        status: 'sold_out',
        sales: 3500,
        imageUrl: '/api/placeholder/600/800',
        createdAt: '2025-03-20',
    },
    {
        id: 4,
        title: 'Jazz & Blues Evening',
        artist: 'Smooth Tones Quartet',
        date: '25 Aug 2025',
        time: '21:00',
        venue: 'Blue Note Lounge',
        price: 550000,
        status: 'active',
        sales: 876,
        imageUrl: '/api/placeholder/600/800',
        createdAt: '2025-03-22',
    },
    {
        id: 5,
        title: 'Electronic Dance Experience',
        artist: 'DJ Pulse',
        date: '10 Sep 2025',
        time: '22:00',
        venue: 'Neon Club',
        price: 450000,
        status: 'canceled',
        sales: 0,
        imageUrl: '/api/placeholder/600/800',
        createdAt: '2025-03-25',
    },
    {
        id: 6,
        title: 'Indie Folk Collective',
        artist: 'Woodland Echoes',
        date: '28 Sep 2025',
        time: '18:30',
        venue: 'Garden Amphitheater',
        price: 350000,
        status: 'draft',
        sales: 0,
        imageUrl: '/api/placeholder/600/800',
        createdAt: '2025-03-28',
    },
];

export default function Ticket() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedTicketToDelete, setSelectedTicketToDelete] = useState<number | null>(null);

    // Filter tickets based on search and status
    const filteredTickets = sampleTickets.filter((ticket) => {
        const matchesSearch =
            ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.venue.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Sort tickets
    const sortedTickets = [...filteredTickets].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'oldest':
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case 'price_high':
                return b.price - a.price;
            case 'price_low':
                return a.price - b.price;
            case 'sales_high':
                return b.sales - a.sales;
            case 'sales_low':
                return a.sales - b.sales;
            default:
                return 0;
        }
    });

    // Toggle select all tickets
    const toggleSelectAll = () => {
        if (selectedTickets.length === sortedTickets.length) {
            setSelectedTickets([]);
        } else {
            setSelectedTickets(sortedTickets.map((ticket) => ticket.id));
        }
    };

    // Toggle select individual ticket
    const toggleSelectTicket = (id: number) => {
        if (selectedTickets.includes(id)) {
            setSelectedTickets(selectedTickets.filter((ticketId) => ticketId !== id));
        } else {
            setSelectedTickets([...selectedTickets, id]);
        }
    };

    // Status badge renderer
    const renderStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Active
                    </span>
                );
            case 'sold_out':
                return (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Sold Out
                    </span>
                );
            case 'canceled':
                return (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                        <XCircle className="mr-1 h-3 w-3" />
                        Canceled
                    </span>
                );
            case 'draft':
                return (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Draft
                    </span>
                );
            default:
                return null;
        }
    };

    // Delete confirmation modal
    const DeleteConfirmationModal = () => {
        if (!isDeleteModalOpen) return null;

        const handleClose = () => {
            setIsDeleteModalOpen(false);
            setSelectedTicketToDelete(null);
        };

        const handleConfirmDelete = () => {
            // In a real app, you would call an API to delete the ticket(s)
            console.log('Deleting ticket(s):', selectedTicketToDelete ? [selectedTicketToDelete] : selectedTickets);

            // Reset state
            setSelectedTickets(selectedTicketToDelete ? selectedTickets.filter((id) => id !== selectedTicketToDelete) : []);
            handleClose();
        };

        return (
            <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
                <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                    <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        {selectedTicketToDelete
                            ? 'Are you sure you want to delete this ticket? This action cannot be undone.'
                            : `Are you sure you want to delete ${selectedTickets.length} selected tickets? This action cannot be undone.`}
                    </p>
                    <div className="mt-4 flex justify-end space-x-3">
                        <button
                            onClick={handleClose}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ticket Management" />

            {/* DeleteConfirmationModal component */}
            <DeleteConfirmationModal />

            {/* Header section with admin actions */}
            <div className="mx-4 mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                {/* Filters and search */}
                <div className="mx-4 mb-6 grid gap-4 md:grid-cols-3 w-full items-center">
                    <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full rounded-md border-gray-300 pl-10 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                            placeholder="Search tickets..."
                        />
                    </div>

                    <div className="flex space-x-2">
                        <div className="relative inline-block w-full text-left">
                            <div>
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                                >
                                    <div className="flex items-center">
                                        <Filter className="mr-2 h-4 w-4 text-gray-500" />
                                        {statusFilter === 'all'
                                            ? 'All Statuses'
                                            : statusFilter === 'active'
                                              ? 'Active'
                                              : statusFilter === 'sold_out'
                                                ? 'Sold Out'
                                                : statusFilter === 'canceled'
                                                  ? 'Canceled'
                                                  : 'Draft'}
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                </button>
                            </div>

                            {/* Dropdown menu would go here in a real implementation */}
                            <div className="ring-opacity-5 absolute right-0 z-10 mt-2 hidden w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none">
                                <div className="py-1">
                                    <button
                                        onClick={() => setStatusFilter('all')}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        All Statuses
                                    </button>
                                    <button
                                        onClick={() => setStatusFilter('active')}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Active
                                    </button>
                                    <button
                                        onClick={() => setStatusFilter('sold_out')}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sold Out
                                    </button>
                                    <button
                                        onClick={() => setStatusFilter('canceled')}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Canceled
                                    </button>
                                    <button
                                        onClick={() => setStatusFilter('draft')}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Draft
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="relative inline-block w-full text-left">
                            <div>
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                                >
                                    <span>
                                        {sortBy === 'newest'
                                            ? 'Newest'
                                            : sortBy === 'oldest'
                                              ? 'Oldest'
                                              : sortBy === 'price_high'
                                                ? 'Price: High to Low'
                                                : sortBy === 'price_low'
                                                  ? 'Price: Low to High'
                                                  : sortBy === 'sales_high'
                                                    ? 'Sales: High to Low'
                                                    : 'Sales: Low to High'}
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                </button>
                            </div>

                            {/* Dropdown menu would go here in a real implementation */}
                            <div className="ring-opacity-5 absolute right-0 z-10 mt-2 hidden w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none">
                                <div className="py-1">
                                    <button
                                        onClick={() => setSortBy('newest')}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Newest
                                    </button>
                                    <button
                                        onClick={() => setSortBy('oldest')}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Oldest
                                    </button>
                                    <button
                                        onClick={() => setSortBy('price_high')}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Price: High to Low
                                    </button>
                                    <button
                                        onClick={() => setSortBy('price_low')}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Price: Low to High
                                    </button>
                                    <button
                                        onClick={() => setSortBy('sales_high')}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sales: High to Low
                                    </button>
                                    <button
                                        onClick={() => setSortBy('sales_low')}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sales: Low to High
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                    <Link
                        href="/dashboard/reports/tickets"
                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                        <Download className="mr-1.5 h-4 w-4" />
                        Export
                    </Link>

                    <Link
                        href="/dashboard/ticket/add-ticket"
                        className="inline-flex items-center justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700"
                    >
                        <CirclePlus className="mr-1.5 h-4 w-4" />
                        Add Ticket
                    </Link>
                </div>
            </div>

            {/* Bulk actions */}
            {selectedTickets.length > 0 && (
                <div className="mb-4 flex items-center justify-between rounded-md bg-gray-50 p-3">
                    <span className="text-sm font-medium text-gray-700">
                        {selectedTickets.length} {selectedTickets.length === 1 ? 'ticket' : 'tickets'} selected
                    </span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
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
            )}

            {/* Admin ticket table */}
            <div className="mx-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedTickets.length === sortedTickets.length && sortedTickets.length > 0}
                                            onChange={toggleSelectAll}
                                            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                        />
                                    </div>
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
                            {sortedTickets.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-sm text-gray-500">
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
                                    </td>
                                </tr>
                            ) : (
                                sortedTickets.map((ticket) => (
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
                                        <td className="px-3 py-4 text-sm whitespace-nowrap">{renderStatusBadge(ticket.status)}</td>
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
                                                    onClick={() => {
                                                        setSelectedTicketToDelete(ticket.id);
                                                        setIsDeleteModalOpen(true);
                                                    }}
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

                {/* Pagination */}
                {sortedTickets.length > 0 && (
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
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedTickets.length}</span> of{' '}
                                    <span className="font-medium">{filteredTickets.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <button className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Previous</span>
                                        <svg
                                            className="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
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
                                        <svg
                                            className="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
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
        </AppLayout>
    );
}
