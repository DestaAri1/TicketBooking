import { Bell } from 'lucide-react';
import { useState } from 'react';
import MainNavMobile from './mainNav-mobileMenu';
import MainNavNavigation from './mainNav-navigation';
import MainNavSearchBar from './mainNav-searchBar';
import MainNavTittle from './mainNav-tittle';
import MainNavUserDropdown from './mainNav-userDropdown';
import useDropdown from '@/hooks/use-user-dropdown';

export default function MainNav() {
    const {userDropdownOpen, toggleUserDropdown, closeUserDropdown} = useDropdown();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    };

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo and Main Nav */}
                    <div className="flex items-center">
                        <MainNavTittle />
                        <MainNavNavigation />
                    </div>

                    <MainNavSearchBar />

                    {/* Right Side Navigation */}
                    <div className="flex items-center space-x-4">
                        <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                            <Bell className="h-6 w-6" />
                        </button>

                        {/* User Dropdown dengan props closeUserDropdown */}
                        <MainNavUserDropdown
                            userDropdownOpen={userDropdownOpen}
                            toggleUserDropdown={toggleUserDropdown}
                            closeUserDropdown={closeUserDropdown}
                        />

                        {/* Mobile Menu Button */}
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

            {mobileMenuOpen && <MainNavMobile />}
        </nav>
    );
}
