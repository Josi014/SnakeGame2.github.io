window.onload = function () {

    var screen = document.getElementById('screen');
    var paint = screen.getContext("2d");
    setInterval(gameCobrinha, 100);
    var marcaPontos = document.getElementById('placar');
    var placar = 0;
    var audio = document.createElement("AUDIO")
    document.body.appendChild(audio);
    audio.src = '../sons/trilha.mp3'
    var polisuco = document.createElement("AUDIO")
    document.body.appendChild(polisuco);
    polisuco.src = '../sons/magica.mp3'
    var vaiPerder = document.createElement("AUDIO")
    document.body.appendChild(vaiPerder);
    vaiPerder.src = '../sons/vaiPerder.mp3'
    var pocaoMorte = document.createElement("AUDIO")
    document.body.appendChild(pocaoMorte);
    pocaoMorte.src = '../sons/pocaoMorte.mp3'
    var colisao = document.createElement("AUDIO")
    document.body.appendChild(colisao);
    colisao.src = '../sons/colisao.mp3'
    var corOriginal = paint.fillStyle = "white";

    var x = 1;
    var y = 2;
    var j = 2;
    var z = 1;

    var vel = 1;

    var velX = 0;
    var velY = 0;
    var pontoX = 10;
    var pontoY = 15;
    var tq = 20;
    var aq = 50;
    var appleX = appleY = 10;
    var bordaXm = 40;
    var bordaYm = 49;
    var bordaXMini = 49;
    var bordaYMini = 20;


    var rastro = [];
    var tail = 2;

    paint.fillStyle = "green";
    paint.fillRect(0, 0, screen.width, screen.height);
    paint.fillStyle = "red";
    paint.fillRect(appleX * tq, appleY * tq, tq, tq);
    
    const buttonsPlacaCores = document.querySelector(".map");

        buttonsPlacaCores.addEventListener("click", e => {
            Array.from(buttonsPlacaCores.children).forEach(item =>
                item.classList.remove("active")
            );
            if (e.target.classList.contains("azul")) {
                for (let i = 0; i < rastro.length; i++) {
                    corOriginal = "blue";
                    paint.fillRect(rastro[i].x * tq, rastro[i].y * tq, tq, tq);
                }
            }
            else if (e.target.classList.contains("marron")) {
                for (let i = 0; i < rastro.length; i++) {
                    corOriginal = "brown";
                    paint.fillRect(rastro[i].x * tq, rastro[i].y * tq, tq, tq);
                }
            }
            else if (e.target.classList.contains("cinza")) {
                for (let i = 0; i < rastro.length; i++) {
                    corOriginal = "gray";
                    paint.fillRect(rastro[i].x * tq, rastro[i].y * tq, tq, tq);
                }
            }
            else if (e.target.classList.contains("ocean")) {
                for (let i = 0; i < rastro.length; i++) {
                    corOriginal = "rgba(34, 214, 227, 0.744)";
                    paint.fillRect(rastro[i].x * tq, rastro[i].y * tq, tq, tq);
                }
            }
            else if (e.target.classList.contains("pink")) {
                for (let i = 0; i < rastro.length; i++) {
                    corOriginal = "rgb(255, 72, 212)";
                    paint.fillRect(rastro[i].x * tq, rastro[i].y * tq, tq, tq);
                }
            }
            else if (e.target.classList.contains("azulDois")) {
                for (let i = 0; i < rastro.length; i++) {
                    corOriginal = "rgba(114, 149, 255, 0.9)";
                    paint.fillRect(rastro[i].x * tq, rastro[i].y * tq, tq, tq);
                }
            }


        });

    function novoJogo() {
        if (button.value === 'NOVO JOGO') {
            velX = velY = 0;
            tail = 2;
            placar = 0;
            x = 1;
            y = 2;
            j = 2;
            z = 1;
            pontoX = 10;
            pontoY = 15;
            appleX = appleY = 10;
        } else {
            button.value = 'NOVO JOGO';

        }

    }

    function gameCobrinha() {
        pontoX += velX;
        pontoY += velY;
        if (pontoX < 0) {
            pontoX = aq - 1;
        }
        if (pontoX > aq - 1) {
            pontoX = 0;
        }
        if (pontoY < 0) {
            pontoY = aq - 1;
        }
        if (pontoY > aq - 1) {
            pontoY = 0;
        }
        if (pontoX == bordaXm) {
            novoJogo()
            colisao.play()
        }
        if (pontoX === bordaXMini) {
            novoJogo()
            colisao.play()
        }
        if (pontoY === bordaYm) {
            novoJogo()
            colisao.play()
        }
        if (pontoY === bordaYMini) {
            novoJogo()
            colisao.play()
        }

        function pegouMaca() {
            marcaPontos.innerHTML = placar;
            audio.play()
        }

        function sucoDaEvolução() {
            if (y % 10 == 0) {
                paint.fillStyle = "orange";
                paint.fillRect(appleX * tq, appleY * tq, tq, tq)
            }
            if (x % 10 == 0) {
                if (appleX == pontoX && appleY == pontoY) {
                    polisuco.play()
                }
                for (var i = 0; i < rastro.length; i++) {
                    paint.fillStyle = "orange";
                    paint.fillRect(rastro[i].x * tq, rastro[i].y * tq, tq, tq);
                    if (tail > 20) {
                        tail = 20;
                    }
                }
            }
        }
    
        function sucoDaMalvado() {
            if (j % 15 == 0) {
                paint.fillStyle = "black";
                paint.fillRect(appleX * tq, appleY * tq, tq, tq)
            }
            if (z % 15 == 0) {
                if (appleX == pontoX && appleY == pontoY) {
                    pocaoMorte.play()
                    vaiPerder.play()
                }
                for (var i = 0; i < rastro.length; i++) {
                    paint.fillStyle = "purple";
                    paint.fillRect(rastro[i].x * tq, rastro[i].y * tq, tq, tq);
                    tail = 50;
                }
            }
        }
        for (var i = 0; i < rastro.length; i++) {
            paint.fillStyle = corOriginal;
            paint.fillRect(rastro[i].x * tq, rastro[i].y * tq, tq, tq);
            pegouMaca()
            sucoDaEvolução()
            sucoDaMalvado()
            if (rastro[i].x == pontoX && rastro[i].y == pontoY && tail>2) {
                vaiPerder.play()
                novoJogo()
            }


        }
        rastro.push({
            x: pontoX,
            y: pontoY
        })


        while (rastro.length > tail) {
            rastro.shift();
        }
        if (appleX == pontoX && appleY == pontoY) {
            tail++;
            placar++;
            x++;
            y++;
            j++;
            z++;
            pegouMaca()
            sucoDaEvolução()
            sucoDaMalvado()
            appleX = Math.floor(Math.random() * 40);
            appleY = Math.floor(Math.random() * tq);
        }

    }

    function movimentaCobrinha(event) {
        switch (event.keyCode) {
            case 37:
                velX = -vel;
                velY = 0;
                break;
            case 38:
                velX = 0;
                velY = -vel;
                break;
            case 39:
                velX = vel;
                velY = 0;
                break;
            case 40:
                velX = 0;
                velY = vel;
                break;
            default:
                break;

        }
    }


    function comecarJogo(event) {
        if (button2.value === 'JOGAR') {
            document.addEventListener("keydown", movimentaCobrinha);
            audio.play();
        }
    }

    const button = document.getElementById('restartGame');
    button.addEventListener('click', novoJogo);
    const button2 = document.getElementById('iniciarGame');
    button2.addEventListener('click', comecarJogo);

    var intervalo = 1000;



    var id = setInterval(intervalo);

    if (x == 100 || y == 100 || j == 100 || z == 0) {
        clearInterval(id);
    }

}