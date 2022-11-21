async function load(){
    let running = true
    while (running){
        if(document.readyState === "complete"){
            running = false
        }
    }
}

async function DataCollection(number, firstIndex){
    for(let i = firstIndex; i < number; i++){
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

// fetch("/length")
//     .then(response => response.json())
//     .then(async data => {
//         // await DataCollection(data)
//         let loadAmount = 4
//         let lastIndex = await ultimate(data)
//         await load()
        
//         await createItem(loadAmount)
//         if(lastIndex < loadAmount){
//             await DataCollection(loadAmount, lastIndex)
//         }
//         await dataPlusItem(0, loadAmount)

//         console.log(items)
//         return data
//     })
//     // .then(async data => {
//     //     await load()
//     //     await createGridItems(data)
//     //     document.querySelector(".product-number").innerText = `(${data})`
//     // })
//     .catch(err => {
//         console.log(err)

//     })

fetch("/length")
    .then(response => response.json())
    .then(async data => {
        // await DataCollection(data)
        let DataLength = data
        let loadAmount = 6
        if(data > 40){
            data = 40
        }
        let loadedAlready = await ultimate(data)
        // let loadedAlready = 5
        // console.log("one "+data)
        // await DataCollection(5, 0)
        await load()
        // Function Load the loadedAlready
        // Function get the rest

        // get 4 empty spaces
        // await createItem(loadAmount)
        // if loaded is more than 4 empty spaces
        let first = 1
        while(data >= loadAmount){

            console.log(data+"DATA")
            // LOADEDALREADY DATA FIRST
            while(loadedAlready > loadAmount && loadedAlready != 0){
                await createItem(loadAmount)
                await dataPlusItem(first, first + loadAmount)
                first = first + loadAmount
                loadedAlready = loadedAlready - loadAmount
                data = data - loadAmount

            }
            
            // if loaded is less than 4 grab more and apply
            if(loadedAlready <= loadAmount && data >= loadAmount && loadedAlready != 0){
                // max then first index

                await DataCollection(first + loadAmount , first + loadedAlready)
                await dataPlusItem(first, first + loadAmount)
                first = first + loadAmount
                loadedAlready = loadedAlready - loadedAlready
                data = data - loadAmount
            }
            console.log(loadedAlready+"EEEEEEE")
            // GET NEW DATA THAT WASNT ASYNC LOADED
            while(data >= loadAmount){
                console.log("fired")
                await createItem(loadAmount)
                await DataCollection(first + loadAmount , first + loadedAlready)
                await dataPlusItem(first, first + loadAmount)
                first = first + loadAmount
                data = data - loadAmount

            }
            // if loaded is less than 4 grab more and apply
            // if(loadedAlready <= loadAmount){
            //     console.log("first "+first)
            //     console.log("loadedAlready "+loadedAlready)
            //     // max then first index

            //     await DataCollection(first + loadAmount , first + loadedAlready)
            //     await dataPlusItem(first, first + loadAmount)
            //     first = first + loadAmount
            //     data = data - loadAmount
            // }
        }
        
        

        console.log(items)
        console.log(data)
        return DataLength
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
    while(running){
        if(document.readyState === "complete" ){
            running = false
        }else if(dataIndex == 30){
            running = false
        }else if(dataIndex == maxDataIndex){
            running = false
        }else{
            await fetch(`item${dataIndex}`)
                .then(response => response.json())
                .then(data => {
                    items.push(
                        {
                            category: data.category,
                            description: data.description,
                            image: data.image,
                            name: data.name,
                            price: data.price,
                            element: `document.querySelectorAll(".grid-item")[${dataIndex}]`
                    })
                })
                .catch(err => console.log(err))
            dataIndex++
        }
    }
    return dataIndex
}

async function dataPlusItem(firstIndex, lastIndex){
    for(let i = firstIndex; i < lastIndex; i++){
        document.querySelectorAll(".grid-item")[i].querySelector("img").src = items[i].image
        document.querySelectorAll(".grid-item")[i].querySelector("h5").innerHTML = items[i].price + "<br>"+items[i].name
        document.querySelectorAll(".grid-item")[i].querySelector(".loader").style.display = "none"
    }
}