interface StatusBadgeProps {
    status: number;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusClasses = (status: number) => {
        switch (status) {
            case 1:
                return 'bg-green-100 text-green-800';
            case 0:
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: number) => {
        switch (status) {
            case 1:
                return 'Active';
            case 0:
                return 'Inactive';
            default:
                return 'Unknown';
        }
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClasses(status)}`}>
            {getStatusText(status)}
        </span>
    );
}
