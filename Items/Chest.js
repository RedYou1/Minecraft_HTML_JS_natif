class Chest_Item extends Item{
    constructor(quantity){
        super("chest",quantity,64);
        this.flammable = new Flammable(60);
    }

    RightClick(player, x, y, map, block, entity) {
        if(block.name === "null" && !entity){
            this.quantity--;
            map.SetBlock(x,y,new Chest_Block());
            return false;
        }
        return true;
    }
}