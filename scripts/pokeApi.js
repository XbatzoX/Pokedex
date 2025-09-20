let offset = 0;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;
let PKM_URL = 'https://pokeapi.co/api/v2/pokemon/';
let mainDataArr = [];

async function loadUrlPkm(){
    let dataURL = await loadData(BASE_URL);
    return dataURL;
}

function pushDataToArray(obj){
    mainDataArr.push(obj);
}

async function loadMainDataPkm(){
    let dataURL = await loadUrlPkm();
    let amountOfPkm = dataURL.results.length;
    for (let index = 0; index < amountOfPkm; index++) {
        let mainData = getMainViewObject();
        let pkmURL = dataURL.results[index].url;
        let dataFromApi = await loadData(pkmURL);
        let pushData = await fillMainDataObj(dataFromApi, mainData);
        mainData = pushData;
        pushDataToArray(mainData);
    }
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
    return mainData;
}

async function fillTypesInMain(data, dataElements){
    let mainData = dataElements;
    let countTypes = data.types.length;
    for (let index = 0; index < countTypes; index++) {
        mainData = await loadAndFillTypeData(mainData, data, index);
    }
    return mainData;
}

async function loadAndFillTypeData(mainData, data, index){
    switch (index) {
            case 0:
                await getAndFillTypesDataFromApi(mainData, data, index, slot = 'slot_1');
                break;
            case 1:
                await getAndFillTypesDataFromApi(mainData, data, index, slot = 'slot_2');
                break;
            case 2:
                await getAndFillTypesDataFromApi(mainData, data, index, slot = 'slot_3');
                break;
            default:
                break;
        } 
    return mainData;
}

async function getAndFillTypesDataFromApi(mainData, data, index, slot = ''){
    mainData.types[slot].name = data.types[index].type.name;
    mainData.types[slot].url = await loadTypesURL(data, index);
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
    let dialogData = getDialogViewObject();
    let pkmID = mainDataArr[arrIndex].id;
    let dataOfPkm = await loadData(PKM_URL + (pkmID));
    dialogData = fillDialogBasicData(dialogData, dataOfPkm);
    dialogData = fillDialogStatsData(dialogData, dataOfPkm);
    let speciesURL = `https://pokeapi.co/api/v2/pokemon-species/${(pkmID)}`;
    let dataOfSpecies = await loadData(speciesURL);
    let chainData = await getChainData(dataOfSpecies);
    fillChainData(dialogData, chainData);
    return dialogData;
}

function fillDialogBasicData(basicObj, pkmData){
    pkmData.height = (pkmData.height / 10.0).toFixed(1);
    basicObj.basic.height = String(pkmData.height) + " m";
    pkmData.weight = (pkmData.weight / 10.0).toFixed(1);
    basicObj.basic.weight = String(pkmData.weight) + " kg";
    basicObj.basic.base_exp = String(pkmData.base_experience);
    if(pkmData.abilities.length > 1){
        basicObj.basic.abilities = (pkmData.abilities[0].ability.name + ", " +
        pkmData.abilities[1].ability.name);
    }else{
        basicObj.basic.abilities = (pkmData.abilities[0].ability.name); 
    }
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
    let chainData = getChainDataObject();
    let chainUrl = pkmData.evolution_chain.url;
    let chainDataBlock = await loadData(chainUrl);
    
    chainData[0].pkmName = chainDataBlock.chain.species.name;
    data = await loadData(PKM_URL + chainData[0].pkmName);
    chainData[0].image_url = data.sprites.other['official-artwork'].front_default;
    data = checkIfSecondChainExist(chainDataBlock);
    chainData = await checkAndFillChainData(data, chainData, chainDataBlock);
    return chainData;
}

async function checkAndFillChainData(data, chainData, chainDataBlock){
    if(data.pkmName != ''){
        chainData[1].pkmName = chainDataBlock.chain.evolves_to[0].species.name;
        data = await loadData(PKM_URL + chainData[1].pkmName);
        chainData[1].image_url = data.sprites.other['official-artwork'].front_default;

        data = checkIfThirdChainExist(chainDataBlock);
        if(data.pkmName != ''){
        chainData[2].pkmName = data.pkmName;
        data = await loadData(PKM_URL + chainData[2].pkmName);
        chainData[2].image_url = data.sprites.other['official-artwork'].front_default;
        }
    }
    return chainData;
}

function checkIfSecondChainExist(dataBlock){
    let arrlength = dataBlock.chain.evolves_to.length;
    let chainObj = {
        "pkmName" : "",
        "image_url" : ""
    };
    if(arrlength > 0){
        chainObj.pkmName = dataBlock.chain.evolves_to[0].species.name;
    }
    return chainObj;
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