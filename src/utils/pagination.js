

    // Generate pagination array with ellipsis where needed
    export function generatePagination(totalPages, currentPage) {
        let pagination = [];
        // If there are 7 or fewer pages, show them all
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pagination.push(i);
            }
        } else if (currentPage < 4) {
            pagination = [
                1, 2, 3, 4, "...", totalPages - 1, totalPages
            ]

        } else if (currentPage > totalPages - 3) {
            pagination = [
                1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages
            ]
        } else {
            pagination = [
                1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages
            ]
        }

        return pagination;
    }
