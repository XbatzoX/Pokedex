function getMainViewObject(){
    let mainViewData = {
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
    return mainViewData;
}

function getDialogViewObject(){
    let dialogViewData = {
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
    return dialogViewData;
}

function getChainDataObject(){
    let chainViewData = [{
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
    return chainViewData;
}


