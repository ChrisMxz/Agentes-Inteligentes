/*Juego del gato*/
var Gato = {
    /* Inicializa el juego*/
    init: function () {
        this.simbolos = ["X", "O"];
        this.casillas = Array.from(document.querySelectorAll(".casilla"));
        this.indicadorTurno = document.querySelector(".indicadorTurno");
        this.btnIniciar = document.querySelector(".nuevoJuego");
        this.tablero = document.querySelector(".tablero");

        //Para heuristica
        this.primerTiro = true;
        this.jugadas = new Array(9);
        this.bloquea =true;


        //historial de partidas
        this.partida= []; // almacena partida (movimientos etc)
        this.historial= [];  //lista de partidas

        // Patrones para ganar
        this.patronGanador = [
            // horizontal 
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            // vertical 
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            // diagonal
            [0, 4, 8], [2, 4, 6]
        ];
        // Evento de botones
        this.addEventListeners();
        // reinicia juego
        this.nuevoJuego();
    },

    // Eventos de boton
    addEventListeners: function () {
        var ttt = this;
        // Evento al hacer click en una casilla
        this.casillas.forEach(function (x,index) {
            x.addEventListener("click", function () {
                msg="Tiro persona: " + Gato.simbolos[ttt.jugadorActivo] + " -> " + index;
                console.log(msg);
                ttt.partida.push(msg);
                ttt.jugar(this);
            }, false)
        })
        // Evento cuando se presiona el btn de iniciar
        this.btnIniciar.addEventListener("click", function () {
            ttt.nuevoJuego();
        }, false);
    },

    // nuevo juego
    nuevoJuego: function () {
        // Establece el jugador que inicia (X)
        this.jugadorActivo = 0;
        // Limpia el hsitorial de la partidad pasada
        this.partida=[];
        // Bandera de juego terminado (falso)
        this.finDelJuego = false;
        // Limpia el tablero
        this.casillas.forEach(function (x) {
            x.classList.remove(Gato.simbolos[0]);
            x.classList.remove(Gato.simbolos[1]);
        })
        // Muestra el turno que corresponde
        this.mostrarTurno();
    },

    // Muestra el mensaje en pantalla el turno del
    mostrarTurno: function () {
        this.indicadorTurno.innerText = "Turno " + this.saberJugador(this.jugadorActivo);
    },

    saberJugador: function (x) {
        // X = Cliente O = Servidor
        if (x == 0)
            return "Cliente (X)";
        if (x == 1)
            return "Servidor (O)";
    },

    jugar: function (el) {
        // verifica que no haya terminado el juego y que esa casilla no este ocupada
        if (!this.finDelJuego && el.classList.length == 1) {
            // Establece el simbolo al jugador activo
            el.classList.add(this.simbolos[this.jugadorActivo]);
            this.partida.push()
            
            if (this.verificarGanador()) {
                // Mensaje del ganador
                msg = "Ganador " + this.saberJugador(this.jugadorActivo)
                this.indicadorTurno.innerText = msg;
                console.log(msg);
                this.partida.push(msg);
                this.historial.push(this.partida);
                // Termina el juego
                this.fin();
            }
            
            else if (this.verificarEmpate()) {
                // Mensaje empate
                this.indicadorTurno.innerText = "¡Empate!";
                console.log("¡Empate!");
                this.partida.push("¡Empate!");
                this.historial.push(this.partida);
                // Termina el juego
                this.fin();
            }
            // cambia el turno
            else {
                // (0 -> 1 or 1 -> 0)
                this.jugadorActivo = 1 - this.jugadorActivo;
                // muestra el turno siguiente
                this.mostrarTurno();
                if(this.jugadorActivo==1){
                    this.tirarConHeuristica();
                }

            }
        }
    },

    // Verifica si alguien gano
    verificarGanador: function () {
        var ttt = this;
        // Verifica si e cumple algun patron ganador
        return this.patronGanador.some(function (x) {
            return x.every(function (i) {
                return Array.from(ttt.casillas[i].classList).indexOf(ttt.simbolos[ttt.jugadorActivo]) > -1;
            })
        })
    },

    // Verifica empate
    verificarEmpate: function () {
        return this.casillas.every(function (x) {
            return x.classList.length > 1;
        })
    },

    // Establece que se termino el juego
    fin: function () {
        this.finDelJuego = true;
    },


    //heuristica

    verificaPatronVacio: function (patron) {
        bandera = true;
        ttt=this;
        //recorriendo casillas del patron para verificar que esten vacios
        patron.forEach(function (i) {
            if (ttt.casillas[i].classList.length > 1) { //verificando que la casilla este vacia
                bandera = false
            }
        });
        //regresa verdadero cuando verifica que en ese patron esta vacio
        return bandera;
    },

    //verifica si aun se puede tirar en ese patron
    analizarTablero: function () {
        console.log("-> Analizar tablero");
        jugadas = [];
        let nx;
        let no;
        var ttt = this;
        //recorriendo patrones ganadores
        this.patronGanador.forEach((patron, index) => {
            nx = 0, no = 0;
            //recorriendo cada casilla del patron contando el numero y tipo de simbolos
            patron.forEach((casilla) => {
                if (Array.from(ttt.casillas[casilla].classList).indexOf(ttt.simbolos[0]) > -1) {
                    nx += 1; //va sumando las veces que encontro
                }
                if (Array.from(ttt.casillas[casilla].classList).indexOf(ttt.simbolos[1]) > -1) {
                    no += 1; //va sumando las veces que encontro
                }
            });

            ttt.jugadas[index] = [nx, no];//agregando analisis de ese patron
            //console.log(index+": ("+nx,no+")");

        });
        console.log("Termine de analizar");
    },

     primerTiroHeuristica: function() {
        casillasPuntaje = new Array(9);
        var i;
        var puntaje;
        console.log("Primer tiro heuristica");
        ttt=this;
        //recorriendo las casillas para saber su puntaje
        for (i = 0; i < 9; i++) {
            puntaje = 0;
            //verificando si esta vacia
            if (this.casillas[i].classList.length < 2) {
                //buscando si esta en algun patron 
                this.patronGanador.forEach(function (patron) {
                    //verifica que contenga la casilla && este vacio el patron
                    if (patron.includes(i) && ttt.verificaPatronVacio(patron)) {
                        puntaje += 1; //suma un punto
                    }
                });
            }
            casillasPuntaje[i] = puntaje; //agregamos el puntaje de la casilla
        }
    
        //detemina la casilla que tiene mejor puntaje
        console.log("Tira en donde tiene mayor chance de ganar");
        console.log(casillasPuntaje);
        for (i = 4; i > 0; i--) {
            if (casillasPuntaje.indexOf(i) > -1) {
                this.tirar(casillasPuntaje.indexOf(i)) //realiza tiro
                this.primerTiro = false;
                break;
            }
        }
    },

     tirar:function(casilla) {
        msg="Tiro: " + Gato.simbolos[this.jugadorActivo] + " -> " + casilla;
        console.log(msg);
        this.partida.push(msg);
        this.jugar(this.casillas[casilla]);
    },

    //Heuristica
     tirarConHeuristica:function() {
        bandera =true;
        nxx=false;
        nxxi=-1;
        noo=false;
        nooi=-1;
        no=false;
        noi=-1;
        nxo=false;
        nxoi=no;
        ttt=this;
        //verifica si ya se hizo el primer tiro
        if (!this.finDelJuego) {
            if (this.primerTiro) {
                this.primerTiroHeuristica();
            } else { //tirando con heuristica
                //Cargando jugadas
                this.analizarTablero();
    
                this.jugadas.some((jugada, index) => {
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
                    this.patronGanador[nooi].some((casilla)=>{
                        if(ttt.casillas[casilla].classList.length < 2){
                            ttt.tirar(casilla);
                            return true;
                        }
                    });
                }else if(nxx&&this.bloquea){ //Necesita bloquear
                    console.log("Necesita bloquear");
                    //recorre las casillas para encontrar 1 vacio y tirar
                    this.patronGanador[nxxi].some((casilla)=>{
                        if(ttt.casillas[casilla].classList.length < 2){
                            ttt.tirar(casilla);
                            return true;
                        }
                    });
                }else if(noo){ //Tira a ganar
                    console.log("Tira a ganar");
                    //recorre las casillas para encontrar 1 vacio y tirar
                    this.patronGanador[nooi].some((casilla)=>{
                        if(ttt.casillas[casilla].classList.length < 2){
                            ttt.tirar(casilla);
                            return true;
                        }
                    });
                }else if(no){//tira en un patron donde no solo este el
                    console.log("Tira en un lugar donde solo este el");
                    this.patronGanador[noi].some((casilla)=>{
                        if(ttt.casillas[casilla].classList.length < 2){
                            ttt.tirar(casilla);
                            return true;
                        }
                    });
                }else if (nxo){ //tira en en un lugar donde pueda
                    console.log("Solo tira para rellenar (psible empate)");
                    this.patronGanador[nxoi].some((casilla)=>{
                        if(ttt.casillas[casilla].classList.length < 2){
                            ttt.tirar(casilla);
                            return true;
                        }
                    });
                }
    
            }
        }
        console.log("Termina turno con heuristica");
    }

}

// Inicia cuando se carga la pagina
Gato.init();