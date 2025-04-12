import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Eye, Trash2 } from 'lucide-react';
import EmptyState from './EmptyState';
import RoleBadge from './RoleBadge';

interface UserTableProps {
    users: User[];
    selectedUsers: number[];
    toggleSelectAll: () => void;
    toggleSelectUser: (id: number) => void;
    onDelete: (id: number) => void;
    searchQuery: string;
}

export default function UserTable({ users, selectedUsers, toggleSelectAll, toggleSelectUser, onDelete, searchQuery }: UserTableProps) {
    return (
        <div className="mx-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.length === users.length && users.length > 0}
                                    onChange={toggleSelectAll}
                                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                User Details
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                Role
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                Created At
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
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-sm text-gray-500">
                                    <EmptyState searchQuery={searchQuery} />
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className={selectedUsers.includes(user.id) ? 'bg-purple-50' : 'hover:bg-gray-50'}>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => toggleSelectUser(user.id)}
                                            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                        />
                                    </td>
                                    <td className="px-3 py-4">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap">
                                        <RoleBadge role={user.role} />
                                    </td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{user.created_at}</td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-3 py-4 text-right text-sm font-medium whitespace-nowrap">
                                        <div className="flex justify-end space-x-2">
                                            <Link
                                                href={`/dashboard/user/view/${user.id}`}
                                                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                                title="View"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                href={`/dashboard/user/edit/${user.id}`}
                                                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => onDelete(user.id)}
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
            {users.length > 0 && (
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
                                Showing <span className="font-medium">1</span> to <span className="font-medium">{users.length}</span> of{' '}
                                <span className="font-medium">{users.length}</span> results
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
