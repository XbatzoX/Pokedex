let offset = 0;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`;
let PKM_URL = 'https://pokeapi.co/api/v2/pokemon/';

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

async function loadDialogData(arrIndex){
    let dialogData = {
        "basic" : {
            "height" : "",
            "weight" : "",
            "base_exp" : "",
            "abilities" : ""
        },
        "stats" : [{
            "name" : "",
            "value" : 0
        },
        {
            "name" : "",
            "value" : 0
        },
        {
            "name" : "",
            "value" : 0
        },
        {
            "name" : "",
            "value" : 0
        },
        {
            "name" : "",
            "value" : 0
        },
        {
            "name" : "",
            "value" : 0
        }],
        "chain" : [{
            "pkmName" : "",
            "image_url" : ""
        },
        {
            "pkmName" : "",
            "image_url" : ""
        },
        {
            "pkmName" : "",
            "image_url" : ""
        }]
    };
    let pkmID = mainDataArr[arrIndex].id;
    console.log(pkmID);
    
    let dataOfPkm = await loadData(PKM_URL + (pkmID));
    dialogData = fillDialogBasicData(dialogData, dataOfPkm);
    dialogData = fillDialogStatsData(dialogData, dataOfPkm);
    let speciesURL = `https://pokeapi.co/api/v2/pokemon-species/${(pkmID)}`;
    let dataOfSpecies = await loadData(speciesURL);
    let chainData = await getChainData(dataOfSpecies);
    fillChainData(dialogData, chainData);
    console.log(dialogData);
    return dialogData;
}

function fillDialogBasicData(basicObj, pkmData){
    basicObj.basic.height = String(pkmData.height) + " inches";
    basicObj.basic.weight = String(pkmData.weight) + " lbs";
    basicObj.basic.base_exp = String(pkmData.base_experience);
    basicObj.basic.abilities = (pkmData.abilities[0].ability.name + ", " +
        pkmData.abilities[1].ability.name);
    return basicObj;
}

function fillDialogStatsData(statsObj, pkmData){
    for (let index = 0; index < 6; index++) {
        statsObj.stats[index].name = pkmData.stats[index].stat.name;
        statsObj.stats[index].value = pkmData.stats[index].base_stat;
    }
    return statsObj;
}

async function getChainData(pkmData){

    let data = {};
    let chainData = [{
        "pkmName" : "",
        "image_url" : ""
    },
    {
        "pkmName" : "",
        "image_url" : ""
    },
    {
        "pkmName" : "",
        "image_url" : ""
    }];
    let chainUrl = pkmData.evolution_chain.url;
    let chainDataBlock = await loadData(chainUrl);
    console.log(chainDataBlock);
    
    chainData[0].pkmName = chainDataBlock.chain.species.name;
    data = await loadData(PKM_URL + chainData[0].pkmName);
    chainData[0].image_url = data.sprites.other['official-artwork'].front_default;
    chainData[1].pkmName = chainDataBlock.chain.evolves_to[0].species.name;
    data = await loadData(PKM_URL + chainData[1].pkmName);
    chainData[1].image_url = data.sprites.other['official-artwork'].front_default;
    data = checkIfThirdChainExist(chainDataBlock);
    if(data.pkmName != ''){
        chainData[2].pkmName = data.pkmName;
        data = await loadData(PKM_URL + chainData[2].pkmName);
        chainData[2].image_url = data.sprites.other['official-artwork'].front_default;
    }
    console.log(chainData);
    return chainData;
}

function checkIfThirdChainExist(dataBlock){
    let arrLength = dataBlock.chain.evolves_to[0].evolves_to.length;
    let chainObj = {"pkmName" : "",
                    "image_url" : ""};
    
    if(arrLength > 0){
        chainObj.pkmName = dataBlock.chain.evolves_to[0].evolves_to[0].species.name;
    }

    return chainObj;
}

function fillChainData(chainObj, dataFromChain){
    for (let index = 0; index < 3; index++) {
        chainObj.chain[index].pkmName = dataFromChain[index].pkmName;
        chainObj.chain[index].image_url = dataFromChain[index].image_url;
    }
}