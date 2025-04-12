import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    switch (status) {
        case 'active':
            return (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Active
                </span>
            );
        case 'sold_out':
            return (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Sold Out
                </span>
            );
        case 'canceled':
            return (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    <XCircle className="mr-1 h-3 w-3" />
                    Canceled
                </span>
            );
        case 'draft':
            return (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Draft
                </span>
            );
        default:
            return null;
    }
}
