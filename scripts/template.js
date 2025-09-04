function getMainViewPkmTemplate(i, keys){
    return `<div id="pkm${i}" class="pkm-container">
               <div class="headline-main-view">
                    <div class="pkm-id">
                        <img src="./assets/img/pokeball_trans.png" alt="pokeball icon">
                        <span>${mainDataArr[i].id}</span>
                    </div>
                    <span>${mainDataArr[i].name}</span>
               </div> 
            </div>`;
}