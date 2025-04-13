import { Link } from '@inertiajs/react';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';

interface UserDropdownProps {
    userDropdownOpen: boolean;
    toggleUserDropdown: () => void;
}

export default function MainNavUserDropdown({ userDropdownOpen, toggleUserDropdown }: UserDropdownProps) {
    return (
        <div className="user-dropdown relative">
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
    );
}
