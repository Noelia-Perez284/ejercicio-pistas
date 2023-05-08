let contenedor=document.getElementById('contenedor');
let params=[];

function procesarParam(){
    
    let paramString=window.location.search.substring(1);
    let paramArray= paramString.split('&');
    
    for(let i=0;i<paramArray.length; i ++){
        let tmpArray=paramArray[i].split('=');
        params[tmpArray[0]]=tmpArray[1]
    }
}

async function getVehiculoDetalle() {

    try {
        procesarParam();
        console.log(procesarParam)

        let respuesta= await fetch (`http://localhost:3000/vehiculo/porpatente/${params["index"]}`);
        console.log(respuesta);
        alert(respuesta.ok)
        if(!respuesta.ok){
            alert("entro 1")
            throw new Error("Network response was not ok");
        }else{
            let vehiculo=await respuesta.json();
            console.log(vehiculo)

            
            document.querySelector('#patente').innerHTML+= vehiculo['patente'];
            document.querySelector('#marca').innerHTML+=vehiculo['marca'];
            document.querySelector('#modelo').innerHTML+=vehiculo['modelo'];
            document.querySelector('#año').innerHTML+=vehiculo['año'];
            document.querySelector('#precio').innerHTML+=vehiculo['precio'];
            document.querySelector('#capacidad').innerHTML+=vehiculo['capacidadDeCarga'];
            document.querySelector('#tipo').innerHTML+=vehiculo['tipoDeVehiculo'];
            

        }
    } catch (error) {
        console.log(error);
        contenedor.innerHTML = "<h1>Connection error</h1>";
    }
};

getVehiculoDetalle();