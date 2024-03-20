export const colorBadge = (itemName: string | undefined) => {
    switch (itemName) {
        case 'Силовая':
            return 'success';
        case 'Ноги':
            return 'error';
        case 'Руки':
            return 'warning';
        case 'Спина':
            return 'processing';
        case 'Грудь':
            return 'default';
        default:
            return 'default';
    }
};
