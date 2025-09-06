function getMainViewPkmTemplate(i){
    return `<div id="pkm${i}" class="pkm-container">
               <div class="headline-main-view">
                    <div class="pkm-id">
                        <img src="./assets/img/pokeball_trans.png" alt="pokeball icon">
                        <span>${mainDataArr[i].id}</span>
                    </div>
                    <span>${mainDataArr[i].name}</span>
               </div>
               <div id="img_container${i}" class="img-container">
                    <img src="${mainDataArr[i].image}" alt="a img of pokemon">
               </div>
               <div class="type-container">
                    <img id="img_${mainDataArr[i].name}_1" src="${mainDataArr[i].types.slot_1.url}" alt="first type of pokemon" style="display: none;">
                    <img id="img_${mainDataArr[i].name}_2" src="${mainDataArr[i].types.slot_2.url}" alt="second type of pokemon" style="display: none;">
                    <img id="img_${mainDataArr[i].name}_3" src="${mainDataArr[i].types.slot_3.url}" alt="third type of pokemon" style="display: none;">
               </div> 
            </div>`;
}