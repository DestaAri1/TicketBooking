import { Link } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

interface DashLinkProps {
    href: string,
    classname: string,
    Icon: LucideIcon,
    title: string,
}

export default function DashLink({href, classname, Icon, title}: DashLinkProps) {
  return (
      <Link
          href={href}
          className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm ${classname}`}
      >
          <Icon className="mr-1.5 h-4 w-4" />
          {title}
      </Link>
  );
}
