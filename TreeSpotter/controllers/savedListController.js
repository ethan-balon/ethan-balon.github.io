import { SavedList } from "../models/savedList.js";
import { SavedListView } from "../views/savedListView.js";

export class SavedListController {
    constructor() {
        this.model = new SavedList();
        this.view = new SavedListView();
    }


    loadAndRender() {
        const trees = this.model.getTrees();
        this.view.render(
            trees,
            (tree) => this.handleNavigate(tree),
            (id, name) => this.handleDelete(id, name)
        );
    }

    handleNavigate(tree) {
        const destination = `${tree.latitude},${tree.longitude}`;
        const proceed = confirm(`You will be directed to Google Maps for navigation to "${tree.commonName}", this is a third party service. Continue?`);
        if (proceed) {
            window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
                "_blank"
            );
        }
    }


    handleDelete(id, name) {
        const proceed = confirm(`Are you sure you want to remove "${name}" from your saved list?`);
        if (proceed) {
            this.model.removeTree(id);
            this.loadAndRender();
        }
    }
}
