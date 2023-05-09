let btnListaVehiculos=document.getElementById("listaVehiculos");
let bntListaAutos=document.getElementById("listaAutos");
let btnListaCamionetas=document.getElementById("listaCamionetas");
let btnGuardar=document.getElementById("btnGuardar");
let errorDeCarga=document.getElementById("errorDeCarga");
let infoCargaIncorrecta=document.getElementById("infoCargaIncorrecta")

let listaVehiculos =[];
let listaTemporariaVehiculos=[];

//-------Funcion  Mostrar Vehiculos------
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

//------Funcion Cargar Vehiculos----
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
    let tipoVehiculo="A";
    let patente=document.getElementById("patente").value;
    let marca=document.getElementById("marca").value;
    let modelo=document.getElementById("modelo").value;
    let año=Number(document.getElementById("año").value);
    let precio=Number(document.getElementById("precio").value);
    let capacidadDeCarga=Number(document.getElementById("capacidad").value);

    if(patente==""){
        alert("Campo de patente, se esncuentra vacio")
        infoCargaIncorrecta.innerHTML="Campo de patente, se encuentra vacio"
        return false
    }
    if(marca==""){
        alert("Campo de marca, se esncuentra vacio")
        infoCargaIncorrecta.innerHTML="Campo de marca, se encuentra vacio"
        return false
    }
    if(modelo==""){
        alert("Campo de modelo, se esncuentra vacio")
        infoCargaIncorrecta.innerHTML="Campo de modelo, se encuentra vacio"
        return false
    }
    if(año<1950){
        alert("Valor de año invalido")
        infoCargaIncorrecta.innerHTML="Valor de año invalido, debe ser un numero mayor a 1950"
        return false
    }
    if(precio<100){
        alert("Valor de precio invalido")
        infoCargaIncorrecta.innerHTML="Valor de precio invalido, debe ser un numero mayor a 100"
        return false
    }
    if (capacidadDeCarga>0){
        tipoVehiculo="C";
    } 

    let nuevoVehiculo={
        "patente":patente,
        "marca":marca,
        "modelo":modelo,
        "año":año,
        "precio":precio,
        "capacidadDeCarga":capacidadDeCarga,
        "tipoDeVehiculo":tipoVehiculo,
    }
    
    listaTemporariaVehiculos.push(nuevoVehiculo);
    cargarEnTablaTemp()
    infoCargaIncorrecta.innerHTML=""
    
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

//funcion para listar autos
async function listarAutos (){
    try {
        let respuesta=await fetch ("http://localhost:3000/vehiculo/lista/autos");
        console.log(respuesta)
        if(!respuesta.ok){
        throw new Error("Network response was not ok");
        }else{
            let listaAutos=await respuesta.json()
            console.log(listaAutos)
            mostrarTodosLosVehiculos()
        }
    }  catch (error) {
        console.log(error)
    }
}

//-------listar Camionetas-----
async function listarCamionetas(){
    alert("entro en listar camionetas")
    try {
        let respuesta= await fetch("http://localhost:3000/vehiculo/lista/camionetas");
        console.log(respuesta)
        if(!respuesta.ok){
            throw new Error("Network response was not ok");
        }else{
            let listaCamionetas=await respuesta.json();
            console.log(listaCamionetas)
            listaVehiculos=listaCamionetas;
            mostrarTodosLosVehiculos();
        }
    } catch (error) {
        console.log(error)
    }
}



load();
btnGuardar.addEventListener('click', guardarVehiculoEnServidor );

bntListaAutos.addEventListener('click',listarAutos);
btnListaCamionetas.addEventListener('click',listarCamionetas);
btnListaVehiculos.addEventListener('click',load);
