class Inventory{
    /*
    param 'update': a function with no params and no return
    who get called when the items get changed.
     */
    constructor(w,h,update) {
        this.w = w;
        this.h = h;
        this.items = [];
        this.update = update;
    }

    Update(){
        if(this.update){
            this.update();
            return true;
        }
        return false;
    }

    /*
    returns: the remaining items
     */
    AddItem(item){
        if(!item){
            return 0;
        }
        let remain = item.quantity;
        for(let y = 0; y < this.h;y++)
            for(let x = 0; x < this.w;x++){
                let s = x+"/"+y;
                if(!this.items[s]){
                    this.items[s] = item;
                    return 0;
                }
                if(this.items[s].name === item.name){
                    if(this.items[s].quantity+remain <= item.maxQuantity) {
                        this.items[s].quantity += remain;
                        return 0;
                    }
                    else{
                        remain -= item.maxQuantity - this.items[s].quantity;
                        this.items[s].quantity = item.maxQuantity;
                    }
                }

        }
    }

    Clone(){
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}