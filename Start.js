
/**
    *******************************************************    STARTSEITE DES SPIELS   *******************************************************
*/

/**********************************************************     GLOBALE VARIABLEN   **********************************************/

var title;                                                                          // Titel des Spiels
var btn_easy, btn_medium, btn_hard, btn_expert;                                     // Button zur Levelauswahl
var btn_start_easy, btn_start_medium, btn_start_hard, btn_start_expert;             // Button zum starten des jeweiligen Levels                          
var tina, bubble, background, coin_cursor;                                          // Dekoelemente
var d_easy, d_medium, d_hard, d_expert, d;                                          // Beschreibungen
var coin, stone, bill;                                                              // Supportelemente für Beschreibung
var green_hook, green_hook2, red_cross;                                             // Supportelemente für Beschreibung
                                                       
class Start extends Phaser.Scene{

    constructor() {
        super({key:"Start"});
    }

    /**
     ***************************************    BENÖTIGTE BILDER   ***************************************
     Um die Bilder zu ersetzten bitte die Datei mit dem Pfad in die Funktion preload() einfügen
     Es ist darauf zu achten die Bilder in der Funktion create() passend zu skalieren
    */

    preload(){
        this.load.image('Weltall', 'assets/weltall.png');
        this.load.image('Tina', 'assets/tina.png');
        this.load.image('Blase', 'assets/description.png');
        this.load.image('Coin', 'assets/coin.png');
        this.load.image('Stone', 'assets/stone.png');
        this.load.image('Bill', 'assets/bill.png');
        this.load.image('Green_Hook', 'assets/green_hook.png');
        this.load.image('Red_Cross', 'assets/red_cross.png');
    }

    create() {    

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
         ***************************************         STARTSEITE      ***********************************************
         Der Titel, die Kurzbeschreibung und die Bilder zur Präsentation werden hinzugefügt und zum Teil nicht sichtbar gesetzt
         Die Positionen sind alle relativ zur Höhe und Breite der Spiel-Config
        */

        title = this.add.text(0,0, "Willkommen beim Münzsammler", {fontFamily: 'AhkioW05-Light', fontSize: '70px', fill: "#000000"});
        title.y = game.config.height * 0.1;
        title.x = (game.config.width/2) - (title.width/2);

        var expl1 = this.add.text(0, 0, "Sammle mit deinem Sparschwein so viele Münzen wie möglich!", {fontFamily: 'AhkioW05-Light', fontSize: '40px', fill: "#000000"});
        expl1.y = game.config.height * 0.2;
        expl1.x = (game.config.width/2) - (expl1.width/2);

        var expl2 = this.add.text(0, 0, "Aber pass auf, den Steinen solltest du besser ausweichen.", {fontFamily: 'AhkioW05-Light', fontSize: '40px', fill: "#000000"});
        expl2.y = game.config.height * 0.25;
        expl2.x = (game.config.width/2) - (expl2.width/2);

        tina = this.add.image(0, 0, 'Tina');
        tina.y = game.config.height * 0.89;
        tina.x = game.config.width * 0.19;
        tina.setScale(0.2);

        bubble = this.add.image(0, 0, 'Blase');
        bubble.y = game.config.height * 0.87;
        bubble.x = game.config.width * 0.65;
        bubble.setScale(0.65);

        coin = this.add.image(0, 0, 'Coin');
        coin.setScale(0.15);
        coin.setVisible(false);

        stone = this.add.image(0, 0, 'Stone');
        stone.setScale(1.7);
        stone.setVisible(false);

        bill = this.add.image(0, 0, 'Bill');
        bill.setScale(0.8);
        bill.setVisible(false);

        green_hook = this.add.image(0, 0, 'Green_Hook');
        green_hook.setScale(0.15);
        green_hook.setVisible(false);

        green_hook2 = this.add.image(0, 0, 'Green_Hook');
        green_hook2.setScale(0.15);
        green_hook2.setVisible(false);

        red_cross = this.add.image(0, 0, 'Red_Cross');
        red_cross.setScale(0.2);
        red_cross.setVisible(false);

        /**
         ***************************************         STARTBUTTON      ***********************************************
         Die Positionen sind relativ zum Dekoelement 'Bubble'
         Sie stellen die Startbutton für die jeweiligen Levels dar
        */

        btn_start_easy = this.add.text(0, 0, "START", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"});
        btn_start_easy.y = bubble.y;
        btn_start_easy.x = bubble.x + 130;
        btn_start_easy.setInteractive();
        btn_start_easy.setVisible(false);
        btn_start_easy.on('pointerover', () => {
            btn_start_easy.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        btn_start_easy.on('pointerout', () => {
            btn_start_easy.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })

        btn_start_medium = this.add.text(0, 0, "START", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"});
        btn_start_medium.y = bubble.y;
        btn_start_medium.x = bubble.x + 130;
        btn_start_medium.setInteractive();
        btn_start_medium.setVisible(false);
        btn_start_medium.on('pointerover', () => {
            btn_start_medium.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        btn_start_medium.on('pointerout', () => {
            btn_start_medium.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })

        btn_start_hard = this.add.text(0, 0, "START", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"});
        btn_start_hard.y = bubble.y;
        btn_start_hard.x = bubble.x + 130;
        btn_start_hard.setInteractive();
        btn_start_hard.setVisible(false);
        btn_start_hard.on('pointerover', () => {
            btn_start_hard.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        btn_start_hard.on('pointerout', () => {
            btn_start_hard.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })

        btn_start_expert = this.add.text(0, 0, "START", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"});
        btn_start_expert.y = bubble.y;
        btn_start_expert.x = bubble.x + 130;
        btn_start_expert.setInteractive();
        btn_start_expert.setVisible(false);
        btn_start_expert.on('pointerover', () => {
            btn_start_expert.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        btn_start_expert.on('pointerout', () => {
            btn_start_expert.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })

        /**
         *****************************************      BESCHREIBUNGEN      ***********************************************
         Die Beschreibungen zu den einzelnen Levels (sind zunächst nicht sichtbar)
         Die Y-Positionen sind relativ zum Dekoelement 'Bubble'
         Die X-Positionen sind relativ zur Breite der Spiel-Config
        */

        d = this.add.text(0, 0,  "Wähle dein Level aus!", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"}); 
        d.y = bubble.y - 25
        d.x = (game.config.width * 0.65) - (d.width / 2);

        d_easy = this.add.text(0, 0,  "Als Anfänger bist du hier genau richtig!", {fontFamily: 'AhkioW05-Light', fontSize: '35px', fill: "#000000"}); 
        d_easy.y = bubble.y - 60;
        d_easy.x = (game.config.width * 0.65) - (d_easy.width / 2);
        d_easy.setVisible(false);

        d_medium = this.add.text(0, 0,  "Jetzt wirds etwas schneller!", {fontFamily: 'AhkioW05-Light', fontSize: '35px', fill: "#000000"}); 
        d_medium.y = bubble.y - 60;
        d_medium.x = (game.config.width * 0.65) - (d_medium.width / 2);
        d_medium.setVisible(false);

        d_hard = this.add.text(0, 0,  "Kannst du das ganz große Geld sammeln?", {fontFamily: 'AhkioW05-Light', fontSize: '35px', fill: "#000000"}); 
        d_hard.y = bubble.y - 60;
        d_hard.x = (game.config.width * 0.65) - (d_hard.width / 2);
        d_hard.setVisible(false);

        d_expert = this.add.text(0, 0,  "Bist du Münzsammelexperte?", {fontFamily: 'AhkioW05-Light', fontSize: '35px', fill: "#000000"}); 
        d_expert.y = bubble.y - 60;
        d_expert.x = (game.config.width * 0.65) - (d_expert.width / 2);
        d_expert.setVisible(false);
    
        
        /**
         **********************************************     LEVELBUTTONS        *******************************************************
         Texte welche als Button fungieren
         OnHover wird der Text schattiert 
         Beim anklicken erscheint eine Münze neben der Auswahl, sodass klar wird welches Level man gerade ausgewählt hat.
         Dementsprechend erscheint auch der dazugehörige Text und Startbutton. Die anderen Möglichkeiten werden alle nicht sichbar
        */

        coin_cursor = this.physics.add.sprite(0, 0, 'Coin');
        coin_cursor.setScale(0.15);
        coin_cursor.setVisible(false);    

        btn_easy = this.add.text(0, 0,  "LEICHT", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"});   
        btn_easy.y = game.config.height * 0.35;
        btn_easy.x = game.config.width/2 - 75;
        btn_easy.setInteractive();
        btn_easy.on('pointerup', () => {
            // Textbeschreibung
            d.setVisible(false);
            d_easy.setVisible(true);
            d_medium.setVisible(false);
            d_hard.setVisible(false);
            d_expert.setVisible(false);
            // Dekoelemente zur Beschreibung
            coin.y = bubble.y + 30;
            coin.x = bubble.x - 150;
            green_hook.y = bubble.y + 30;
            green_hook.x = bubble.x - 150;
            stone.y = bubble.y + 30;
            stone.x = bubble.x;
            red_cross.y = bubble.y + 30;
            red_cross.x = bubble.x;
            coin.setVisible(true);
            stone.setVisible(true);
            bill.setVisible(false);
            green_hook.setVisible(true);
            green_hook2.setVisible(false);
            red_cross.setVisible(true);
            // Verdeutlichung der Auswahl
            coin_cursor.setVisible(true);
            coin_cursor.x = btn_easy.x - 50;
            coin_cursor.y = btn_easy.y + (btn_easy.height/2);
            // andere Buttons auf nicht sichtbar setzten
            btn_start_easy.setVisible(true);
            btn_start_medium.setVisible(false);
            btn_start_hard.setVisible(false);
            btn_start_expert.setVisible(false);
        })
        btn_easy.on('pointerover', () => {
            btn_easy.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })

        btn_easy.on('pointerout', () => {
            btn_easy.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })
        btn_start_easy.on('pointerup', () => {this.scene.start('Game_Easy')});

        btn_medium = this.add.text(0, 0,  "MITTEL", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"});   
        btn_medium.y = game.config.height * 0.45;
        btn_medium.x = game.config.width/2 - 75;
        btn_medium.setInteractive();
        btn_medium.on('pointerup', () => {
            // Textbeschreibung
            d.setVisible(false);
            d_easy.setVisible(false);
            d_medium.setVisible(true);
            d_hard.setVisible(false);
            d_expert.setVisible(false);
            // Dekoelemente zur Beschreibung
            coin.y = bubble.y + 30;
            coin.x = bubble.x - 150;
            green_hook.y = bubble.y + 30;
            green_hook.x = bubble.x - 150;
            stone.y = bubble.y + 30;
            stone.x = bubble.x;
            red_cross.y = bubble.y + 30;
            red_cross.x = bubble.x;
            coin.setVisible(true);
            stone.setVisible(true);
            bill.setVisible(false);
            green_hook.setVisible(true);
            green_hook2.setVisible(false);
            red_cross.setVisible(true);
            // Verdeutlichung der Auswahl
            coin_cursor.setVisible(true);
            coin_cursor.x = btn_medium.x - 50;
            coin_cursor.y = btn_medium.y + (btn_medium.height/2);
            // andere Buttons auf nicht sichtbar setzten
            btn_start_medium.setVisible(true);
            btn_start_easy.setVisible(false);
            btn_start_hard.setVisible(false);
            btn_start_expert.setVisible(false);
        })
        btn_medium.on('pointerover', () => {
            btn_medium.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        btn_medium.on('pointerout', () => {
            btn_medium.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })
        btn_start_medium.on('pointerup', () => {this.scene.start('Game_Medium')});

        btn_hard = this.add.text(0, 0,  "SCHWER", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"});   
        btn_hard.y = game.config.height * 0.55;
        btn_hard.x = game.config.width/2 - 75;
        btn_hard.setInteractive();
        btn_hard.on('pointerup', () => {
            // Textbeschreibung
            d.setVisible(false);
            d_easy.setVisible(false);
            d_medium.setVisible(false);
            d_hard.setVisible(true);
            d_expert.setVisible(false);
            // Dekoelemente zur Beschreibung
            coin.y = bubble.y + 30;
            coin.x = bubble.x - 200;
            green_hook.y = bubble.y + 30;
            green_hook.x = bubble.x - 200;
            stone.y = bubble.y + 30;
            stone.x = bubble.x + 20;
            red_cross.y = bubble.y + 30;
            red_cross.x = bubble.x + 20;
            bill.y = bubble.y + 30;
            bill.x = bubble.x - 90;
            green_hook2.y = bubble.y + 30;
            green_hook2.x = bubble.x - 90;
            coin.setVisible(true);
            stone.setVisible(true);
            bill.setVisible(true);
            green_hook.setVisible(true);
            green_hook2.setVisible(true);
            red_cross.setVisible(true);
            // Verdeutlichung der Auswahl
            coin_cursor.setVisible(true);
            coin_cursor.x = btn_hard.x - 50;
            coin_cursor.y = btn_hard.y + (btn_hard.height/2);
            // andere Buttons auf nicht sichtbar setzten
            btn_start_hard.setVisible(true);
            btn_start_medium.setVisible(false);
            btn_start_easy.setVisible(false);
            btn_start_expert.setVisible(false);
        })
        btn_hard.on('pointerover', () => {
            btn_hard.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        btn_hard.on('pointerout', () => {
            btn_hard.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })
        btn_start_hard.on('pointerup', () => {this.scene.start('Game_Hard')});

        btn_expert = this.add.text(0, 0,  "EXPERTE", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"});   
        btn_expert.y = game.config.height * 0.65;
        btn_expert.x = game.config.width/2 - 75;
        btn_expert.setInteractive();
        btn_expert.on('pointerup', () => {
            // Textbeschreibung
            d.setVisible(false);
            d_easy.setVisible(false);
            d_medium.setVisible(false);
            d_hard.setVisible(false);
            d_expert.setVisible(true);
            // Dekoelemente zur Beschreibung
            coin.y = bubble.y + 30;
            coin.x = bubble.x - 200;
            green_hook.y = bubble.y + 30;
            green_hook.x = bubble.x - 200;
            stone.y = bubble.y + 30;
            stone.x = bubble.x + 20;
            red_cross.y = bubble.y + 30;
            red_cross.x = bubble.x + 20;
            bill.y = bubble.y + 30;
            bill.x = bubble.x - 90;
            green_hook2.y = bubble.y + 30;
            green_hook2.x = bubble.x - 90;
            coin.setVisible(true);
            stone.setVisible(true);
            bill.setVisible(true);
            green_hook.setVisible(true);
            green_hook2.setVisible(true);
            red_cross.setVisible(true);
            // Verdeutlichung der Auswahl
            coin_cursor.setVisible(true);
            coin_cursor.x = btn_expert.x - 50;
            coin_cursor.y = btn_expert.y + (btn_expert.height/2);
            // andere Buttons auf nicht sichtbar setzten
            btn_start_expert.setVisible(true);
            btn_start_hard.setVisible(false);
            btn_start_medium.setVisible(false);
            btn_start_easy.setVisible(false);
        })
        btn_expert.on('pointerover', () => {
            btn_expert.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        btn_expert.on('pointerout', () => {
            btn_expert.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })
        btn_start_expert.on('pointerup', () => {this.scene.start('Game_Expert')});

    }
}