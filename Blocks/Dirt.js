class Dirt_Block extends Block{
    constructor(){
        super("dirt");
    }
    CanPassThrough(grav){
        return false;
    }
    LeftDown(player,x,y,map){
        super.LeftDown(player,x,y,map);
        player.inv.AddItem(new Dirt_Item(1));
    }
    RightDown(player, x, y, map) {
        super.RightDown(player,x,y,map);
    }
}