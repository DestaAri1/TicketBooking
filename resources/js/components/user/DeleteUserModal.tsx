interface DeleteConfirmationModalProps {
    isOpen: boolean;
    selectedUserToDelete: number | null;
    selectedUsers: number[];
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteConfirmationModal({ isOpen, selectedUserToDelete, selectedUsers, onClose, onConfirm }: DeleteConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
                <p className="mt-2 text-sm text-gray-500">
                    {selectedUserToDelete
                        ? 'Are you sure you want to delete this user? This action cannot be undone.'
                        : `Are you sure you want to delete ${selectedUsers.length} selected users? This action cannot be undone.`}
                </p>
                <div className="mt-4 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
