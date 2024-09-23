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
    {id: "ID: P8", nombre: "8 clases", valor:25000},
    {id: "ID: PO", nombre: "Clases online", valor:20000},
    {id: "ID: TMC", nombre: "Taller Movilidad de cadera", valor:25000},
    {id: "ID: TEC", nombre: "Taller Extensión de columna", valor:25000},
    {id: "ID: TBB", nombre: "Taller Balances en brazos", valor:25000},
];

servicios.forEach((servicio, index) => {
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `
        <h2>Servicio: ${servicio.nombre}</h2>
        <h3>Valor: $${servicio.valor}</h3>
        <button id="btn-${index}" class="btn-comprar">COMPRAR</button>`;
    document.body.appendChild(contenedor);
});

let verCarrito = document.createElement("button");
verCarrito.id = "showPurchase";
verCarrito.innerText = `VER CARRITO`;
document.body.appendChild(verCarrito);

const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

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
            sessionStorage.setItem('carrito', JSON.stringify(carrito));
            document.body.removeChild(miCompra);
            document.body.removeChild(overlay);
        });

        document.getElementById("close-popup").addEventListener("click", () => {
            document.body.removeChild(miCompra);
            document.body.removeChild(overlay);
        });
    });
});

verCarrito.addEventListener("click", () => {
    let carritoDiv = document.createElement("div");
    carritoDiv.classList.add("popup");

    if (carrito.length === 0) {
        carritoDiv.innerHTML = `<h3>El carrito está vacío.</h3>`;
    } else {
        let total = 0;
        carrito.forEach((item, index) => {
            carritoDiv.innerHTML += `
                <h3>${item.id}</h3>
                <h2>Servicio: ${item.nombre}</h2>
                <h3>Valor: $${item.valor}</h3>
                <button class="delete" data-index="${index}">x</button>`;
            total += item.valor;
        });

        carritoDiv.innerHTML += `<h3>Total: $${total}</h3>`;
    }

    document.body.appendChild(carritoDiv);
    carritoDiv.innerHTML += `<button id="close-popup">Cerrar</button>`;
    carritoDiv.innerHTML += `<button id="pay">Pagar</button>`;
    
    let overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");
    document.body.appendChild(overlay);

    carritoDiv.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            carrito.splice(index, 1);
            sessionStorage.setItem('carrito', JSON.stringify(carrito));
            document.body.removeChild(carritoDiv); 
            verCarrito.click(); 
        });
    });

    document.getElementById("close-popup").addEventListener("click", () => {
        document.body.removeChild(carritoDiv);
        document.body.removeChild(overlay);
    });

    document.getElementById("pay").addEventListener("click", () => {
        let total = carrito.reduce((sum, item) => sum + item.valor, 0); // Calcular total
        let paypurchase = document.createElement("div");
        paypurchase.classList.add("popup");
        paypurchase.innerHTML = `
            <h3>Total a pagar: $${total}</h3>
            <h2>Podés abonar mediante transferencia bancaria o por Mercado Pago.</h2>
            <button id="transfer">Pagar mediante transferencia</button>
            <button id="MP">Pagar con MP</button>
            <button id="add">Adjuntar comprobante</button>`;
        document.body.appendChild(paypurchase);
        document.body.removeChild(carritoDiv);

        let overlay2 = document.createElement("div");
        overlay2.classList.add("popup-overlay");
        document.body.appendChild(overlay2);
        
        document.getElementById("transfer").addEventListener("click", () => {
            Swal.fire("Cuenta Banco Supervielle - Ana Lobato - Alias: DIETA.ASOMO.GEN");
            document.body.removeChild(overlay2);
        });
        
        document.getElementById("MP").addEventListener("click", () => {
            window.open('https://www.mercadopago.com.ar', '_blank');
            document.body.removeChild(overlay2);
        });

        document.getElementById("add").addEventListener("click", () => {
            Swal.fire({
                title: "Adjunta tu comprobante de pago",
                input: "file",
                inputAttributes: {
                    "accept": "image/*",
                    "aria-label": "Upload your profile picture"
                },
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const file = result.value[0]; 
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        Swal.fire({
                            title: "Has adjuntado correctamente el comprobante",
                            imageUrl: e.target.result,
                            imageAlt: "The uploaded picture",
                            icon: "succes",
                        });
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    });
});
