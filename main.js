// Logueo

/* let usuarioOriginal="ANA";
let passOriginal= 1234;
let identificar= true

do{
let usuario = prompt("Ingresa tu usuario");
if(usuario ===null){
    break;
} 
if(usuario && usuario.trim().toUpperCase() !== usuarioOriginal){
    alert("Usuario Incorrecto")
}
else {
    let pass= parseInt (prompt("Ingresa tu contraseña"));
    if (pass === passOriginal){
        alert("¡Bienvenida Ana, abre tu consola!");
        break; 
    } 
    else{alert("Contraseña Incorrecta")};
}
} while (identificar); */

// LISTA SERVICIOS

let servicios = [   
{id: "ID: P4", nombre:"Pack 4 clases", valor:20000},
{id: "ID: P8", nombre: "8clases", valor:25000},
{id: "ID: PO", nombre: "Clases online", valor:20000},
{id: "ID: TMC", nombre: "Taller Movilidad de cadera", valor:25000},
{id: "ID: TEC", nombre: "Taller Extensión de columna", valor:25000},
{id: "ID: TBB", nombre: "Taller Balances en brazos", valor:25000},
]

servicios.forEach((servicio, index) => {
    let contenedor = document.createElement("div");

    contenedor.innerHTML = `
        <h3>${servicio.id}</h3>
        <h2>Servicio: ${servicio.nombre}</h2>
        <h3>Valor: ${servicio.valor}</h3>
        <button id="btn-${index}" class="btn-comprar">COMPRAR</button>`;

    document.body.appendChild(contenedor);
});

const carrito= [];

document.querySelectorAll('.btn-comprar').forEach((button, index) => {
    button.addEventListener('click', () => {
        let servicioSeleccionado = servicios[index];
        carrito.push(servicioSeleccionado); 
        console.log(carrito); 
        alert(`Has añadido ${servicioSeleccionado.nombre} al carrito`);
    });
});



/* for (let i=0; i<servicios.length; i++){
    console.log (servicios[i].id, servicios[i].nombre, servicios[i].valor)
} 



const carrito= [];

function comprar() {
    let serviciosid= prompt("Ingresa el id de los packs que queres adquirir");
    carrito.push(serviciosid)
}

comprar();

console.log("Contenido del carrito:");
for (const serviciosid of carrito){
 console.log (carrito)
}*/
