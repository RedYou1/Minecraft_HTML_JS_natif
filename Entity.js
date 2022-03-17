class Entity{
    constructor(x,y,name) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
    Grav(map){
        while(map.GetBlock(this.x,this.y-1).CanPassThrough(true)){
            this.y--;
        }
    }
    Move(x,y,map){
        if(typeof x == "number" && typeof y == "number") {
            if (x > 1) {
                x = 1;
            }
            if (x < -1) {
                x = -1;
            }
            if (y > 1) {
                y = 1;
            }
            if (y < -1) {
                y = -1;
            }
            if (x !== 0 && y !== 0) {
                this.Move(0, y, map);
                this.Move(x, 0, map);
                return true;
            }

            if (map === undefined) {
                this.x += x;
                this.y += y;
                return true;
            } else if (map.GetBlock(Math.round(this.x + x), Math.round(this.y + y)).CanPassThrough(false)) {
                this.x += x;
                this.y += y;
                return true;
            }
        }
        return false;
    }
    Clone(){
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}