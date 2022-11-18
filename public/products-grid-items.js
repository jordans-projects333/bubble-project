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
    // console.log("clicked")
    document.querySelectorAll(".filter-item").forEach((item) => {
        // console.log(item)
        item.classList.remove("active-filter")
    })
    e.classList.add("active-filter")
    switch(e.innerText) {
        case "All":
            items.forEach((i)=>{
                i.element.classList.remove("filter-hide")
                i.element.classList.add("refreshAnimation")
            })
            break;
        case "Bombs":
            items.forEach((i)=>{
                if(i.category != "bomb"){
                    i.element.classList.add("filter-hide")
                }else{
                    i.element.classList.remove("filter-hide")
                    i.element.classList.add("refreshAnimation")
                }
            })
            break;
        case "Bars/Salts":
            items.forEach((i)=>{
                if(i.category != "bar"){
                    i.element.classList.add("filter-hide")
                }else{
                    i.element.classList.remove("filter-hide")
                    i.element.classList.add("refreshAnimation")
                }
            })
            break
        case "Rocks":
            items.forEach((i)=>{
                if(i.category != "rocks"){
                    i.element.classList.add("filter-hide")
                }else{
                    i.element.classList.remove("filter-hide")
                    i.element.classList.add("refreshAnimation")
                }
            })
            break
        case "Sets":
            items.forEach((i)=>{
                if(i.category != "set"){
                    i.element.classList.add("filter-hide")
                }else{
                    i.element.classList.remove("filter-hide")
                    i.element.classList.add("refreshAnimation")
                }
            })
            break
        }
}