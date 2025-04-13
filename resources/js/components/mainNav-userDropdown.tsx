import { Link } from '@inertiajs/react';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface UserDropdownProps {
    userDropdownOpen: boolean;
    toggleUserDropdown: (e: React.MouseEvent) => void;
    closeUserDropdown: () => void;
}

const UserDropdownItem = [
    {
        title: 'Your Profile',
        href: '/profile',
        icon: User,
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    }
];

export default function MainNavUserDropdown({ userDropdownOpen, toggleUserDropdown, closeUserDropdown }: UserDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && userDropdownOpen) {
                closeUserDropdown();
            }
        }

        // Add event listener when dropdown is open
        if (userDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [userDropdownOpen, closeUserDropdown]);

    return (
        <div className="user-dropdown relative" ref={dropdownRef}>
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

            {userDropdownOpen && (
                <div className="ring-opacity-5 absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black">
                    {UserDropdownItem.map((item) => (
                        <Link key={item.title} href={item.href} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.title}
                        </Link>
                    ))}
                    <div className="my-1 border-t border-gray-100"></div>
                    <Link href="/logout" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                    </Link>
                </div>
            )}
        </div>
    );
}
