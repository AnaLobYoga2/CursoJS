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
        Swal.fire(`Entered email: ${result.value}`);
      }
    });
  };