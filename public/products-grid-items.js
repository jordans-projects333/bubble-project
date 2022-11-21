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
// let items = []
// Creating the product grid from data
function filterClick(e){
    document.querySelector(".product-number").classList.remove("temp-spin")
    let slider = document.querySelector(".filter-slider")
    let total = (document.querySelector(".grid-container").childElementCount) -1
    document.querySelectorAll(".filter-item").forEach((item) => {
        // console.log(item)
        item.classList.remove("active-filter")
    })
    items.forEach((i)=>{
        eval(i.element).classList.remove("refreshAnimation")
    })
    // document.querySelector(".product-number").classList.remove("refreshAnimation")
    e.classList.add("active-filter")
    switch(e.innerText) {
        case "All":
            sliderPosition(0)
            items.forEach((i, index)=>{
                eval(i.element).classList.remove("filter-hide")
                eval(i.element).classList.add("refreshAnimation")
                // document.querySelector(".products-title").classList.add("refreshAnimation")
            })
            break;
        case "Sets":
            sliderPosition(1)
            items.forEach((i)=>{
                if(i.category != "set"){
                    eval(i.element).classList.add("filter-hide")
                }else{
                    eval(i.element).classList.remove("filter-hide")
                    eval(i.element).classList.add("refreshAnimation")
                    // document.querySelector(".products-title").classList.add("refreshAnimation")
                }
            })
            break
        case "Bombs":
            sliderPosition(2)
            items.forEach((i, index)=>{
                if(i.category != "bomb"){
                    eval(i.element).classList.add("filter-hide")
                }else{
                    eval(i.element).classList.remove("filter-hide")
                    eval(i.element).classList.add("refreshAnimation")
                    // document.querySelector(".products-title").classList.add("refreshAnimation")
                }
            })
            break;
        case "Rocks":
            sliderPosition(3)
            items.forEach((i)=>{
                if(i.category != "rocks"){
                    eval(i.element).classList.add("filter-hide")
                }else{
                    eval(i.element).classList.remove("filter-hide")
                    eval(i.element).classList.add("refreshAnimation")
                    // document.querySelector(".products-title").classList.add("refreshAnimation")
                }
            })
            break
        case "Bars/Salts":
            sliderPosition(4)
            items.forEach((i)=>{
                if(i.category != "bar"){
                    eval(i.element).classList.add("filter-hide")
                }else{
                    eval(i.element).classList.remove("filter-hide")
                    eval(i.element).classList.add("refreshAnimation")
                    document.querySelector(".products-title").classList.add("refreshAnimation")
                }
            })
            break
        }
        document.querySelector(".products-title").innerHTML = `Products<span class="product-number">(${total-document.querySelectorAll('.filter-hide').length -1})</span>`
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