let usersDatabase = JSON.parse(localStorage.getItem("usersDatabase"));

addEventListener("DOMContentLoaded", function () {
   let userLogged = localStorage.getItem('userLoggedIn');
  });

addEventListener("DOMContentLoaded", function displayData (){
    let userLogged = localStorage.getItem('userLoggedIn');
    let user = JSON.parse(userLogged);
    let informationContainer = document.querySelector("#information-container");
    informationContainer.innerHTML = `
    <h2>Información del usuario</h2>
    <p><b>Nombre:</b>  ${user.firstName}</p>
    <p><b>Apellido:</b>  ${user.lastName}</p>
    <p><b>Nombre de usuario:</b>  ${user.username}</p>
    <p><b>Presupuesto disponible:</b>  ${user.budget}</p>
    <p><b>Millas disponibles:</b>  ${user.miles}</p>`
});
    
document.addEventListener("DOMContentLoaded", function () {
  let informationContainer = document.querySelector("#information-container");
    addEventListener("DOMContentLoaded", function () {
    informationContainer.classList.add("move-right");
    });
  });

  window.addEventListener('storage', (event) => {
  displayData()
});