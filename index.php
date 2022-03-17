<?php
include_once 'prefab/entete.php';
?>

<?php
if(isset($_GET['error'])){
    $t = explode("1",$_GET['error']);
    foreach($t as $error) {
        switch ($error) {
            case "blockSize":
                if (isset($_GET['blockSize'])) {
                    echo "<h1>Your Block Size isn't right (" . $_GET['blockSize'] . ")</h1>";
                } else {
                    echo "<h1>Your Block Size isn't set</h1>";
                }
                break;
            case "moveLeft":
                if (isset($_GET['moveLeft'])) {
                    echo "<h1>Your Move Left isn't right (" . $_GET['moveLeft'] . ")</h1>";
                } else {
                    echo "<h1>Your Move Left isn't set</h1>";
                }
                break;
            case "moveRight":
                if (isset($_GET['moveRight'])) {
                    echo "<h1>Your Move Right isn't right (" . $_GET['moveRight'] . ")</h1>";
                } else {
                    echo "<h1>Your Move Right isn't set</h1>";
                }
                break;
            case "moveUp":
                if (isset($_GET['moveUp'])) {
                    echo "<h1>Your Move Up isn't right (" . $_GET['moveUp'] . ")</h1>";
                } else {
                    echo "<h1>Your Move Up isn't set</h1>";
                }
                break;
            case "moveDown":
                if (isset($_GET['moveDown'])) {
                    echo "<h1>Your Move Down isn't right (" . $_GET['moveDown'] . ")</h1>";
                } else {
                    echo "<h1>Your Move Down isn't set</h1>";
                }
                break;
            case "openInv":
                if (isset($_GET['openInv'])) {
                    echo "<h1>Your Open Inventory isn't right (" . $_GET['openInv'] . ")</h1>";
                } else {
                    echo "<h1>Your Open Inventory isn't set</h1>";
                }
                break;
            case "shift":
                if (isset($_GET['shift'])) {
                    echo "<h1>Your Divide per two isn't right (" . $_GET['shift'] . ")</h1>";
                } else {
                    echo "<h1>Your Divide per two isn't set</h1>";
                }
                break;
            case "ctrl":
                if (isset($_GET['ctrl'])) {
                    echo "<h1>Your put one isn't right (" . $_GET['ctrl'] . ")</h1>";
                } else {
                    echo "<h1>Your put one isn't set</h1>";
                }
                break;
        }
    }
}
?>

<form id="setting" action="Game.php" method="post">
    <div>
        <label for="blockSize">Block Size Multiplicator</label>
        <input id="blockSize" name="blockSize" type="number" step="1"
<?php
        if(isset($_GET['blockSize'])){
            echo "value='".$_GET['blockSize']."'";
        }
        else{
            echo "value='1'";
        }
        ?>/>
    </div>
    <div>
        <?php
        function addKey($name,$id,$defaultKey,$defaultCode){
            echo "<div class='char'><label for='$id'>$name</label><input id='$id' class='char' name='$id' type='text' minlength='1' maxlength='1' onkeyup='charUp(event,this);'";

            if(isset($_GET[$id])){
                echo " value='".chr($_GET[$id])."' code='".$_GET[$id]."'";
            }
            else{
                echo " value='$defaultKey' code='$defaultCode'";
            }
            echo "/></div>";
        }
        echo "<h3>Controls</h3>";
        addKey("Move Left","moveLeft","A","65");
        addKey("Move Right","moveRight","D","68");
        addKey("Move Up","moveUp","W","87");
        addKey("Move Down","moveDown","S","83");
        addKey("Open Inventory","openInv","E","69");
        echo "<div><h3>In inventory</h3>";
        addKey("Divide per two (hold and click)","shift","SHIFT","16");
        addKey("put one (hold and click)","ctrl","CONTROL","17");
        echo "</div>";
        ?>
    </div>
    <button form="setting" type="submit" value="submit"  name="submit"  onclick="beforeSubmit()">Start Game</button>
</form>

<script>
    let chars = document.getElementsByClassName("char");
    for(let i = 0; i < chars.length;i++){
        chars[i].code = chars[i].getAttribute("code");
    }

    function beforeSubmit(){
        let chars = document.getElementsByClassName("char");
        for(let i = 0; i < chars.length;i++){
            chars[i].value = chars[i].code;
        }
    }

    function charUp(e,input){
        input.value = e.key.toUpperCase();

        let lasts = [];
        let chars = document.getElementsByClassName("char");
        for(let i = 0; i < chars.length;i++){
            if(chars[i].code == input.code){
                lasts.push(chars[i]);
            }
        }
        if(lasts.length === 2){
            for(let i = 0; i < 2;i++){
                lasts[i].classList.remove("duplicate");
                lasts[i].parentNode.firstElementChild.classList.remove("duplicate");
                lasts[i].parentElement.removeChild(lasts[i].parentElement.lastChild);
            }
        }
        else if(input.parentElement.childElementCount === 3){
            input.classList.remove("duplicate");
            input.parentNode.firstElementChild.classList.remove("duplicate");
            input.parentElement.removeChild(input.parentElement.lastChild);
        }

        input.code = e.which;

        let actu = [];
        chars = document.getElementsByClassName("char");
        for(let i = 0; i < chars.length;i++){
            if(chars[i].code == input.code){
                actu.push(chars[i]);
            }
        }
        if(actu.length > 1){
            for(let i = 0; i < actu.length;i++){
                if(actu[i].parentElement.childElementCount === 2) {
                    let text = document.createElement("p");
                    text.style.color = "red";
                    text.innerText = "duplicate";
                    actu[i].parentElement.append(text);
                    actu[i].parentNode.firstElementChild.classList.add("duplicate");
                    actu[i].classList.add("duplicate");
                }
            }
        }
    }
</script>

<?php
include_once 'prefab/pied.php';
?>