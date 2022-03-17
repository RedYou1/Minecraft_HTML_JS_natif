<?php
include_once 'prefab/entete.php';
?>

<div id="GameScreen" oncontextmenu="event.preventDefault();return false;">
    <div id="Blocks">

    </div>
    <div id="Entities">

    </div>
    <div id="Inventory">

    </div>
</div>
    <script src="Cookable.js"></script>
    <script src="Flammable.js"></script>
    <script src="Block.js"></script>
    <script src="Blocks/Dirt.js"></script>
    <script src="Blocks/Stone.js"></script>
    <script src="Blocks/Ladder.js"></script>
    <script src="Blocks/Furnace.js"></script>
    <script src="Blocks/Chest.js"></script>
    <script src="Blocks/Log.js"></script>
    <script src="Blocks/Leaf.js"></script>
    <script src="Blocks/CraftingTable.js"></script>
    <script src="Blocks/Plank.js"></script>
    <script src="Schematic.js"></script>
    <script src="Schematics/Tree.js"></script>
    <script src="Item.js"></script>
    <script src="Items/Dirt.js"></script>
    <script src="Items/Stone.js"></script>
    <script src="Items/Ladder.js"></script>
    <script src="Items/Furnace.js"></script>
    <script src="Items/Chest.js"></script>
    <script src="Items/Log.js"></script>
    <script src="Items/Leaf.js"></script>
    <script src="Items/Coal.js"></script>
    <script src="Items/CraftingTable.js"></script>
    <script src="Items/Plank.js"></script>
    <script src="Inventory.js"></script>
    <script src="Craft.js"></script>
    <script src="Entity.js"></script>
    <script src="Entities/Player.js"></script>
    <script src="Entities/Zombie.js"></script>
    <script src="Noise.js"></script>
    <script src="Map.js"></script>
    <script src="Inventory_Manager.js"></script>
    <script src="js.js"></script>
<script>
    GameInit(
        <?php
        $GLOBALS['header'] = array();
        $GLOBALS['errorparm'] = array();
        $GLOBALS['jsparm'] = array();

        function addIntOrCharCode($s){
            if(isset($_POST[$s])){
                if(ctype_digit($_POST[$s])){
                    array_push($GLOBALS['jsparm'],$_POST[$s]);
                    array_push($GLOBALS['errorparm'],$s."=".$_POST[$s]);
                }
                else{
                    array_push($GLOBALS['header'],$s);
                    array_push($GLOBALS['errorparm'],$s."=".$_POST[$s]);
                }
            }
            else{
                array_push($GLOBALS['header'],$s);
            }
        }

        addIntOrCharCode("blockSize");
        addIntOrCharCode("moveLeft");
        addIntOrCharCode("moveRight");
        addIntOrCharCode("moveUp");
        addIntOrCharCode("moveDown");
        addIntOrCharCode("openInv");
        addIntOrCharCode("shift");
        addIntOrCharCode("ctrl");

        if(count($GLOBALS['header']) > 0){
            header("location: index.php?error=".implode("1",$GLOBALS['header'])."&".implode("&",$GLOBALS['errorparm']));
        }
        else{
            echo implode(",",$GLOBALS['jsparm']);
        }
        ?>
    );
</script>

<?php
include_once 'prefab/pied.php';
?>