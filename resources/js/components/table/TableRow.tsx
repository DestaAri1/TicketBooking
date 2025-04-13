import { ReactNode } from "react";

interface TableRowProps {
    children: ReactNode;
    isSelected?: boolean;
    id?: number;
    onSelect?: (id: number) => void;
}

export function TableRow({ children, isSelected = false, id, onSelect }: TableRowProps) {
    return (
        <tr className={isSelected ? 'bg-purple-50' : 'hover:bg-gray-50'}>
            {id !== undefined && onSelect && (
                <td className="px-3 py-4 text-sm whitespace-nowrap">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelect(id)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                </td>
            )}
            {children}
        </tr>
    );
}
