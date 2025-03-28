import { getBooksFromApi } from "./Services/bookServices.js"
import { createSkelitonOfBooksAndRenderONUi } from "./utils/createSkelitonOfBooksAndRenderONUi.js"
import { debounce } from "./utils/debounce.js"
import { filterBooks } from "./utils/filterBooks.js"
import { generatePagination } from "./utils/pagination.js"
import { toggleGridList } from "./utils/toggleGrid&List.js"

let currentPaginationDetails = {}
let currentPageAllBooks = []
let searchQuery = ''

document.addEventListener('DOMContentLoaded', async () => {
    //get books data from services
    async function getDataFromServices(pageCount = 1, bookPerPage = 15, searchQuery = "") {
        try {
            console.log(searchQuery)
            const bookContainer = document.getElementById('bookContainer')
            bookContainer.innerHTML = ''
            createSkelitonOfBooksAndRenderONUi()
            const { paginationDetails, booksArray } = await getBooksFromApi(pageCount, bookPerPage, searchQuery)

            if (Array.isArray(booksArray) && paginationDetails) {
                currentPageAllBooks = booksArray
                Object.assign(currentPaginationDetails, paginationDetails)
                console.log(currentPageAllBooks)
            }

            if (currentPageAllBooks.length) {
                renderBooks(currentPageAllBooks);
                renderPagination(currentPaginationDetails);
            } else {
                const pagenationContainer = document.querySelector(".pagination-container")
                console.log(pagenationContainer)
                pagenationContainer.style.display = 'none'
                const messageElement = document.createElement("div")
                messageElement.classList.add("message-no-book")
                bookContainer.innerHTML = ''
                messageElement.innerHTML = `
                <div> No books available </div>
                `
                bookContainer.appendChild(messageElement)
                console.log(messageElement)
                console.log(bookContainer)
                console.log("No books")
            }

        } catch (error) {
            console.log("Failed to get the data from services::", error)
        }
    }


    // create book card 
    function createBookCard(book) {
        if (book?.id) {
            //extract book details
            const bookThumbnail = book?.volumeInfo?.imageLinks?.thumbnail || './src/assets/default-book.png'
            const title = book?.volumeInfo?.title
            const authors = Array(book?.volumeInfo?.authors).join(",")
            const publisher = book?.volumeInfo?.publisher || "Unknown"
            const publishedDate = book?.volumeInfo?.publishedDate || "Unknown"
            const infoLink = book?.volumeInfo?.infoLink
            const description = book?.volumeInfo?.description || "No description provided"

            if (!title && !authors) {
                return
            }
            const bookCardWrapper = document.createElement("div")
            if (bookCardWrapper) {
                bookCardWrapper.classList.add("book-card-wrapper", "list-card-wrapper")
                bookCardWrapper.innerHTML = `
            <div class="book-card list-card" >
                    <a class="book-thumbnail list-thumbnail" href='${infoLink}' target="_blank">
                    <img src="${bookThumbnail}" alt="Book Thumbnail" class="list-img">
                    </a>
                    <div class="book-details list-details">
                        <div class="book-title">${title}</div>
                        <div class="book-author">${authors}</div>
                        <div class="book-meta"><span>Publisher:</span> ${publisher}</div>
                        <div class="book-meta"><span>Published Date:</span>${publishedDate}</div>
                        <div class="desc hidden">${description} </div>
                    </div>
                </div>
            `
                return bookCardWrapper
            }
        }
    }


    // render all books on the ui
    function renderBooks(allBooksArray = []) {
        // Clear books container before new data loads
        const bookContainer = document.getElementById('bookContainer')
        if (Array.isArray(allBooksArray) && allBooksArray.length) {
            bookContainer.innerHTML = '';
            allBooksArray.forEach((book) => {
                const bookCardWrapper = createBookCard(book)
                if (bookCardWrapper && bookContainer) {
                    bookContainer.appendChild(bookCardWrapper)
                }
            })
        }
    }


    // Render pagination UI dynamically
    function renderPagination(paginationDetails) {
        const { currentPage, isNextPage, isPreviousPage, totalBooks, totalPages } = paginationDetails
        const paginationArray = generatePagination(totalPages, currentPage);
        const paginationContainer = document.querySelector('.pagination-container');
        paginationContainer.innerHTML = ''
        if (!paginationContainer) return;

        //create and append prevbtn
        const prevBtnElement = document.createElement('button')
        prevBtnElement.classList.add("page-switch-btn", "prev")
        prevBtnElement.id = 'prevBtn'
        prevBtnElement.innerHTML = `<span> < </span> Prev`
        paginationContainer.append(prevBtnElement)


        // Create and append new pagination items
        const paginationElement = document.createElement("pagination")
        paginationElement.classList.add("pagination")
        paginationContainer.append(paginationElement)
        paginationArray.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('page-item');

            if (item === "...") {
                li.classList.add('disabled');
                li.innerHTML = `<span class="page-link">${item}</span>`;
            } else {
                // Mark active page
                if (item === currentPage) {
                    li.classList.add('active');
                }
                li.innerHTML = `<span class="page-link">${item}</span>`;
            }
            paginationElement.appendChild(li);
        });

        //create and append prevbtn
        const nextBtnElement = document.createElement('button')
        nextBtnElement.classList.add("page-switch-btn", "next")
        nextBtnElement.id = 'nextBtn'
        nextBtnElement.innerHTML = `Next<span> > </span>`
        paginationContainer.append(nextBtnElement)

        if (!isPreviousPage) {
            prevBtnElement.disabled = !isPreviousPage
        } else {
            prevBtnElement.disabled = !isPreviousPage
        }
        if (!isNextPage) {
            nextBtnElement.disabled = !isNextPage
        } else {
            nextBtnElement.disabled = !isNextPage
        }
    }

    //render differents pages books
    const paginationContainer = document.querySelector('.pagination-container');
    if (paginationContainer) {
        paginationContainer.addEventListener('click', async (e) => {
            const { currentPage, isNextPage, isPreviousPage } = currentPaginationDetails
            const target = e.target;
            const pageSwitchBtn =
                target.closest(".page-switch-btn")
            const pageElement = target.closest('.page-item')
            console.log(pageSwitchBtn)
            if (pageSwitchBtn) {
                console.log(currentPaginationDetails)
                if (target.id === 'prevBtn' && isPreviousPage) {
                    await getDataFromServices(currentPage - 1, 15, searchQuery);
                } else if (target.id === 'nextBtn' && isNextPage) {
                    await getDataFromServices(currentPage + 1, 15, searchQuery);
                }
            }

            else if (pageElement && pageElement.classList.contains('page-item') && !(pageElement.classList.contains('disabled'))) {
                const pageNumber = parseInt(pageElement.innerText, 10);
                if (isNaN(pageNumber)) return;

                // Wait for new data before rendering
                await getDataFromServices(pageNumber, 15, searchQuery);

            }
            else {
                return
            }
        });
    }


    // search functionality -> apply search based on textSnippet, title and subtitle provided by the api
    function searchBooks() {
        const searchInputElement = document.getElementById("searchInput")
        const { currentPage } = currentPaginationDetails
        if (searchInputElement) {
            const searchWithDebounce = debounce(getDataFromServices, 1)
            searchInputElement.addEventListener('input', () => {
                searchQuery = String(searchInputElement.value)
                searchWithDebounce(currentPage, 15, searchQuery)

            })
        }
    }




    //initial render
    await getDataFromServices()
    renderBooks(currentPageAllBooks)
    searchBooks()
    toggleGridList()

    filterBooks(currentPaginationDetails)
    


})
