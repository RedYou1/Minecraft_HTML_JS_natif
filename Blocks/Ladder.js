class Ladder_Block extends Block{
    constructor(){
        super("ladder");
    }
    CanPassThrough(grav){
        return !grav;
    }
    LeftDown(player,x,y,map){
        super.LeftDown(player,x,y,map);
        player.inv.AddItem(new Ladder_Item(1));
    }
    RightDown(player, x, y, map) {
        super.RightDown(player,x,y,map);
    }
}