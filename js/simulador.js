

// Capturamos los elementos del HTML para el primer form

let cantObrasInput = document.querySelector('#cantObras');
let tiempoTransferenciaInput = document.querySelector('#tiempoTransferencia');
let costoAlmacenamientoInput = document.querySelector('#costoAlmacenamiento');
let btnIniciar = document.querySelector('#btnIniciarCarga');

let fieldsetCarga = document.querySelector('#Carga'); // Para habilitarlo más adelante



// Variables 

let cantidadTotalObras = 0;
let tiempoTransferencia = 0;
let costoAlmacenamiento = 0;
let listaDeObras = []; // Array vacío para las obras

// Escuchamos el click del botón que inicia la carga

btnIniciar.addEventListener('click', iniciarCarga);


function iniciarCarga() {

    // Convertimos y capturamos el número que escribió el usuario

    cantidadTotalObras = Number(cantObrasInput.value);
    tiempoTransferencia = Number(tiempoTransferenciaInput.value);
    costoAlmacenamiento = Number(costoAlmacenamientoInput.value);


    // Comparamos y validamos si ingresó números mayores a 0

    if (cantidadTotalObras > 0 && tiempoTransferencia > 0 && costoAlmacenamiento > 0) {
        
        alert("Configuración guardada");

        fieldsetCarga.disabled = false;  //Acá habilitamos el form 2 sacándole el fieldset.

    } else {
        alert("Por favor ingresé un valor mayor a 0 en todos los campos");
    }
}



// Capturamos los elementos del HTML del segundo form

let nombreObraInput = document.querySelector('#nombreObra');
let duracionObraInput = document.querySelector('#duracionObra');
let pesoObraInput = document.querySelector('#pesoObra');
let btnGuardarObra = document.querySelector('#btnGuardarObra');

// Elementos del panel de resultados

let salidaResultados = document.querySelector('#salidaResultados');
let btnReiniciar = document.querySelector('#btnReiniciar');



// Escuchamos el click del botón que guarda las obras

btnGuardarObra.addEventListener('click', guardarObra);


function guardarObra() {

    // leemos y guardamos los valores que ingresó el usuario

    let nombre = nombreObraInput.value.trim(); // .trim() quita espacios vacíos al inicio/final
    let duracion = Number(duracionObraInput.value);
    let peso = Number(pesoObraInput.value);

    // Validamos y comparamos

    if (nombre !== "" && duracion > 0 && peso > 0) {
        
        //si la condición se cumple entonces creamos un objeto con la obra

        let nuevaObra = {
            nombre: nombre,
            duracion: duracion,
            peso: peso
        };

        // y la agregamos a nuestro array que teníamos vacío

        listaDeObras.push(nuevaObra);

        alert(`Obra "${nombre}" guardada con éxito (${listaDeObras.length} de ${cantidadTotalObras}).`);   //Informa al usuario que la obra se guardó (1 de 1, por ej)

        // Limpiamos el formulario

        nombreObraInput.value = "";
        duracionObraInput.value = "";
        pesoObraInput.value = "";


        // Una vez que ya estén todas las obras cargadas:

        if (listaDeObras.length === cantidadTotalObras) {
            
            fieldsetCarga.disabled = true; // deshabilitamos la carga de más obras

            calcularResultados();  // llamamos a la función que calcula todo
          
            btnReiniciar.disabled = false; // habilitamos el botón de reiniciar
        }

    } else {
        alert("Por favor complete todos los campos con valores válidos");
    }
}


function calcularResultados() {
    let sumaDuracion = 0;
    let sumaPeso = 0;
    
    let obraMayor = listaDeObras[0];  //luego chequeamos este dato



    // Recorremos el array y acumulamos la duracion y el peso para después tenes el total.
    
    for (let i = 0; i < listaDeObras.length; i++) {
  
    let obra = listaDeObras[i]; 

    sumaDuracion += obra.duracion;
    sumaPeso += obra.peso;

    if (obra.duracion > obraMayor.duracion) {
        obraMayor = obra;
    }
}

    // Calculos finales para los resultados globales

    let promedioDuracion = sumaDuracion / listaDeObras.length;
    let tiempoDescargaObraMayor = obraMayor.peso * tiempoTransferencia; // en milisegundos
    let presupuestoAnual = (sumaPeso * costoAlmacenamiento) * 12;



    // Cambiamos el HTML para mostrar los resultados

    salidaResultados.innerHTML = 
    "<p><strong>Duración:</strong></p>" +
    "<ul>" +
        "<li>Duración total: " + sumaDuracion.toFixed(2) + " minutos.</li>" +       //toFixed(2) indica que el número se muestre solo con decimales redondeado.
        "<li>Duración promedio: " + promedioDuracion.toFixed(2) + " minutos por obra.</li>" +
    "</ul>" +

    "<p><strong>Obra de mayor duración:</strong></p>" +
    "<ul>" +
        "<li>Nombre: " + obraMayor.nombre + " (" + obraMayor.duracion + " min).</li>" +
        "<li>Tiempo estimado de descarga: " + tiempoDescargaObraMayor.toFixed(2) + " ms.</li>" +
    "</ul>" +

    "<p><strong>Presupuesto del repositorio:</strong></p>" +
    "<ul>" +
        "<li>Peso total almacenado: " + sumaPeso.toFixed(2) + " MB.</li>" +
        "<li>Presupuesto anual requerido: $" + presupuestoAnual.toFixed(2) + "</li>" +
    "</ul>";

}


// Escuchamos el click del botón de reinicio y vaciamos y limpiamos las casillas. También volvemos a deshabilitar los forms.

btnReiniciar.addEventListener('click', reiniciarSistema);

function reiniciarSistema() {

    // Vaciamos el array y reiniciamos las variables
    
    listaDeObras = [];
    cantidadTotalObras = 0;
    tiempoTransferencia = 0;
    costoAlmacenamiento = 0;


    // Limpiamos y habilitamos las casillas del primer form 

    cantObrasInput.value = "";
    tiempoTransferenciaInput.value = "";
    costoAlmacenamientoInput.value = "";
    btnIniciar.disabled = false;
    cantObrasInput.disabled = false;
    tiempoTransferenciaInput.disabled = false;
    costoAlmacenamientoInput.disabled = false;

    // Deshabilitamos el segundo formulario

    fieldsetCarga.disabled = true;
    nombreObraInput.value = "";
    duracionObraInput.value = "";
    pesoObraInput.value = "";

    // 4. Limpiamos los resultados desde el InnerHTML y deshabilitamos el botón de Reinicio
    
    btnReiniciar.disabled = true;
    salidaResultados.innerHTML = "<p>Complete la carga de datos para visualizar las estadísticas.</p>";

    alert("Sistema reiniciado. Puede comenzar una nueva carga.");
}