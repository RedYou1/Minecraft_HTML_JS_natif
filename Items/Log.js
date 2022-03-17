class Log_Item extends Item{
    constructor(quantity){
        super("log",quantity,64);
        this.flammable = new Flammable(40);
        this.cookable = new Cookable(new Coal(1),10);
    }

    RightClick(player, x, y, map, block, entity) {
        if(block.name === "null" && !entity){
            this.quantity--;
            map.SetBlock(x,y,new Log_Block(false));
            return false;
        }
        return true;
    }
}