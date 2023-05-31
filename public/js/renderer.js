document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login-form");
    const welcomeMessageParagraph = document.querySelector("#message");
    const rutInput = document.querySelector("#rut");
    const passwordInput = document.querySelector("#password");
    const bankSelect = document.querySelector("#bank"); // Obtener el elemento select
    const syncButton = document.querySelector("#sync-button");
    const deleteButton = document.querySelector("#delete-button");

    const updateView = async () => {
        const credentials = await window.electron.getCredentials();

        const loginForm = document.querySelector("#login-form");
        const mainMenu = document.querySelector("#main-menu");

        if (credentials) {
            loginForm.style.display = "none";
            mainMenu.style.display = "block";
        } else {
            loginForm.style.display = "block";
            mainMenu.style.display = "none";
        }
    };


    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            welcomeMessageParagraph.textContent = "Saving...";
            const rut = rutInput.value;
            const password = passwordInput.value;
            const bank = bankSelect.value; // Obtener el valor seleccionado del select
            await window.electron.saveCredentials(rut, password, bank); // Pasar el valor del select a la función saveCredentials
            welcomeMessageParagraph.textContent = "Saved successfully";
            await updateView();
        } catch (error) {
            console.error(error);
            welcomeMessageParagraph.textContent = "Error while saving credentials.";
        }
    });

    syncButton.addEventListener("click", async () => {
        try {
            welcomeMessageParagraph.textContent = "Syncing...";
            const welcomeMessage = await window.electron.sync();
            welcomeMessageParagraph.textContent = welcomeMessage;
        } catch (error) {
            console.error(error);
            welcomeMessageParagraph.textContent = "Error while syncing.";
        }
    });

    deleteButton.addEventListener("click", async () => {
        try {
            welcomeMessageParagraph.textContent = "Deleting...";
            await window.electron.deleteCredentials();
            welcomeMessageParagraph.textContent = "Deleted successfully";
        } catch (error) {
            console.error(error);
            welcomeMessageParagraph.textContent = "Error while deleting credentials.";
        }
    });

    window.electron.onCredentialsChanged(() => {
        updateView();
    });

    updateView();
});
