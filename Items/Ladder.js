class Ladder_Item extends Item{
    constructor(quantity){
        super("ladder",quantity,64);
        this.flammable = new Flammable(30);
    }

    RightClick(player, x, y, map, block, entity) {
        if(block.name === "null" && !entity){
            this.quantity--;
            map.SetBlock(x,y,new Ladder_Block());
            return false;
        }
        return true;
    }
}