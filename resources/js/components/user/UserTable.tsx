// UserTable.tsx (Refactored)
import { User } from '@/types';
import { Actions } from '../table/Actions';
import { StatusBadge } from '../table/StatusBadge';
import { Table } from '../table/Table';
import { TableBody } from '../table/TableBody';
import { TableCell } from '../table/TableCell';
import { TableHeader } from '../table/TableHeader';
import { TablePagination } from '../table/TablePagination';
import { TableRow } from '../table/TableRow';
import EmptyState from './EmptyState';
import RoleBadge from './RoleBadge';
import { formatDateToIndonesian } from '@/helpers/dateConverter';

interface UserTableProps {
    users: User[];
    selectedUsers: number[];
    toggleSelectAll: () => void;
    toggleSelectUser: (id: number) => void;
    onDelete: (id: number) => void;
    searchQuery: string;
    currentPage?: number;
    onPageChange?: (page: number) => void;
}

const UserTableHeadItems = [
    { title: 'User Details' },
    { title: 'Role' },
    { title: 'Created At' },
    { title: 'Status' },
    { title: 'Actions', alignRight: true },
];

export default function UserTable({
    users,
    selectedUsers,
    toggleSelectAll,
    toggleSelectUser,
    onDelete,
    searchQuery,
    currentPage = 1,
    onPageChange = () => {},
}: UserTableProps) {
    const isAllSelected = selectedUsers.length === users.length && users.length > 0;

    return (
        <>
            <Table>
                <TableHeader items={UserTableHeadItems} showCheckbox={true} isAllSelected={isAllSelected} onSelectAll={toggleSelectAll} />

                <TableBody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="py-8 text-center text-sm text-gray-500">
                                <EmptyState searchQuery={searchQuery} />
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <TableRow key={user.id} isSelected={selectedUsers.includes(user.id)} id={user.id} onSelect={toggleSelectUser}>
                                <TableCell>
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="font-medium text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <RoleBadge role={user.role} />
                                </TableCell>

                                <TableCell>
                                    <span className="text-gray-500">{formatDateToIndonesian(user.created_at)}</span>
                                </TableCell>

                                <TableCell>
                                    <StatusBadge status={user.status} />
                                </TableCell>

                                <TableCell alignRight={true}>
                                    <Actions
                                        Id={user.id}
                                        onDelete={onDelete}
                                        viewLink={`/dashboard/user/${user.id}`}
                                        editLink={`/dashboard/user/${user.id}/edit`}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {users.length > 0 && (
                <TablePagination totalItems={users.length} currentPage={currentPage} itemsPerPage={10} onPageChange={onPageChange} />
            )}
        </>
    );
}
