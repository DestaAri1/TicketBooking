import BulkActions from '@/components/user/BulkActions';
import DeleteConfirmationModal from '@/components/user/DeleteUserModal';
import UserActions from '@/components/user/UserActions';
import UserFilters from '@/components/user/UserFilters';
import UserTable from '@/components/user/UserTable';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'User', href: '/dashboard/user' }];

const sampleUsers: User[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        created_at: '2025-03-15',
        updated_at: '2025-03-15',
        email_verified_at: '2025-03-15',
        status: 'active',
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'employee',
        created_at: '2025-03-18',
        updated_at: '2025-03-18',
        email_verified_at: '2025-03-18',
        status: 'active',
    },
    {
        id: 3,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        role: 'user',
        created_at: '2025-03-20',
        updated_at: '2025-03-20',
        email_verified_at: null, // If email isn't verified
        status: 'inactive',
    },
    {
        id: 4,
        name: 'Bob Brown',
        email: 'bob.brown@example.com',
        role: 'employee',
        created_at: '2025-03-22',
        updated_at: '2025-03-22',
        email_verified_at: '2025-03-22',
        status: 'active',
    },
    {
        id: 5,
        name: 'Emma Wilson',
        email: 'emma.wilson@example.com',
        role: 'user',
        created_at: '2025-03-25',
        updated_at: '2025-03-25',
        email_verified_at: '2025-03-25',
        status: 'active',
    },
];

export default function UserManagement() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedUserToDelete, setSelectedUserToDelete] = useState<number | null>(null);
    const { props } = usePage();
    const users = props.users as User[];
    console.log(users);


    // Filter users
    const filteredUsers = sampleUsers.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    // Sort users
    // In the sort function
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            case 'oldest':
                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            case 'name_asc':
                return a.name.localeCompare(b.name);
            case 'name_desc':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    // Toggle select all users
    const toggleSelectAll = () => {
        if (selectedUsers.length === sortedUsers.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(sortedUsers.map((user) => user.id));
        }
    };

    // Toggle select individual user
    const toggleSelectUser = (id: number) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                selectedUserToDelete={selectedUserToDelete}
                selectedUsers={selectedUsers}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedUserToDelete(null);
                }}
                onConfirm={() => {
                    console.log('Deleting user(s):', selectedUserToDelete ? [selectedUserToDelete] : selectedUsers);
                    setSelectedUsers(selectedUserToDelete ? selectedUsers.filter((id) => id !== selectedUserToDelete) : []);
                    setIsDeleteModalOpen(false);
                    setSelectedUserToDelete(null);
                }}
            />
            <div className="mx-4 mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <UserFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    roleFilter={roleFilter}
                    setRoleFilter={setRoleFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
                <UserActions />
            </div>
            <BulkActions selectedUsers={selectedUsers} onDelete={() => setIsDeleteModalOpen(true)} />
            <UserTable
                users={sortedUsers}
                selectedUsers={selectedUsers}
                toggleSelectAll={toggleSelectAll}
                toggleSelectUser={toggleSelectUser}
                onDelete={(id) => {
                    setSelectedUserToDelete(id);
                    setIsDeleteModalOpen(true);
                }}
                searchQuery={searchQuery}
            />
        </AppLayout>
    );
}
