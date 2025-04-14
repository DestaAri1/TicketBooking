import { useCallback, useEffect, useState } from 'react';

interface UsePaginationProps {
    totalItems: number;
    itemsPerPage: number;
    initialPage?: number;
    onPageChange?: (page: number) => void;
}

interface UsePaginationReturn<T> {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    paginatedItems: (items: T[]) => T[];
    startIndex: number;
    endIndex: number;
    resetPagination: () => void;
}

/**
 * Custom hook for handling pagination logic
 */
export function usePagination<T>({ totalItems, itemsPerPage, initialPage = 1, onPageChange }: UsePaginationProps): UsePaginationReturn<T> {
    const [currentPage, setCurrentPage] = useState<number>(initialPage);

    // Calculate total pages
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    // Ensure current page is within valid range when dependencies change
    useEffect(() => {
        // Only adjust if current page is out of valid range
        if (currentPage > totalPages && totalPages > 0 && currentPage !== 1) {
            setCurrentPage(totalPages);
        }
    }, [totalItems, itemsPerPage, totalPages]); // Remove currentPage from dependencies

    // Handle page change with bounds checking
    const handlePageChange = useCallback(
        (page: number): void => {
            const newPage = Math.max(1, Math.min(page, totalPages));

            // Only update if page actually changes to avoid unnecessary renders
            if (newPage !== currentPage) {
                setCurrentPage(newPage);
                if (onPageChange) {
                    onPageChange(newPage);
                }
            }
        },
        [totalPages, onPageChange, currentPage],
    );

    // Calculate start and end index for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // Function to paginate an array of items
    const paginatedItems = useCallback(
        (items: T[]): T[] => {
            return items.slice(startIndex, startIndex + itemsPerPage);
        },
        [startIndex, itemsPerPage],
    );

    // Reset pagination to first page
    const resetPagination = useCallback((): void => {
        setCurrentPage(1);
    }, []);

    return {
        currentPage,
        setCurrentPage: handlePageChange,
        totalPages,
        paginatedItems,
        startIndex,
        endIndex,
        resetPagination,
    };
}

export default usePagination;
