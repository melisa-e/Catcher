
/**
    *******************************************************    ENDSEITE LEBEN VERLOREN   *******************************************************
*/

/**********************************************************     GLOBALE VARIABLEN   **********************************************/

var resultTime, resultPoints;                                   // Ergebnistexte
var time, score;                                                // Daten aus dem Spiel
var btn_home;                                                   // Button um zum Menü zu kommen
var  t1, t2, t3;                                                //Texte
var coins;
var coinImage, stopWatchImage;
var explosion;

class End_Life extends Phaser.Scene {

    constructor() {
        super({key: "End_Life"});
    }

    /**
     ***************************************    BENÖTIGTE BILDER   ***************************************
     Um die Bilder zu ersetzten bitte die Datei mit dem Pfad in die Funktion preload() einfügen
     Es ist darauf zu achten die Bilder in der Funktion create() passend zu skalieren
    */
    preload() {
        this.load.image('Weltall', 'assets/weltall.png');
        this.load.image('Home', 'assets/home.png');
        this.load.image('Explosion', 'assets/explosion.png');
    }

    create() {

        /**
         ***********************************    HINTERGRUND     ***********************************************
         Ist die Höhe des Bildes kleiner als die Höhe des Geräts, so wird die Höhe an die des Geräts angepasst
         Ist die Breite kleiner als die des Geräts, so wird die Breite des Bildes dem des Geräts angepasst
         Das Verhältnis des Bildes bleibt gleich, sodass sich das Bild nicht streckt
        **/
        background = this.add.image(0, 0, 'Weltall');   
        background.displayHeight = this.sys.game.config.height;
        background.scaleX = background.scaleY;
        background.y = game.config.height/2;
        background.x = game.config.width/2;
        this.cameras.main.setBackgroundColor('#FFFFFF')
        background.alpha = 0.5;

        explosion = this.add.image(0, 0, 'Explosion');
        explosion.setScale(2);
        explosion.y = game.config.height/2 + 100;
        explosion.x = game.config.width * 0.35;

        /**
         ***********************************    TEXTE     ***********************************************
        **/
        t1 = this.add.text(0, 0, "OH NEIN!", {fontFamily: 'AhkioW05-Light', fontSize: '120px', fill: "#000000"});
        t1.y = (game.config.height * 0.15);
        t1.x = (game.config.width * 0.45);
        
        t2 = this.add.text(0, 0, "Dein Sparschwein ist", {fontFamily: 'AhkioW05-Light', fontSize: '70px', fill: "#000000"});
        t2.y = (game.config.height * 0.3);
        t2.x = (game.config.width * 0.35); 

        t3 = this.add.text(0, 0, "kaputt gegangen.", {fontFamily: 'AhkioW05-Light', fontSize: '70px', fill: "#000000"});
        t3.y = (game.config.height * 0.4);
        t3.x = (game.config.width * 0.4);

        /**
         ***********************************    HOMEBUTTON     ***********************************************
         Klickt man auf den Button, kommt man zum Hauptmenü
        **/
        btn_home = this.add.image(50, 50, 'Home');
        btn_home.setScale(0.2);
        btn_home.setInteractive();
        btn_home.on('pointerup', () => {
            this.scene.stop('Game_Easy');
            this.scene.stop('Game_Medium');
            this.scene.stop('Game_Hard');
            this.scene.stop('Game_Expert');
            this.scene.stop('End_Life');
            this.scene.start('Start');
        });
        

    }
}