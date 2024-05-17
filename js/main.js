import esUnCuil from "./validarCuil.js";
import esMayorDeEdad from "./validarEdad.js";
import { tiposError, mensajes } from "./customErrors.js";

const camposDeFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");
formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const listaRespuestas = {
        nombre: event.target.elements["nombre"].value,
        email: event.target.elements["email"].value,
        identificacion: event.target.elements["identificacion"].value,
        cuil: event.target.elements["cuil"].value,
        fecha_nacimiento: event.target.elements["fecha_nacimiento"].value,
    };
    localStorage.setItem("registro", JSON.stringify(listaRespuestas));
    window.location.href = "./abrir-cuenta-form-2.html"
});

camposDeFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificarCampo(campo));
    campo.addEventListener("invalid", event => event.preventDefault());
});

function verificarCampo(campo) {
    let mensaje = "";
    campo.setCustomValidity("");
    if (campo.name === "cuil" && campo.value.length >= 11) {
        esUnCuil(campo);
    }
    if (campo.name === "fecha_nacimiento" && campo.value !== "") {
        esMayorDeEdad(campo);
    }
    //console.log(campo.validity);
    tiposError.forEach((error) => {
       if(campo.validity[error]) {
        mensaje = mensajes[campo.name][error];
        console.log(mensaje);
       };
    });
    const mensajeError = campo.parentNode.querySelector(".mensaje-error");
    const validarInputCheck = campo.checkValidity();
    if(!validarInputCheck) {
        mensajeError.textContent = mensaje;
    } else {
        mensajeError.textContent = "";
    }
};