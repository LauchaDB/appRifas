import './App.css';
import { useState } from 'react';
import Swal from 'sweetalert2';

function App() {

  const numbers = [];
  for(var i = 1; i <= 100; i++){
    numbers[i-1] = i;
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
        // Buscamos el div que se le hizo click
        const divClickeado = document.querySelector(`div[data-numero="${num}"]`);
        // Le agregamos una clase al div clickeado
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
    let numAleatorio = getRandomInt(numbers.length);
    numAleatorio = 100;
    if(getAllKeysLocalStorage().includes(numAleatorio.toString())){
      console.log("el ganador es: " + localStorage.getItem(numAleatorio));
      Swal.fire({
        title: 'EL GANADOR ES',
        text: localStorage.getItem(numAleatorio),
      });
      localStorage.removeItem(numAleatorio.toString());
    }else{
      console.log("no existe");
    }
  }

  return (
    <div className="App">
      <h1>RIFAS</h1>

      <div className="grid">
        {numbers.map((number) => (
        <div key={number} class="grid__col--1-12 separacion" onClick={() => guardarNumero(number)} data-numero={number}>

          <div class="inner-wrap">
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
