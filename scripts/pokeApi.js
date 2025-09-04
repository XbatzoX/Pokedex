const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=5&offset=0';

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

let mainDataArr = [];

async function loadUrlPkm(){
    let dataURL = await loadData(BASE_URL);
    let pkmURL = dataURL.results[0].url;
    console.log(pkmURL);
    return pkmURL;
}

async function loadMainDataPkm(){
    let pkmURL = await loadUrlPkm();
    let dataMain = await loadData(pkmURL);
    console.log(dataMain);
    fillMainDataObj(dataMain);
}

async function loadData(url=''){
    let response = await fetch(url);
    let responseToJson = await response.json();
    return responseToJson;
}

function fillMainDataObj(data){
    mainData.id = data.id;
    mainData.name = data.name;
    mainData.image = data.sprites.other['official-artwork'].front_default;
    fillTypesInMain(data);
    fillColorInMain(data.id);
    console.log(mainData);
    mainDataArr.push(mainData);
    console.log(mainDataArr);
    
}

async function fillTypesInMain(data){
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
}

async function loadTypesURL(data, index){
    let typeUrl = data.types[index].type.url;
    let dataOfType = await loadData(typeUrl);
    let imgURL = dataOfType.sprites['generation-ix']['scarlet-violet'].name_icon;
    return imgURL;
}

async function fillColorInMain(id){
    let speciesURL = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    let response = await loadData(speciesURL);
    mainData.color = response.color.name;
}