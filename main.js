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
            document.body.removeChild(overlay);
            verCarrito.click(); 
        });
    });

    document.getElementById("close-popup").addEventListener("click", () => {
        document.body.removeChild(carritoDiv);
        document.body.removeChild(overlay);
    });

    document.getElementById("pay").addEventListener("click", () => {
        let total = carrito.reduce((sum, item) => sum + item.valor, 0); 
        let paypurchase = document.createElement("div");
        paypurchase.classList.add("popup");
        paypurchase.innerHTML = `
            <h3>Total a pagar: $${total}</h3>
            <h2>Podés abonar mediante transferencia bancaria o por Mercado Pago, y envianos luego el comprobante por Whatsapp (encontras el botón en el margen inferior derecho de tu pantalla) indicando Nombre Apellido.</h2>
            <button id="transfer">Pagar mediante transferencia</button>
            <button id="MP">Pagar con MP</button>
            <button id="dolar">Convertir a dolares para pagar por PayPAL</button>
            <button id="close-popup">Cerrar</button>`;
        document.body.appendChild(paypurchase);
        document.body.removeChild(carritoDiv);

        let overlay2 = document.createElement("div");
        overlay2.classList.add("popup-overlay");
        document.body.appendChild(overlay2);
        
        document.getElementById("transfer").addEventListener("click", () => {
            Swal.fire("Cuenta Banco Supervielle - Ana Lobato - Alias: DIETA.ASOMO.GEN");
            document.body.removeChild(overlay2);
        });

        async function obtenerTotalEnDolares() {
            try {
                
                const response = await fetch('https://dolarapi.com/v1/dolares/blue');
                const data = await response.json();
    
                
                const tasaDolar = data.venta; 
    
                
                let totalDolares = (total / tasaDolar).toFixed(2);
    
                
                return totalDolares;
    
            } catch (error) {
                console.error('Error al obtener el valor del dólar:', error);
            }
        }
    
        
            document.getElementById("dolar").addEventListener("click", async () => {
            let totalDolares = await obtenerTotalEnDolares(); 
    
           
            Swal.fire({
                title: 'Total del carrito',
                text: `El total es: U$${totalDolares}`,
                showCancelButton: true,
                confirmButtonText: 'Pagar con PayPal',
                cancelButtonText: 'Cerrar',
                preConfirm: () => {
                    window.open(`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=tu-email@ejemplo.com&item_name=Tu+producto&amount=${totalDolares}&currency_code=USD`, '_blank');
                }
            });
    
            document.body.removeChild(overlay2);
        });
        
        document.getElementById("MP").addEventListener("click", () => {
            window.open('https://www.mercadopago.com.ar', '_blank');
        });


        document.getElementById("close-popup").addEventListener("click", () => {
            document.body.removeChild(paypurchase);
            document.body.removeChild(overlay);
            document.body.removeChild(overlay2);
            });
        });
    });
