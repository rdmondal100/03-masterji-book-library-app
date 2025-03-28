

//load skeliton of books
export  function createSkelitonOfBooksAndRenderONUi(cardCount = 15) {
    const bookContainer = document.getElementById('bookContainer')
    const isListLayout = bookContainer.classList.contains("list-container")
    console.log(isListLayout)
    if (bookContainer) {
        for (let i = 0; i < cardCount; i++) {
            const skelitonElementOfBookCard = document.createElement("div")
            skelitonElementOfBookCard.classList.add("skeliton-card-wrapper", "skeliton-list-wrapper")
            skelitonElementOfBookCard.innerHTML = `
            <div class="book-card"> 
            <div class="skeliton-thumbnail skeliton-list-thumbnail">
                <div class="img"></div>
            </div>
            <div class="skeliton-details skeliton-list-details">
                <div class="skeliton-title skeliton-list-title"></div>
                <div class="skeliton-meta skeliton-list-meta"></div>
                <div class="skeliton-meta skeliton-list-meta"></div>
                <div class="skeliton-meta skeliton-list-meta"></div>
                ${isListLayout ? '<div class="skeliton-meta skeliton-list-desc"></div>' : ""}
            </div>
            </div>
                    `
            bookContainer.appendChild(skelitonElementOfBookCard)
        }
    }
}