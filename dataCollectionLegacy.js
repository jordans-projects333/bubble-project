// async function load(){
//     let running = true
//     while (running){
//         if(document.readyState === "complete"){
//             running = false
//         }
//     }
//     console.log("loaded")
// }



// async function DataCollection(number){
//     for(let i = 0; i < number; i++){
//         // const template = document.querySelector("#grid-item-template")
//         // const the_content = template.content.cloneNode(true)
//         await fetch(`item${i}`)
//             .then(response => response.json())
//             .then(data => {
//                 // the_content.querySelector("img").src = data.image
//                 // the_content.querySelector("h5").innerHTML = data.price + "<br>"+data.name
//                 // document.querySelector(".grid-container").appendChild(the_content)
//                 // let numberOfChildNodes = document.querySelector(".grid-container").childElementCount
//                 // let getContent = document.querySelector(".grid-container").children[numberOfChildNodes-1]
//                 items.push(
//                     {
//                         id: i,
//                         category: data.category,
//                         description: data.description,
//                         image: data.image,
//                         name: data.name,
//                         price: data.price,
//                         element: `document.querySelectorAll(".grid-item")[${i}]`
//                 })
//             })
//             .catch(err => console.log(err))
//         if(document.readyState === "complete"){
//             for(let i = 0; i < number; i++){

//             }
//         }
//     }
// }
// async function createItem(number){
//     for(let i = 0; i < number; i++){
//         const template = document.querySelector("#grid-item-template")
//         const the_content = template.content.cloneNode(true)
//         // the_content.querySelector("img").src = items[i].image
//         // the_content.querySelector("h5").innerHTML = items[i].price + "<br>"+items[i].name
//         document.querySelector(".grid-container").appendChild(the_content)
//     }
// }
// async function createGridItems(number){
//     let loadNumber = 4
//     let itemsLeft = number
//     let ppp = true
//     while(ppp){
//         if( itemsLeft >= loadNumber){
//             await createItem(loadNumber)
//             itemsLeft = itemsLeft - loadNumber
//         }else{
//             ppp = false
//         }
//     }
//     createItem(itemsLeft)
// }

// // fetch("/length")
// //     .then(response => response.json())
// //     .then(async data => {
// //         // await DataCollection(data)
// //         let loadAmount = 4
// //         let lastIndex = await ultimate(data)
// //         await load()
        
// //         await createItem(loadAmount)
// //         if(lastIndex < loadAmount){
// //             await DataCollection(loadAmount, lastIndex)
// //         }
// //         await dataPlusItem(0, loadAmount)

// //         console.log(items)
// //         return data
// //     })
// //     // .then(async data => {
// //     //     await load()
// //     //     await createGridItems(data)
// //     //     document.querySelector(".product-number").innerText = `(${data})`
// //     // })
// //     .catch(err => {
// //         console.log(err)

// //     })

// fetch("/length")
//     .then(response => response.json())
//     .then(async data => {
//         if(data > 30){
//             data = 30
//         }
//         await DataCollection(data)
//     })
//     .catch(err => {
//         console.log(err)

//     })

// async function ultimate(maxDataIndex){
//     let dataIndex = 0
//     let running = true
//     while(running){
//         if(document.readyState === "complete" ){
//             running = false
//         }else if(dataIndex == 30){
//             running = false
//         }else if(dataIndex == maxDataIndex){
//             running = false
//         }else{
//             await fetch(`item${dataIndex}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     items.push(
//                         {
//                             category: data.category,
//                             description: data.description,
//                             image: data.image,
//                             name: data.name,
//                             price: data.price,
//                             element: `document.querySelectorAll(".grid-item")[${dataIndex}]`
//                     })
//                 })
//                 .catch(err => console.log(err))
//             dataIndex++
//         }
//     }
//     return dataIndex
// }

// async function dataPlusItem(firstIndex, lastIndex){
//     for(let i = firstIndex; i < lastIndex; i++){
//         document.querySelectorAll(".grid-item")[i].querySelector("img").src = items[i].image
//         document.querySelectorAll(".grid-item")[i].querySelector("h5").innerHTML = items[i].price + "<br>"+items[i].name
//         document.querySelectorAll(".grid-item")[i].querySelector(".loader").style.display = "none"
//     }
// }




// ===== Data collection =============================================================================================================================================================
// Get number of products
let searchedAlready = {
    priority: {value: 0, skip: []},
    set: {value: 0, skip: []},
    bomb: {value: 0, skip: []},
    rocks: {value: 0, skip: []},
    bar: {value: 0, skip: []}
}

async function loadDataIntoItem(dataName, dataPrice, dataImage){
    if(document.querySelectorAll(".unloaded").length == 0){
        for(let i = 0; i < numberOfRows; i++){
            const template = document.querySelector("#grid-item-template")
            const the_content = template.content.cloneNode(true)
            // the_content.querySelector("img").src = items[0].image
            document.querySelector(".grid-container").appendChild(the_content)
        }
    }
    let getUnloadedElement = document.querySelectorAll(".unloaded")[0]
    getUnloadedElement.querySelector("img").src = dataImage
    getUnloadedElement.querySelector("h5").innerHTML = dataPrice + "<br>"+dataName
    getUnloadedElement.querySelector(".loader").style.display = "none"
    getUnloadedElement.classList.remove("unloaded")
}
async function dataCollection(filter, count, filterNumber){
    // if priority is maxed out fetch something else
    dataSettings.dataCollected++
    Object.values(searchedAlready)[filterNumber].value++
    // console.log("oof")
    // if(filterNumber == 4){
        // console.log(Object.values(searchedAlready)[filterNumber].skip+" skip list")
        // console.log(Object.values(searchedAlready)[filterNumber].value+" current total of "+filter)
        // console.log(Object.values(searchedAlready)[2].skip+" also bomb skip list")
        // console.log(Object.values(searchedAlready)[2].value+" also bomb current total of "+filter)
        // console.log(((Object.values(searchedAlready)[filterNumber].skip).includes(Object.values(searchedAlready)[filterNumber].value)))
    // }
    if(((Object.values(searchedAlready)[filterNumber].skip).includes(Object.values(searchedAlready)[filterNumber].value)) == false){
        // console.log("fired")
        await fetch(`item/${filter}/${Object.values(searchedAlready)[filterNumber].value -1}`)
        .then(response => response.json())
        .then(response => {
            items.push(
                {
                    // id: dataSettings.dataCollected,
                    name: response.name,
                    price: response.price,
                    category: response.category
                    // description: response.description,
                    // image: response.image,
                    // element: `document.querySelectorAll(".grid-item")[${count}]`
            })
            for(let i = 0; i < dataSettings.numberOfFilters; i++){
                // console.log(`response.position${i} = `+response.position[i]+`   >=   searchedAlready[${i}] = `+Object.values(searchedAlready)[i].value)
                if(response.position[i] >= Object.values(searchedAlready)[i].value + 1){
                    Object.values(searchedAlready)[i].skip.push(response.position[i])
                    // console.log(response.position[i]+" stored, as its bigger than "+Object.values(searchedAlready)[i].value)
                }else{
                    // console.log(response.position[i]+" not stored, as its smaller than "+Object.values(searchedAlready)[i].value)
                }
            }
            if(document.readyState == "complete"){
                console.log("not Pre")
                loadDataIntoItem(response.name, response.price,response.image)
            }else{
                window.addEventListener("load", () => {
                    // THiS AINT WORKING
                    console.log("Pre")
                    loadDataIntoItem(response.name, response.price,response.image)
                });
            }
            // console.log(response.name)
            // console.log(searchedAlready)
        })
        .catch(err => console.log(err))
    }else{
        // console.log("fired")
        let value = Object.values(searchedAlready)[filterNumber].value
        let arr = Object.values(searchedAlready)[filterNumber].skip
        Object.values(searchedAlready)[filterNumber].skip = arr.filter(item => item !== value)
    }
}
    
// async function dataAppended(){
// //    console.log(items.length)
//     try{
//         if(items.length > 0){
//             console.log("worked::before " + items[0].name)
//             // await creationOfGrifItem()
//             items.shift()
//             console.log("worked::after " + items.length)
//         }else{
//             console.log("NOT WORKED")
//         }
//     }catch{
//         console.log("not worked")
//         return
//     }
// }
async function creationOfGrifItem(){
    const template = document.querySelector("#grid-item-template")
    const the_content = template.content.cloneNode(true)
    the_content.querySelector("img").src = items[0].image
    the_content.querySelector("h5").innerHTML = items[0].price + "<br>"+items[i].name
    document.querySelector(".grid-container").appendChild(the_content)
}

async function mainFunction(){
    let count = 0
    // let count = {allIndex: 0, setsIndex: 0, ect}
    // Fetch total number of products
    // Also get the total number of each category??
    await fetch("/length")
        .then(response => response.json())
        .then(async data => {
            // console.log("important "+data[0].total)
            switch(dataSettings.filter) {
                case "priority":
                    await dataCollection("priority", count, 0)
                    break;
                case "set":
                    await dataCollection("set", count, 1)
                    break;
                case "bomb":
                    console.log("fired")
                    await dataCollection("bomb", count, 2)
                    break;
                case "rocks":
                    await dataCollection("rocks", count, 3)
                    break;
                case "bar":
                    console.log("fired")
                    await dataCollection("bar", count, 4)
                    break;
                }
                count++
        
        // console.log("out of the while loop")
        // dataSettings.allDataAddedToGridItems = true
    })
    .catch(err => {
        console.log(err)
    })
    // console.log("this is the big one")
    // console.log(items)
    
}
mainFunction()
// load more = +40 to 'number to load' and true = false
// load selected filter first then load 
// DataCollectionSettings = {
//     // filter: [completed, number to load(based on total of category), data index for that folder, backlog of data(if all = true)]
//     priority: [true, 80, 90, 10],
//     sets: [true, 40, 45, 5],
//     bombs: [false, 80, 20, 0],
//     rocks: [false, 40, 0, 0],
//     barsSalts: [false, 40, 39, 0]
// }
// ==== Initial data collection ===
// data includes Name, Price, image url
// check is content is saved on local storage?
// get data name, check if its in local storage if no then fetch the rest, if yes then dont.
// fetch data based on filter then go back to all? how does it know it hasnt been there already?
// go one by one and remember the index, when filter is clicked then only get relevant data once finished go back to index and go again??
// default:  load 40 items, then check if 40 items of the next category have been loaded if not load one, round robin
// filter: clicked

// === Grid items ===
// if user is near footer then spawn grid items with a function that demand data
// preload images

// === Images ===
// iamge folder not with user, put link in img href tag to server
// depending on image size depends on server image request eg: mobile/web

// === Misc ===
// pre load fonts
// defer css or maybe seperate product listings in seperate file

// what about searching?