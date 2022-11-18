// Creating the product grid from data
function createGridItems(number){
    for(let i = 0; i < number; i++){
        const template = document.querySelector("#grid-item-template")
        const content = template.content.cloneNode(true)
        fetch(`item${i}`)
            .then(response => response.json())
            .then(data => {
                // div.innerHTML = data.name
                content.querySelector("a").href = `/product${i}`
                content.querySelector("img").src = data.image
                // content.querySelector(".addToCart").addEventListener("click", () => addToTheCart(data.image,data.name,data.price))
                content.querySelector("h5").innerHTML = data.price + "<br>"+data.name
                document.querySelector(".grid-container").appendChild(content)
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
