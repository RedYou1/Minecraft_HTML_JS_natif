function MouseMove(e){
    if(invdiv.childElementCount > 0){
        let k = selected.style.flex.replace("px","").split(" ")[2];
        selected.style.left = e.clientX-k+"px";
        selected.style.top = e.clientY-k+"px";
    }
}
document.addEventListener("mousemove",MouseMove)

let invdiv = document.getElementById("Inventory");
let offx;
let offy;
let invSize;
let selected;
let inventaires;
let called = (item) => {};

function RemoveInventory(){
    while(invdiv.firstChild){
        invdiv.removeChild(invdiv.firstChild);
    }
}

function SpawnInventory(inventory,item){
    if(inventory) {
        invdiv.style.width = window.innerWidth + "px";
        invdiv.style.height = window.innerHeight + "px";
        let back = document.createElement("inventory");
        back.classList.add(inventory);
        let w = Math.floor(window.innerWidth / 2);
        let h = Math.floor(window.innerHeight / 2);
        let max = 0;
        if (w > h) {
            offy=0;
            offx = w-h;
            max = h;
            back.style.left = (w - h) + "px";
        } else if (w < h) {
            offy=h-w;
            offx = 0;
            max = w;
            back.style.top = (h - w) + "px";
        } else {
            offx=0;
            offy=0;
            max = w;
        }
        invSize = max;
        back.style.flex = max + "px";
        back.style.padding = max + "px";
        invdiv.appendChild(back);

        let rw = InvToScreenRatioW(invSize);
        let rh = InvToScreenRatioH(invSize);
        if(item && item.item){
            invdiv.append(item);
            selected = item;
        }else {
            let it = document.createElement("item");
            it.classList.add("selected");
            it.classList.add("null");
            it.style.left = 0 + "px";
            it.style.top = 0 + "px";
            it.style.flex = ((16 * rw) / 2) + "px";
            it.style.padding = ((16 * rh) / 2) + "px";
            invdiv.append(it);
            selected = it;
        }
    }
}

function MoveItems(it1,it2){
    if(ShiftDown && it2.item && it2.item.quantity > 1){
        if(!it1.item) {
            it1.classList.replace(it1.classList[0], it2.classList[1]);

            it1.item = it2.item.Clone();
            it1.item.quantity = Math.floor(it1.item.quantity / 2);
            it2.item.quantity = Math.ceil(it2.item.quantity / 2);
            return;
        }
        else if(it1.item.name === it2.item.name && it1.item.quantity+Math.floor(it2.item.quantity / 2) <= it1.item.maxQuantity){
            it1.item.quantity += Math.floor(it1.item.quantity / 2);
            it2.item.quantity = Math.ceil(it2.item.quantity / 2);
            return;
        }
    }
    if(CTRLDown && it2.item){
        if(!it1.item) {
            it1.classList.replace(it1.classList[0], it2.classList[1]);

            it1.item = it2.item.Clone();
            it1.item.quantity = 1;
            it2.item.quantity--;

            if(it2.item.quantity <= 0){
                it2.item = undefined;
                it2.classList.replace(it2.classList[1],"null");
            }
            return;
        }
        else if(it1.item.name === it2.item.name && it1.item.quantity+1 <= it1.item.maxQuantity){
            it1.item.quantity++;
            it2.item.quantity--;

            if(it2.item.quantity <= 0){
                it2.item = undefined;
                it2.classList.replace(it2.classList[1],"null");
            }
            return;
        }
    }
    if(it1.item && it2.item
        && it1.item.name === it2.item.name
        && it1.item.quantity + it2.item.quantity <= it2.item.maxQuantity){
        it2.item.quantity += it1.item.quantity;
        it1.item = undefined;
        return;
    }
    let temp = it1.classList[0];
    it1.classList.replace(temp,it2.classList[1]);
    it2.classList.replace(it2.classList[1],temp);

    temp = it1.item;
    it1.item = it2.item;
    it2.item = temp;
}

function SelectItem(e){
    if(e && e.target && selected){
        MoveItems(e.target,selected);
        RefreshItem(e.target);
        RefreshItem(selected);

        inventaires[e.target.inventaire].items[e.target.slot] = e.target.item;
        if(inventaires[e.target.inventaire].Update()){
            RemoveInventory();
            called(selected);
        }
    }
}

function RefreshItem(HtmlItem){
    if(HtmlItem) {
        let i = 0;
        if(HtmlItem.classList[0] === "selected"){
            i=1;
        }
        if((!HtmlItem.item && !HtmlItem.classList.contains("null"))
            || (HtmlItem.item && HtmlItem.item.name !== HtmlItem.classList[i])){
            let l = "null";
            if(HtmlItem.item){
                l = HtmlItem.item.name;
            }
            HtmlItem.classList.replace(HtmlItem.classList[i],l);
        }
        if (HtmlItem.firstChild) {
            HtmlItem.firstChild.remove();
        }

        if (HtmlItem.item && HtmlItem.item.quantity > 1) {
            let p = document.createElement("itemQT");
            p.innerText = HtmlItem.item.quantity;
            HtmlItem.appendChild(p);
        }
    }
}

function ScreenToInvRatioW(size){
    return 176/(size*2);
}
function ScreenToInvRatioH(size){
    return 166/(size*2);
}
function InvToScreenRatioW(size){
    return (size*2)/176;
}
function InvToScreenRatioH(size){
    return (size*2)/166;
}

/*
inventaire is the name of it in the list of inventaire
 */
function NewItem(item,x,y,w,h,inventaire,slotx,sloty){
    let it = document.createElement("item");
    if(item){
        it.classList.add(item.name);
    }
    else{
        it.classList.add("null");
    }
    it.style.left = x + "px";
    it.style.top = y +"px";
    it.style.flex = w+"px";
    it.style.padding = h+"px";
    it.item = item;
    it.inventaire = inventaire;
    it.slot = slotx+"/"+sloty;
    invdiv.append(it);
    RefreshItem(it);
    it.addEventListener("mousedown",SelectItem);
    return it;
}

/*
the Item in the inventory of the player
dont spawn
 */
function ShowPlayerInventory(player){
    if(player && player instanceof Player) {
        let rw = InvToScreenRatioW(invSize);
        let rh = InvToScreenRatioH(invSize);
        for(let x = 0;x<player.inv.w;x++)
            for(let y = 0;y<player.inv.h;y++){
                NewItem(player.inv.items[x+"/"+y],offx + ((7+(18*x))*rw),offy+ ((142-(18*y)-(y>0?4:0))*rh)
                    ,(16*rw)/2,(16*rh)/2,"player",x,y);
        }
    }
}

/*
the screen of the player
 */
function ShowPlayerScreen(player,item){
    if(player && player instanceof Player) {
        called = (item)=>{ShowPlayerScreen(player,item);};
        SpawnInventory("player",item);
        ShowPlayerInventory(player);
    }
}

/*
the screen of a furnace
 */
function ShowFurnaceScreen(furnace,item){
    if(furnace && furnace instanceof Furnace_Block) {
        called = (item)=>{ShowFurnaceScreen(furnace,item);};
        SpawnInventory("furnace",item);
        let rw = InvToScreenRatioW(invSize);
        let rh = InvToScreenRatioH(invSize);
        ShowPlayerInventory(player);
        NewItem(furnace.inv.items["0/0"],offx + (55*rw),offy+ (16*rh)
            ,(16*rw)/2,(16*rh)/2,"furnace",0,0);
        NewItem(furnace.inv.items["0/1"],offx + (55*rw),offy+ (52*rh)
            ,(16*rw)/2,(16*rh)/2,"furnace",0,1);
        NewItem(furnace.inv.items["0/2"],offx + (115.5*rw),offy+ (34.5*rh)
            ,(16*rw)/2,(16*rh)/2,"furnace",0,2);
        let it = document.createElement("backImg");
        it.id = "fuel";
        it.style.left = offx + (35*rw) + "px";
        it.style.top = offy+ (35*rh) +"px";
        it.style.flex = (18*rw)/2+"px";
        it.style.padding = (18*rh)/2+"px";
        it.innerText = furnace.fuel/10;
        invdiv.append(it);
    }
}

function ShowCraftingScreen(craft,item){
    if(craft && craft instanceof CraftingTable_Block) {
        called = (item)=>{ShowCraftingScreen(craft,item);};
        SpawnInventory("craftingTable",item);
        let rw = InvToScreenRatioW(invSize);
        let rh = InvToScreenRatioH(invSize);
        ShowPlayerInventory(player);
        for(let x = 0;x<3;x++)
            for(let y = 0;y<3;y++){
                NewItem(craft.inv.items[x+"/"+y],offx + ((30+(18*x))*rw),offy+ ((53-(18*y))*rh)
                    ,(16*rw)/2,(16*rh)/2,"craftingTable",x,y);
            }
        NewItem(craft.result,offx + (124*rw),offy+ (35*rh)
            ,(16*rw)/2,(16*rh)/2,"craftingTable",0,3);
    }
}

function ShowOtherInventoryScreen(inventory,item){
    if(inventory && inventory instanceof Inventory) {
        called = (item)=>{ShowOtherInventoryScreen(inventory,item);};
        SpawnInventory("other",item);
        let rw = InvToScreenRatioW(invSize);
        let rh = InvToScreenRatioH(invSize);
        ShowPlayerInventory(player);
        inventaires = {
            "player":player.inv,
            "other":inventory
        };
        for(let x = 0;x<inventory.w;x++)
            for(let y = 0;y<inventory.h;y++){
                let it = document.createElement("backImg");
                it.classList.add("slote");
                it.style.left = offx + ((6+(18*x))*rw) + "px";
                it.style.top = offy+ ((53-(18*y))*rh) +"px";
                it.style.flex = (18*rw)/2+"px";
                it.style.padding = (18*rh)/2+"px";
                invdiv.append(it);
                NewItem(inventory.items[x+"/"+y],offx + ((7+(18*x))*rw),offy+ ((54-(18*y))*rh)
                    ,(16*rw)/2,(16*rh)/2,"other",x,y);
            }
    }
}