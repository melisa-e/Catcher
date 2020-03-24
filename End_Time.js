
/**
    *******************************************************    ENDSEITE ZEITABLAUF   *******************************************************
*/

/**********************************************************     GLOBALE VARIABLEN   **********************************************/

var resultTime, resultPoints;                                   // Ergebnistexte
var time, score, rating, lvl, lvl_label;                        // Daten aus dem Spiel
var btn_home;                                                   // Button um zum Menü zu kommen
var congrats, t1, t2;                                           // Texte
var mike, blase,  coinImage, stopWatchImage;                    // Dekoelemente/Icons
var stars = [];


class End_Time extends Phaser.Scene {

    constructor() {
        super({key: "End_Time"});
    }

    /**
     ***************************************     DATEN AUS DEM SPIEL   ***************************************
     Die übergebenen Daten/Werte werden Variablen zugewiesen
     Punktezahl, Zeit, Rating und Level
     es ist darauf zu achten, dass man den korrekten Index des data-Arrays angibt
    */
    init(data) {
        score = data[0];
        time = data[1];
        rating = data[2];
        lvl = data[3];
    }

    /**
     ***************************************    BENÖTIGTE BILDER   ***************************************
     Um die Bilder zu ersetzten bitte die Datei mit dem Pfad in die Funktion preload() einfügen
     Es ist darauf zu achten die Bilder in der Funktion create() passend zu skalieren
    */
    preload() {
        this.load.image('Weltall', 'assets/weltall.png');
        this.load.image('Mike', 'assets/mike.png');
        this.load.image('Home', 'assets/home.png');
        this.load.image('Coin', 'assets/coin.png');
        this.load.image('Stop_Watch', 'assets/stop_watch.png');
        this.load.image('Star', 'assets/star.png');
    }

    create() {

        console.log(rating);
        
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

        mike = this.add.image(0, 0, 'Mike');
        mike.y = game.config.height - 200;
        mike.x = game.config.width * 0.5;
        mike.setScale(0.3);

        /**
         ***********************************    TEXTE     ***********************************************
        **/
        congrats = this.add.text(0, 0, "GLÜCKWUNSCH!", {fontFamily: 'AhkioW05-Light', fontSize: '120px', fill: "#000000"});
        congrats.y = (game.config.height * 0.08);
        congrats.x = (game.config.width / 2) - (congrats.width/2);
        
        lvl_label = this.add.text(0, 0, lvl, {fontFamily: 'AhkioW05-Light', fontSize: '80px', fill: "#000000"});
        lvl_label.y = (game.config.height * 0.2);
        lvl_label.x = (game.config.width / 2) - (lvl_label.width/2);
        console.log(lvl);

        /**
         ***********************************    ERGEBNISANZEIGE ZEIT    ***********************************************
        **/
        stopWatchImage = this.add.image(0, 0, 'Stop_Watch');
        stopWatchImage.setScale(0.2);
        stopWatchImage.y = (game.config.height * 0.42) + (stopWatchImage.displayHeight/2);
        stopWatchImage.x = (game.config.width / 2) - 100;

        resultTime = this.add.text(0, 0, time + " s", {fontFamily: 'AhkioW05-Light', fontSize: '80px', fill: "#000000"});
        resultTime.y = stopWatchImage.y - (resultTime.height/2);
        resultTime.x = stopWatchImage.x + 100;

        /**
         ***********************************    ERGEBNISANZEIGE PUNKTE    ***********************************************
        **/
        coinImage = this.add.image(0, 0, 'Coin');
        coinImage.setScale(0.2);
        coinImage.y = (game.config.height * 0.55) + (coinImage.displayHeight/2);
        coinImage.x = (game.config.width / 2) - 100;
        
        resultPoints = this.add.text(0, 0, score + "", {fontFamily: 'AhkioW05-Light', fontSize: '80px', fill: "#000000"});
        resultPoints.y = coinImage.y - (resultPoints.height/2);
        resultPoints.x = coinImage.x + 100;

        /**
         ***********************************    RATING     ***********************************************
         Es werden immer drei Sterne dargestellt mit Alpha = 0.5
         Wird eine bestimmte Zahl erreicht, so wird das Sternen-Array bis i = Zahl durchlaufen, sodass die erreichten Sterne voll angezeigt werden
        **/
        lives = 3;
        stars[0] = this.physics.add.sprite((game.config.width/2) - 150, (game.config.height * 0.34), 'Star');
        stars[1] = this.physics.add.sprite((game.config.width/2), (game.config.height * 0.34), 'Star');
        stars[2] = this.physics.add.sprite((game.config.width/2) + 150, (game.config.height * 0.34), 'Star');
        stars[0].alpha = 0.5;
        stars[1].alpha = 0.5;
        stars[2].alpha = 0.5;

        stars.forEach(element => {
            element.setScale(1.8);
            element.setDepth(1);
        });
        var i;
        for (i = 0; i < rating; i++) {
            stars[i].alpha = 1;
        }

        /**
         ***********************************    HOMEBUTTON     ***********************************************
         Klickt man auf den Button, kommt man zu Hauptmenü
        **/
        btn_home = this.add.image(50, 50, 'Home');
        btn_home.setScale(0.15);
        btn_home.setInteractive();
        btn_home.on('pointerup', () => {
            this.scene.stop('Game_Easy');
            this.scene.stop('Game_Medium');
            this.scene.stop('Game_Hard');
            this.scene.stop('Game_Expert');
            this.scene.stop('End_Time');
            this.scene.start('Start');
        });

    }
}