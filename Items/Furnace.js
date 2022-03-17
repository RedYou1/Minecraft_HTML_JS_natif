class Furnace_Item extends Item{
    constructor(quantity){
        super("furnace",quantity,64);
    }

    RightClick(player, x, y, map, block, entity) {
        if(block.name === "null" && !entity){
            this.quantity--;
            map.SetBlock(x,y,new Furnace_Block());
            return false;
        }
        return true;
    }
}