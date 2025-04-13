import { useState } from 'react';

export default function useDropdown() {
    const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
    const toggleUserDropdown = () => {
        setUserDropdownOpen((prev) => !prev);
    };

    const closeUserDropdown = () => {
        setUserDropdownOpen(false);
    };

    return { userDropdownOpen, toggleUserDropdown, closeUserDropdown };
}
