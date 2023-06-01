// categoriesController.js
const categoriesTable = document.querySelector("#categories-table");
const createCategoryForm = document.querySelector("#create-category-form");
const updateCategoryForm = document.querySelector("#update-category-form");
const deleteCategoryButton = document.querySelector("#delete-category-button");

const renderCategories = async () => {
    // Obtén las categorías desde la API de electron
    const categories = await window.electron.getCategories();

    // Renderiza las categorías en la tabla
    categoriesTable.innerHTML = "";
    categories.forEach((category) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${category.id}</td><td>${category.name}</td><td>${category.description}</td>`;
        categoriesTable.appendChild(row);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    createCategoryForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        // Obtén los valores de los campos del formulario
        const name = createCategoryForm.querySelector("#name").value;
        const description = createCategoryForm.querySelector("#description").value;

        // Crea la categoría
        await window.electron.createCategory({ name, description });

        // Vuelve a renderizar las categorías
        renderCategories();
    });

    updateCategoryForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        // Obtén los valores de los campos del formulario
        const id = updateCategoryForm.querySelector("#id").value;
        const name = updateCategoryForm.querySelector("#name").value;
        const description = updateCategoryForm.querySelector("#description").value;

        // Actualiza la categoría
        await window.electron.updateCategory({ id, name, description });

        // Vuelve a renderizar las categorías
        renderCategories();
    });

    deleteCategoryButton.addEventListener("click", async () => {
        // Obtén el ID de la categoría desde el campo de texto
        const id = deleteCategoryButton.parentElement.querySelector("#id").value;

        // Elimina la categoría
        await window.electron.deleteCategory(id);

        // Vuelve a renderizar las categorías
        renderCategories();
    });

    // Renderiza las categorías cuando la página se carga
    renderCategories();
});

export const categoriesController = {
    initView: renderCategories,
};
