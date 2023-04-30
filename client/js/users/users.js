let contenedorUsers=document.getElementById('contenedorUsers');

async function loadUsers(){
    fetch("http://localhost:3000/users")
    .then(respuesta=>respuesta.json())
    .then(data =>{
        console.table(data)
        
        //aca puedo trabajar con el objeto
        for(user of data){
            contenedorUsers.innerHTML += `
            <p>Nombre:${user.nombre}</p>
            <p>Apellido:${user.apellido}</p>
            <p>Dni:${user.dni}</p>
            <p>Mail:${user.mail}</p>`;
        }
    }).catch(error => {
        alert(error);
      })
}
loadUsers()

// async function usuarios(){
// let data= await loadUsers();
// var usuarios=JSON.parse(JSON.stringify(data));
//     for(user of usuarios){
//             contenedorUsers.innerHTML += `
//             <h1>${user.nombre}</h1>
//             <h1>${user.apellido}</h1>
//             <h1>${user.dni}</h1>
//             <h1>${user.mail}</h1>`;
//         }
// alert(data)
// }

// usuarios();

// let data= loadUsers().then(data=> {
//     for(user of data){
//         contenedorUsers.innerHTML += `
//         <h1>${user.nombre}</h1>
//         <h1>${user.apellido}</h1>
//         <h1>${user.dni}</h1>
//         <h1>${user.mail}</h1>`;
//     }
// }


//);
//alert(data)
   