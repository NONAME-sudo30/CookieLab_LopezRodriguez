console.log("CookieLab iniciado");

const nombreGuardado = document.cookie
	.split("; ")
	.find((cookie) => cookie.startsWith("usuario="));

const saludo = document.querySelector("#saludo");

if (nombreGuardado) {
	const nombre = decodeURIComponent(nombreGuardado.slice("usuario=".length));
	saludo.textContent = `¡Qué bueno verte de nuevo, ${nombre}!`;
} else {
	const respuesta = prompt("¿Cómo te llamas?");
	const nombre = respuesta?.trim();

	if (nombre) {
		const duracionTreintaDias = 30 * 24 * 60 * 60;
		document.cookie = `usuario=${encodeURIComponent(nombre)}; max-age=${duracionTreintaDias}; path=/; SameSite=Lax`;
		saludo.textContent = `¡Bienvenido/a a CookieLab, ${nombre}!`;
		alert(`¡Bienvenido/a, ${nombre}!`);
	} else {
		saludo.textContent = "¡Te damos la bienvenida a CookieLab!";
	}
}
