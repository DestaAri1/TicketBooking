import { Ticket } from '@/types';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Actions } from '../table/Actions';
import { Table } from '../table/Table';
import { TableBody } from '../table/TableBody';
import { TableCell } from '../table/TableCell';
import { TableHeader } from '../table/TableHeader';
import { TablePagination } from '../table/TablePagination';
import { TableRow } from '../table/TableRow';
import EmptyState from './EmptyState';
import StatusBadge from './StatusBadge';

interface TicketTableProps {
    tickets: Ticket[];
    selectedTickets: number[];
    toggleSelectAll: () => void;
    toggleSelectTicket: (id: number) => void;
    onDelete: (id: number) => void;
    searchQuery: string;
    currentPage: number;
    onPageChange: (page: number) => void;
    totalItems?: number;
    itemsPerPage?: number;
}

const TableHeadItem = [
    { title: 'Event Details' },
    { title: 'Date & Time' },
    { title: 'Venue' },
    { title: 'Price & Sales' },
    { title: 'Status' },
    { title: 'Actions', alignRight: true },
];

export default function TicketTable({
    tickets,
    selectedTickets,
    toggleSelectAll,
    toggleSelectTicket,
    onDelete,
    searchQuery,
    currentPage,
    onPageChange,
    totalItems: explicitTotalItems,
    itemsPerPage = 10,
}: TicketTableProps) {
    const isAllSelected = selectedTickets.length === tickets.length && tickets.length > 0;

    const totalItems = explicitTotalItems !== undefined ? explicitTotalItems : tickets.length;

    return (
        <>
            <Table>
                <TableHeader items={TableHeadItem} showCheckbox={true} isAllSelected={isAllSelected} onSelectAll={toggleSelectAll} />

                <TableBody>
                    {tickets.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="py-8 text-center text-sm text-gray-500">
                                <EmptyState searchQuery={searchQuery} />
                            </td>
                        </tr>
                    ) : (
                        tickets.map((ticket) => (
                            <TableRow
                                id={ticket.id}
                                isSelected={selectedTickets.includes(ticket.id)}
                                key={ticket.id}
                                onSelect={toggleSelectTicket}
                            >
                                <TableCell>
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img src={ticket.imageUrl} alt={ticket.name} className="h-10 w-10 rounded-md object-cover" />
                                        </div>

                                        <div className="ml-4">
                                            <div className="font-medium text-gray-900">{ticket.name}</div>
                                            <div className="text-sm text-gray-500">{ticket.artist}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
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
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <MapPin className="mr-1 h-3 w-3 text-gray-400" />
                                        <span className="max-w-xs truncate">{ticket.venue}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium text-gray-900">Rp {ticket.price.toLocaleString('id-ID')}</div>
                                    <div className="text-sm text-gray-500">{ticket.sales.toLocaleString()} tickets sold</div>
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={ticket.status} />
                                </TableCell>
                                <TableCell>
                                    <Actions
                                        Id={ticket.id}
                                        editLink={`/dashboard/ticket/${ticket.id}/edit`}
                                        viewLink={`/dashboard/ticket/${ticket.id}`}
                                        onDelete={onDelete}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {tickets.length > 0 && (
                <TablePagination totalItems={totalItems} currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChange={onPageChange} />
            )}
        </>
    );
}
