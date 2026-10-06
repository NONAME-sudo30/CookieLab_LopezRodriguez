console.log("CookieLab iniciado");

const duracionTreintaDias = 30 * 24 * 60 * 60;
const saludo = document.querySelector("#saludo");
const selectorTema = document.querySelector("#tema");
const selectorIdioma = document.querySelector("#idioma");

function leerCookie(clave) {
	const cookie = document.cookie
		.split("; ")
		.find((elemento) => elemento.startsWith(`${clave}=`));

	return cookie ? decodeURIComponent(cookie.slice(clave.length + 1)) : null;
}

function guardarCookie(clave, valor) {
	document.cookie = `${clave}=${encodeURIComponent(valor)}; max-age=${duracionTreintaDias}; path=/; SameSite=Lax`;
}

function aplicarTema() {
	document.body.classList.toggle("tema-oscuro", selectorTema.value === "oscuro");
}

function mostrarSaludo(nombre) {
	if (selectorIdioma.value === "en") {
		saludo.textContent = nombre
			? `Welcome back to CookieLab, ${nombre}!`
			: "Welcome to CookieLab!";
		return;
	}

	saludo.textContent = nombre
		? `¡Qué bueno verte de nuevo, ${nombre}!`
		: "¡Te damos la bienvenida a CookieLab!";
}

const temaGuardado = leerCookie("tema");
const idiomaGuardado = leerCookie("idioma");
selectorTema.value = temaGuardado === "oscuro" ? "oscuro" : "claro";
selectorIdioma.value = idiomaGuardado === "en" ? "en" : "es";
aplicarTema();

let nombre = leerCookie("usuario");

	if (!nombre) {
	const respuesta = prompt("¿Cómo te llamas?");
	nombre = respuesta?.trim() || null;

	if (nombre) {
		guardarCookie("usuario", nombre);
		alert(selectorIdioma.value === "en" ? `Welcome, ${nombre}!` : `¡Bienvenido/a, ${nombre}!`);
	}
}

mostrarSaludo(nombre);

selectorTema.addEventListener("change", () => {
	guardarCookie("tema", selectorTema.value);
	aplicarTema();
});

selectorIdioma.addEventListener("change", () => {
	guardarCookie("idioma", selectorIdioma.value);
	mostrarSaludo(nombre);
});
