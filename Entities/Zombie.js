class Zombie extends Entity{
    constructor(x,y) {
        super(x,y,"zombie");
    }
    Move(x, y, map) {
        return super.Move(x, y, map);
    }
    Grav(map){
        super.Grav(map);
    }
}