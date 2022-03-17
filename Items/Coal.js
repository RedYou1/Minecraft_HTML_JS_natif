class Coal extends Item{
    constructor(quantity){
        super("coal",quantity,64);
        this.flammable = new Flammable(80);
    }

    RightClick(player, x, y, map, block, entity) {
        return true;
    }
}