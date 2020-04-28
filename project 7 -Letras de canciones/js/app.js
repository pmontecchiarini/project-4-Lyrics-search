import { API } from './api.js';
import * as UI from './interfaz.js';

UI.formularioBuscar.addEventListener( 'submit', (e)=>{
    e.preventDefault();

    //Obtener datos del formulario
    const artista = document.querySelector('#artista').value;
    const cancion = document.querySelector('#cancion').value;

    if (artista === '' || cancion === ''){
        //Error si el usuario no completa los campos
        UI.divMensajes.innerHTML = 'Error...You must complete every field.';
        UI.divMensajes.classList.add('error');
        setTimeout(()=>{
            UI.divMensajes.innerHTML = '';
            UI.divMensajes.classList.remove('error');
        }, 3000);
        
    } else{
        const api = new API(artista, cancion);
        api.consultarAPI()
            .then(
                data => { 
                    if(data.respuesta.lyrics){
                        //La canción existe
                        const letra = data.respuesta.lyrics;
                        UI.divResultado.textContent = letra;
                    }else{
                        //La canción no existe
                        UI.divMensajes.innerHTML = 'The song was not found. Try a different search.';
                        UI.divMensajes.classList.add('error');
                        setTimeout(()=>{
                             UI.divMensajes.innerHTML = '';
                             UI.divMensajes.classList.remove('error');
                             UI.formularioBuscar.reset();
                        }, 3000);
                    }
                }
            )

    }


})