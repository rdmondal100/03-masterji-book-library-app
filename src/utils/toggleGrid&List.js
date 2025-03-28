

export function toggleGridList() {
    const toggleBtn = document.querySelector('.grid-list-wrapper .icon')
    let iconArray = document.querySelectorAll(".grid-list-wrapper .icon .fa-solid") || []
    toggleBtn.addEventListener('click', () => {
        iconArray = Array.from(iconArray)
        if (Array.isArray(iconArray)) {
            iconArray?.map((item) => {
                if (item?.classList?.contains("active")) {
                    item?.classList?.remove("active")
                } else {
                    item?.classList?.add("active")
                }
            })

            const isListActive = document.querySelector('.fa-list').classList.contains("active")
            const mainContainer = document.getElementById('bookContainer')
            const descArray = document.querySelectorAll(".desc")
            if(isListActive){
                mainContainer.classList.remove('list-container')
                descArray.forEach((item)=>{
                    item.classList.add("hidden")
                })
            }else{
                mainContainer.classList.add('list-container')
                descArray.forEach((item)=>{
                    item.classList.remove("hidden")
                })

            }
        }
    })
}

