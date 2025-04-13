interface StatusBadgeProps {
    status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);

    const getStatusClasses = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClasses(status)}`}>{displayStatus}</span>
    );
}
