

export const getBooksFromApi = async (pageCount,bookPerPage,searchQuery) => {
    try {
        const response = await axios.get(`https://api.freeapi.app/api/v1/public/books?page=${pageCount}&limit=${bookPerPage}&query=${searchQuery}`)

        if (response?.statusText === "OK") {
            if (!response.data.data) {
                throw new Error("The response structure is mismatch")
            }

            //extract values from data
            console.log(response.data.data)
            const booksCount = response?.data?.data?.limit
            const isNextPage = response?.data?.data?.nextPage
            const currentPage = response?.data?.data?.page
            const isPreviousPage = response?.data?.data?.previousPage
            const totalBooks = response?.data?.data?.totalItems
            const totalPages = response?.data?.data?.totalPages
            const booksArray = response?.data?.data?.data
            const paginationDetails={booksCount,isNextPage,currentPage,isPreviousPage,totalBooks,totalPages,}

            return { paginationDetails, booksArray }

        }
    } catch (error) {
        console.log("Failed to get Books from api::", error)
    }
}