let btnAgregar = document.getElementById('btnAgregar');
let btnDuracion = document.getElementById('btnDuracion');

let pistas = [];



function agregarPista() {
    let identificador = document.getElementById('identificador').value;
    let titulo = document.getElementById('titulo').value;
    let duracion = document.getElementById('duracion').value;
    let interprete = document.getElementById('interprete').value;

    let nuevaPista = {
        "id": Number(identificador),
        "titulo": titulo,
        "duracion": Number(duracion),
        "interprete": interprete
    }

    pistas.push(nuevaPista);

    mostrarPistas();
}

function mostrarPistas() {
    let contenedor = document.getElementById('tblPistas');
    let tabla = '';

    for (let pista of pistas) {
        tabla +=
      `<tr>
            <td>${pista.id}</td>
            <td>${pista.titulo}</td>
           <td>${pista.duracion}</td>
           <td>${pista.interprete}</td>
        </tr>
        `
    }

    contenedor.innerHTML = tabla;


}

function duracion () {
    let total = 0;
    for(let i = 0; i < pistas.length; i++){
        total += pistas[i].duracion;
    }

    let max = pistas[0].duracion;
    for (let pista of pistas){
        if(max < pista.duracion){
            max = pista.duracion
        }
    } 

    let contenedor_total = document.getElementById('total');
    contenedor_total.innerHTML = 
    `<p>Tiempo total: ${total}</p>
    <p> Duracion maxima : ${max}</p>`;
}

async function load (){
    
    let promesa= fetch('mockPistas.json');
    console.log(promesa);
    
    let respuesta=await promesa;
    console.log(respuesta);
    
   
    alert(respuesta.ok);
    
    if(respuesta.ok){
        let t=await respuesta.json()
        pistas=t.pistas_musicales;
        mostrarPistas();

    }
}


async function load2() {
    const url_base = "http://localhost:3000";
    const endpoint = "/pistas";
  
    const respuesta = await fetch(url_base + endpoint);
    pistas = await respuesta.json();
    console.log(pistas);
  
    mostrarPistas(pistas);
  }
  
    

//Cargar pistas desde NestJs
// async function cargarPistas(){
//     let respuesta= await fetch ("/pistas");
//     let pistasNuevas= await respuesta.json();
//     console.log(pistasNuevas)

//     mostrarPistas(pistasNuevas);

// }

// fetch('mockPistas.json').then(respuesta => { 
        
// console.log(respuesta);
// if(respuesta.ok){
//     let t= respuesta.json()
//     pistas=t.pistas_musicales;
//     mostrarPistas();
// }
// } 
//     );



// cargarPistas();


// load();
load();
console.log(pistas)
btnAgregar.addEventListener('click', agregarPista);
btnDuracion.addEventListener('click', duracion);


