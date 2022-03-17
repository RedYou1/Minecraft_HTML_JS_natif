class Chest_Block extends Block{
    constructor(){
        super("chest");
        this.inv = new Inventory(9,3);
    }
    CanPassThrough(grav){
        return false;
    }
    LeftDown(player,x,y,map){
        super.LeftDown(player,x,y,map);
        player.inv.AddItem(new Chest_Item(1));
        for(let y = 0;y<this.inv.h;y++)
            for(let x = 0;x<this.inv.w;x++){
                if(this.inv.items[x+"/"+y]){
                    player.inv.AddItem(this.inv.items[x+"/"+y]);
                }
            }
    }
    RightDown(player, x, y, map) {
        ShowOtherInventoryScreen(this.inv);
    }
}