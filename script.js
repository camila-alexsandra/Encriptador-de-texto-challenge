const textoEntrada = document.querySelector(".caja_uno_texto");
const textoSalida = document.querySelector(".caja_dos_texto_salida");
const nota1 = document.querySelector(".nota_mensaje");
const nota2 = document.querySelector(".nota_in");
const copiarInformacion = document.querySelector(".copiar_informacion");
const LimpiarCaja = document.querySelector(".boton_limpiar");
const copiarTexto = document.querySelector(".boton_copiar");
const copiarAviso = document.getElementById("mensaje_copiado");
const mensajeError = document.getElementById("mensaje_error");

function ocultar(){
    textoEntrada.value = "";
    nota1.style.display = "none";
    nota2.style.display = "none";
}

function mostrar(){
    textoSalida.style.background = "";
    nota1.style.display = "";
    nota2.style.display = "";
}

function validarTexto(input) {
    const regex = /^[a-zñ0-9\s]+$/i;
    if (!regex.test(input.value)) {
        mensajeError.style.display = 'block';
        mensajeError.querySelector(".mensaje_atencion").textContent = "Atención al texto permitido";
        setTimeout(() => {
            mensajeError.style.display = 'none';
        }, 3500);
        input.value = input.value.replace(/[^\w\s]/gi, '').toLowerCase();
    }
}

textoEntrada.addEventListener('input', () => {
    validarTexto(textoEntrada);
  });



function boton_encriptar(){
    const textoEncriptado = encriptar(textoEntrada.value)
    textoSalida.value = textoEncriptado
    textoSalida.style.backgroundImage= "none";
    textoSalida.style.background= "Black";

    ocultar()
}

function encriptar(stringEncriptada){
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase()

    for(let i = 0; i < matrizCodigo.length; i++){
        if(stringEncriptada.includes(matrizCodigo[i][0])){
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
        }
    }
    return stringEncriptada
}

function boton_desencriptar(){
    const textoEncriptado = desencriptar(textoEntrada.value)
    textoSalida.value = textoEncriptado
    textoSalida.style.backgroundImage= "none";
    textoSalida.style.background= "white";
    textoEntrada.value = "";

    ocultar()
}

function desencriptar(stringDesencriptada){
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase()

    for(let i = 0; i < matrizCodigo.length; i++){
        if(stringDesencriptada.includes(matrizCodigo[i][1])){
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
        }
    }
    return stringDesencriptada
}

LimpiarCaja.addEventListener("click", () => {
    textoSalida.value = "";
});

copiarTexto.addEventListener("click", async () => {
    if (textoSalida.value.trim() === "") {
        mostrar();
    } else {
        try {
            await navigator.clipboard.writeText(textoSalida.value);
            copiarAviso.style.display = "block";
            setTimeout(() => {
                copiarAviso.style.display = "none";
            }, 2000);
        } catch (err) {
            console.error("Error al copiar el texto: ", err);
        }
    }
});

