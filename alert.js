/*let contenedor1 = document.createElement("div id=wellcome");
    contenedor1.innerHTML = `
          <h2>¡Bienvenido a mi tienda de clases!</h2>
          <p>Desde este sitio podrás acceder a los valores y medios de pago para contratar mis servicios.</p>
        `;
    document.body.appendChild(contenedor1);

setTimeout(()=>{
  window.onload = function() {
    Swal.fire({
      title: "¡Hola! ¡Qué gusto saludarte! ¿Querés recibir nuestro NewsLetter?",
      input: "email",
      inputLabel: "¡Dejanos tu e-mail!",
      inputPlaceholder: "ejemplo@ejemplo.com",
      confirmButtonText: "Enviar",
      customClass: {
        popup: 'mi-popup-clase',
        title: 'mi-titulo-clase',
        input: 'mi-input-clase',
        confirmButton: 'mi-boton-clase',
      }
    }).then(result => {
      if (result.value) {
        Swal.fire(`Recibirás todas nuestras novedades a: ${result.value}`);
      }
    });
  };
}, 5000);*/

let contenedor1 = document.createElement("div");
contenedor1.id = "wellcome";
contenedor1.innerHTML = `
    <h2>¡Bienvenido a mi tienda de clases!</h2>
    <p>Desde este sitio podrás acceder a los valores y medios de pago para contratar mis servicios.</p>
`;
document.body.appendChild(contenedor1);


setTimeout(() => {
  contenedor1.remove(); 

 
  setTimeout(() => {
    Swal.fire({
      title: "¡Hola! ¡Qué gusto saludarte! ¿Querés recibir nuestro NewsLetter?",
      input: "email",
      inputLabel: "¡Dejanos tu e-mail!",
      inputPlaceholder: "ejemplo@ejemplo.com",
      confirmButtonText: "Enviar",
      customClass: {
        popup: 'mi-popup-clase',
        title: 'mi-titulo-clase',
        input: 'mi-input-clase',
        confirmButton: 'mi-boton-clase',
      }
    }).then(result => {
      if (result.value) {
        Swal.fire(`Recibirás todas nuestras novedades a: ${result.value}`);
      }
    });
  }, 1000); 
}, 5000); 
