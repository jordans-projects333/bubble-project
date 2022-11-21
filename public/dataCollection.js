async function documentLoad(){
    let running = true
    while (running){
        if(document.readyState === "complete"){
            running = false
        }
    }
}

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
                        price: data.price,
                        element: `document.querySelectorAll(".grid-item")[${i}]`
                })
            })
            .catch(err => console.log(err))
    }
}

async function createGridItems(number){

    for(let i = 0; i < number; i++){
        const template = document.querySelector("#grid-item-template")
        const the_content = template.content.cloneNode(true)
        // the_content.querySelector("img").src = items[i].image
        // the_content.querySelector("h5").innerHTML = items[i].price + "<br>"+items[i].name
        document.querySelector(".grid-container").appendChild(the_content)
    }
}
fetch("/length")
    .then(response => response.json())
    .then(async data => {
        await DataCollection(data)
        return data
    })
    .then(async data => {
        await documentLoad()
        await createGridItems(data)
        document.querySelector("#main-loader").style.display = "none"
        document.querySelector(".product-number").innerText = `(${data})`
    })
    .catch(err => {
        console.log(err)

    })