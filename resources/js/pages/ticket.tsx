import BulkActions from '@/components/ticket/BulkActions';
import DeleteConfirmationModal from '@/components/ticket/DeleteTicketModal';
import TicketActions from '@/components/ticket/TicketActions';
import TicketFilters from '@/components/ticket/TicketFilter';
import TicketTable from '@/components/ticket/TicketTable';
import usePagination from '@/hooks/use-pagination';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Ticket as Tickets } from '@/types';
import { Head } from '@inertiajs/react';
import { JSX, useCallback, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ticket',
        href: '/dashboard/ticket',
    },
];


export default function Ticket(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedTicketToDelete, setSelectedTicketToDelete] = useState<number | null>(null);
    const itemsPerPage = 10;
    const { props } = usePage();
    const serverTickets = props.tickets as Tickets[];

    // Handle selection reset when page changes
    const handlePageChange = useCallback(() => {
        setSelectedTickets([]);
    }, []);

    // Filter tickets
    const filteredTickets = serverTickets.filter((ticket) => {
        const matchesSearch =
            ticket.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

    // Use the pagination hook
    const { currentPage, setCurrentPage, paginatedItems, resetPagination } = usePagination<Tickets>({
        totalItems: sortedTickets.length,
        itemsPerPage,
        onPageChange: handlePageChange,
    });

    // Get paginated tickets using the hook's helper function
    const paginatedTickets = paginatedItems(sortedTickets);

    // Reset to first page when filters change
    useEffect(() => {
        resetPagination();
    }, [searchQuery, statusFilter, sortBy, resetPagination]);

    // Toggle select all tickets (only for current page)
    const toggleSelectAll = (): void => {
        if (selectedTickets.length === paginatedTickets.length) {
            setSelectedTickets([]);
        } else {
            setSelectedTickets(paginatedTickets.map((ticket) => ticket.id));
        }
    };

    // Toggle select individual ticket
    const toggleSelectTicket = (id: number): void => {
        if (selectedTickets.includes(id)) {
            setSelectedTickets(selectedTickets.filter((ticketId) => ticketId !== id));
        } else {
            setSelectedTickets([...selectedTickets, id]);
        }
    };

    // Handle delete modal
    const handleCloseDeleteModal = useCallback((): void => {
        setIsDeleteModalOpen(false);
        setSelectedTicketToDelete(null);
    }, []);

    const handleConfirmDelete = useCallback((): void => {
        console.log('Deleting ticket(s):', selectedTicketToDelete ? [selectedTicketToDelete] : selectedTickets);
        setSelectedTickets(selectedTicketToDelete ? selectedTickets.filter((id) => id !== selectedTicketToDelete) : []);
        setIsDeleteModalOpen(false);
        setSelectedTicketToDelete(null);
    }, [selectedTicketToDelete, selectedTickets]);

    const handleOpenDeleteModal = useCallback((id?: number): void => {
        if (id !== undefined) {
            setSelectedTicketToDelete(id);
        }
        setIsDeleteModalOpen(true);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ticket Management" />
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                selectedTicketToDelete={selectedTicketToDelete}
                selectedTickets={selectedTickets}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
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
            <BulkActions selectedTickets={selectedTickets} onDelete={() => handleOpenDeleteModal()} />
            <TicketTable
                tickets={paginatedTickets}
                selectedTickets={selectedTickets}
                toggleSelectAll={toggleSelectAll}
                toggleSelectTicket={toggleSelectTicket}
                onDelete={(id: number) => handleOpenDeleteModal(id)}
                searchQuery={searchQuery}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalItems={sortedTickets.length}
                itemsPerPage={itemsPerPage}
            />
        </AppLayout>
    );
}
