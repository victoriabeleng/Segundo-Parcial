
//======= GALERÍA INTERACTIVA EN LA PÁGINA OBRAS =========//



//creo un array con las obras para después poder recorrerlo

let obras = [

    {
        nombre: "Amelia - Album musical",
        anio: "2024",
        imagen: "img/anderson-9.jpg"
    },

    {
        nombre: "Big Science - Album Musical",
        anio: "1982",
        imagen: "img/anderson-6.jpg"
    },

    {
        nombre: "United States I-IV",
        anio: "1983",
        imagen: "img/anderson-10.jpg"
    },

    {
        nombre: "Duets on Ice",
        anio: "1974",
        imagen: "img/anderson-11.jpg"
    },

    {
        nombre: "Chalkroom",
        anio: "2017",
        imagen: "img/anderson-12.jpg"
    }

];


//Capturo el elemento

let galeria = document.querySelector("#galeria");


//recorro el array y modifico el html desde js

for (let i = 0; i < obras.length; i++) {

    galeria.innerHTML += ` 
        <article class="obra">

            <img src="${obras[i].imagen}" alt="${obras[i].nombre}">

            <h3>${obras[i].nombre}</h3>

            <p>${obras[i].anio}</p>

        </article>
    `;

}

//Función y control para que el programa identifique en que tamaño esta la imagen

let grande = false;

function cambiarGaleria() {

    let imagenes = document.querySelectorAll("#galeria img");

    if (grande == false) {

        for (let i = 0; i < imagenes.length; i++) {

            imagenes[i].style.width = "80%";

        }

        grande = true;

    } else {

        for (let i = 0; i < imagenes.length; i++) {

            imagenes[i].style.width = "100%";

        }

        grande = false;

    }

}