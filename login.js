let buttonLogin = document.querySelector("#sendLogin");
let buttonRegister = document.querySelector("#sendRegitration");
buttonLogin.addEventListener("click", login);
buttonLogin.addEventListener("click", verifyEmptinessLogin);
buttonRegister.addEventListener("click", register);
buttonRegister.addEventListener("click", verifyEmptinessRegister);
let usersDatabase = JSON.parse(localStorage.getItem("usersDatabase"));

addEventListener("DOMContentLoaded", function () {
  localStorage.setItem('userLoggedIn', JSON.stringify(""));
});

function verifyEmptinessLogin() {
  let inputUserName = document.querySelector("#inputUserName").value;
  let inputPassword = document.querySelector("#inputPassword").value;
  let errorContainerLogin = document.querySelector("#errorContainerLogin");

  if (inputUserName === "" || inputPassword === "") {
    let inputs = [
      "#inputUserName",
      "#inputPassword",
    ];
    inputs.forEach((selection) => {
      let input = document.querySelector(selection);
      if (input.value === "") {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "";
      }
    });
  }
}

function login() {
  let inputUsername = document.querySelector("#inputUserName").value;
  let userPassword = document.querySelector("#inputPassword").value;
  let errorContainerLogin = document.querySelector("#errorContainerLogin");

  currentUser = window.Sistema.findingUser(inputUsername, userPassword);
  adminUser = window.Sistema.isAdmin(inputUsername);


  if (inputUsername != "" || userPassword != "") {
    if (currentUser == false) {
      errorContainerLogin.innerHTML = `<p>Credenciales incorrectas</p>`;
      setTimeout(function () {
        errorContainerLogin.innerHTML = "";
      }, 2000);
    } else {
      if (adminUser == true) {
        window.location.href = "admin.html";
      } else {
        window.location.href = "clientSite.html";
      }
    }
    } else {
      errorContainerLogin.innerHTML = `<p>Complete los campos</p>`;
    }
}

function verifyEmptinessRegister() {
  let inputSignUpName = qsValue("inputSignUpName");
  let inputSignUpLastName = qsValue("inputSignUpLastName");
  let inputSignUpUsername = qsValue("inputSignUpUsername");
  let inputSignUpPassword = qsValue("inputSignUpPassword");
  let inputSignUpCreditCard = qsValue("inputSignUpCreditCard");
  let inputSignUpCVC = qsValue("inputSignUpCVC");
  let errorContainerRegister = qs("errorContainerRegister")

  if (!inputSignUpName || !inputSignUpLastName || !inputSignUpUsername || !inputSignUpPassword || !inputSignUpCreditCard || !inputSignUpCVC) {
    let inputs = [
      "#inputSignUpName",
      "#inputSignUpLastName",
      "#inputSignUpUsername",
      "#inputSignUpPassword",
      "#inputSignUpCreditCard",
      "#inputSignUpCVC",
    ];

    inputs.forEach((selection) => {
      let input = document.querySelector(selection);
      if (input.value === "") {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "";
      }
    });
    errorContainerRegister.innerHTML = `<p>Por favor complete los campos</p>`

  }
}

function register(){
  let inputSignUpName = qsValue("inputSignUpName");
  let inputSignUpLastName = qsValue("inputSignUpLastName");
  let inputSignUpUsername = qsValue("inputSignUpUsername");
  let inputSignUpPassword = qsValue("inputSignUpPassword");
  let inputSignUpCreditCard = qsValue("inputSignUpCreditCard").replaceAll('-', '');
  let inputSignUpCVC = qsValue("inputSignUpCVC");
  let errorContainerRegister = qs("errorContainerRegister")
  
  
  if ( window.Sistema.findUsername(inputSignUpUsername)  === false ) {
    errorContainerRegister.innerHTML = `<p>Nombre de usuario ya registrado</p>`
    setTimeout(() => {
        errorContainerLogin.innerHTML = "";
    }, 3000);
    return
  }
  
  if (isFirstCharUppercase(inputSignUpName) && isFirstCharUppercase(inputSignUpLastName) && passwordValidation(inputSignUpPassword) && isNumbers(inputSignUpCreditCard) && inputSignUpCreditCard.length === 16 && isNumbers(inputSignUpCVC) && inputSignUpCVC.length === 3) {
    window.Sistema.registerUser(inputSignUpName, inputSignUpLastName, inputSignUpUsername, inputSignUpPassword, inputSignUpCreditCard, inputSignUpCVC)
    errorContainerRegister.innerHTML = `<p>¡Usuario registrado correctamente! - Usted va a ser redirigido a nuestra pagina de compras. Aguarde un momento</p>`
    setTimeout(() => {
      window.location.href = "clientSite.html";
    }, 3000);
  }  else {
    errorContainerRegister.innerHTML = `<p>Datos ingresados incorrectos</p>`
  }
  
}

document.addEventListener("DOMContentLoaded", function () {
  const loginImg = document.getElementById("login-img");
  const registerSlider = document.getElementById("register-slider");
  const loginSlider = document.getElementById("login-slider");

  // Desliza el panel a la izquierda cuando se clickea el boton
  registerSlider.addEventListener("click", function () {
    loginImg.classList.add("move-left");
    loginImg.classList.remove("move-right");
  });

  // Desliza el panel a la derecha cuando se clickea el boton
  loginSlider.addEventListener("click", function () {
    loginImg.classList.add("move-right");
    loginImg.classList.remove("move-left");
  });
});
