// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import BulkActions from '@/components/ticket/BulkActions';
import DeleteConfirmationModal from '@/components/ticket/DeleteTicketModal';
import TicketActions from '@/components/ticket/TicketActions';
import TicketFilters from '@/components/ticket/TicketFilter';
import TicketTable from '@/components/ticket/TicketTable';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Ticket as Tickets } from '@/types';
import { Head } from '@inertiajs/react';
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

    // Filter tickets
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ticket Management" />
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                selectedTicketToDelete={selectedTicketToDelete}
                selectedTickets={selectedTickets}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedTicketToDelete(null);
                }}
                onConfirm={() => {
                    console.log('Deleting ticket(s):', selectedTicketToDelete ? [selectedTicketToDelete] : selectedTickets);
                    setSelectedTickets(selectedTicketToDelete ? selectedTickets.filter((id) => id !== selectedTicketToDelete) : []);
                    setIsDeleteModalOpen(false);
                    setSelectedTicketToDelete(null);
                }}
            />
            <div className="mx-4 my-3 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <TicketFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
                <TicketActions />
            </div>
            <BulkActions selectedTickets={selectedTickets} onDelete={() => setIsDeleteModalOpen(true)} />
            <TicketTable
                tickets={sortedTickets}
                selectedTickets={selectedTickets}
                toggleSelectAll={toggleSelectAll}
                toggleSelectTicket={toggleSelectTicket}
                onDelete={(id) => {
                    setSelectedTicketToDelete(id);
                    setIsDeleteModalOpen(true);
                }}
                searchQuery={searchQuery}
            />
        </AppLayout>
    );
}
