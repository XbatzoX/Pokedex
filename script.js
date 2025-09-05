
async function init(){
    await usePromis();
    renderMainView();
}

function renderMainView(){
    const contentMainRef = document.getElementById('main_container');
    contentMainRef.innerHTML = '';
    let objKeys = [];
    let amountOfMainPkm = mainDataArr.length;
    for (let index = 0; index < amountOfMainPkm; index++) {
        objKeys = Object.keys(mainDataArr[index]);
        contentMainRef.innerHTML += getMainViewPkmTemplate(index, objKeys);
        setBgColorOfPkm(mainDataArr[index].color, index);
    }
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
        default:
            break;
    }
}

function hideImg(number){
    document.getElementById('img_' + number).style.display = 'none';
}
