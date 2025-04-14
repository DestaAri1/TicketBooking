import AppLayout from '@/layouts/app-layout';
import { Ticket as Tickets, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar, CheckCircle, CirclePlus, Download, Edit, Music } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const sampleTickets: Tickets[] = [
    {
        id: 1,
        name: 'Summer Music Festival',
        artist: 'Various Artists',
        date: '20 Jun 2025',
        time: '16:00',
        venue: 'Grand Park Arena',
        price: 850000,
        status: 'active',
        sales: 2145,
        imageUrl: '/api/placeholder/600/800',
        createdAt: '2025-03-15',
    },
    {
        id: 2,
        name: 'Rock Sensation Concert',
        artist: 'The Amplifiers',
        date: '15 Jul 2025',
        time: '19:30',
        venue: 'Echo Stadium',
        price: 750000,
        status: 'active',
        sales: 1832,
        imageUrl: '/api/placeholder/600/800',
        createdAt: '2025-03-18',
    },
    {
        id: 3,
        name: 'Classical Symphony Night',
        artist: 'Metropolitan Orchestra',
        date: '5 Aug 2025',
        time: '20:00',
        venue: 'Royal Concert Hall',
        price: 1200000,
        status: 'sold_out',
        sales: 3500,
        imageUrl: '/api/placeholder/600/800',
        createdAt: '2025-03-20',
    },
    {
        id: 4,
        name: 'Jazz & Blues Evening',
        artist: 'Smooth Tones Quartet',
        date: '25 Aug 2025',
        time: '21:00',
        venue: 'Blue Note Lounge',
        price: 550000,
        status: 'active',
        sales: 876,
        imageUrl: '/api/placeholder/600/800',
        createdAt: '2025-03-22',
    },
    {
        id: 5,
        name: 'Electronic Dance Experience',
        artist: 'DJ Pulse',
        date: '10 Sep 2025',
        time: '22:00',
        venue: 'Neon Club',
        price: 450000,
        status: 'canceled',
        sales: 0,
        imageUrl: '/api/placeholder/600/800',
        createdAt: '2025-03-25',
    },
    {
        id: 6,
        name: 'Indie Folk Collective',
        artist: 'Woodland Echoes',
        date: '28 Sep 2025',
        time: '18:30',
        venue: 'Garden Amphitheater',
        price: 350000,
        status: 'draft',
        sales: 0,
        imageUrl: '/api/placeholder/600/800',
        createdAt: '2025-03-28',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            {/* Stats Overview */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-purple-100">
                                    <CheckCircle className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Active Tickets</dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                        {sampleTickets.filter((t) => t.status === 'active').length}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100">
                                    <CheckCircle className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Sold Out Events</dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                        {sampleTickets.filter((t) => t.status === 'sold_out').length}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-green-100">
                                    <Music className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Total Sales</dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                        {sampleTickets.reduce((acc, ticket) => acc + ticket.sales, 0).toLocaleString()}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-amber-100">
                                    <Download className="h-6 w-6 text-amber-600" />
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Revenue</dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                        Rp {sampleTickets.reduce((acc, ticket) => acc + ticket.price * ticket.sales, 0).toLocaleString('id-ID')}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Action Cards */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Quick Add Card */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                        <div className="mt-4 space-y-3">
                            <Link
                                href="/dashboard/ticket/add-ticket"
                                className="flex items-center rounded-md bg-purple-50 px-4 py-3 text-sm font-medium text-purple-700 hover:bg-purple-100"
                            >
                                <CirclePlus className="mr-3 h-5 w-5 text-purple-500" />
                                Add New Ticket
                            </Link>
                            <Link
                                href="/dashboard/ticket/batch-upload"
                                className="flex items-center rounded-md bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 hover:bg-blue-100"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-3 h-5 w-5 text-blue-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                    />
                                </svg>
                                Batch Upload
                            </Link>
                            <Link
                                href="/dashboard/reports/tickets"
                                className="flex items-center rounded-md bg-green-50 px-4 py-3 text-sm font-medium text-green-700 hover:bg-green-100"
                            >
                                <Download className="mr-3 h-5 w-5 text-green-500" />
                                Generate Report
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Card */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-start space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                                    <CirclePlus className="h-4 w-4 text-purple-600" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium text-gray-900">New ticket added</p>
                                    <p className="text-sm text-gray-500">Indie Folk Collective was added by Admin</p>
                                    <p className="text-xs text-gray-400">2 days ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                    <Edit className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium text-gray-900">Ticket updated</p>
                                    <p className="text-sm text-gray-500">Summer Music Festival details were modified</p>
                                    <p className="text-xs text-gray-400">3 days ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium text-gray-900">Status changed</p>
                                    <p className="text-sm text-gray-500">Classical Symphony Night marked as sold out</p>
                                    <p className="text-xs text-gray-400">1 week ago</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link href="/dashboard/activity-log" className="text-sm font-medium text-purple-600 hover:text-purple-700">
                                View all activity
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Upcoming Events Card */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
                        <div className="mt-4 space-y-4">
                            {sampleTickets
                                .filter((ticket) => ticket.status === 'active')
                                .sort(
                                    (a, b) =>
                                        new Date(a.date.split(' ')[1] + ' ' + a.date.split(' ')[0] + ' 2025').getTime() -
                                        new Date(b.date.split(' ')[1] + ' ' + b.date.split(' ')[0] + ' 2025').getTime(),
                                )
                                .slice(0, 3)
                                .map((ticket) => (
                                    <div key={ticket.id} className="flex items-center space-x-3">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img src={ticket.imageUrl} alt={ticket.name} className="h-10 w-10 rounded-md object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{ticket.name}</p>
                                            <div className="mt-1 flex items-center text-xs text-gray-500">
                                                <Calendar className="mr-1 h-3 w-3" />
                                                {ticket.date}
                                            </div>
                                        </div>
                                        <Link
                                            href={`/dashboard/ticket/edit/${ticket.id}`}
                                            className="rounded-md bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </div>
                                ))}
                        </div>
                        <div className="mt-4">
                            <Link href="/dashboard/events/calendar" className="text-sm font-medium text-purple-600 hover:text-purple-700">
                                View event calendar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
