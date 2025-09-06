const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';

// let mainData = {
//     "id" : 0,
//     "name" : "",
//     "image" : "",
//     "color" : "",
//     "types" : {
//         "slot_1" : {
//             "name" : "",
//             "url" : ""
//         },
//         "slot_2" : {
//             "name" : "",
//             "url" : ""
//         },
//         "slot_3" : {
//             "name" : "",
//             "url" : ""
//         }
//     }
// };

let mainDataArr = [];

async function loadUrlPkm(){
    let dataURL = await loadData(BASE_URL);
    // let pkmURL = dataURL.results[0].url;
    console.log(dataURL);
    return dataURL;
}

function pushDataToArray(obj){
    mainDataArr.push(obj);
}

async function loadMainDataPkm(){
    let color = 'green';
    let dataURL = await loadUrlPkm();
    let amountOfPkm = dataURL.results.length;
    for (let index = 0; index < amountOfPkm; index++) {
        let mainData = {
            "id" : 0,
            "name" : "",
            "image" : "",
            "color" : "",
            "types" : {
                "slot_1" : {
                    "name" : "",
                    "url" : ""
                },
                "slot_2" : {
                    "name" : "",
                    "url" : ""
                },
                "slot_3" : {
                    "name" : "",
                    "url" : ""
                }
            }
        };
        let pkmURL = dataURL.results[index].url;
        let dataFromApi = await loadData(pkmURL);
        console.log(dataFromApi);
        let pushData = await fillMainDataObj(dataFromApi, mainData);
        mainData = pushData;
        // mainDataArr.push(pushData);
        pushDataToArray(mainData);
    }
    return new Promise((resolve, reject) => {
            console.log('start');
            console.log(color);
        
            setTimeout(() => {
                if((color == '') || (color == 'null')){
                    reject("hat nicht geklappt");
                }else{
                    resolve('');
                }
            }, 1000);
        });
}

async function loadData(url=''){
    let response = await fetch(url);
    let responseToJson = await response.json();
    return responseToJson;
}

async function fillMainDataObj(data, dataElements){
    let mainData = dataElements;
    mainData.id = data.id;
    mainData.name = data.name;
    mainData.image = data.sprites.other['official-artwork'].front_default;
    mainData = await fillTypesInMain(data, mainData);
    mainData = await fillColorInMain(data.id, mainData);
    console.log(mainData);
    // mainDataArr.push(mainData);
    console.log(mainDataArr);
    return mainData;
}

async function fillTypesInMain(data, dataElements){
    let mainData = dataElements;
    let countTypes = data.types.length;
    for (let index = 0; index < countTypes; index++) {
        switch (index) {
            case 0:
                mainData.types['slot_1'].name = data.types[index].type.name;
                mainData.types['slot_1'].url = await loadTypesURL(data, index);
                break;
            case 1:
                mainData.types['slot_2'].name = data.types[index].type.name;
                mainData.types['slot_2'].url = await loadTypesURL(data, index);
                break;
            case 2:
                mainData.types['slot_3'].name = data.types[index].type.name;
                mainData.types['slot_3'].url = await loadTypesURL(data, index);
                break;
            default:
                break;
        } 
    }
    return mainData;
}

async function loadTypesURL(data, index){
    let typeUrl = data.types[index].type.url;
    let dataOfType = await loadData(typeUrl);
    let imgURL = dataOfType.sprites['generation-ix']['scarlet-violet'].name_icon;
    return imgURL;
}

async function fillColorInMain(id, elementData){
    mainData = elementData;
    let speciesURL = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    let response = await loadData(speciesURL);
    mainData.color = response.color.name;
    return mainData;
}
