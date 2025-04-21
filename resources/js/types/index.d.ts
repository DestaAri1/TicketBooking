import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 0 | 1 | 2;
    created_at: string;
    updated_at: string;
    email_verified_at: string;
    status: 0 | 1;
}

export interface TicketFormData {
    title: string;
    artist: string;
    date: string;
    time: string;
    venue: string;
    price: string;
    description: string;
    image: string;
    [key: string]: string | undefined;
}

export interface Ticket {
    id: number;
    name: string;
    artist: string;
    date: string;
    time: string;
    venue: string;
    price: number;
    status: 'active' | 'sold_out' | 'canceled' | 'draft';
    sales: number;
    imageUrl: string;
    createdAt: string;
}

export interface TicketFiltersProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
}

