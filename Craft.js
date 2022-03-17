class Craft{
    constructor(items,to) {
        this.items = items;
        this.to = to;
    }
}

function CheckAllCraft(tinv){
    let inv = new Inventory(3,3);
    for(let x = 0; x < 3;x++)
        for(let y = 0; y < 3;y++){
            if(tinv.items[x + "/" + y]) {
                inv.items[x + "/" + y] = tinv.items[x + "/" + y].Clone(0);
            }
        }
    for(let i = 0; i < Crafts.length;i++){
        let craft = Crafts[i];
        if(CheckCraft(craft,inv)){
            return craft;
        }
    }
    return undefined;
}

function CheckCraft(craft,inv){
    let r = true;
    for(let x = 0; x < 3;x++)
        for(let y = 0; y < 3;y++){
            let key = x+"/"+y;
            let value = inv.items[key];
            let cv = craft.items[key];
            if((cv === undefined) !== (value === undefined)){
                r = false;
                return false;
            }
            if(cv && value){
                if(cv.name !== value.name || cv.quantity > value.quantity){
                    r = false;
                    return false;
                }
            }
        }
    return r;
}

let Crafts = [
    new Craft({"0/0":new Log_Item(1)},new Plank_Item(4)),
    new Craft({"0/1":new Log_Item(1)},new Plank_Item(4)),
    new Craft({"0/2":new Log_Item(1)},new Plank_Item(4)),
    new Craft({"1/0":new Log_Item(1)},new Plank_Item(4)),
    new Craft({"1/1":new Log_Item(1)},new Plank_Item(4)),
    new Craft({"1/2":new Log_Item(1)},new Plank_Item(4)),
    new Craft({"2/0":new Log_Item(1)},new Plank_Item(4)),
    new Craft({"2/1":new Log_Item(1)},new Plank_Item(4)),
    new Craft({"2/2":new Log_Item(1)},new Plank_Item(4)),

    new Craft({"0/0":new Plank_Item(1)
        ,"0/1":new Plank_Item(1)
        ,"1/0":new Plank_Item(1)
        ,"1/1":new Plank_Item(1)},new CraftingTable_Item(1)),
    new Craft({"1/0":new Plank_Item(1)
        ,"1/1":new Plank_Item(1)
        ,"2/0":new Plank_Item(1)
        ,"2/1":new Plank_Item(1)},new CraftingTable_Item(1)),
    new Craft({"0/1":new Plank_Item(1)
        ,"0/2":new Plank_Item(1)
        ,"1/1":new Plank_Item(1)
        ,"1/2":new Plank_Item(1)},new CraftingTable_Item(1)),
    new Craft({"1/1":new Plank_Item(1)
        ,"1/2":new Plank_Item(1)
        ,"2/1":new Plank_Item(1)
        ,"2/2":new Plank_Item(1)},new CraftingTable_Item(1)),
    ];