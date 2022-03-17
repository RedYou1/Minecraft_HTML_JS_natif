class Leaf_Block extends Block{
    constructor(){
        super("leaf");
    }
    CanPassThrough(grav){
        return true;
    }
    LeftDown(player,x,y,map){
        super.LeftDown(player,x,y,map);
        player.inv.AddItem(new Leaf_Item(1));
    }
    RightDown(player, x, y, map) {
        super.RightDown(player,x,y,map);
    }
}