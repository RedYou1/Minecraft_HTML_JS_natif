class Item{
    constructor(name,quantity,maxQuantity){
        if(!quantity){
            quantity = 1;
        }
        if(!maxQuantity){
            maxQuantity = 64;
        }
        this.name = name;
        this.quantity = quantity;
        this.maxQuantity = maxQuantity;
    }

    /*
    returns: boolean if it does the RightClick of block and entity (just return true by default)
     */
    RightClick(player,x,y,map,block,entity){
        return true;
    }

    Clone(){
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}