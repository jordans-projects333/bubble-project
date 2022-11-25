// let maxlimit = 10
// let dataTotal = 22
// let spawnNumber = 2
// while(dataSettings.allDataAppended == false){// infinite loop
//     if(dataSettings.dataCollected >= 2 && document.querySelectorAll(".grid-item").length <= maxlimit && document.querySelectorAll(".grid-item").length < dataTotal){
//         for(let i = 0;i < spawnNumber; i++){
//             const template = document.querySelector("#grid-item-template")
//             const the_content = template.content.cloneNode(true)
//             the_content.querySelector("img").src = items[0].image
//             the_content.querySelector("h5").innerHTML = items[0].price + "<br>"+items[i].name
//             document.querySelector(".grid-container").appendChild(the_content)
//             items.shift()
//         }
//     }
// }