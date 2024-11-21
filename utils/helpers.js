  function isEmpty(txt) {
    if (txt == "") {
      return true;
    }
    return false;
  }

  function qs(id) {
    const element = document.querySelector(`#${id}`);
    return element;
  }
  
  function qsValue(id) {
    return qs(id).value;
  }
  
  function qsValueAsNumber(id) {
    return Number(qsValue(id));
  }

  function isFirstCharUppercase(txt){
    let firstCharUppercase = false

    if (txt.charCodeAt(0) >= 65 && txt.charCodeAt(0) <= 90) {
      return firstCharUppercase = true
    } else {
      return firstCharUppercase
    }
  }

  function passwordValidation (password){
    let upperCase = 0
    let lowerCase = 0
    let number = 0

    let isPasswordValid = false 
    for (let i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
        upperCase++
      }
      if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
        lowerCase++
      }
      if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
        number++
      }
    }

    if (upperCase >= 1 && lowerCase >= 3 && number >= 1) {
      return true;
    } else {
      return false;
    }
  } 

  function isNumbers (numbers){
    if (!isNaN(numbers)) {
      return true
    } else {
      return false
    }
  }


