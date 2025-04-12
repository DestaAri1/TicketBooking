interface RoleBadgeProps {
    role: 'admin' | 'employee' | 'user';
}

export default function RoleBadge({ role }: RoleBadgeProps) {
    const styles = {
        admin: 'bg-purple-100 text-purple-800',
        employee: 'bg-blue-100 text-blue-800',
        user: 'bg-green-100 text-green-800',
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[role]}`}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
    );
}
