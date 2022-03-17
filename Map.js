class Map{

    constructor() {
        this.map = [];
        this.entities = [];
        this.noise = new SimplexNoise();
    }

    AddEntity(entity){
        if(entity !== undefined && entity != null) {
            this.entities.push(entity);
        }
    }

    RemoveEntity(entity){
        if(entity !== undefined && entity != null && this.entities.contains(entity)) {
            this.entities.remove(this.entities.indexOf(entity));
        }
    }

    GetEntity(x,y){
        let r = null
        this.entities.forEach((ent) => {
           if(ent.x === x && ent.y === y){
               r = ent;
               return r;
           }
        });
        return r;
    }

    GetBlock(x,y){
        x=Math.round(x);
        y=Math.round(y);
        if(this.map[x+"/"+y] === undefined){
            let s = new Block("null");
            let i = Math.round(this.noise.noise2D(x/30,0) * 5);
            if(y < i) {
                if (y > i-3) {
                    s = new Dirt_Block();
                } else {
                    s = new Stone_Block();
                }
            }
            else if(y === i && Math.random() < .1){
                new Tree().Apply(x,y,this);
                return this.map[x+"/"+y];
            }
            this.map[x+"/"+y] = s;
        }
        return this.map[x+"/"+y];
    }

    SetBlock(x,y,block){
        x=Math.round(x);
        y=Math.round(y);
        this.map[x+"/"+y] = block;
    }

    Clone(){
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}