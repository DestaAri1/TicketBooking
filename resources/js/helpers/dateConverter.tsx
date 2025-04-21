export const formatDateToIndonesian = (isoDate: string): string => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'Asia/Jakarta',
    }).format(date);
};
