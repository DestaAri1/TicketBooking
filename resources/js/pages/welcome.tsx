// src/pages/index.tsx
import { Link } from '@inertiajs/react';
import {
    Bell,
    Calendar,
    Calendar as CalendarIcon,
    ChevronDown,
    Clock,
    Grid,
    Home,
    List,
    LogOut,
    MapPin,
    Music,
    Search,
    Settings,
    User,
} from 'lucide-react';
import React, { useState } from 'react';

// Interface untuk tipe data tiket
interface Ticket {
    id: string;
    title: string;
    artist: string;
    date: string;
    time: string;
    venue: string;
    price: number;
    imageUrl: string;
}

// Data contoh tiket
const sampleTickets: Ticket[] = [
    {
        id: '1',
        title: 'Summer Music Festival',
        artist: 'Various Artists',
        date: '25 Jun 2025',
        time: '19:00',
        venue: 'Senayan Stadium, Jakarta',
        price: 750000,
        imageUrl: '/images/concert-1.jpg',
    },
    {
        id: '2',
        title: 'Rock Legends Tour',
        artist: 'The Rockers',
        date: '30 Jun 2025',
        time: '20:00',
        venue: 'GBK Arena, Jakarta',
        price: 1250000,
        imageUrl: '/images/concert-2.jpg',
    },
    {
        id: '3',
        title: 'Pop Sensation Live',
        artist: 'Melody Stars',
        date: '5 Jul 2025',
        time: '19:30',
        venue: 'ICE BSD, Tangerang',
        price: 850000,
        imageUrl: '/images/concert-3.jpg',
    },
    {
        id: '4',
        title: 'Jazz Night Event',
        artist: 'Smooth Quartet',
        date: '12 Jul 2025',
        time: '20:30',
        venue: 'Balai Sarbini, Jakarta',
        price: 550000,
        imageUrl: '/images/concert-4.jpg',
    },
    {
        id: '5',
        title: 'EDM Festival',
        artist: 'Various DJs',
        date: '18 Jul 2025',
        time: '22:00',
        venue: 'Ecopark Ancol, Jakarta',
        price: 950000,
        imageUrl: '/images/concert-5.jpg',
    },
    {
        id: '6',
        title: 'Indie Music Showcase',
        artist: 'Local Talents',
        date: '25 Jul 2025',
        time: '19:00',
        venue: 'M Bloc Space, Jakarta',
        price: 350000,
        imageUrl: '/images/concert-6.jpg',
    },
];

const ConcertTicketsPage: React.FC = () => {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleUserDropdown = () => {
        setUserDropdownOpen(!userDropdownOpen);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo and Main Nav */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Link href="/" className="flex items-center">
                                    <Music className="h-8 w-8 text-purple-600" />
                                    <span className="ml-2 text-xl font-bold text-gray-900">MusicTix</span>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:ml-8 md:flex md:space-x-4">
                                <Link href="/" className="flex items-center rounded-md bg-purple-50 px-3 py-2 text-sm font-medium text-purple-600">
                                    <Home className="mr-1.5 h-4 w-4" />
                                    Home
                                </Link>
                                <Link
                                    href="/concerts"
                                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    <Music className="mr-1.5 h-4 w-4" />
                                    Concerts
                                </Link>
                                <Link
                                    href="/events"
                                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    <CalendarIcon className="mr-1.5 h-4 w-4" />
                                    Events
                                </Link>
                            </div>
                        </div>

                        {/* Search Bar - Desktop */}
                        <div className="mx-8 hidden flex-1 md:block">
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search for concerts, artists, venues..."
                                    className="block w-full rounded-full border-0 py-1.5 pr-4 pl-10 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Right Side Navigation with User Dropdown */}
                        <div className="flex items-center space-x-4">
                            {/* Notification Bell */}
                            <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                                <Bell className="h-6 w-6" />
                            </button>

                            {/* User Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={toggleUserDropdown}
                                    className="flex items-center rounded-full text-sm focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 font-medium text-white">
                                        AB
                                    </div>
                                    <span className="ml-2 hidden text-sm font-medium text-gray-700 md:block">Alex Brown</span>
                                    <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                                </button>

                                {/* Dropdown Menu */}
                                {userDropdownOpen && (
                                    <div className="ring-opacity-5 absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black">
                                        <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <User className="mr-2 h-4 w-4" />
                                            Your Profile
                                        </Link>
                                        <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <Settings className="mr-2 h-4 w-4" />
                                            Settings
                                        </Link>
                                        <div className="my-1 border-t border-gray-100"></div>
                                        <Link href="/logout" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Sign out
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-inset md:hidden"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu, show/hide based on menu state */}
                {mobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                            <Link href="/" className="block rounded-md bg-purple-50 px-3 py-2 text-base font-medium text-purple-600">
                                Home
                            </Link>
                            <Link href="/concerts" className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50">
                                Concerts
                            </Link>
                            <Link href="/events" className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50">
                                Events
                            </Link>
                        </div>
                        {/* Mobile Search */}
                        <div className="px-2 pt-2 pb-3">
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="block w-full rounded-md border-0 py-1.5 pr-4 pl-10 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Header Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-700 pt-16 text-white">
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-indigo-500 opacity-20"></div>
                <div className="absolute top-0 right-0 h-full w-full bg-[url('/images/music-pattern.png')] opacity-10"></div>
                <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Concert Tickets</h1>
                    <p className="mt-4 max-w-xl text-lg md:text-xl">Find and book tickets for the best music events in Indonesia</p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <button className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-purple-700 shadow-sm hover:bg-purple-50">
                            Browse All Concerts
                        </button>
                        <button className="bg-opacity-70 hover:bg-opacity-90 inline-flex items-center rounded-md bg-purple-800 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm">
                            View Featured
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl py-8 sm:px-6 lg:px-8">
                {/* Filters and View Toggle */}
                <div className="mb-6 flex flex-col items-start justify-between px-4 sm:px-0 md:flex-row md:items-center">
                    <div className="mb-4 flex items-center gap-3 md:mb-0">
                        <div className="text-lg font-medium text-gray-800">Upcoming Concerts</div>
                        <div className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                            {sampleTickets.length} available
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <select className="rounded-md border-gray-300 py-1.5 text-sm text-gray-700 focus:border-purple-500 focus:ring-purple-500">
                            <option>All Categories</option>
                            <option>Pop</option>
                            <option>Rock</option>
                            <option>Jazz</option>
                            <option>EDM</option>
                            <option>Indie</option>
                        </select>

                        <div className="inline-flex rounded-md shadow-sm">
                            <button
                                onClick={() => setView('grid')}
                                className={`rounded-l-md p-2 ${view === 'grid' ? 'bg-purple-100 text-purple-700' : 'bg-white text-gray-500'}`}
                            >
                                <Grid className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setView('list')}
                                className={`rounded-r-md p-2 ${view === 'list' ? 'bg-purple-100 text-purple-700' : 'bg-white text-gray-500'}`}
                            >
                                <List className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid View */}
                {view === 'grid' && sampleTickets.length > 0 && (
                    <div className="grid gap-6 px-4 sm:grid-cols-2 sm:px-0 lg:grid-cols-3">
                        {sampleTickets.map((ticket) => (
                            <div
                                key={ticket.id}
                                className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-purple-200 hover:shadow-md"
                            >
                                {/* Ticket Image */}
                                <div className="relative aspect-video overflow-hidden bg-gray-100">
                                    <img
                                        src={ticket.imageUrl}
                                        alt={ticket.title}
                                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                    <div className="absolute inset-x-0 bottom-0 p-4">
                                        <p className="text-xs font-medium tracking-wider text-purple-200 uppercase">{ticket.artist}</p>
                                        <h3 className="mt-1 truncate text-lg font-bold text-white">{ticket.title}</h3>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/dashboard/ticket/view/${ticket.id}`}
                                                className="rounded-lg bg-purple-600/90 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-600"
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Ticket Details */}
                                <div className="p-4">
                                    <div className="flex flex-wrap gap-2 text-xs">
                                        <div className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-purple-700">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {ticket.date}
                                        </div>
                                        <div className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-indigo-700">
                                            <Clock className="mr-1 h-3 w-3" />
                                            {ticket.time}
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <MapPin className="mr-1 h-3 w-3 flex-shrink-0" />
                                        <span className="truncate">{ticket.venue}</span>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">Starting from</p>
                                            <p className="text-lg font-bold text-gray-900">Rp {ticket.price.toLocaleString('id-ID')}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="rounded-lg border border-purple-200 p-1.5 text-purple-600 hover:bg-purple-50">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                                    />
                                                </svg>
                                            </button>
                                            <Link
                                                href={`/dashboard/ticket/view/${ticket.id}`}
                                                className="rounded-lg bg-purple-600 p-1.5 text-white hover:bg-purple-700"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* List View */}
                {view === 'list' && sampleTickets.length > 0 && (
                    <div className="mx-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow sm:mx-0">
                        <ul className="divide-y divide-gray-200">
                            {sampleTickets.map((ticket) => (
                                <li key={ticket.id} className="group transition-colors hover:bg-purple-50">
                                    <div className="flex items-center p-4 sm:px-6">
                                        <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                            <img
                                                src={ticket.imageUrl}
                                                alt={ticket.title}
                                                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{ticket.title}</h3>
                                                    <p className="text-sm text-purple-600">{ticket.artist}</p>
                                                </div>
                                                <div className="mt-2 flex flex-col items-start sm:mt-0 sm:items-end">
                                                    <p className="text-xs text-gray-500">Starting from</p>
                                                    <p className="font-bold text-gray-900">Rp {ticket.price.toLocaleString('id-ID')}</p>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                                                <div className="inline-flex items-center rounded-full bg-purple-50 px-2 py-0.5 text-purple-700">
                                                    <Calendar className="mr-1 h-3 w-3" />
                                                    {ticket.date}
                                                </div>
                                                <div className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-700">
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    {ticket.time}
                                                </div>
                                                <div className="flex items-center">
                                                    <MapPin className="mr-1 h-3 w-3" />
                                                    {ticket.venue}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex flex-shrink-0 items-center space-x-2">
                                            <button className="rounded-full p-1.5 text-gray-400 hover:bg-white hover:text-purple-600 hover:shadow">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                                    />
                                                </svg>
                                            </button>
                                            <Link
                                                href={`/dashboard/ticket/view/${ticket.id}`}
                                                className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-purple-700"
                                            >
                                                View Details
                                            </Link>
                                            <Link
                                                href={`/dashboard/ticket/book/${ticket.id}`}
                                                className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-100"
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Pagination */}
                {sampleTickets.length > 0 && (
                    <div className="mt-8 px-4 sm:px-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-sm text-gray-600">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">{sampleTickets.length}</span> of{' '}
                                <span className="font-medium">24</span> concerts
                            </div>
                            <div className="mt-4 flex items-center justify-center space-x-1 sm:mt-0">
                                <button
                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    disabled
                                >
                                    Previous
                                </button>
                                <button className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-purple-600 text-sm font-medium text-white">
                                    1
                                </button>
                                <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                                    2
                                </button>
                                <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                                    3
                                </button>
                                <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                                    ...
                                </button>
                                <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div className="col-span-1 md:col-span-2">
                            <div className="mb-4 flex items-center">
                                <Music className="h-8 w-8 text-purple-400" />
                                <span className="ml-2 text-xl font-bold text-white">MusicTix</span>
                            </div>
                            <p className="mb-4 text-sm text-gray-400">
                                Find and book tickets for the best concerts and music events in Indonesia. From rock to jazz, pop to indie, we've got
                                you covered.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-purple-400">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-purple-400">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-purple-400">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-purple-400">
                                    <span className="sr-only">YouTube</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-sm text-gray-400 hover:text-white">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-400 hover:text-white">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-400 hover:text-white">
                                        Press
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-400 hover:text-white">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">Support</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-sm text-gray-400 hover:text-white">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-400 hover:text-white">
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-400 hover:text-white">
                                        Refund Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-400 hover:text-white">
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-400 hover:text-white">
                                        Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-700 pt-8">
                        <p className="text-center text-sm text-gray-400">&copy; 2025 MusicTix. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ConcertTicketsPage;
