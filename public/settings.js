let dataSettings = {
    allDataCollected : false,
    dataCollected : 0,
    allDataAppended: false,
    filter: "priority",
    numberOfFilters: 5,
    maximums: {
        priority: null,
        set: null,
        bomb: null,
        rocks: null,
        bar: null,
        total: null
    },
    storedElements: {
        priority: [],
        set: [],
        bomb: [],
        rocks: [],
        bar: []
    }
}

const numberOfRows = 2
items = []

function createTemplateItems(number){
    for(let i = 0; i < number; i++){
        const template = document.querySelector("#grid-item-template")
        const the_content = template.content.cloneNode(true)
        document.querySelector(".grid-container").appendChild(the_content)
    }
}
// append element to relevent list
// if filter change delete all grid items and start appending from relevant list
// if all filter applied append from priority first then round robin the rest
// when new item is collect add to list and append the last item in the list, if filter changed then read whole list