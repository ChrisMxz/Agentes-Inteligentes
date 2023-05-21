/* Juego del gato*/
// 0 = X = Cliente, 1= O = Servidor
var simbolos = ["X", "O"];
var casillas = Array.from(document.querySelectorAll(".casilla"));
var indicadorTurno = document.querySelector(".indicadorTurno");
var boton = document.querySelector(".nuevoJuego");
var tablero = document.querySelector(".tablero");
var bloquea =true;

//Para heuristica
var primerTiro = true;
var jugadas = new Array(9);
// Patron de casillas ganadoras
patronGanador = [
    // horizontal
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // vertical
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // diagonal
    [0, 4, 8], [2, 4, 6]
];

function turno(casilla) {
    console.log("Tiro: " + simbolos[jugadorActivo] + " -> " + casilla);
    casillas[casilla].classList.add(simbolos[jugadorActivo]);
    jugar(casilla);
}

//Elije una casilla de forma aleatoria
function tiraAleatorio() {
    //Obtengo una casilla aleatoria
    let casilla = numeroAleatorio();
    //verifico si no esta ocupada y si no ha terminado el juego
    if (casillas[casilla].classList.length < 2 && !fin) {
        turno(casilla);
    } else if (!fin) {
        //repite hasta que encuentre una vacia
        tiraAleatorio();
    }
    console.log("Termina turno Aleatorio")
}

function tirarConHeuristica() {
    bandera =true;
    nxx=false;
    nxxi=-1;
    noo=false;
    nooi=-1;
    no=false;
    noi=-1;
    nxo=false;
    nxoi=no;
    //verifica si ya se hizo el primer tiro
    if (!fin) {
        if (primerTiro) {
            primerTiroHeuristica();
        } else { //tirando con heuristica
            //Cargando jugadas
            analizarTablero();

            jugadas.some((jugada, index) => {
                if(jugada[0]==0&&jugada[1]==2){
                    noo=true;
                    nooi=index;
                }
                if(jugada[0]==2&&jugada[1]==0){
                    nxx=true;
                    nxxi=index;
                }
                if(jugada[0]==0&&jugada[1]==1){
                    no=true;
                    noi=index;
                }
                if(jugada[0]==0+jugada[1]<3){
                    nxo=true;
                    nxoi=index;
                } 
            });

            //console.log(noo,nooi,nxx,nxxi,no,noi,nxo,nxoi)

            //decide
            //existe [x,x, ] y [o,o, ] pero en lugar de bloquear debe tirar a ganar
            if(nxx&&noo){
                console.log("los 2 pueden ganar, pero es turo de heuristica y gana!");
                //recorre las casillas para encontrar 1 vacio y tirar
                patronGanador[nooi].some((casilla)=>{
                    if(verificaCasillaVacia(casilla)){
                        turno(casilla);
                        return true;
                    }
                });
            }else if(nxx&&bloque){ //Necesita bloquear
                console.log("Necesita bloquear");
                //recorre las casillas para encontrar 1 vacio y tirar
                patronGanador[nxxi].some((casilla)=>{
                    if(verificaCasillaVacia(casilla)){
                        turno(casilla);
                        return true;
                    }
                });
            }else if(noo){ //Tira a ganar
                console.log("Tira a ganar");
                //recorre las casillas para encontrar 1 vacio y tirar
                patronGanador[nooi].some((casilla)=>{
                    if(verificaCasillaVacia(casilla)){
                        turno(casilla);
                        return true;
                    }
                });
            }else if(no){//tira en un patron donde no solo este el
                console.log("Tira en un lugar donde solo este el");
                patronGanador[noi].some((casilla)=>{
                    if(verificaCasillaVacia(casilla)){
                        turno(casilla);
                        return true;
                    }
                });
            }else if (nxo){ //tira en en un lugar donde pueda
                console.log("Solo tira para rellenar (psible empate)");
                patronGanador[nxoi].some((casilla)=>{
                    if(verificaCasillaVacia(casilla)){
                        turno(casilla);
                        return true;
                    }
                });
            }

        }
    }
    console.log("Termina turno con heuristica");
}

function primerTiroHeuristica() {
    casillasPuntaje = new Array(9);
    var i;
    var puntaje;
    console.log("Primer tiro");
    //recorriendo las casillas para saber su puntaje
    for (i = 0; i < 9; i++) {
        puntaje = 0;
        //verificando si esta vacia
        if (verificaCasillaVacia(i)) {
            //buscando si esta en algun patron 
            patronGanador.forEach(function (patron) {
                //verifica que contenga la casilla && este vacio el patron
                if (patron.includes(i) && verificaPatronVacio(patron)) {
                    puntaje += 1; //suma un punto
                }
            });
        }
        casillasPuntaje[i] = puntaje; //agregamos el puntaje de la casilla
    }

    //detemina la casilla que tiene mejor puntaje
    console.log("Tira en donde tiene mayor chance de ganar");
    for (i = 4; i > 0; i--) {
        if (casillasPuntaje.indexOf(i) > -1) {
            turno(casillasPuntaje.indexOf(i)) //realiza tiro
            primerTiro = false;
            break;
        }
    }
}

function verificaCasillaVacia(num) {
    if (casillas[num].classList.length <2 ) {
        return true;
    } else {
        return false;
    }
}

function verificaPatronVacio(patron) {
    //recorriendo casillas del patron para verificar que esten vacios
    patron.forEach(function (i) {
        if (verificaCasillaVacia(i)) {
            return false
        }
    });
    //regresa verdadero cuando verifica que en ese patron esta vacio
    return true;
}

//verifica si aun se puede tirar en ese patron
function analizarTablero() {
    console.log("-> Analizar tablero");
    jugadas = [];
    let nx;
    let no;
    //recorriendo patrones ganadores
    patronGanador.forEach((patron, index) => {
        nx = 0, no = 0;
        //recorriendo cada casilla del patron contando el numero y tipo de simbolos
        patron.forEach((casilla) => {
            if (Array.from(casillas[casilla].classList).indexOf(simbolos[0]) > -1) {
                nx += 1; //va sumando las veces que encontro
            }
            if (Array.from(casillas[casilla].classList).indexOf(simbolos[1]) > -1) {
                no += 1; //va sumando las veces que encontro
            }
        });

        jugadas[index] = [nx, no];//agregando analisis de ese patron
        //console.log(index+": ("+nx,no+")");

    });
    console.log("Termine de analizar");
}

// Numero aleatorio del 0-8
function numeroAleatorio() {
    min = Math.ceil(0);
    max = Math.floor(9);
    return Math.floor(Math.random() * (max - min) + min);
}

// Evento del boton
function addEventListeners() {
    // Evento al presionar el boton
    boton.addEventListener("click", function () {
        nuevoJuego();
    }, false);
}

// Nuevo Juego
function nuevoJuego() {
    // Establece el jugador activo (Inicia con cliente "X")
    jugadorActivo = 0;
    primerTiro = true;
    jugadas = [];
    // Establece que el juego no ha terminado
    fin = false;
    // Remueve los simbolos de las casillas
    casillas.forEach(function (x) {
        x.classList.remove(simbolos[0]);
        x.classList.remove(simbolos[1]);
    });
    // Muestra mensaje del turno por defecto
    indicarTurno();
}

// Muestra el turno
function indicarTurno() {
    indicadorTurno.innerText = "Turno " + saberJugador(jugadorActivo);
}

function saberJugador(x) {
    // X = Cliente O = Servidor
    if (x == 0)
        return "Cliente (X)";
    if (x == 1)
        return "Servidor (O)";
}

function jugar() {
    if (!fin) {
        // Verifica si alguien gano
        if (verificarGanador()) {
            // Mensaje del ganador
            msg = "Ganador " + saberJugador(jugadorActivo)
            indicadorTurno.innerText = msg;
            console.log(msg);
            // Termina el juego
            finJuego();
        }
        // Verifica empate
        else if (verificaEmpate()) {
            // Mensaje empate
            indicadorTurno.innerText = "¡Empate!";
            console.log("¡Empate!");
            // Termina el juego
            finJuego();
        }
        // Cambia el turno
        else {
            // Cambia turno (0 -> 1 o 1 -> 0)
            jugadorActivo = 1 - jugadorActivo;
            indicarTurno();
        }
    }
}

// Verifica si alguien gano
function verificarGanador() {

    // Verifica si e cumple algun patron ganador
    return patronGanador.some(function (x) {
        return x.every(function (i) {
            return Array.from(casillas[i].classList).indexOf(simbolos[jugadorActivo]) > -1;
        });
    })
}

// Verifica empate
function verificaEmpate() {
    return casillas.every(function (x) {
        return x.classList.length > 1;
    });
}

// Establece que se termino el juego
function finJuego() {
    fin = true;
    console.log("Fin de la partida");
}

// Evento del boton
addEventListeners();
// Reiniciar el juego
nuevoJuego();