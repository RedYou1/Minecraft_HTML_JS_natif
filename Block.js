class Block{
    constructor(name) {
        this.name = name;
    }
    CanPassThrough(grav){
        return true;
    }
    LeftDown(player,x,y,map){
        if(map !== undefined && x !== undefined && y !== undefined) {
            map.SetBlock(x, y, new Block("null"));
        }
    }
    RightDown(player,x,y,map) {}
    Clone(){
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}
function Blocks(){
    return [
        "null",new Block("null"),
        new Dirt_Block().name,new Dirt_Block(),
        new Stone_Block().name,new Stone_Block(),
        new Ladder_Block().name,new Ladder_Block()
    ];
}