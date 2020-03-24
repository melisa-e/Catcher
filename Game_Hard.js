
/**
    *******************************************************    SCHWERES LEVEL   *******************************************************
*/

/**********************************************************     GLOBALE VARIABLEN   **********************************************/

var background, catcher;                                    // Komponenten des Spiels
var timer, t, sec, timerIcon;                               // Komponenten für den Timer
var counter, count, counterCoin;                            // Komponenten für die Punkte
var btn_home;                                               // Zurückbutton
var stones = [], coins = [], bills = [], c, s, b;           // Arrays für die Elemente
var lives, life = [];                                       // Komponenten für die "Leben"
var rating, lvl, lvl_label;                                 // Rating- und Levelkomponenten

/**
    ***************************************    ANPASSUNGSMÖGLICHKEITEN    ***************************************
    Um einfache Anpassungen vorzunehmen, können die Werte dieser Variablen verändert werden.
    Die Spiellaufzeit muss in der create()-Methode angepasst werden
*/
var distanceStone = 500                     // Abstand zwischen den einzelnen Steinen
var yOfFirstStone = -275                    // Y-Wert des ersten Steins
var distanceCoin = 200                      // Abstand zwischen den einzelnen Münzen
var yOfFirstCoin = 0                        // Y-Wert der ersten Münze
var distanceBill = 670                      // Abstand zwischen den einzelnen Scheinen
var yOfFirstBill = -400                     // Y-Wert des ersten Scheins
var speed = 200;                            // Geschwindigkeit aller Objekte (kleiner = schneller, größer = langsamer)
var valueCoin = 1                           // Wert einer Münze
var valueCoinText = "+1"                    // Wert einer Münze für Popup-Text
var valueBill = 5                           // Wert eines Scheins
var valueBillText = "+5"                    // Wert eines Scheins für Popup-Text
var oneStar = 30                            // Punktestand ab dem man einen Stern für das Rating bekommt
var twoStars = 60                           // Punktestand ab dem man zwei Sterne für das Rating bekommt
var threeStars = 90                         // Punktestand ab dem man drei Sterne für das Rating bekommt

class Game_Hard extends Phaser.Scene {

    constructor() {
        super({ key: "Game_Hard"});
    }

    /**
     ***************************************    BENÖTIGTE BILDER   ***************************************
     Um die Bilder zu ersetzten bitte die Datei mit dem Pfad in die Funktion preload() einfügen
     Es ist darauf zu achten die Bilder in der Funktion create() passend zu skalieren
    */
    preload() {
        this.load.image('Catcher', 'assets/catcher.png');
        this.load.image('Weltall', 'assets/weltall.png');
        this.load.image('Stone', 'assets/stone.png');
        this.load.image('Coin', 'assets/coin.png');
        this.load.image('Bill', 'assets/bill.png');
        this.load.image('Home', 'assets/home.png');
        this.load.image('Stop_Watch', 'assets/stop_watch.png');
    }

    create() {

        console.log("hard");

        /**
        ***************************************    ANPASSUNGSMÖGLICHKEITEN    ***************************************
        */
        sec = 30;       

        /**
         ***********************************    HINTERGRUND     ***********************************************
         Die Höhe des Bildes passt sich der Höhe des Spiels an und zentriert.
         Das Verhältnis des Bildes bleibt gleich, sodass sich das Bild nicht streckt.
         Um das Hintergrundbild zu ändern, muss der jeweilige Key des Bildes angegeben werden
        **/
        background = this.add.image(0, 0, 'Weltall');   
        background.displayHeight = this.sys.game.config.height;
        background.scaleX = background.scaleY;
        background.y = game.config.height/2;
        background.x = game.config.width/2;
        this.cameras.main.setBackgroundColor('#FFFFFF')
        background.alpha = 0.5;

        /**
         ***********************************    HOMEBUTTON     ***********************************************
         Klickt man auf das Icon, so wird das Spiel abgebrochen und man gelangt zurück zum Menü
        **/
        btn_home = this.add.image(50, 40, 'Home');
        btn_home.setScale(0.15);
        btn_home.setDepth(1);
        btn_home.setInteractive();
        btn_home.on('pointerdown', () => {
            this.scene.stop('Game_Easy');
            this.scene.stop('Game_Medium');
            this.scene.stop('Game_Hard');
            this.scene.stop('Game_Expert');
            this.scene.start('Start');
        });
        var lvl = this.add.text((game.config.width * 0.2), 15, "SCHWER", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000" });
        lvl_label = "SCHWER";
        lvl.setDepth(1);
        
        /**
         ***********************************    ZÄHLER     ***********************************************
         Stellt die Punkteanzahl dar
        **/
        counterCoin = this.physics.add.sprite(0, 0, 'Coin');
        counterCoin.setScale(0.15);
        counterCoin.y = counterCoin.displayHeight/2;
        counterCoin.x = (game.config.width/2) - 25;
        count = 0;
        counter = this.add.text(0, 0, count, {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000" });
        counter.y = counterCoin.y - (counter.height/2);
        counter.x = (game.config.width/2) + 25;
        counter.setDepth(1);
        counterCoin.setDepth(1);

        /**
         ***********************************    TIMER     ***********************************************
         Stellt die Zeit dar gegen welche man spielt
         Es läuft eine Schleife im 1-Sekunden-Takt, welche den Zeitzähler 'sec' solange um 1 runterzählt bis sec == 0 ist
         Die Zeit des Spiels kann durch Änderung der Variable 'sec' geändert werden
        **/     
        timerIcon = this.physics.add.sprite(0, 0, 'Stop_Watch');
        timerIcon.setScale(0.15);
        timerIcon.y = timerIcon.displayHeight/2;
        timerIcon.x = game.config.width - 150;
        timerIcon.setDepth(1);
        t = sec;
        timer = this.add.text(game.config.width-100, 0, sec, {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000" });
        timer.y = timerIcon.y - (timer.height/2);
        timer.setDepth(1);

        this.time.addEvent({
            delay: 1000,
            callback: function () {
                if (!(sec < 0)) {
                    sec -= 1;
                    timer.setText(sec);
                }
            },
            loop:true
        });
        
        /**
         ***********************************    SAMMLER     ***********************************************
         Sammler mit dem man die Elemente auffängt
        **/ 
        catcher = this.physics.add.sprite(this.cameras.main.centerX, this.cameras.main.height * 0.9, 'Catcher');
        catcher.setScale(0.3);

        /**
         ***********************************    STEIN     ***********************************************
         Array von Steinen;  um die Anzahl zu erhöhen, amountStones anpassen
         amountStones = so viele Steine wie momentan auf die Bildschirmhöhe passen
         ruft die Methode auf, welche die Bewegung und Geschwindigkeit bestimmt
        **/ 
        var amountStone = Math.round(catcher.y/distanceStone);
        for(var i = 0; i < amountStone; i++) {
            if(i > 0){
                stones[i] = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), stones[i-1].y - distanceStone, 'Stone');
            }
            else{
                stones[i] = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), yOfFirstStone, 'Stone');
            }
            stones[i].setScale(1.5);
            this.keepMovingStones(stones[i], catcher);
        }

        /**
         ***********************************    MÜNZE     ***********************************************
         Array von Münzen;  um die Anzahl zu erhöhen, amountCoins anpassen
         amountCoins = so viele Münzen wie momentan auf die Bildschirmhöhe passen
         ruft die Methode auf, welche die Bewegung und Geschwindigkeit bestimmt
        **/              
        var amountCoins = Math.round(catcher.y/distanceCoin);
        coins = [];
        for(var i = 0; i < amountCoins; i++) {
            if(i > 0){
                coins[i] = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), coins[i-1].y - distanceCoin, 'Coin');
            }
            else{
                coins[i] = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), yOfFirstCoin, 'Coin');
           }
            coins[i].setScale(0.15);
            this.keepMovingCoins(coins[i], catcher);
        }

        /**
         ***********************************    SCHEINE     ***********************************************
         Array von Scheinen;  um die Anzahl zu erhöhen, amountBill anpassen
         amountBill = so viele Scheine wie momentan auf die Bildschirmhöhe passen
         ruft die Methode auf, welche die Bewegung und Geschwindigkeit bestimmt
        **/
        var amountBill = Math.round(catcher.y/distanceBill);
        for(var i = 0; i < amountBill; i++) {
            if(i > 0){
                bills[i] = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), bills[i-1].y - distanceBill, 'Bill');
            }
            else{
                bills[i] = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), yOfFirstBill, 'Bill');
            }
            bills[i].setScale(0.8);
            this.keepMovingBills(bills[i], catcher);
        }

        /**
         ***********************************    LEBEN     ***********************************************
         Array von Leben; werden als Steine dargestellt
         soll ein neuer Stein hinzugefügt werden, so muss man dieses ins life-Array einfügen
         die Variable lives muss ebenfalls um die Anzahl erhöht werden
         Die Positionen sind anzupassen
         das letzte Element wird in dem Spiel als erstes entfernt und das erste als letztes 
        **/  
        lives = 3;
        life[0] = this.physics.add.sprite((game.config.width/2) - 70, 100, 'Stone');
        life[1] = this.physics.add.sprite((game.config.width/2), 100, 'Stone');
        life[2] = this.physics.add.sprite((game.config.width/2) + 70, 100, 'Stone');

        life.forEach(element => {
            element.setScale(1.2);
            element.setDepth(1);
        });
  
    }

    /**
     *****************************************************    BEWEGUNG     *****************************************************
    **/  

    /**
     ****************************************    GESCHWINDIGKEIT VON STEINEN     ***********************************************
     erhöht den Y-Wert des Stein-Elements im Interval; 
     Um die Geschwindigkeit zu ändern, y um einen höheren Wert erhöhen oder das Intervals anpassen
     Fallgeschwindigkeit ist abhängig von der Bildschirmgröße
     Ist das Spiel wegen der Zeit oder der Leben beendet, wird das Element zerstört
     Ist der Y-Wert außerhalb des Bildschirms, so wird der Y-Wert auf 0 gesetzt
    **/
    keepMovingStones(stone, catcher) {
        this.time.addEvent({
            delay: 20,
            callback: function () {
                stone.y += (game.config.height/speed);
                if (sec == 0 || lives == 0) {
                    stone.destroy();
                }else{
                    if(stone.y > (catcher.y + 50)){
                        stone.x = Phaser.Math.Between(20, (game.config.width-50));
                        stone.y = 0;
                    }
                }
            },
            loop:true
        });
    }

    /**
     ****************************************    GESCHWINDIGKEIT VON MÜNZEN     ***********************************************
     erhöht den Y-Wert des Münz-Elements im Interval; 
     Um die Geschwindigkeit zu ändern, y um einen höheren Wert erhöhen oder das Intervals anpassen
     Fallgeschwindigkeit ist abhängig von der Bildschirmgröße
     Ist das Spiel wegen der Zeit oder der Leben beendet, wird das Element zerstört
     Ist der Y-Wert außerhalb des Bildschirms, so wird der Y-Wert auf 0 gesetzt
    **/
    keepMovingCoins(coin, catcher) {
        this.time.addEvent({
            delay: 20,
            callback: function () {
                coin.y += (game.config.height/speed);
                if (sec == 0 || lives == 0) {
                    coin.destroy();
                }else{
                    if(coin.y > (catcher.y + 50)){
                        coin.x = Phaser.Math.Between(50, (game.config.width-50));
                        coin.y = 0;
                    }
                }
            },
            loop:true
        });
    }

    /**
     ****************************************    GESCHWINDIGKEIT VON SCHEINEN     ***********************************************
     erhöht den Y-Wert des Schein-Elements im Interval; 
     Um die Geschwindigkeit zu ändern, y um einen höheren Wert erhöhen oder das Intervals anpassen
     Fallgeschwindigkeit ist abhängig von der Bildschirmgröße
     Ist das Spiel wegen der Zeit oder der Leben beendet, wird das Element zerstört
     Ist der Y-Wert außerhalb des Bildschirms, so wird der Y-Wert auf 0 gesetzt
    **/
    keepMovingBills(bill, catcher) {
        this.time.addEvent({
            delay: 20,
            callback: function () {
                bill.y += (game.config.height/speed);
                if (sec == 0 || lives == 0) {
                    bill.destroy();
                }else{
                    if(bill.y > (catcher.y + 50)){
                        bill.x = Phaser.Math.Between(50, (game.config.width-50));
                        bill.y = 0;
                    }
                }
            },
            loop:true
        });
    }

    /**
     *****************************************************    COLLECTING     *****************************************************
    **/

    /**
     **************************************************    MÜNZE EINSAMMELN     ***********************************************
     es erscheint ein Text mit dem "Wert" der Münze für eine kurze Zeit
     die Münze wird zerstört
     der Zähler wird hochgezählt
     neues Münz-Element wird zum Array hinzugefügt
    **/
    collectCoins(catcher, coin) {
        var coin_points = this.add.text(0, 0, valueCoinText, {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#1A7625" });
        coin_points.y = coin.y;
        coin_points.x = coin.x;
        coin.destroy();
        var x = 0;
        this.time.addEvent({
            delay: 20,
            callback: function () {
                if(x < 15 && sec != 0 && lives != 0){
                    coin_points.y -= 4;
                    x += 1;
                }else{
                    coin_points.destroy();
                }
            },
            loop:true
        });
        counter.setText((count += valueCoin));
        coins.shift();
        c = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), 0, 'Coin');
        coins.push(c);
        c.setScale(0.15);
        this.keepMovingCoins(c, catcher);
    }

    /**
     **************************************************    STEIN EINSAMMELN     ***********************************************
     es erscheint ein Text für eine kurze Zeit, sodass klar wird, dass man ein Leben verloren hat
     der Stein wird zerstört
     ein Leben wird abgezogen
     neues Stein-Element wird zum Array hinzugefügt
    **/
    collectStones(catcher, stone) {
        var stone_points = this.add.text(0, 0, "X", {fontFamily: 'AhkioW05-Light', fontSize: '60px', fill: "#C91717" });
        stone_points.y = stone.y;
        stone_points.x = stone.x;
        var x = 0;
        this.time.addEvent({
            delay: 20,
            callback: function () {
                if(x < 15 && sec != 0 && lives != 0){
                    stone_points.y -= 4;
                    x += 1;
                }else{
                    stone_points.destroy();
                }
            },
            loop:true
        });
        stone.destroy();
        lives -= 1;
        life[lives].alpha = 0.3;
        stones.shift();
        s = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), 0, 'Stone');
        stones.push(s);
        s.setScale(1.5);
        this.keepMovingCoins(s, catcher);
    }

    /**
     **************************************************    SCHEIN EINSAMMELN     ***********************************************
     es erscheint ein Text mit dem "Wert" des Scheins für eine kurze Zeit 
     der Schein wird zerstört
     der Zähler wird hochgezählt
     neues Schein-Element wird zum Array hinzugefügt
    **/
    collectBills(catcher, bill) {
        var bill_points = this.add.text(0, 0, valueBillText, {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#1A7625" });
        bill_points.y = bill.y;
        bill_points.x = bill.x;
        var x = 0;
        this.time.addEvent({
            delay: 20,
            callback: function () {
                if(x < 15 && sec != 0 && lives != 0){
                    bill_points.y -= 4;
                    x += 1;
                }else{
                    clearInterval(this);
                    bill_points.destroy();
                }
            },
            loop:true
        });
        bill.destroy();
        counter.setText((count += valueBill));
        bills.shift();
        b = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), 0, 'Bill')
        bills.push(b);
        b.setScale(0.8);
        this.keepMovingBills(b, catcher);
    }

    /**
     **************************************************    RESULT     ***********************************************
     Alle Elemente von allen Arrays werden zerstört
     Texte vom Game werden nicht sichtbar gesetzt
    **/  
    createResult() {
        //manuelles Ratingsystem
        if(count < oneStar){
            rating = 0;
        }else if(count >= oneStar && count < twoStars){
            rating = 1;
        }else if(count >= twoStars && count < threeStars){
            rating = 2;
        }else if(count >= threeStars){
            rating = 3;
        }
        coins.forEach(element => {
            element.destroy();
        });
        stones.forEach(element => {
            element.destroy();
        });
        bills.forEach(element => {
            element.destroy();
        });
        life.forEach(element => {
            element.destroy();
        });
        catcher.destroy();
        btn_home.destroy();
        counter.destroy();
        counterCoin.destroy();
        timer.destroy();
        this.scene.stop();
    }

    /**
     *********************************************************    UPDATE     ***********************************************
     wenn die Zeit abläuft wird die Standard-Endscene aufgerufen
     dabei werden die Punkteanzahl, die Zeit, das Rating und das Level  übergeben
     wenn die Leben aufgebraucht sind, wird die "Game-Over"-Endscene aufgerufen
    **/ 
    update() {

        if(sec == 0){
            this.createResult();
            this.scene.start("End_Time", [count, t, rating, lvl_label]);
        }
        else if(lives == 0){
            this.createResult();
            this.scene.start("End_Life");
        }

        //      checkt ob eine Münze eingesammelt wurde
        coins.forEach(element => {
            this.physics.add.overlap(catcher, element, this.collectCoins, null, this);
        });

        //      checkt ob ein Stein eingesammelt wurde
        stones.forEach(element => {
            this.physics.add.overlap(catcher, element, this.collectStones, null, this);
        });

        //      checkt ob ein Schein eingesammelt wurde
        bills.forEach(element => {
            this.physics.add.overlap(catcher, element, this.collectBills, null, this);
        });
        
        //      setzt den Sammler auf die X-Position des Klicks 
        if (this.input.activePointer.isDown) {
            catcher.x = this.input.activePointer.x;
        }

    }

}
