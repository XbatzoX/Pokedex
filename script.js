let myDialogData = {};
let pageIndex = 0;

async function init(){
    toggleVisibilityLoadingSpinner();
    await usePromis();
    toggleVisibilityLoadingSpinner();
    renderMainView();
    showType();
    checkOffset();
}

function renderMainView(){
    const contentMainRef = document.getElementById('main_container');
    contentMainRef.innerHTML = '';
    const contentLoadNextPageRef = document.getElementById('ctrl_load_pkm');
    contentLoadNextPageRef.innerHTML = '';
    let amountOfMainPkm = mainDataArr.length;
    for (let index = 0; index < amountOfMainPkm; index++) {
        contentMainRef.innerHTML += getMainViewPkmTemplate(index);
        setBgColorOfPkm(mainDataArr[index].color, index);
    }
    contentLoadNextPageRef.innerHTML = getLoadNextPkmTemplate();
}

async function usePromis(){
    try {
        await loadMainDataPkm();
    } catch (error) {
        console.log(error);
    }
}

function setBgColorOfPkm(slot, i){
    if(slot != ''){
        document.getElementById('img_container' + i).classList.add(slot);
    }
    else{
        document.getElementById('img_container' + i).classList.add('green');
    }
}

function showType(){
    let arrLength = mainDataArr.length;
    for (let index = 0; index < arrLength; index++) {
        for (let i = 1; i < 4; i++) {
            if(mainDataArr[index].types[`slot_${i}`].name != ''){
                document.getElementById('img_' + mainDataArr[index].name + '_' + i).style.display = '';
            }
        }
    }
}

async function renderDialog(indexArr){
    let isDialogOpen = document.getElementById('pkmDialog').open;
    myDialogData = await loadDialogData(indexArr);
    if(!isDialogOpen){
        openDialog();
    }
    const contentDialogRef = document.getElementById('pkmDialog');
    contentDialogRef.innerHTML = getDialogTemplate(indexArr, myDialogData);
    setBgColorOfDialog(mainDataArr[indexArr].color, indexArr);
    showTypeInDialog(indexArr);
    checkSecondChain(myDialogData);
    checkThirdChain(myDialogData);
}

function setBgColorOfDialog(slot, i){
    if(slot != ''){
        document.getElementById('dialog_img_container' + i).classList.add(slot);
    }
    else{
        document.getElementById('dialog_img_container' + i).classList.add('green');
    }
}

function showTypeInDialog(index){
    for (let i = 1; i < 4; i++) {
        if(mainDataArr[index].types[`slot_${i}`].name != ''){
            document.getElementById('dialog_img_' + mainDataArr[index].name + '_' + i).style.display = '';
        }
    } 
}

function openDialog(){
    const contentDialogRef = document.getElementById('pkmDialog');
    contentDialogRef.showModal();
}

function closeDialog(){
    const contentDialogRef = document.getElementById('pkmDialog');
    contentDialogRef.close();
}

function stopBubbling(event){
    event.stopPropagation();
}

function showCard(number){
    switch (number) {
        case 0:
            customizeClassesFromCardView('chain_btn', 'chain_container', 'stats_btn', 'stats_card', 'main_btn', 'main_card');
            break;
        case 1:
            customizeClassesFromCardView('chain_btn', 'chain_container', 'main_btn', 'main_card', 'stats_btn', 'stats_card');
            break;
        case 2:
            customizeClassesFromCardView('main_btn', 'main_card', 'stats_btn', 'stats_card', 'chain_btn', 'chain_container');
            break;
        default:
            customizeClassesFromCardView('chain_btn', 'chain_container', 'stats_btn', 'stats_card', 'main_btn', 'main_card');
            break;
    }
}

function customizeClassesFromCardView(btn_1, card_1, btn_2, card_2, btn_3, card_3){
    document.getElementById(btn_1).classList.remove('underline');
    document.getElementById(card_1).classList.add('invisible');
    document.getElementById(btn_2).classList.remove('underline');
    document.getElementById(card_2).classList.add('invisible');
    document.getElementById(btn_3).classList.add('underline');
    document.getElementById(card_3).classList.remove('invisible');
}

function checkSecondChain(objData){
    if(objData.chain[1].pkmName == ''){
        document.getElementById('first_arrow_check').classList.add('invisible');
        document.getElementById('first_chain_check').classList.add('invisible');
    }
}

function checkThirdChain(objData){
    if(objData.chain[2].pkmName == ''){
        document.getElementById('arrow_check').classList.add('invisible');
        document.getElementById('chain_check').classList.add('invisible');
    }
}

function toggleVisibilityLoadingSpinner(){
    document.getElementById('loading_spinner').classList.toggle('invisible');
}

function searchPkm(){
    let inputValue = document.getElementById('input_field').value;
    let numberOfChar = inputValue.length;
    disableViewOfPkm(numberOfChar);
    activateViewOfPkm(numberOfChar, inputValue);
}

function disableViewOfPkm(number){
    if(number >= 3){
        for (let index = 0; index < mainDataArr.length; index++) {
           document.getElementById('search_id' + index).classList.add('invisible');
        }
    }
}

function activateViewOfPkm(number, strValue){
    let searchResult = -1;
    for (let index = 0; index < mainDataArr.length; index++) {
        searchResult = mainDataArr[index].name.search(strValue);
        if((number < 3) || (searchResult >= 0)){
            document.getElementById('search_id' + index).classList.remove('invisible');
        }
    }
}

function loadNextPage(){
    document.getElementById('main_container').replaceChildren();
    document.getElementById('ctrl_load_pkm').replaceChildren();
    document.getElementById('input_field').value = '';
    mainDataArr = [];
    offset = offset + 10;
    BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`;
    init();
}

function loadPreviousPage(){
    document.getElementById('main_container').replaceChildren();
    document.getElementById('ctrl_load_pkm').replaceChildren();
    document.getElementById('input_field').value = '';
    mainDataArr = [];
    offset = offset - 10;
    BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`;
    init(); 
}

function checkOffset(){
    if(offset > 0){
        document.getElementById('previous_page_btn').classList.remove('invisible');
    }else if(offset <= 0){
        document.getElementById('previous_page_btn').classList.add('invisible');
    }
}

function loadNextPkmInDialog(actualIndex){
    let arrIndex = actualIndex + 1;
    if (arrIndex >= mainDataArr.length) {
        arrIndex = 0;
    }
    document.getElementById('pkmDialog').replaceChildren();
    renderDialog(arrIndex);
}

function loadPreviousPkmInDialog(actualIndex){
    let arrIndex = actualIndex - 1;
    if(arrIndex < 0){
        arrIndex = (mainDataArr.length - 1);
    }
    document.getElementById('pkmDialog').replaceChildren();
    renderDialog(arrIndex);
}
