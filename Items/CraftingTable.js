class CraftingTable_Item extends Item{
    constructor(quantity){
        super("craftingTable",quantity,64);
    }

    RightClick(player, x, y, map, block, entity) {
        if(block.name === "null" && !entity){
            this.quantity--;
            map.SetBlock(x,y,new CraftingTable_Block());
            return false;
        }
        return true;
    }
}