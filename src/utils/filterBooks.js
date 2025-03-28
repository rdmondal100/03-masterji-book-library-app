


export function filteredBooksByParameter(parameter, filterdBookArray) {
    if (!parameter) return filterdBookArray; 
    return filterdBookArray.sort((a, b) => {
        const infoA = a.volumeInfo || {};
        const infoB = b.volumeInfo || {};

        switch (parameter) {
            case 'title_asc':
                return (infoA.title || '').localeCompare(infoB.title || '');

            case 'title_desc':
                return (infoB.title || '').localeCompare(infoA.title || '');

            case 'date_asc':
                return new Date(infoA.publishedDate || 0) - new Date(infoB.publishedDate || 0);

            case 'date_desc': 
                return new Date(infoB.publishedDate || 0) - new Date(infoA.publishedDate || 0);

            default:
                return 0; 
        }
    });
}
