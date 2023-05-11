/* Juego del gato*/
var Gato = {
    
    /* Inicializar el juego */
    iniciar: function () {
        // 0 = X = Cliente, 1= O = Servidor
        this.simbolos = ["X", "O"];
        this.casillas = Array.from(document.querySelectorAll(".casilla"));
        this.indicadorTurno = document.querySelector(".indicadorTurno");
        this.boton = document.querySelector(".nuevoJuego");
        this.tablero = document.querySelector(".tablero");
        // Patron de casillas ganadoras
        this.patronGanador = [
            // horizontal
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            // vertical
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            // diagonal
            [0, 4, 8], [2, 4, 6]
        ];
        
        // Evento del boton
        this.addEventListeners();
        // Reiniciar el juego
        this.nuevoJuego();
    },

    turno: function (casilla) {
        this.casillas[casilla].classList.add(this.simbolos[this.jugadorActivo])
        this.jugar(casilla);
    },

    //Elije una casilla de forma aleatoria
    tiraAleatorio: function () {
        //Obtengo una casilla aleatoria
        casilla=this.numeroAleatorio()
        //verifico si no esta ocupada y si no ha terminado el juego
        if(this.casillas[casilla].classList.length<2 && !this.fin){
            console.log("Cliente a elegido la casilla: "+casilla)
            this.casillas[casilla].classList.add(this.simbolos[this.jugadorActivo])
            this.jugar(casilla);
        }else if(!this.fin){
            //repite hasta que encuentre una vacia
            console.log("Repite tiro")
            this.tiraAleatorio()
        }
    },

    // Numero aleatorio del 0-8
    numeroAleatorio: function () {
        min = Math.ceil(0);
        max = Math.floor(9);
        return Math.floor(Math.random() * (max - min) + min);
    },

    // Evento del boton
    addEventListeners: function () {
        var ttt = this;
        // Evento al presionar el boton
        this.boton.addEventListener("click", function () {
            ttt.nuevoJuego();
        }, false);
    },

    // Nuevo Juego
    nuevoJuego: function () {
        // Establece el jugador activo (Inicia con cliente "X")
        this.jugadorActivo = 0;
        // Establece que el juego no ha terminado
        this.fin = false;
        // Remueve los simbolos de las casillas
        this.casillas.forEach(function (x) {
            x.classList.remove(Gato.simbolos[0]);
            x.classList.remove(Gato.simbolos[1]);
        })
        // Muestra mensaje del turno por defecto
        this.indicarTurno();
    },

    // Muestra el turno
    indicarTurno: function () {
        this.indicadorTurno.innerText = "Turno: " + this.saberJugador(this.jugadorActivo);
    },

    saberJugador: function (x) {
        // X = Cliente O = Servidor
        if (x == 0)
            return "Cliente (X)";
        if (x == 1)
            return "Servidor (O)";
    },

    jugar: function () {
        if (!this.fin) {
            // Verifica si alguien gano
            if (this.verificarGanador()) {
                // Mensaje del ganador
                msg="Ganador: " + this.saberJugador(this.jugadorActivo)
                this.indicadorTurno.innerText = msg ;
                console.log(msg)
                // Termina el juego
                this.finJuego();
            }
            // Verifica empate
            else if (this.verificaEmpate()) {
                // Mensaje empate
                this.indicadorTurno.innerText = "¡Empate!";
                console.log("¡Empate!")
                // Termina el juego
                this.finJuego();
            }
            // Cambia el turno
            else {
                // Cambia turno (0 -> 1 o 1 -> 0)
                this.jugadorActivo = 1 - this.jugadorActivo;
                this.indicarTurno();
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
    verificaEmpate: function () {
        return this.casillas.every(function (x) {
            return x.classList.length > 1;
        })
    },

    // Establece que se termino el juego
    finJuego: function () {
        this.fin = true;
        console.log("Fin de la partida")
    }
}

// iniciar el juego al cargar la pagina
Gato.iniciar();