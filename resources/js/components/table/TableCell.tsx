import { ReactNode } from "react";

interface TableCellProps {
    children: ReactNode;
    alignRight?: boolean;
}

export function TableCell({ children, alignRight = false }: TableCellProps) {
    return <td className={`px-3 py-4 text-sm whitespace-nowrap ${alignRight ? 'text-right' : ''}`}>{children}</td>;
}
