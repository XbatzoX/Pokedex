function getMainViewPkmTemplate(i){
    return `<div id="search_id${i}">
               <div id="pkm${i}" class="pkm-container">
                    <div class="headline-main-view">
                         <div class="pkm-id">
                         <img src="./assets/img/pokeball_trans.png" alt="pokeball icon">
                         <span>${mainDataArr[i].id}</span>
                         </div>
                         <span>${mainDataArr[i].name}</span>
                    </div>
                    <div id="img_container${i}" class="img-container" onclick="renderDialog(${i})">
                         <img src="${mainDataArr[i].image}" alt="an img of pokemon">
                    </div>
                    <div class="type-container">
                         <img id="img_${mainDataArr[i].name}_1" src="${mainDataArr[i].types.slot_1.url}" alt="first type of pokemon" style="display: none;">
                         <img id="img_${mainDataArr[i].name}_2" src="${mainDataArr[i].types.slot_2.url}" alt="second type of pokemon" style="display: none;">
                         <img id="img_${mainDataArr[i].name}_3" src="${mainDataArr[i].types.slot_3.url}" alt="third type of pokemon" style="display: none;">
                    </div> 
               </div>
          </div>`;
}

function getLoadNextPkmTemplate(){
     return `<div class="ctrl-load-pkm-box">
               <button id="previous_page_btn" class="load-btn invisible" onclick="loadPreviousPage()">previous</button>
               <button id="next_page_btn" class="load-btn"onclick="loadNextPage()">next</button>
          </div>`
}

function getDialogTemplate(i, data){
     return `<div id="dialog_${i}" class="dialog-container" onclick="stopBubbling(event)">
               <div class="dialog-headline">
                    <div class="pkm-id">
                        <img src="./assets/img/pokeball_trans.png" alt="pokeball icon">
                        <span>${mainDataArr[i].id}</span>
                    </div>
                    <span>${mainDataArr[i].name}</span>
               </div>
               <div id="dialog_img_container${i}" class="dialog-img-container">
                    <img src="${mainDataArr[i].image}" alt="an img of pokemon">
               </div>
               <div class="type-container">
                    <div id="load_pkm_left" class="load-arrow-btn">
                         <span><</span>
                    </div>
                    <img id="dialog_img_${mainDataArr[i].name}_1" src="${mainDataArr[i].types.slot_1.url}" alt="first type of pokemon" style="display: none;">
                    <img id="dialog_img_${mainDataArr[i].name}_2" src="${mainDataArr[i].types.slot_2.url}" alt="second type of pokemon" style="display: none;">
                    <img id="dialog_img_${mainDataArr[i].name}_3" src="${mainDataArr[i].types.slot_3.url}" alt="third type of pokemon" style="display: none;">
                    <div id="load_pkm_right" class="load-arrow-btn" onclick="loadNextPkmInDialog(${i})">
                         <span>></span>
                    </div>
               </div>
               <div class="data-container">
                    <div class="dialog-ctrl-box">
                         <div id="main_btn" class="btn-ctrl underline" onclick="showCard(0)">
                              <span>main</span>
                         </div>
                         <div id="stats_btn" class="btn-ctrl" onclick="showCard(1)">
                              <span>stats</span>
                         </div>
                         <div id="chain_btn" class="btn-ctrl" onclick="showCard(2)">
                              <span>evo-chain</span>
                         </div>
                    </div>
                    <div id="main_card" class="main-card">
                         <table>
                              <tr>
                                   <td>height</td>
                                   <td>:</td>
                                   <td>${data.basic.height}</td>
                              </tr>
                              <tr>
                                   <td>weight</td>
                                   <td>:</td>
                                   <td>${data.basic.weight}</td>
                              </tr>
                              <tr>
                                   <td>base_exp</td>
                                   <td>:</td>
                                   <td>${data.basic.base_exp}</td>
                              </tr>
                              <tr>
                                   <td>abilities</td>
                                   <td>:</td>
                                   <td>${data.basic.abilities}</td>
                              </tr>
                         </table>
                    </div>
                    <div id="stats_card" class="stats-card invisible">
                         <div class="progress-bar">
                              <span>${data.stats[0].name}: </span>
                              <div class="bg-progress">
                                   <div class="value-progress" style = "width:${data.stats[0].value}%">${data.stats[0].value}</div>
                              </div>
                         </div>
                         <div class="progress-bar">
                              <span>${data.stats[1].name}: </span>
                              <div class="bg-progress">
                                   <div class="value-progress" style = "width:${data.stats[1].value}%">${data.stats[1].value}</div>
                              </div>
                         </div>
                         <div class="progress-bar">
                              <span>${data.stats[2].name}: </span>
                              <div class="bg-progress">
                                   <div class="value-progress" style = "width:${data.stats[2].value}%">${data.stats[2].value}</div>
                              </div>
                         </div>
                         <div class="progress-bar">
                              <span>${data.stats[3].name}: </span>
                              <div class="bg-progress">
                                   <div class="value-progress" style = "width:${data.stats[3].value}%">${data.stats[3].value}</div>
                              </div>
                         </div>
                         <div class="progress-bar">
                              <span>${data.stats[4].name}: </span>
                              <div class="bg-progress">
                                   <div class="value-progress" style = "width:${data.stats[4].value}%">${data.stats[4].value}</div>
                              </div>
                         </div>
                         <div class="progress-bar">
                              <span>${data.stats[5].name}: </span>
                              <div class="bg-progress">
                                   <div class="value-progress" style = "width:${data.stats[5].value}%">${data.stats[5].value}</div>
                              </div>
                         </div>
                    </div>
                    <div id="chain_container" class="invisible">
                         <div id="chain_card" class="chain-card">
                              <div class="chain-pkm">
                                   <img src="${data.chain[0].image_url}" alt="an img of pokemon">
                                   <span>${data.chain[0].pkmName}</span> 
                              </div>
                              <div class="arrow-right">
                                   <span>>></span>
                              </div>
                              <div class="chain-pkm">
                                   <img src="${data.chain[1].image_url}" alt="an img of pokemon">
                                   <span>${data.chain[1].pkmName}</span> 
                              </div>
                              <div id="arrow_check" class="arrow-right">
                                   <span>>></span>
                              </div>
                              <div id="chain_check">
                                   <div class="chain-pkm">
                                        <img src="${data.chain[2].image_url}" alt="an img of pokemon">
                                        <span>${data.chain[2].pkmName}</span> 
                                   </div>
                              </div>
                         </div>
                    </div>
               </div> 
               <div class="ctrl-pkm-container">
                    <div class="ctrl-pkm-box">
                         <div id="previous_btn" class="arrow-btn">
                         </div>
                         <div class="indication-pkm-box">
                         </div>
                         <div id="next_btn" class="arrow-btn">
                         </div>
                    </div>
               </div>
             </div>`;
}