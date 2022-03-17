class Tree extends Schematic{
Apply(x, y, map) {
    map.map[x+"/"+y] = new Log_Block(true);
    map.map[x+"/"+(y+1)] = new Log_Block(true);
    map.map[x+"/"+(y+2)] = new Log_Block(true);
    map.map[x+"/"+(y+3)] = new Log_Block(true);

    map.map[(x-1)+"/"+(y+2)] = new Leaf_Block();
    map.map[(x+1)+"/"+(y+2)] = new Leaf_Block();
    map.map[(x-2)+"/"+(y+2)] = new Leaf_Block();
    map.map[(x+2)+"/"+(y+2)] = new Leaf_Block();
    map.map[(x-1)+"/"+(y+3)] = new Leaf_Block();
    map.map[(x+1)+"/"+(y+3)] = new Leaf_Block();
    map.map[(x-2)+"/"+(y+3)] = new Leaf_Block();
    map.map[(x+2)+"/"+(y+3)] = new Leaf_Block();
    map.map[(x-1)+"/"+(y+4)] = new Leaf_Block();
    map.map[x+"/"+(y+4)] = new Leaf_Block();
    map.map[(x+1)+"/"+(y+4)] = new Leaf_Block();
}
}