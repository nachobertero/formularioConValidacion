

    document.addEventListener('DOMContentLoaded', function() {

        const email = {
            email: '',
            asunto: '',
            mensaje:''
        }




        const inputEmail =  document.querySelector('#email');
        const inputAsunto =  document.querySelector('#asunto');
        const inputMensaje =  document.querySelector('#mensaje');
        const formulario =  document.querySelector('#formulario');
        const btnSubmit = document.querySelector('#formulario button[type="submit"]');
        const btnReset = document.querySelector('#formulario button[type="Reset"]');
        const spinner = document.querySelector('#spinner');



        //EVENTOS QUE AGREGARÉ : ESCRIBIR, O ABANDONAR

        inputEmail.addEventListener('blur', validar)

        inputAsunto.addEventListener('blur', validar)

        inputMensaje.addEventListener('blur', validar)

        formulario.addEventListener('submit' , enviarEmail);

        btnReset.addEventListener('click', function (event) {
            event.preventDefault();

            //REINICIAR EL OBJETO

            resetFormulario();


        })

        function enviarEmail(event) {
            event.preventDefault();
            spinner.classList.add('flex');
            spinner.classList.remove('hidden');

            setTimeout(() => {
                spinner.classList.remove('flex');
                spinner.classList.add('hidden');

                resetFormulario();

            // ALERTA

            const enviado = document.createElement('P');

            enviado.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold');

            enviado.textContent = "Tu mensaje fue enviado exitosamente!"

            formulario.appendChild(enviado);

                setTimeout(() => {
                    enviado.remove();
                },1500)

            }, 1500)
        }

        function validar (event) {
            
            //VALIDO SI EL CAMPO ESTÁ VACÍO

            if (event.target.value.trim() === "" ) {
                mostrarAlerta(`El campo ${event.target.id} es obligatorio` , event.target.parentElement);
                email[event.target.name] = '';
                comprobarEmail();
                return;
            }
            
            if (event.target.id === 'email' && !validarEmail(event.target.value)){
                mostrarAlerta('El email no es válido' , event.target.parentElement);
                email[event.target.name] = '';
                comprobarEmail();
            return;
           }
 
            limpiarAlerta(event.target.parentElement);

            //ASIGNAR VALORES AL OBJETO EMAIL

            email[event.target.name] = event.target.value.trim().toLowerCase();

            //COMPROBAR OBJETO EMAIL

            comprobarEmail();
        }

        function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia);

            const error = document.createElement('P');
            error.textContent = mensaje;
        
            error.classList.add('bg-red-600' , 'text-white', 'p-2', 'text-center')
        
            referencia.appendChild(error);
        

        }
        function limpiarAlerta(referencia) {
            // COMPRUEBO SI YA EXISTE LA ALERTA
            const alerta = referencia.querySelector('.bg-red-600');
            if (alerta) {
                alerta.remove();
            }
        }

        // VALIDO EMAIL CON EXPRESIÓN REGULAR

        function validarEmail (email) {
            const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

            const resultado = regex.test(email);

            return resultado;
        }

    function comprobarEmail() {
        
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        } 
            btnSubmit.classList.remove('opacity-50');

            btnSubmit.disabled = false;
    }

    function resetFormulario() {

        email.email='';
        email.asunto='';
        email.mensaje='';

        formulario.reset();
        comprobarEmail();
    }

    });

