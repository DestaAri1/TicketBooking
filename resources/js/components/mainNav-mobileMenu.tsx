import { Link } from "@inertiajs/react";
import { Search } from "lucide-react";

export default function MainNavMobile() {
    return (
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
    );
}
