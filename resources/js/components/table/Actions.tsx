import { Link } from '@inertiajs/react';
import { Edit, Eye, Trash2 } from 'lucide-react';

interface UserActionsProps {
    Id: number;
    viewLink: string;
    editLink: string;
    onDelete: (id: number) => void;
}

export function Actions({ viewLink, editLink, onDelete, Id }: UserActionsProps) {
    return (
        <div className="flex justify-end space-x-2">
            <Link href={viewLink} className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900" title="View">
                <Eye className="h-4 w-4" />
            </Link>
            <Link href={editLink} className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900" title="Edit">
                <Edit className="h-4 w-4" />
            </Link>
            <button onClick={() => onDelete(Id)} className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900" title="Delete">
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    );
}

