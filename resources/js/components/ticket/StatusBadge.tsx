import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    switch (status) {
        case '3':
            return (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Active
                </span>
            );
        case '2':
            return (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Sold Out
                </span>
            );
        case '1':
            return (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    <XCircle className="mr-1 h-3 w-3" />
                    Canceled
                </span>
            );
        case '0':
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
