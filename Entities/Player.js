class Player extends Entity{
    constructor(x,y) {
        super(x,y,"player");
        this.rightHand = 0;
        this.inv = new Inventory(9,4);
        this.inv.items["1/0"] = new Dirt_Item(64);
        this.inv.items["7/2"] = new Stone_Item(10);
        this.inv.items["5/2"] = new Stone_Item(2);
        for(let x = 0; x< 9;x++){
            this.inv.items[x+"/3"] = new Stone_Item(2);
        }
        this.inv.AddItem(new Ladder_Item(64));
        this.inv.AddItem(new Furnace_Item(64));
        this.inv.AddItem(new Leaf_Block(64));
        this.inv.AddItem(new Log_Item(64));
        this.inv.AddItem(new Chest_Item(64));
        this.inv.AddItem(new Coal(64));
        this.inv.AddItem(new CraftingTable_Item(64));
        this.inv.AddItem(new Plank_Item(64));
    }
    RightHand(){
        return this.inv.items[this.rightHand+"/"+0];
    }
    Move(x, y, map) {
        return super.Move(x, y, map);
    }
    Grav(map){
        super.Grav(map);
    }
}