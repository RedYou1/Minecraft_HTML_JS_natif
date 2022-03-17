class Stone_Item extends Item{
    constructor(quantity){
        super("stone",quantity,64);
    }

    RightClick(player, x, y, map, block, entity) {
        if(block.name === "null" && !entity){
            this.quantity--;
            map.SetBlock(x,y,new Stone_Block());
            return false;
        }
        return true;
    }
}