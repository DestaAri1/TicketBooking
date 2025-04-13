interface TableHeaderProps {
    items: { title: string; alignRight?: boolean }[];
    showCheckbox?: boolean;
    isAllSelected?: boolean;
    onSelectAll?: () => void;
}

export function TableHeader({ items, showCheckbox = false, isAllSelected = false, onSelectAll }: TableHeaderProps) {
    return (
        <thead className="bg-gray-50">
            <tr>
                {showCheckbox && (
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={onSelectAll}
                            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                    </th>
                )}
                {items.map((item, index) => (
                    <th
                        key={index}
                        scope="col"
                        className={`px-3 py-3.5 text-xs font-medium text-gray-500 uppercase ${item.alignRight ? 'text-right' : 'text-left'}`}
                    >
                        {item.title}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
