import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    interface BadgeProps {
        Icon: React.ComponentType<{ className?: string }>;
        name: string;
        color: string;
        bgColor: string;
    }

    const Badge = ({ Icon, name, color, bgColor }: BadgeProps) => (
        <span className={`inline-flex items-center rounded-full ${bgColor} px-2.5 py-0.5 text-xs font-medium ${color}`}>
            <Icon className="mr-1 h-3 w-3" />
            {name}
        </span>
    );

    switch (status) {
        case '3':
            return <Badge Icon={CheckCircle} name="Active" color="text-green-800" bgColor="bg-green-100" />;
        case '2':
            return <Badge Icon={CheckCircle} name="Sold Out" color="text-blue-800" bgColor="bg-blue-100" />;
        case '1':
            return <Badge Icon={XCircle} name="Canceled" color="text-red-800" bgColor="bg-red-100" />;
        case '0':
            return <Badge Icon={AlertCircle} name="Draft" color="text-gray-800" bgColor="bg-gray-100" />;
        default:
            return null;
    }
}
