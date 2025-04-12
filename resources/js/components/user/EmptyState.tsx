import { Link } from '@inertiajs/react';
import { CirclePlus, User as UserIcon } from 'lucide-react';

interface EmptyStateProps {
    searchQuery: string;
}

export default function EmptyState({ searchQuery }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center">
            <UserIcon className="h-10 w-10 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
                {searchQuery ? 'Try adjusting your search or filters' : 'Get started by creating a new user'}
            </p>
            {!searchQuery && (
                <Link
                    href="/dashboard/user/add-user"
                    className="mt-3 flex h-8 items-center justify-center rounded-full bg-gray-600 px-4 font-semibold text-white hover:bg-gray-700"
                >
                    <CirclePlus className="mr-2 h-5 w-5" />
                    <span>Add User</span>
                </Link>
            )}
        </div>
    );
}
