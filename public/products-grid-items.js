// Filter sticks to navbar on scroll
let filter = document.querySelector(".filter-wrapper")
let filterPosition = document.querySelector(".filter")
document.querySelector(".filter").style.height = filter.offsetHeight+"px"
window.addEventListener('scroll',()=>{ 
    let header = document.querySelector("header")
    if(filterPosition.getBoundingClientRect().top <= header.getBoundingClientRect().bottom){
        filter.classList.add("filter-sticky")
        

    }else{
        filter.classList.remove("filter-sticky")
    }
})
// === Filter slider 
function sliderPosition(position){
    let firstPosition = document.querySelector(".filter-wrapper").children[position].getBoundingClientRect().left
    let secondPosition = document.querySelector(".filter-wrapper").children[position].getBoundingClientRect().right
    let sliderwidth = (secondPosition - firstPosition)
    document.querySelector(".filter-slider").style.left = firstPosition - 10 +"px"
    document.querySelector(".filter-slider").style.width = sliderwidth + 15 + "px"
}

sliderPosition(0)
items = []
// Creating the product grid from data
function createGridItems(number){
    for(let i = 0; i < number; i++){
        const template = document.querySelector("#grid-item-template")
        const the_content = template.content.cloneNode(true)
        fetch(`item${i}`)
            .then(response => response.json())
            .then(data => {
                // div.innerHTML = data.name
                the_content.querySelector("a").href = `/product${i}`
                the_content.querySelector("img").src = data.image
                // content.querySelector(".addToCart").addEventListener("click", () => addToTheCart(data.image,data.name,data.price))
                the_content.querySelector("h5").innerHTML = data.price + "<br>"+data.name
                document.querySelector(".grid-container").appendChild(the_content)
                let numberOfChildNodes = document.querySelector(".grid-container").childElementCount
                let getContent = document.querySelector(".grid-container").children[numberOfChildNodes-1]
                // console.log(getContent)
                items.push({element: getContent, category: data.category})
            })
            .catch(err => console.log(err))
    }
}
fetch("/length")
    .then(response => response.json())
    .then(data => {
        createGridItems(data)
    })
    .catch(err => console.log(err))

function filterClick(e){
    document.querySelector(".product-number").classList.remove("temp-spin")
    let slider = document.querySelector(".filter-slider")
    let total = (document.querySelector(".grid-container").childElementCount) -1
    document.querySelectorAll(".filter-item").forEach((item) => {
        // console.log(item)
        item.classList.remove("active-filter")
    })
    items.forEach((i)=>{
        i.element.classList.remove("refreshAnimation")
    })
    // document.querySelector(".product-number").classList.remove("refreshAnimation")
    e.classList.add("active-filter")
    switch(e.innerText) {
        case "All":
            sliderPosition(0)
            items.forEach((i, index)=>{
                i.element.classList.remove("filter-hide")
                i.element.classList.add("refreshAnimation")
                // document.querySelector(".products-title").classList.add("refreshAnimation")
            })
            break;
        case "Sets":
            sliderPosition(1)
            items.forEach((i)=>{
                if(i.category != "set"){
                    i.element.classList.add("filter-hide")
                }else{
                    i.element.classList.remove("filter-hide")
                    i.element.classList.add("refreshAnimation")
                    // document.querySelector(".products-title").classList.add("refreshAnimation")
                }
            })
            break
        case "Bombs":
            sliderPosition(2)
            items.forEach((i, index)=>{
                if(i.category != "bomb"){
                    i.element.classList.add("filter-hide")
                }else{
                    i.element.classList.remove("filter-hide")
                    i.element.classList.add("refreshAnimation")
                    // document.querySelector(".products-title").classList.add("refreshAnimation")
                }
            })
            break;
        case "Rocks":
            sliderPosition(3)
            items.forEach((i)=>{
                if(i.category != "rocks"){
                    i.element.classList.add("filter-hide")
                }else{
                    i.element.classList.remove("filter-hide")
                    i.element.classList.add("refreshAnimation")
                    // document.querySelector(".products-title").classList.add("refreshAnimation")
                }
            })
            break
        case "Bars/Salts":
            sliderPosition(4)
            items.forEach((i)=>{
                if(i.category != "bar"){
                    i.element.classList.add("filter-hide")
                }else{
                    i.element.classList.remove("filter-hide")
                    i.element.classList.add("refreshAnimation")
                    document.querySelector(".products-title").classList.add("refreshAnimation")
                }
            })
            break
        }
        document.querySelector(".products-title").innerHTML = `Products<span class="product-number">(${total-document.querySelectorAll('.filter-hide').length})</span>`
        document.querySelector(".product-number").classList.add("temp-spin")
}