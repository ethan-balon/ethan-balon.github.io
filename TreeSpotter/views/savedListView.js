export class SavedListView {
    constructor() {
        this.infoBar = document.getElementById('infobar_text');
        this.tableBody = document.getElementById("saved_list_body");
        this.table = document.getElementById("saved_list");
    }


    render(trees, onNavigate, onDelete) {
        if (!this.tableBody) return;
        this.tableBody.innerHTML = "";

        if (trees.length === 0) {
            this.infoBar.textContent = "No saved trees yet"
        return;
        }

        trees.forEach(tree => {
            const tr = document.createElement("tr");
            
            const coordsText = `${tree.latitude.toFixed(6)}, ${tree.longitude.toFixed(6)}`;

            tr.innerHTML = `
                <td>${tree.id}</td>
                <td>${tree.commonName}</td>
                <td>${tree.seasonality}</td>
                <td>${tree.stockLevel}</td>
                <td>${coordsText}</td>
                <td><button class="saved_tree_navigate">Navigate</button></td>
                <td><button class="saved_tree_delete">Delete</button></td>
            `;

            // Bind Navigate button
            const navBtn = tr.querySelector(".saved_tree_navigate");
            if (navBtn) {
                navBtn.addEventListener("click", () => onNavigate(tree));
            }

            // Bind Delete button
            const delBtn = tr.querySelector(".saved_tree_delete");
            if (delBtn) {
                delBtn.addEventListener("click", () => onDelete(tree.id, tree.commonName));
            }

            this.tableBody.appendChild(tr);
        });
    }
}
