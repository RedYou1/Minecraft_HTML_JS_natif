class Leaf_Item extends Item{
    constructor(quantity){
        super("leaf",quantity,64);
    }

    RightClick(player, x, y, map, block, entity) {
        if(block.name === "null" && !entity){
            this.quantity--;
            map.SetBlock(x,y,new Leaf_Block());
            return false;
        }
        return true;
    }
}