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
        <h2>Servicio: ${servicio.nombre}</h2>
        <h3>Valor: $ ${servicio.valor}</h3>
        <button id="btn-${index}" class="btn-comprar">COMPRAR</button>`;

    document.body.appendChild(contenedor);
});

let verCarrito= document.createElement("button");
verCarrito.id="showPurchase";
verCarrito.innerText = `VER CARRITO`;
document.body.appendChild(verCarrito);

const carrito= [];

document.querySelectorAll('.btn-comprar').forEach((button, index) => {
    button.addEventListener('click', () => {
        let servicioSeleccionado = servicios[index];

        let miCompra = document.createElement("div");
        miCompra.classList.add("popup");
        miCompra.innerHTML = `
            <h2>Mi compra:</h2>
            <p>${servicioSeleccionado.nombre} - $${servicioSeleccionado.valor}</p>
            <button id="add-popup">Añadir</button>
            <button id="close-popup">Cancelar</button>`;
        document.body.appendChild(miCompra);

        let overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);

        document.getElementById("add-popup").addEventListener('click', () => {
            carrito.push(servicioSeleccionado); 
            console.log(carrito); 

            sessionStorage.setItem('carrito', JSON.stringify(carrito));

            document.body.removeChild(miCompra);
            document.body.removeChild(overlay);
        })
        document.getElementById("close-popup").addEventListener("click", () => {
            document.body.removeChild(miCompra);
            document.body.removeChild(overlay);
        });
    });
})
const carritoGuardado = sessionStorage.getItem('carrito');
if (carritoGuardado) {
    carrito.push(...JSON.parse(carritoGuardado));
} 
document.getElementById("showPurchase").addEventListener("click", () => {
    let carritoDiv = document.createElement("div");
    carritoDiv.classList.add("popup");

    let total = 0;

    carrito.forEach(item => {
        carritoDiv.innerHTML += `
            <h3>${item.id}</h3>
            <h2>Servicio: ${item.nombre}</h2>
            <h3>Valor: $${item.valor}</h3>`;
        total += item.valor;
    });

    carritoDiv.innerHTML += `<h3>Total: $${total}</h3>`;
    document.body.appendChild(carritoDiv);

    carritoDiv.innerHTML += `<button id="close-popup">Cerrar</button>`;
    document.body.appendChild(carritoDiv);

    let overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");
    document.body.appendChild(overlay);

    document.getElementById("close-popup").addEventListener("click", () => {
        document.body.removeChild(carritoDiv);
        document.body.removeChild(overlay);
});
})



/* servicios.forEach((servicio, index) => {
    let contenedor = document.createElement("div");

    contenedor.innerHTML = `
        <h3>${servicio.id}</h3>
        <h2>Servicio: ${servicio.nombre}</h2>
        <h3>Valor: $ ${servicio.valor}</h3>
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

        let miCompra = document.createElement("div");
        miCompra.innerHTML = `<h2>Mi compra: ${servicioSeleccionado.nombre} $ ${servicioSeleccionado.valor}</h2>`;
        document.body.appendChild(miCompra);
    });
});
 */





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
