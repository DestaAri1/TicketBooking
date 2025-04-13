import { CirclePlus, Download } from 'lucide-react';
import DashLink from './DashLink';

const TicketActionItem = [
    {
        title: 'Export',
        href: '/dashboard/reports/tickets',
        icon: Download,
        classname: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    },
    {
        title: 'Add Ticket',
        href: route('add-ticket'),
        icon: CirclePlus,
        classname: 'bg-purple-600 text-white hover:bg-purple-700',
    },
];

export default function TicketActions() {
    return (
        <div className="flex gap-2">
            {TicketActionItem.map((item) => (
                <DashLink key={item.title} Icon={item.icon} classname={item.classname} href={item.href} title={item.title} />
            ))}
        </div>
    );
}
