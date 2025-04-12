import { TicketFiltersProps } from '@/types';
import { ChevronDown, Filter, Search } from 'lucide-react';

export default function TicketFilters({ searchQuery, setSearchQuery, statusFilter, setStatusFilter, sortBy, setSortBy }: TicketFiltersProps) {
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
                    placeholder="Search tickets..."
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
                    <div className="ring-opacity-5 absolute right-0 z-10 mt-2 hidden w-full rounded-md bg-white shadow-lg ring-1 ring-black">
                        <div className="py-1">
                            {['all', 'active', 'sold_out', 'canceled', 'draft'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {status === 'all'
                                        ? 'All Statuses'
                                        : status === 'active'
                                          ? 'Active'
                                          : status === 'sold_out'
                                            ? 'Sold Out'
                                            : status === 'canceled'
                                              ? 'Canceled'
                                              : 'Draft'}
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
                    <div className="ring-opacity-5 absolute right-0 z-10 mt-2 hidden w-full rounded-md bg-white shadow-lg ring-1 ring-black">
                        <div className="py-1">
                            {['newest', 'oldest', 'price_high', 'price_low', 'sales_high', 'sales_low'].map((sortOption) => (
                                <button
                                    key={sortOption}
                                    onClick={() => setSortBy(sortOption)}
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {sortOption === 'newest'
                                        ? 'Newest'
                                        : sortOption === 'oldest'
                                          ? 'Oldest'
                                          : sortOption === 'price_high'
                                            ? 'Price: High to Low'
                                            : sortOption === 'price_low'
                                              ? 'Price: Low to High'
                                              : sortOption === 'sales_high'
                                                ? 'Sales: High to Low'
                                                : 'Sales: Low to High'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
