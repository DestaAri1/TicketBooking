import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [], user = [], ticket = [] }: { items: NavItem[]; user: NavItem[]; ticket: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.href === page.url} tooltip={item.title}>
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon className="flex-shrink-0" />}
                                    <span className="truncate">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
            <SidebarGroupLabel>Manage Ticket</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {ticket.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.href === page.url} tooltip={item.title}>
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon className="flex-shrink-0" />}
                                    <span className="truncate">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
            <SidebarGroupLabel>Manage User</SidebarGroupLabel>
            <SidebarMenu>
                {user.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.href === page.url} tooltip={item.title}>
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon className="flex-shrink-0" />}
                                <span className="truncate">{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
