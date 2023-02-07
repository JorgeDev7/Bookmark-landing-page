document.addEventListener('DOMContentLoaded', () => {
    const btns = document.querySelectorAll('.features__item');
    const features = document.querySelectorAll('.features__row');
    const encabezado = document.querySelectorAll('.preguntas__encabezado');
    const contenido = document.querySelectorAll('.preguntas__contenido');
    const img = document.querySelectorAll('.preguntas__img');
    const form = document.querySelector('.newsletter__form');
    const input = document.querySelector('.newsletter__input');
    const imgError = document.querySelector('.newsletter__input-box-container img');

    // Events 
    form.addEventListener('submit', enviar);
    input.addEventListener('input', validar);

    // Tabs
    btns.forEach((btn, index) => {
        btns[index].addEventListener('click', () => {
            btns.forEach((btn, index) => {
                btns[index].classList.remove('features__active');
                features[index].classList.remove('features__section-active');
            });

            btns[index].classList.add('features__active');
            features[index].classList.add('features__section-active');
        });
    });

    // Acordeon
    encabezado.forEach((ec, i) => {
        encabezado[i].addEventListener('click', () => {
            contenido.forEach((con, i) => {
                contenido[i].classList.remove('preguntas__contenido-activo');
                img[i].classList.remove('preguntas__img-rotate');
            });

            contenido[i].classList.add('preguntas__contenido-activo');
            img[i].classList.add('preguntas__img-rotate');
        });
    });

    // Validación formulario
    function enviar(e) {
        e.preventDefault();

        if ([input.value].includes('')) {
            alerta('Whoops, field empty', input.parentElement);
            imgError.style.display = 'block';
            return;
        }

        imgError.style.display = 'none';
        form.reset();
    }

    function validar(e) {
        const value = e.target.value;

        clearAlert(e.target.parentElement);

        if (value.trim() === '') {
            alerta('Whoops, field empty', e.target.parentElement);
            imgError.style.display = 'block';
            return;
        }

        if (e.target.id === 'email' && !validarEmail(value)) {
            alerta('Whoops, make sure it´s an email', e.target.parentElement);
            imgError.style.display = 'block';
            return;
        }

        input.classList.remove('newsletter__input-active');
        imgError.style.display = 'none';
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const res = regex.test(email);

        return res;
    }

    //Funcion que crea alerta
    function alerta(msg, ref) {

        clearAlert(ref);

        const alertHTML = document.createElement('P');
        alertHTML.textContent = msg;
        alertHTML.classList.add('error');
        input.classList.add('newsletter__input-active');

        ref.appendChild(alertHTML);
    }

    function clearAlert(ref) {
        const alerta = ref.querySelector('.error');

        if (alerta) {
            alerta.remove();
        }
    }

});