import { getBooksFromApi } from "../Services/bookServices.js"


export function filterBooks(currentPaginationDetails){
    
    console.log(currentPaginationDetails)
    const filterElement = document.getElementById("sortBy")
    filterElement.addEventListener('change',async()=>{
        const filterParameter = filterElement.value
        const {booksArray } = await getBooksFromApi(1, currentPaginationDetails?.totalBooks,'')
        console.log(booksArray.length)
        if(booksArray.length){
            filteredBooksByParameter(filterParameter,booksArray)
        }
    })
}


        const filteredArray = function filteredBooksByParameter(parameter,filterdBookArray){
console.log(filteredArray)
    if(!parameter) return

    filterdBookArray.sort((a,b)=>{
        const infoA = a.volumeInfo
        const infoB = b.volumeInfo
        console.log(titleA,titleB)
        
    switch(parameter){
        case 'title_asc':
            return (infoA.title || '').localeCompare(infoB.title)

        case 'title_desc':
            return (infoB.title || '').localeCompare(infoA.title)
            
        case 'date_asc':
            return new Date(infoA.publishedDate || 0) - new Date(infoB.publishedDate)

        case 'date':

        return new Date(infoB.publishedDate || 0) - new Date(infoA.publishedDate)


        default:
            return []
    }
})

}