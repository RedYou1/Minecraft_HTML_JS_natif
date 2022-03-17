class Log_Block extends Block{
    constructor(generated){
        super("log");
        this.generated = generated;
    }
    CanPassThrough(grav){
        return this.generated;
    }
    LeftDown(player,x,y,map){
        super.LeftDown(player,x,y,map);
        player.inv.AddItem(new Log_Item(1));
    }
    RightDown(player, x, y, map) {
        super.RightDown(player,x,y,map);
    }
}