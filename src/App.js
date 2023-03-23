import './App.css';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function App() {
  const [longToRifa, setLongToRifa] = useState(100);

  useEffect(() => {
    loadStyleDelete();
  });

  const numbers = [];
  for(var i = 1; i <= longToRifa; i++){
    numbers[i-1] = i;
  }

  function loadStyleDelete(){
    const keysToLocalStorage = getAllKeysLocalStorage();
    keysToLocalStorage.forEach(keyDiv => {
      if(keyDiv != null){
        console.log("num: " + keyDiv);
        const divSaved = document.querySelector(`div[data-numero="${keyDiv}"]`);
        divSaved.classList.add('tachado');
      }
    });
  }

  function guardarNumero(num){
    Swal.fire({
      title: 'Ingrese nombre',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar el nombre';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const nombre = result.value;
        localStorage.setItem(num, nombre);
        const divClickeado = document.querySelector(`div[data-numero="${num}"]`);
        divClickeado.classList.add('tachado');
      }
    });
  }

  function limpiarTodoLocalStorage(){

    Swal.fire({
      title: '¿Está seguro de que desea borrar todos los registros?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        eliminarEstiloEliminado();
      }
    })
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getAllKeysLocalStorage() {
    let keys = [];
    for (var i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i));
    }
    return keys;
  }

  function eliminarEstiloEliminado() {
    const elementos = document.querySelectorAll('.tachado');
    elementos.forEach(element => {
      element.classList.remove('tachado');
    });
  }

  function sortear(){
    let allkeys = getAllKeysLocalStorage();
    let numAleatorio = getRandomInt(allkeys.length);
    Swal.fire({
      title: 'El ganador es',
      html: "Nro: " + allkeys[numAleatorio] + " <br>Nombre: " + localStorage.getItem(allkeys[numAleatorio]),
    });
  }

  function cambiarLongToRifa(){
    
    Swal.fire({
      title: 'Ingrese la cantidad de numeros para la rifa:',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (num) => {
        if (!num || isNaN(num) || num <= 0) {
          Swal.showValidationMessage('Ingrese un número válido')
        }
        setLongToRifa(num);
      },
      allowOutsideClick: () => !Swal.isLoading()
    })

  }

  return (
    <div className="App">
      <h1>RIFAS</h1>

      <button onClick={cambiarLongToRifa} className="btns-actions">Cantidad de numeros</button>

      <div className="grilla">
        {numbers.map((number) => (
        <div key={number} class="grid__col--1-12 styleNumber" onClick={() => guardarNumero(number)} data-numero={number}>

          <div class="inner-wrap redondeado">
              {number}
          </div>

        </div>
        ))}

      </div>

      <button onClick={sortear} className="btns-actions">SORTEAR</button>

      <button onClick={limpiarTodoLocalStorage} className="btns-actions">Borrar todos los registros</button>

    </div>
  );
}

export default App;