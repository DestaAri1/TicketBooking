import { Link, usePage } from '@inertiajs/react';
import { CalendarIcon, Home, Music } from 'lucide-react';

const NavLinkItem = [
    {
        tittle: 'Home',
        href: '/',
        icon: Home,
    },
    {
        tittle: 'Concerts',
        href: '/concerts',
        icon: Music,
    },
    {
        tittle: 'Events',
        href: '/events',
        icon: CalendarIcon,
    },
];

export default function MainNavNavigation() {
    const { url } = usePage();

    return (
        <div className="hidden md:ml-8 md:flex md:space-x-4">
            {NavLinkItem.map((item) => {
                const isActive = item.href === url;

                return (
                    <Link
                        href={item.href}
                        key={item.tittle}
                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <item.icon className="mr-1.5 h-4 w-4" />
                        {item.tittle}
                    </Link>
                );
            })}
        </div>
    );
}
