
const drehungBerg = [0, 0, 1, 0.463646716]

function currentFraction(value) {
    let SkifahrerPos = getPosition(value);

    arrayCopy(SkifahrerPos[0], translation, 3);
    arrayCopy(SkifahrerPos[1], rotationZ, 4);
    arrayCopy(SkifahrerPos[2], rotationY, 4);


    //Schlitten
    if (value < 0.05) {
        arrayCopy(
            lineareBewegung(0, 0.05, value, [45, 22.5, -15], [45, 22.5, -10])
            , translationSchlitten, 3);

        arrayCopy(drehungBerg, rotaionZSchlitten, 4);
        arrayCopy([0, 1, 0, drehung(0, 0.05, value, -90, 90)], rotaionYSchlitten, 4);

    } else if (value > 0.95) {
        arrayCopy(
            lineareBewegung(0.95, 1, value, [45, 22.5, -20], [45, 22.5, -15])
            , translationSchlitten, 3);

        arrayCopy(drehungBerg, rotaionZSchlitten, 4);
        arrayCopy([0, 1, 0, -Math.PI / 2], rotaionYSchlitten, 4);

    } else {
        let SchlittenPos = getPosition(value - 0.05);

        arrayCopy(SchlittenPos[0], translationSchlitten, 3);
        arrayCopy(SchlittenPos[1], rotaionZSchlitten, 4);
        arrayCopy(SchlittenPos[2], rotaionYSchlitten, 4);

    }


    //Skiflift
    if (value > 0.8 && value < 0.9) {
        arrayCopy(
            lineareBewegung(0.8, 0.9, value, [0, 8, 3.5], [45, 30.5, 3.5]),
            translationLift,3);

    } else if (value < 0.1) {
        arrayCopy(
            lineareBewegung(0, 0.1, value, [45, 30.5, 3.5], [0, 8, 3.5]),
            translationLift,3);
    }


}

/*
Berechnet aus value die Translation, Rotation um z-Achse und Rotation um y-Achse des Skifahrers
*/
function getPosition(value) {
    let currentTranslation = [0.0, 0.0, 0.0];
    let currentRotationz = [0.0, 0.0, 1.0, 0.0];
    let currentRotationy = [0.0, 1.0, 0.0, 0.0];

    if (value < 0.05) {
        let r = kreisbewegung(0, 0.05, value, 90, 90, 5, true, [startPosition[0], startPosition[2] + 5], 0);
        currentTranslation = [r[0],r[0]*0.5,r[1]];
        currentRotationz = drehungBerg;
        currentRotationy[3] = r[2];

    }
    else if (value < 0.15) {
        let r = kreisbewegung(0.05, 0.15, value, 0, 180, 7.5, false, [startPosition[0] - 12.5, startPosition[2] + 5], 90);
        currentTranslation = [r[0],r[0]*0.5,r[1]];
        currentRotationz = drehungBerg;
        currentRotationy[3] = r[2];

    } else if (value < 0.25) {
        let r = kreisbewegung(0.15, 0.25, value, 0, 180, 7.5, true, [startPosition[0] - 27.5, startPosition[2] + 5], -90);
        currentTranslation = [r[0],r[0]*0.5,r[1]];
        currentRotationz = drehungBerg;
        currentRotationy[3] = r[2];

    } else if (value < 0.3) {
        let r = kreisbewegung(0.25, 0.3, value, 0, 90, 5, false, [startPosition[0] - 40, startPosition[2] + 5], 90);
        currentTranslation = [r[0],r[0]*0.5,r[1]];
        currentRotationz = drehungBerg;
        currentRotationy[3] = r[2];

    } else if (value < 0.35) {
        currentTranslation = lineareBewegung(0.3, 0.35, value, [5, 2.5, 0], [0, 0, 0])
        currentRotationz = drehungBerg;

    } else if (value < 0.45) {
        currentTranslation = lineareBewegung(0.35, 0.45, value, [0, 0, 0], [-15, 0, 0]);

    } else if (value < 0.5) {
        currentTranslation = [-15, 0, 0];
        currentRotationy[3] = drehung(0.45, 0.5, value, 0, -90);

    } else if (value < 0.6) {
        currentTranslation = lineareBewegung(0.5, 0.6, value, [-15, 0, 0], [-15, 0, -15]);
        currentRotationy[3] = -degToRad(90);

    } else if (value < 0.65) {
        currentTranslation = [-15, 0, -15];
        currentRotationy[3] = -degToRad(90);

    } else if (value < 0.68) {
        currentTranslation = [-15, 0, -15];
        currentRotationy[3] = drehung(0.65, 0.68, value, -90, -90);

    } else if (value < 0.73) {
        currentTranslation = lineareBewegung(0.68, 0.73, value, [-15, 0, -15], [0, 0, -15]);
        currentRotationy[3] = degToRad(180);

    } else if (value < 0.76) {
        currentTranslation = [0, 0, -15];
        currentRotationy[3] = drehung(0.73, 0.76, value, 180, 90);

    } else if (value < 0.8) {
        currentTranslation = lineareBewegung(0.76, 0.8, value, [0, 0, -15], [0, 0, -20]);
        currentRotationy[3] = degToRad(-90);

    } else if (value < 0.9) {
        currentTranslation = lineareBewegung(0.8, 0.9, value, [0, 0, -20], [45, 22.5, -20]);
        currentRotationy[3] = degToRad(-90);
        
    } else {
        currentTranslation = lineareBewegung(0.9, 1, value, [45, 22.5, -20], [45, 22.5, -10])
        currentRotationz = drehungBerg;
        currentRotationy[3] = drehung(0.9, 1, value, -90, 90);
    }

    return [currentTranslation, currentRotationz, currentRotationy];
}

//Hilfsfunktionen

/*
Eingabe
-Anfangszeit, Endzeitpunkt, jetziger Zeitpunkt
-Anfangswinkel, Winkel wie viel rotiert werden soll, radius, ob es gegen den Uhgrzeigersinn gedreht werden soll(boolean). Alles auf den Einheitskreis bezogen
-Mittelpunkt(Array aus x und z Wert)
-drehung des Skifahrers

Ausgabe:
Array aus x-Verschiebung, z-Verschiebung und Rotation um yAchse
*/


function kreisbewegung(startTime, endTime, value, degFrom, degRot, radius, gegenUhrzeigersinn, mittelpunkt, startdrehung) {
    let result = new Array(3);
    let deg = -(degFrom + (1 / (endTime - startTime)) * (value - startTime) * degRot * (gegenUhrzeigersinn ? 1 : -1));
    let rad = degToRad(deg);

    result[0] = mittelpunkt[0] + Math.cos(rad) * radius;
    result[1] = mittelpunkt[1] + Math.sin(rad) * radius;

    result[2] = degToRad(-deg - degFrom + startdrehung);

    return result;
}


/*
Eingabe
-Anfangszeit, Endzeitpunkt, jetziger Zeitpunkt
-Drehung des Skifahrers am Anfangszeitpunkt
-Wie viel Grad gedreht werden soll

Ausgabe:
Drehung in Bogenmaß
*/
function drehung(startTime, endTime, value, degFrom, degRot) {
    return degToRad(degFrom + degRot / (endTime - startTime) * (value - startTime));
}

/*
Eingabe
-Anfangszeit, Endzeitpunkt, jetziger Zeitpunkt
-Startkoordinaten
-Endkoordianten

Ausgabe:
3D Koordianaten als Array
*/
function lineareBewegung(startTime, endTime, value, kord1, kord2) {
    let x1 = kord1[0] + ((kord2[0] - kord1[0]) / (endTime - startTime)) * (value - startTime);
    let x2 = kord1[1] + ((kord2[1] - kord1[1]) / (endTime - startTime)) * (value - startTime);
    let x3 = kord1[2] + ((kord2[2] - kord1[2]) / (endTime - startTime)) * (value - startTime);
    return [x1, x2, x3];
}


/*
Eingabe: 
Zahl, die ein Winkel in grad beschreibt

Ausgabe:
Winkel in Bogenmaß
*/
function degToRad(deg) {
    return deg * Math.PI / 180;
}

/*
Eingabe: 
-Array von dem kopiert werden soll
-Array zu dem kopiert werden soll
-wie viele Elemtente kopiert werden sollen

Element von from werden zu to kopiert
*/
function arrayCopy(from, to, length) {
    for (i = 0; i < length; i++) {
        to[i] = from[i];
    }
}
