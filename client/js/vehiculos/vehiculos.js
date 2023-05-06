let btnListaVehiculos=document.getElementById("listaVehiculos");
let bntListaAutos=document.getElementById("listaAutos");
let btnListaCamionetas=document.getElementById("listaCamionetas");
let btnGuardar=document.getElementById("btnGuardar");
let errorDeCarga=document.getElementById("errorDeCarga")

let listaVehiculos =[];
let listaTemporariaVehiculos=[];


function mostrarTodosLosVehiculos(){
    let tabla='';
    let contenedorLista=document.getElementById("tablaVehiculos");

    for(let vehiculo of listaVehiculos){
        tabla+=
        `<tr>
        <td>${vehiculo.patente}</td>
        <td>${vehiculo.marca}</td>
        <td>${vehiculo.modelo}</td>
        <td>${vehiculo.año}</td>
        <td>${vehiculo.precio}</td>
        <td>${vehiculo.capacidadDeCarga}</td>
        <td>${vehiculo.tipoDeVehiculo}</td>
        <td><a href='http://localhost:3000/vehiculoDetalle.html?index=${vehiculo.patente}' > Ver detalles </a> </td>
        </tr>`
    }
    contenedorLista.innerHTML=tabla
}



async function load(){
     try {
        const respuesta= await fetch("http://localhost:3000/vehiculo");
        
        if(!respuesta.ok){
            throw new Error("Network response was not ok");
        }else{
            listaVehiculos= await respuesta.json();
            mostrarTodosLosVehiculos();
        }
        
     } catch (error) {
        console.log(error)
        errorDeCarga.inert="<h1>Connection error</h1>";
     }
    
}


//Esta funcion me agrega los vehiculos que ingreso al formulario
function crearNuevoVehiculo(){
    alert("entro a la funcion crear nuevo vehiculo")

    let tipoVehiculo="A";
    
    if (Number(document.getElementById("capacidad").value)>0){
        alert("entro al if")
        tipoVehiculo="C";
    } 

    let nuevoVehiculo={
        "patente":document.getElementById("patente").value,
        "marca":document.getElementById("marca").value,
        "modelo":document.getElementById("modelo").value,
        "año":Number(document.getElementById("año").value),
        "precio":Number(document.getElementById("precio").value),
        "capacidadDeCarga":Number(document.getElementById("capacidad").value),
        "tipoDeVehiculo":tipoVehiculo,
    }
   alert(nuevoVehiculo+ "creo el vehiculo")

   listaTemporariaVehiculos.push(nuevoVehiculo);
    cargarEnTablaTemp()
    
}

function cargarEnTablaTemp(){
    let tablaTemporaria='';
    let contenedorListaTemp=document.getElementById("tablaTemporariaVehiculos");

    for(let vehiculo of listaTemporariaVehiculos){
        tablaTemporaria+=
        `<tr>
        <td>${vehiculo.patente}</td>
        <td>${vehiculo.marca}</td>
        <td>${vehiculo.modelo}</td>
        <td>${vehiculo.año}</td>
        <td>${vehiculo.precio}</td>
        <td>${vehiculo.capacidadDeCarga}</td>
        <td>${vehiculo.tipoDeVehiculo}</td>
        </tr>`
    }
    contenedorListaTemp.innerHTML=tablaTemporaria
}


//funcion que envia el array de vehiculos cargados en el formulario al servidor
async function guardarVehiculoEnServidor(){
    alert("entro en la funcion cargar")

    try {

        let respuesta=await fetch('/vehiculo',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(listaTemporariaVehiculos)
        }) 
        console.log(respuesta)
        if(respuesta.ok){
            listaTemporariaVehiculos=[];
            mostrarTodosLosVehiculos()
        }
        
    } catch (error) {
        alert("No se pudo enviar los datos")
        alert(error)
    }

}

load();
btnGuardar.addEventListener('click', guardarVehiculoEnServidor )



