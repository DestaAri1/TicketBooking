import { Link } from '@inertiajs/react';
import { Music } from 'lucide-react';

export default function MainNavTittle() {
  return (
      <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
              <Music className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">MusicTix</span>
          </Link>
      </div>
  );
}
