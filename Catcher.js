
/**
    *******************************************************    ERKLÄRUNG DES SPIELAUFBAUS   *******************************************************
    Zunächst öffnet sich die Startseite. Bei dieser sieht man die verfügbaren Level. Klickt man eines dieser Levelbezeichnungen an, so wird dargestellt,
    welche Elemente im jeweiligen Level eingesammelt werden sollen. Klickt man nun 'START', kommt man zum zuvor ausgewählten Level.
    Das Spiel läuft immer 30 Sekunden. In dieser Zeit soll der Spieler mithilfe des Sammlers so viel Geld einsammeln wie er kann, ohne die Steine zu berühren.
    Nach der Zeit erscheint die Endseite, welche das Rating, die abgelaufene Zeit und das eingesammelte Geld darstellt.
    Berührt man jedoch drei Steine so wird das Spiel beendet und die "Game-Over"-Endseite öffnet sich.
    Klickt man auf das Haus-Icon, so gelangt man wieder zur Startseite.

    Die Levels unterscheiden sich in Geschwindigkeit und Anzahl der zu unterscheidenden Elemente.
    LEICHT:     Langsam         Münzen, Steine
    MITTEL:     Schnell         Münzen, Steine
    SCHWER:     Langsam         Münzen, Scheine, Steine
    EXPERTE:    Schnell         Münzen, Scheine, Steine    
    
    Mögliche Änderungen:
    Die Zeit ist einfach über eine Variable anpassbar, sodass man nichts weiter ändern muss.
    Alle Bilder sind einfach zu ersetzen mithilfer der jeweiligen preload()-Funktion
    Es ist darauf zu achten die einzelnen Elemente mit diesen Bildern richtig zu skalieren
    Die Geschwindigkeit kann pro Level angepasst werden
    Das Ratingsystem kann pro Level angepasst werden
    Die Positionen der Texte und Bilder kann auch angepasst werden
*/


/**********************************************************     SCHRIFTART      *************************************************
 * Hier wird die Schrift eingebunden, sodass sie bei der Erstellung von Texten als Schriftart auswählbar ist.
 * **/

var new_font = new FontFace('AhkioW05-Light', 'url(Fonts/AhkioW05-Light.ttf)');
new_font.load().then(function(loaded_face) {
    document.fonts.add(loaded_face);
}).catch(function(error) {
});

/**********************************************************    SETUP FÜR PHASER    ***********************************************/

var config = {
    type: Phaser.AUTO,
    width: 900,                                         // Breite des Spiels
    height: 1200,                                       // Höhe des Spiels
    physics: {
        default: 'arcade',
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Start, Game_Easy, Game_Medium, Game_Hard, Game_Expert, End_Time, End_Life]
};

var game = new Phaser.Game(config);
