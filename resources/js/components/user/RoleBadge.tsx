interface RoleBadgeProps {
    role: 0 | 1 | 2;
}

export default function RoleBadge({ role }: RoleBadgeProps) {
    const styles = {
        0: 'bg-purple-100 text-purple-800',
        1: 'bg-blue-100 text-blue-800',
        2: 'bg-green-100 text-green-800',
    };

    const getRoleUser = (role: string | number) => {
        const r = Number(role);
        switch (r) {
            case 2:
                return 'User';
            case 1:
                return 'Employee';
            default:
                return 'Admin';
        }
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[role]}`}>
            {getRoleUser(role)}
        </span>
    );
}
