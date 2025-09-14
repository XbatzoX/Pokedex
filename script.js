let myDialogData = {};
let pageIndex = 0;

async function init(){
    toggleVisibilityLoadingSpinner();
    await usePromis();
    toggleVisibilityLoadingSpinner();
    renderMainView();
    // customizeMainData();
    showType();
}

function renderMainView(){
    const contentMainRef = document.getElementById('main_container');
    contentMainRef.innerHTML = '';
    const contentLoadNextPageRef = document.getElementById('ctrl_load_pkm');
    contentLoadNextPageRef.innerHTML = '';
    let objKeys = [];
    let amountOfMainPkm = mainDataArr.length;
    for (let index = 0; index < amountOfMainPkm; index++) {
        // objKeys = Object.keys(mainDataArr[index]);
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
    switch (slot) {
        case 'green':
            document.getElementById('img_container' + i).classList.add('green');
            break;
        case 'red':
            document.getElementById('img_container' + i).classList.add('red');
            break;
        case 'blue':
            document.getElementById('img_container' + i).classList.add('blue');
            break;
        case 'white':
            document.getElementById('img_container' + i).classList.add('white');
            break;
        case 'brown':
            document.getElementById('img_container' + i).classList.add('brown');
            break;
        case 'yellow':
            document.getElementById('img_container' + i).classList.add('yellow');
            break;
         case 'purple':
            document.getElementById('img_container' + i).classList.add('purple');
            break;
        case 'pink':
            document.getElementById('img_container' + i).classList.add('pink');
            break;
        case 'gray':
            document.getElementById('img_container' + i).classList.add('gray');
            break;
        case 'black':
            document.getElementById('img_container' + i).classList.add('black');
            break;
        default:
            document.getElementById('img_container' + i).classList.add('green');
            break;
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
    myDialogData = await loadDialogData(indexArr);
    openDialog();
    const contentDialogRef = document.getElementById('pkmDialog');
    contentDialogRef.innerHTML = getDialogTemplate(indexArr, myDialogData);
    setBgColorOfDialog(mainDataArr[indexArr].color, indexArr);
    showTypeInDialog(indexArr);
    checkThirdChain(myDialogData);
    console.log(myDialogData);
}

function setBgColorOfDialog(slot, i){
    switch (slot) {
        case 'green':
            document.getElementById('dialog_img_container' + i).classList.add('green');
            break;
        case 'red':
            document.getElementById('dialog_img_container' + i).classList.add('red');
            break;
        case 'blue':
            document.getElementById('dialog_img_container' + i).classList.add('blue');
            break;
        case 'white':
            document.getElementById('dialog_img_container' + i).classList.add('white');
            break;
        case 'brown':
            document.getElementById('dialog_img_container' + i).classList.add('brown');
            break;
        case 'yellow':
            document.getElementById('dialog_img_container' + i).classList.add('yellow');
            break;
         case 'purple':
            document.getElementById('dialog_img_container' + i).classList.add('purple');
            break;
        case 'pink':
            document.getElementById('dialog_img_container' + i).classList.add('pink');
            break;
        case 'gray':
            document.getElementById('dialog_img_container' + i).classList.add('gray');
            break;
        case 'black':
            document.getElementById('dialog_img_container' + i).classList.add('black');
            break;
        default:
            document.getElementById('dialog_img_container' + i).classList.add('green');
            break;
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
            document.getElementById('chain_btn').classList.remove('underline');
            document.getElementById('chain_container').classList.add('invisible');
            document.getElementById('stats_btn').classList.remove('underline');
            document.getElementById('stats_card').classList.add('invisible');
            document.getElementById('main_btn').classList.add('underline');
            document.getElementById('main_card').classList.remove('invisible');
            break;
        case 1:
            document.getElementById('chain_btn').classList.remove('underline');
            document.getElementById('chain_container').classList.add('invisible');
            document.getElementById('main_btn').classList.remove('underline');
            document.getElementById('main_card').classList.add('invisible');
            document.getElementById('stats_btn').classList.add('underline');
            document.getElementById('stats_card').classList.remove('invisible');
            break;
        case 2:
            document.getElementById('main_btn').classList.remove('underline');
            document.getElementById('main_card').classList.add('invisible');
            document.getElementById('stats_card').classList.add('invisible');
            document.getElementById('stats_btn').classList.remove('underline');
            document.getElementById('chain_btn').classList.add('underline');
            document.getElementById('chain_container').classList.remove('invisible');
            break;
        default:
            document.getElementById('chain_btn').classList.remove('underline');
            document.getElementById('chain_container').classList.add('invisible');
            document.getElementById('stats_btn').classList.remove('underline');
            document.getElementById('stats_card').add('invisible');
            document.getElementById('main_btn').classList.add('underline');
            document.getElementById('main_card').classList.remove('invisible');
            break;
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
