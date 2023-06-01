export const banksController = {
    view: document.querySelector("#banks-view"),
    tableBody: document.querySelector("#banks-table-body"),

    updateView: async function () {
        const banks = await window.electron.getBanks();
        this.tableBody.innerHTML = "";
        for (const bank of banks) {
            const tr = document.createElement("tr");
            const idTd = document.createElement("td");
            idTd.textContent = bank.id;
            tr.appendChild(idTd);
            const nameTd = document.createElement("td");
            nameTd.textContent = bank.name;
            tr.appendChild(nameTd);
            this.tableBody.appendChild(tr);
        }
    },

    initView: function () {
        this.updateView();
    },
};
