class Furnace_Block extends Block{
    constructor(){
        super("furnace");
        this.inv = new Inventory(1,3
            ,() => {
                this.UpdateInv();
        });
        this.fuel = 0;
    }
    CanPassThrough(grav){
        return false;
    }
    LeftDown(player,x,y,map){
        super.LeftDown(player,x,y,map);
        player.inv.AddItem(new Furnace_Item(1));
        for(let i = 0;i<this.inv.h;i++){
            if(this.inv.items[0 + "/" + i]) {
                player.inv.AddItem(this.inv.items[0 + "/" + i]);
            }
        }
    }
    RightDown(player, x, y, map) {
        inventaires = {
            "player": player.inv,
            "furnace": this.inv
        };
        ShowFurnaceScreen(this);
    }

    UpdateInv(){
        //dessus
        let it1 = this.inv.items["0/0"];
        //dessous
        let it2 = this.inv.items["0/1"];
        //resultat
        let it3 = this.inv.items["0/2"];

        //s'il a des item a cuire
        if (it1 && it1.cookable && it1.cookable instanceof Cookable)
        {
                //si le four peut sortir les items
                if (!it3
                    || (it3.name === it1.cookable.CookTo.name
                        && it3.quantity + it1.cookable.CookTo.quantity <= it3.maxQuantity))
                {
                    while (true)
                    {
                        //s'il ne rest plus d'item a cuire
                        if (it1.quantity === 0)
                        {
                            this.inv.items["0/0"] = undefined;
                            break;
                        }
                        if (it1.cookable && it1.cookable instanceof Cookable)
                        {
                            //s'il reste du carburant
                            if (it1.cookable.CookTime <= this.fuel)
                            {
                                it1.quantity--;
                                this.fuel -= it1.cookable.CookTime;
                                //l'ajoute
                                if (!it3)
                                {
                                    this.inv.items["0/2"] = it1.cookable.CookTo.Clone();
                                    it3 = this.inv.items["0/2"];
                                }
                                else
                                {
                                    it3.quantity += it1.cookable.CookTo.quantity;
                                    if (it3.quantity + it1.cookable.CookTo.quantity > it3.maxQuantity)
                                    {
                                        break;
                                    }
                                }
                                continue;
                            }
                            else
                            {
                                if (!it2 || !it2.flammable || !(it2.flammable instanceof Flammable))
                                {
                                    //s'arrete s'il ne reste plus de carburant meme dans le slot des carburant
                                    break;
                                }
                                this.fuel += it2.flammable.CookTime;
                                it2.quantity--;
                                if (it2.quantity === 0)
                                {
                                    this.inv.items["0/1"] = undefined;
                                    it2 = undefined;
                                }
                            }
                        }
                    }
                }
        }
    }
}