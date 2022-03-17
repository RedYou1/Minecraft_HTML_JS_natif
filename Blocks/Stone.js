class Stone_Block extends Block{
    constructor(){
        super("stone");
    }
    CanPassThrough(grav){
        return false;
    }
    LeftDown(player,x,y,map){
        super.LeftDown(player,x,y,map);
        player.inv.AddItem(new Stone_Item(1));
    }
    RightDown(player, x, y, map) {
        super.RightDown(player,x,y,map);
    }
}