import { ReactNode } from "react";

interface TableProps {
    children: ReactNode;
    className?: string;
}

export function Table({ children, className = '' }: TableProps) {
    return (
        <div className={`mx-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow ${className}`}>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">{children}</table>
            </div>
        </div>
    );
}
