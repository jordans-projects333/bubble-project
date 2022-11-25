// ===== Data collection =============================================================================================================================================================
// ===== Tracking searched items =====
let searchedAlready = {
    priority: {value: 0, skip: []},
    set: {value: 0, skip: []},
    bomb: {value: 0, skip: []},
    rocks: {value: 0, skip: []},
    bar: {value: 0, skip: []}
}

// ===== Creating product item with data
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
    getUnloadedElement.querySelector(".pre-loading").remove()
    getUnloadedElement.style.border = "none"
    dataSettings.storedElements.bomb.push(getUnloadedElement)
    console.log(dataSettings.storedElements.bomb[0])
}

// ===== Collect a data item based on parameters =====
async function dataCollection(filter, filterNumber, filterMax){
    // Add tracking to data list
    dataSettings.dataCollected++
    Object.values(searchedAlready)[filterNumber].value++
    // Check to see if potential search is already in grid
    if(((Object.values(searchedAlready)[filterNumber].skip).includes(Object.values(searchedAlready)[filterNumber].value)) == false){
        // Fetch the item
        await fetch(`item/${filter}/${Object.values(searchedAlready)[filterNumber].value -1}`)
        .then(response => response.json())
        .then(response => {
            // For each filter check for duplicate and add to corresponding list
            for(let i = 0; i < dataSettings.numberOfFilters; i++){
                if(response.position[i] >= Object.values(searchedAlready)[i].value + 1){
                    Object.values(searchedAlready)[i].skip.push(response.position[i])
                }
            }
            // If window loaded then add product, else add event listener to call it on load
            if(document.readyState == "complete"){
                loadDataIntoItem(response.name, response.price,response.image)
            }else{
                window.addEventListener("load", () => {
                    loadDataIntoItem(response.name, response.price,response.image)
                })
            }
        })
        .catch(err => console.log(err))
    }else{
        // If item is known duplicate then don't fetch and remove duplicate index
        let value = Object.values(searchedAlready)[filterNumber].value
        let arr = Object.values(searchedAlready)[filterNumber].skip
        Object.values(searchedAlready)[filterNumber].skip = arr.filter(item => item !== value)
        // if the skipped item was the last then dont call
        if(Object.values(searchedAlready)[filterNumber].value != filterMax){
            dataCollection(filter, filterNumber, filterMax)
        }
    }
}

// Main async function that runs untill all needed data collected
async function mainFunction(){
    // Get product category totals
    await fetch("/length")
        .then(response => response.json())
        .then(async data => {
            // Fetch relevent data based on filter
            switch(dataSettings.filter) {
                case "priority":
                    if(Object.values(searchedAlready)[0].value != data[0].priority){
                        await dataCollection("priority", 0, data[0].priority)
                    }
                    break;
                case "set":
                    if(Object.values(searchedAlready)[1].value != data[0].set){
                        await dataCollection("set", 1, data[0].set)
                    }
                    break;
                case "bomb":
                    if(Object.values(searchedAlready)[2].value != data[0].bomb){
                        await dataCollection("bomb", 2, data[0].bomb)
                    }
                    break;
                case "rocks":
                    if(Object.values(searchedAlready)[3].value != data[0].rocks){
                        await dataCollection("rocks", 3, data[0].rocks)
                    }
                    break;
                case "bar":
                    if(Object.values(searchedAlready)[4].value != data[0].bar){
                        await dataCollection("bar", 4, data[0].bar)
                    }
                    break;
            }
        })
        .catch(err => {
            console.log(err)
         })
}
// mainFunction()
if(document.readyState == "complete"){
    for(let i = 0; i < 22; i++){
        const template = document.querySelector("#grid-item-template")
        const the_content = template.content.cloneNode(true)
        // the_content.querySelector("img").src = items[0].image
        document.querySelector(".grid-container").appendChild(the_content)
    }
}else{
    window.addEventListener("load", () => {
        for(let i = 0; i < 22; i++){
            const template = document.querySelector("#grid-item-template")
            const the_content = template.content.cloneNode(true)
            // the_content.querySelector("img").src = items[0].image
            document.querySelector(".grid-container").appendChild(the_content)
        }
    })
}

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
