import { Search } from "lucide-react";

export default function MainNavSearchBar() {
  return (
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
  );
}
