const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=5&offset=0';

async function init(){
    loadUrlPkm();
}

async function loadUrlPkm(){
    let response = await fetch(BASE_URL);
    let responseToJson = await response.json();
    console.log(responseToJson);

    let name = responseToJson.results[2].name;
    let pkmURL = responseToJson.results[2].url;
    console.log(name);
    
    response = await fetch(pkmURL);
    responseToJson = await response.json();
    console.log(responseToJson);
    

}