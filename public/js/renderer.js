document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.querySelector("#login-form");
    var loginButton = document.querySelector("#login-button");
    var welcomeMessageParagraph = document.querySelector("#message");
    var rutInput = document.querySelector("#rut");
    var passwordInput = document.querySelector("#password");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar la recarga de la página al enviar el formulario

        try {
            welcomeMessageParagraph.textContent = "Buscando...";
            var rut = rutInput.value;
            var password = passwordInput.value;
            window.electron
                .login(rut, password)
                .then(function (welcomeMessage) {
                    welcomeMessageParagraph.textContent = welcomeMessage;
                })
                .catch(function (error) {
                    console.error(error);
                    welcomeMessageParagraph.textContent = "Hubo un error al intentar iniciar sesión.";
                });
        } catch (error) {
            console.error(error);
            welcomeMessageParagraph.textContent = "Hubo un error al intentar iniciar sesión.";
        }
    });
});
