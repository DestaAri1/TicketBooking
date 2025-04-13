import { ReactNode } from 'react';

interface TableBodyProps {
    children: ReactNode;
}

export function TableBody({ children }: TableBodyProps) {
    return <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>;
}
