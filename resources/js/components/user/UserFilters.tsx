import { ChevronDown, Filter, Search } from 'lucide-react';

interface UserFiltersProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    roleFilter: string;
    setRoleFilter: (value: string) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
}

export default function UserFilters({ searchQuery, setSearchQuery, roleFilter, setRoleFilter, sortBy, setSortBy }: UserFiltersProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
            <div className="relative w-full rounded-md shadow-sm sm:w-1/3">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full rounded-md border-gray-300 p-2 pl-10 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    placeholder="Search users..."
                />
            </div>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:gap-2">
                <div className="relative w-full sm:w-40">
                    <button
                        type="button"
                        className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                    >
                        <div className="flex items-center">
                            <Filter className="mr-2 h-4 w-4 text-gray-500" />
                            {roleFilter === 'all' ? 'All Roles' : roleFilter === 'admin' ? 'Admin' : roleFilter === 'employee' ? 'Employee' : 'User'}
                        </div>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    <div className="ring-opacity-5 absolute right-0 z-10 mt-2 hidden w-full rounded-md bg-white shadow-lg ring-1 ring-black">
                        <div className="py-1">
                            {['all', 'admin', 'employee', 'user'].map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setRoleFilter(role)}
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="relative w-full sm:w-40">
                    <button
                        type="button"
                        className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                    >
                        <span>
                            {sortBy === 'newest' ? 'Newest' : sortBy === 'oldest' ? 'Oldest' : sortBy === 'name_asc' ? 'Name: A-Z' : 'Name: Z-A'}
                        </span>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    <div className="ring-opacity-5 absolute right-0 z-10 mt-2 hidden w-full rounded-md bg-white shadow-lg ring-1 ring-black">
                        <div className="py-1">
                            {['newest', 'oldest', 'name_asc', 'name_desc'].map((sortOption) => (
                                <button
                                    key={sortOption}
                                    onClick={() => setSortBy(sortOption)}
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {sortOption === 'newest'
                                        ? 'Newest'
                                        : sortOption === 'oldest'
                                          ? 'Oldest'
                                          : sortOption === 'name_asc'
                                            ? 'Name: A-Z'
                                            : 'Name: Z-A'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
