//Variables.
const form = document.querySelector('#generar-nombre');

//Leer info y mostrarla en el html
const showInfo = (users) => {
  //genero el html
  let htmlUsers = '<h3 class="container">Usuarios Generados</h3><hr>';

  users.results.map(user =>
    htmlUsers += `
          <ul class="lista">
            <img src="${user.picture.thumbnail}" alt=""/>
            <li>Name: ${user.name.first}.</li>
            <li>Lastname: ${user.name.last}.</li>
            <li>Location
            <ul>
              <li>Street: ${user.location.street.name} ${user.location.street.number}</li>
              <li>City: ${user.location.city}</li>
              <li>country: ${user.location.country}</li>
            </ul>
            </li>
          </ul>
          <hr>`);

  document.querySelector('#resultado').innerHTML = htmlUsers;
}

//buscar nombres en la api
const loadNames = event => {
  event.preventDefault();

  //Leo los valores de todos los campos
  const origin = document.querySelector('#origen');
  const originSelected = origin.options[origin.selectedIndex].value;

  const gender = document.querySelector('#genero');
  const genderSelected = gender.options[gender.selectedIndex].value;

  const quantity = document.querySelector('#numero').value;

  let url = '';
  url += 'https://randomuser.me/api/?';

  //concateno los valores del form a la url para armar la peticion
  originSelected !== '' ? url += `nat=${originSelected}&` : '';
  genderSelected !== '' ? url += `gender=${genderSelected}&` : '';
  quantity !== '' ? url += `results=${quantity}` : '';

  //conectar ajax
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (this.status === 200) {
      const users = JSON.parse(this.response);
      //mostrar los resultados en el html
      showInfo(users);
    }
  }

  //enviar ajax
  xhr.send();
}

//Listenners
form.addEventListener('submit', loadNames);
