document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login-form");
    const loginButton = document.querySelector("#login-button");
    const welcomeMessageParagraph = document.querySelector("#message");
    const rutInput = document.querySelector("#rut");
    const passwordInput = document.querySelector("#password");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evitar la recarga de la página al enviar el formulario

        try {
            welcomeMessageParagraph.textContent = "Buscando...";
            const rut = rutInput.value;
            const password = passwordInput.value;
            const welcomeMessage = await window.electron.login(rut, password);
            welcomeMessageParagraph.textContent = welcomeMessage;
        } catch (error) {
            console.error(error);
            welcomeMessageParagraph.textContent = "Hubo un error al intentar iniciar sesión.";
        }
    });
});
