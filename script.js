
async function init(){
    await usePromis();
    renderMainView();
    // customizeMainData();
    showType();
}

function renderMainView(){
    const contentMainRef = document.getElementById('main_container');
    contentMainRef.innerHTML = '';
    let objKeys = [];
    let amountOfMainPkm = mainDataArr.length;
    for (let index = 0; index < amountOfMainPkm; index++) {
        // objKeys = Object.keys(mainDataArr[index]);
        contentMainRef.innerHTML += getMainViewPkmTemplate(index);
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
