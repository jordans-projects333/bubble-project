async function load(){
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
async function createItem(number){
    for(let i = 0; i < number; i++){
        const template = document.querySelector("#grid-item-template")
        const the_content = template.content.cloneNode(true)
        // the_content.querySelector("img").src = items[i].image
        // the_content.querySelector("h5").innerHTML = items[i].price + "<br>"+items[i].name
        document.querySelector(".grid-container").appendChild(the_content)
    }
}
async function createGridItems(number){
    let loadNumber = 4
    let itemsLeft = number
    let ppp = true
    while(ppp){
        if( itemsLeft >= loadNumber){
            await createItem(loadNumber)
            itemsLeft = itemsLeft - loadNumber
        }else{
            ppp = false
        }
    }
    createItem(itemsLeft)
}

fetch("/length")
    .then(response => response.json())
    .then(async data => {
        // await DataCollection(data)
        alert(await ultimate(data))
        return data
    })
    // .then(async data => {
    //     await load()
    //     await createGridItems(data)
    //     document.querySelector(".product-number").innerText = `(${data})`
    // })
    .catch(err => {
        console.log(err)

    })

async function ultimate(maxDataIndex){
    let dataIndex = 0
    let running = true
    console.log("fired")
    while(running){
        if(document.readyState === "complete" ){
            running = false
        }else if(dataIndex == 100000){
            running = false
        }else if(dataIndex == 100000){
            running = false
        }else{
            
                console.log(dataIndex)

            dataIndex++
        }
    }
    return dataIndex
}