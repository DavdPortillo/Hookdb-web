export const usernameValidation = (username) =>{
    if(username.value == ""){
        
        alert("El nombre de usuario no puede estar vacío.");

        return false;
    }

    if (!/^[a-zA-Z]/.test(username.value)) {
        alert("El nombre de usuario debe comenzar con una letra.");
        return false;
    }

    if (!/^[a-zA-Z0-9_]{3,}$/.test(username.value)) {
        alert("El nombre de usuario debe tener al menos 3 caracteres.");
        return false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
        alert("El nombre de usuario solo puede contener letras, números o guiones bajos.");
        return false;
    }

    return true;
}

export const emailValidation = (email) =>{
    if(email.value == ""){
        alert("El email no puede estar vacío");
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        alert("Por favor, introduce una dirección de correo electrónico válida.");
        return false;
      }

      return true;
}

export const passwordValidation = (password, confirmPassword) =>{
    if(password.value == "" || confirmPassword.value == ""){
        alert("La contraseña no puede estar vacía");
        return false;
    }

    if(password.value.length < 6){
        alert("La contraseña no puede tener menos de 6 caracteres");
        return false;
    }
    if (!/[!@#$%&(),.\-_]+/.test(password.value))  {
        alert("La contraseña debe contener al menos un carácter especial.");
        return false;
    }

    if(!/\d/.test(password.value)){
        alert("La contraseña debe tener al menos un número");
        return false;
    }

    if(/^[0-9]/.test(password.value)){
        alert("La contraseña no puede empezar por un número");
        return false;
    }

    if(/^[!@#$%^&*(),.?":{}|<>]/.test(password.value)){
        alert("La contraseña no puede empezar por un símbolo");
        return false;
    }

    if(password.value != confirmPassword.value){
   
        alert("La contraseña no es igual");
        return false;
    }

    return true

}


export const isFieldEmpty = (field) =>{
    if(field === ''){
        return true;
    }

    return false;
}