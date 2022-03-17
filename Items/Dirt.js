class Dirt_Item extends Item{
    constructor(quantity){
        super("dirt",quantity,64);
    }

    RightClick(player, x, y, map, block, entity) {
        if(block.name === "null" && !entity){
            this.quantity--;
            map.SetBlock(x,y,new Dirt_Block());
            return false;
        }
        return true;
    }
}