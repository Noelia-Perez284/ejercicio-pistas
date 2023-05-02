let btnAgregar = document.getElementById('btnAgregar');
// let btnDuracion = document.getElementById('btnDuracion');

let pistas = [];

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
           <td>${pista.lanzamiento}</td>
        </tr>
        `
    }
    contenedor.innerHTML = tabla;
}

async function load(){
    const respuesta = await fetch("http://localhost:3000/pistas");
    pistas = await respuesta.json();
    console.log(pistas);
    mostrarPistas()
}

async function agregarPista() {
    
    let titulo = document.getElementById('titulo').value;
    let duracion = document.getElementById('duracion').value;
    let interprete = document.getElementById('interprete').value;
    let lanzamiento = document.getElementById('lanzamiento').value;

    let nuevaPista = {
        "titulo": titulo,
        "duracion": Number(duracion),
        "interprete": interprete,
        "lanzamiento":Number(lanzamiento),
    }
    let resp= await aServidor(nuevaPista);
    if(resp){ //si la funcion aServidor retorna un ok, entra en el if
        //console.log(aServidor(nuevaPista));
        alert("retorno true"+resp);
        pistas.push(nuevaPista);
        mostrarPistas();
    } else{
        alert("errorrrr")
        alert("retorno false"+resp);
        console.log(resp);
        alert("no se pudo cargar la pista");
    }

}


 async function aServidor(datos){
    var resp=false;
    try {
    let respuesta= await fetch('/pistas', {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(datos)
    });

    resp=  await respuesta.text()=="";
    
    } catch (er) {
    alert("No se pudo cargar la pista");
    resp=false;
}
    return resp;

}
btnAgregar.addEventListener('click', agregarPista);
load()


// function duracion () {
//     let total = 0;
//     for(let i = 0; i < pistas.length; i++){
//         total += pistas[i].duracion;
//     }

//     let max = pistas[0].duracion;
//     for (let pista of pistas){
//         if(max < pista.duracion){
//             max = pista.duracion
//         }
//     } 

//     let contenedor_total = document.getElementById('total');
//     contenedor_total.innerHTML = 
//     `<p>Tiempo total: ${total}</p>
//     <p> Duracion maxima : ${max}</p>`;
// }

// async function load (){
    
//     let promesa= fetch('mockPistas.json');
//     console.log(promesa);
    
//     let respuesta=await promesa;
//     console.log(respuesta);
    
   
//     alert(respuesta.ok);
    
//     if(respuesta.ok){
//         let t=await respuesta.json()
//         pistas=t.pistas_musicales;
//         mostrarPistas();

//     }
// }

//funcion cargar pista desde una archivo json desde el navegador
// async function load2() {
//     const url_base = "http://localhost:3000";
//     const endpoint = "/pistas";
  
//     const respuesta = await fetch(url_base + endpoint);
//     pistas = await respuesta.json();
//     console.log(pistas);
    
//      mostrarPistas(pistas);


//     for(let pista of pistas){
//         console.log(pista.nombre)
//         contenedor.innerHTML += `<p>${pista.titulo}</p>`
//       }
//   }
  
