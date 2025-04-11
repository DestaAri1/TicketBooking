import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';

export default function user() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'User',
            href: '/dashboard/user',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <div className="mt-2 mr-4 flex justify-end">
                <Link href="/dashboard/user/add-user" className="flex h-8 w-34 justify-center rounded-full bg-gray-600 font-semibold text-white">
                    <div className="flex items-center justify-center gap-2">
                        <CirclePlus />
                        <span className="text-md">Add User</span>
                    </div>
                </Link>
            </div>
        </AppLayout>
    );
}
