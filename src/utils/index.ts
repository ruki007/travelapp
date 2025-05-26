const formatDate = (date: Date, format: string): string => {
    const options: Intl.DateTimeFormatOptions = {};

    if (format.includes('YYYY')) {
        options.year = 'numeric';
    }
    if (format.includes('MM')) {
        options.month = '2-digit';
    }
    if (format.includes('DD')) {
        options.day = '2-digit';
    }

    return new Intl.DateTimeFormat('ja-JP', options).format(date);
};

const generateUniqueId = (): string => {
    return 'id-' + Math.random().toString(36).substr(2, 16);
};

export { formatDate, generateUniqueId };