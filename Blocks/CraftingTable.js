class CraftingTable_Block extends Block{
    constructor(){
        super("craftingTable");
        this.inv = new Inventory(3,3,()=>{this.UpdateInv();})
        this.result = undefined;
        this.hadResult = false;
    }
    CanPassThrough(grav){
        return false;
    }
    LeftDown(player,x,y,map){
        super.LeftDown(player,x,y,map);
        player.inv.AddItem(new CraftingTable_Item(1));
        for(let y = 0;y<this.inv.h;y++)
            for(let x = 0;x<this.inv.w;x++){
                if(this.inv.items[x+"/"+y]){
                    player.inv.AddItem(this.inv.items[x+"/"+y]);
                }
            }
    }
    RightDown(player, x, y, map) {
        inventaires = {
            "player": player.inv,
            "craftingTable": this.inv
        };
        ShowCraftingScreen(this);
    }
    UpdateInv(){
        let craft = CheckAllCraft(this.inv);
        if(craft){
            if(this.hadResult){
                for(let x = 0; x < 3;x++)
                    for(let y = 0; y < 3;y++) {
                        let key = x + "/" + y;
                        let item = craft.items[key];
                        if(item) {
                            this.inv.items[key].quantity -= item.quantity;
                            if (this.inv.items[key].quantity <= 0) {
                                this.inv.items[key] = undefined;
                            }
                        }
                    }
                this.hadResult = false;
            }
            craft = CheckAllCraft(this.inv);
            if(craft) {
                this.result = craft.to.Clone();
                this.hadResult = true;
            }
            else{
                this.result = undefined;
            }
        }
        else{
            this.result = undefined;
        }
    }
}