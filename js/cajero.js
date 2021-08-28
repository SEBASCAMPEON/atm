/*
innerHTML nos permite leer un dato o asignarlo
al contenido a una etiqueta definida en HTML. 
Nos facilita la asignación de valores.
*/
/*document. write es una mala practica, lo que debemos usar es innerHtml
para meter el codigo dentro de una etiqueta específica*/
let images = [];
images["5"] = "img/5.png";
images["10"] = "img/10.png";
images["20"] = "img/20.png";
images["50"] = "img/50.png";
images["100"] = "img/100.png";

let total = 1225;
let disponible = true;

class Billete {
    constructor(v, c) {
        this.valor = v;
        this.cantidad = c;
        this.pic = new Image();
        this.pic.src = images[v];
        this.pic.style.height = "50px";
        this.pic.style.display = "block";
    }
}

function entregarDinero() {
    var t = document.getElementById("dinero");
    dinero = parseInt(t.value);
    //Solo aceptar multiplos de 5 ya que ese es el valor de los billetes
    if (dinero % 5 == 0) {
        //Solo aceptar si el valor es menor al total que hay en el cajero
        if (dinero <= total) {
            //Contar el dinero entregado
            for (var bi of caja) {
                if (dinero > 0) {
                    div = Math.floor(dinero / bi.valor);

                    if (div > bi.cantidad) {
                        papeles = bi.cantidad;
                    }
                    else {
                        papeles = div;
                    }
                    if (dinero <= total) {
                        entregado.push(new Billete(bi.valor, papeles));
                        entregadocopy.push(new Billete(bi.valor, papeles));
                        dinero = dinero - (bi.valor * papeles);
                        console.log(dinero);
                        console.log(caja);
                        //existencia(dinero);
                        console.log("Por aqui 1")
                    } else {
                        resultado.innerHTML = "Fondos insuficientes, solo quedan $" + total;
                    }
                }
            }
        }
    } else {
        resultado.innerHTML = "<div class='div_text_show'>Imposible dar esa cantidad, <br> solo tengo billetes de 5, 10, 20, 50, y 100 EU";
    }

    console.log("dinero" + dinero);
    //Válidar si hay dinero suficiente para entregar
    if (dinero > 0) {
        resultado.innerHTML = "<div class='div_text_show'>Imposible dar esa cantidad, <br> solo tengo billetes de 5, 10, 20, 50, y 100 EU <br> Quedan $" + "<strong>" + total + "</strong></div><br>";
    } else {
        console.log("Por aqui 2")
        //Llamar función de actualizar existencias
        existencia();
        console.log(disponible);
        if (disponible == true) {
            console.log("Por aqui 3")
            for (var e of entregado) {
                if (e.cantidad > 0) {
                    resultado.innerHTML += "<div class='div_text_show'>" + e.cantidad + " billetes de <strong> $" + e.valor + "</strong>";
                    resultado.appendChild(e.pic);
                    resultado.innerHTML += "</div><br>";
                }

            }
            entregado = [];
        }
    }
}

var caja = [];
//Array para imprimir
var entregado = [];
//Array para llevar conteo de existencias
var entregadocopy = [];
caja.push(new Billete(100, 5));
caja.push(new Billete(50, 10));
caja.push(new Billete(20, 5));
caja.push(new Billete(10, 10));
caja.push(new Billete(5, 5));
var dinero = 0;
var div = 0;
var papeles = 0;

var resultado = document.getElementById("resultado");
var b = document.getElementById("extraer");
var saldo = document.getElementById("saldo");
let quoty = document.getElementById("cantidad");
b.addEventListener("click", entregarDinero);
quoty.addEventListener("click", existencia);

//Hacer que si el total es 0 no deje sacar más del cajero y avise que no hay fondos
//como estaba en ese momento siempre reiniciaba la caja en 0 y por eso seguia sacando como si nada de manera infinita
//Listo
function existencia() {
    var encaja = 0;
    var entregados = 0;
    for (var e of entregadocopy) {
        entregados += e.valor * e.cantidad
    }
    for (var bi of caja) {
        encaja += bi.valor * bi.cantidad;
    }

    totalparcial = encaja - entregados;

    console.log("encaja");
    console.log(encaja);
    console.log(entregados);
    console.log(totalparcial);

    if (totalparcial > 0) {
        disponible = true;
        total = encaja - entregados;
    } else if (totalparcial < 0) {
        total = 0;
        disponible = false;
    } else {
        //Esta iteración es necesaria porque en la ultima iteración qeu da el codigo, total aun no es 0
        //por eso hacia una más y no funcionaba como deberia
        //al igual total a 0 y poner disponible como true permitimos
        //que el programa haga una iteración más
        //en la proxima iteración encontrará que total es 0 y ya no dará más billetes
        disponible = true;
        total = 0;
    }
    saldo.innerHTML = total;
    console.log(total);
}