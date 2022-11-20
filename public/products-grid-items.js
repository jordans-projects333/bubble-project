// Filter sticks to navbar on scroll
// let filter = document.querySelector(".filter-wrapper")
// let filterPosition = document.querySelector(".filter")
// document.querySelector(".filter").style.height = filter.offsetHeight+"px"
// window.addEventListener('scroll',()=>{ 
//     let header = document.querySelector("header")
//     if(filterPosition.getBoundingClientRect().top <= header.getBoundingClientRect().bottom){
//         filter.classList.add("filter-sticky")
        

//     }else{
//         filter.classList.remove("filter-sticky")
//     }
// })

// === Filter slider 
function sliderPosition(position){
    let firstPosition = document.querySelector(".filter-wrapper").children[position].getBoundingClientRect().left
    let secondPosition = document.querySelector(".filter-wrapper").children[position].getBoundingClientRect().right
    let sliderwidth = (secondPosition - firstPosition)
    document.querySelector(".filter-slider").style.left = firstPosition - 10 +"px"
    document.querySelector(".filter-slider").style.width = sliderwidth + 15 + "px"
}

sliderPosition(0)
let items = []
// Creating the product grid from data
async function DataCollection(number){
    for(let i = 0; i < number; i++){
        // const template = document.querySelector("#grid-item-template")
        // const the_content = template.content.cloneNode(true)
        await fetch(`item${i}`)
            .then(response => response.json())
            .then(data => {
                // the_content.querySelector("img").src = data.image
                // the_content.querySelector("h5").innerHTML = data.price + "<br>"+data.name
                // document.querySelector(".grid-container").appendChild(the_content)
                // let numberOfChildNodes = document.querySelector(".grid-container").childElementCount
                // let getContent = document.querySelector(".grid-container").children[numberOfChildNodes-1]
                items.push(
                    {
                        id: i,
                        category: data.category,
                        description: data.description,
                        image: data.image,
                        name: data.name,
                        price: data.price
                })
            })
            .catch(err => console.log(err))
    }
}

async function createGridItems(number){
    for(let i = 0; i < number; i++){
        const template = document.querySelector("#grid-item-template")
        const the_content = template.content.cloneNode(true)
        // console.log(items[i].name)

        the_content.querySelector("img").src = items[i].image
        the_content.querySelector("h5").innerHTML = items[i].price + "<br>"+items[i].name
        document.querySelector(".grid-container").appendChild(the_content)
    }
}
fetch("/length")
    .then(response => response.json())
    .then(async data => {
        await DataCollection(data)
        // for(let i = 0; i < data; i++){
        //     const template = document.querySelector("#grid-item-template")
        //     const the_content = template.content.cloneNode(true)
        //     document.querySelector(".grid-container").appendChild(the_content)
        // }
        return data
    })
    .then(async data => {
        console.log("data collected")
        await createGridItems(data)
        document.querySelector(".loader").style.display = "none"
        document.querySelector(".product-number").innerText = `(${data})`
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

function getProduct(e){
    // Transition
    document.querySelector(".productInfoSection").classList.remove("slideOneOut")
    document.querySelector(".slideContent").classList.remove("slideTwoIn")
    document.querySelector(".productInfoSection").classList.add("slideOneIn")
    document.querySelector(".slideContent").classList.add("slideTwoOut")

    // Get data
    imageData = e.querySelector("img").src
    titleData = e.querySelector("h5").innerText
    document.querySelector(".product-image").src = imageData
    document.querySelector(".product-title").innerText = titleData

    // Get Reviews
}
function backHome(){
    document.querySelector(".productInfoSection").classList.remove("slideOneIn")
    document.querySelector(".slideContent").classList.remove("slideTwoOut")
    document.querySelector(".productInfoSection").classList.add("slideOneOut")
    document.querySelector(".slideContent").classList.add("slideTwoIn")
}