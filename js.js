function BlockMouseDown(e,v){
    let blockhtml = e.target;
    if(blockhtml) {
        let id = blockhtml.id.split('/');
        let bx = Math.round(player.x - (w / 2) + Number.parseInt(id[0]));
        let by = Math.round(player.y - (h / 2) + (h - Number.parseInt(id[1]) - 1));
        let block = map.GetBlock(bx, by);
        let entity = map.GetEntity(bx,by);
        if(e.button === 0) {
            block.LeftDown(player, bx, by, map);
        }
        if(e.button === 2) {
            let b = true;

            if(player.RightHand()){
                b = player.RightHand().RightClick(player,bx,by,map,block,entity);
                if(player.RightHand().quantity <= 0){
                    player.inv.items[player.rightHand+"/0"] = undefined;
                }
            }

            if(b && entity) {
                entity.RightDown(player, bx, by, map);
            }
            if(b && block.name !== "null") {
                block.RightDown(player, bx, by, map);
            }
        }
    }
    Grav();
    Refresh();
}

let map;
let blocksdiv;
let entitiesdiv;
let w;
let h;
let player;
let sizeT;
let BlockSize;
let controls;
function GameInit(blockSize,moveLeft,moveRight,moveUp,moveDown,openInv,shift,ctrl){
    controls = {
        "moveLeft":moveLeft,
        "moveRight":moveRight,
        "moveUp":moveUp,
        "moveDown":moveDown,
        "openInv":openInv,
        "shift":shift,
        "ctrl":ctrl
    };
    if(blockSize&&blockSize === Math.round(blockSize)) {
        blockSize = blockSize * 16;
        BlockSize = blockSize;
        sizeT = blockSize/2 + "px";
        map = new Map();
        blocksdiv = document.getElementById("Blocks");
        entitiesdiv = document.getElementById("Entities");
        w = Math.floor(window.innerWidth / blockSize);
        h = Math.floor(window.innerHeight / blockSize);
        player = new Player(Math.floor(w / 2), Math.floor(h / 2));
        map.AddEntity(new Zombie(player.x + 2, player.y));
        for (let ty = 0; ty < h; ty++) {
            for (let tx = 0; tx < w; tx++) {
                let block = document.createElement("block");
                block.id = tx + "/" + ty;
                block.classList.add("null");
                blocksdiv.appendChild(block);
                block.addEventListener("mousedown", BlockMouseDown);
                block.style.position = "absolute";
                block.style.top = blockSize * ty + "px";
                block.style.left = blockSize * tx + "px";
                block.style.flex = sizeT;
                block.style.padding = sizeT;
            }
        }
        Grav();
        Refresh();
    }
}
document.addEventListener("keydown",KeyDown);
document.addEventListener("keyup",KeyUp);

function Grav(){
    player.Grav(map);
    let entity = map.entities;
    entity.forEach((ent)=>{
        ent.Grav(map);
    });
}

let wIsDown = 4;
let sIsDown = 4;
let aIsDown = 4;
let dIsDown = 4;

function Refresh(){
    for(let ty = 0;ty<h;ty++)
        for(let tx = 0;tx<w;tx++){
            let block = document.getElementById(tx+"/"+(h-ty-1));
            block.classList.remove(block.classList[0]);
            block.classList.add(map.GetBlock(player.x-(w/2)+tx,player.y-(h/2)+ty).name);
        }

    while(entitiesdiv.firstChild){
        entitiesdiv.removeChild(entitiesdiv.firstChild);
    }
    let eleplayer = document.createElement("entity");
    eleplayer.classList.add("player");
    eleplayer.style.position = "absolute";
    eleplayer.style.left = BlockSize*Math.floor(w/2)+"px";
    eleplayer.style.top = BlockSize*Math.round(h/2-1)+"px";
    eleplayer.style.flex = sizeT;
    eleplayer.style.padding = sizeT;
    entitiesdiv.appendChild(eleplayer);
    let entity = map.entities;
    for(let i = 0;i<entity.length;i++){
        let ent = entity[i];
        let dx = ent.x-player.x;
        let dy = ent.y-player.y;
        if(Math.abs(dx) < w/2 && Math.abs(dy) < h/2) {
            let block = document.createElement("entity");
            block.classList.add(ent.name);
            block.style.position = "absolute";
            block.style.left = BlockSize*(Math.floor(w/2)+dx)+"px";
            block.style.top = BlockSize*(Math.round(h/2)-dy-1)+"px";
            block.style.flex = sizeT;
            block.style.padding = sizeT;
            entitiesdiv.appendChild(block);
        }
    }
}

let ShiftDown = false;
let CTRLDown = false;
let EDown = false;
let PlayerSpeed = 5;

function KeyDown(e,v){
    if(e.keyCode === controls["shift"]){
        ShiftDown=true;
    }
    if(e.keyCode === controls["ctrl"]){
        CTRLDown=true;
    }
    if(e.keyCode === controls["openInv"] && !EDown){
        let invdiv = document.getElementById("Inventory");
        if(invdiv.childElementCount === 0){
            inventaires = {
                "player": player.inv
            };
            ShowPlayerScreen(player);
        }
        else{
            RemoveInventory();
        }
        EDown = true;
    }
    if(e.keyCode === controls["moveRight"]){
        dIsDown++;
        if(dIsDown === PlayerSpeed) {
            dIsDown = 0;
            if (player.Move(1, 0, map)) {
                Grav();
                Refresh();
            } else if (player.Move(1, 1, map)) {
                Grav();
                Refresh();
            }
        }
    }
    if(e.keyCode === controls["moveLeft"]){
        aIsDown++;
        if(aIsDown === PlayerSpeed) {
            aIsDown = 0;
            if (player.Move(-1, 0, map)) {
                Grav();
                Refresh();
            } else if (player.Move(-1, 1, map)) {
                Grav();
                Refresh();
            }
        }
    }
    if(e.keyCode === controls["moveUp"]){
        wIsDown++;
        if(wIsDown === PlayerSpeed) {
            wIsDown=0;
            if (player.Move(0, 1, map)) {
                Grav();
                Refresh();
            }
        }
    }
    if(e.keyCode === controls["moveDown"]){
        sIsDown++;
        if(sIsDown === PlayerSpeed) {
            sIsDown = 0;
            if (player.Move(0, -1, map)) {
                Grav();
                Refresh();
            }
        }
    }
}

function KeyUp(e,v){
    if(e.keyCode === controls["shift"]){
        ShiftDown=false;
    }
    if(e.keyCode === controls["ctrl"]){
        CTRLDown=false;
    }
    if(e.keyCode === controls["openInv"]) {
        EDown = false;
    }
    if(e.keyCode === controls["moveRight"]) {
        dIsDown = 4;
    }
    if(e.keyCode === controls["moveLeft"]) {
        aIsDown = 4;
    }
    if(e.keyCode === controls["moveUp"]) {
        wIsDown = 4;
    }
    if(e.keyCode === controls["moveDown"]) {
        sIsDown = 4;
    }
}

