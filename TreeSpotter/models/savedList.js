import { Tree } from "./tree.js";

export class SavedList {
    constructor() {
        this.storageKey = "saved_trees";
    }

    /**
     * Retrieves all saved Tree objects from localStorage.
     */
    getTrees() {
        const stored = localStorage.getItem(this.storageKey);
        if (!stored) return [];
        try {
            const parsed = JSON.parse(stored);
            if (!Array.isArray(parsed)) return [];
            return parsed.map(item => new Tree(
                item.id,
                item.commonName,
                item.botanicName,
                item.latitude,
                item.longitude,
                item.seasonality,
                item.stockLevel
            ));
        } catch (e) {
            console.error("Error parsing saved trees from localStorage", e);
            return [];
        }
    }

    /**
     * Saves a Tree to localStorage.
     */
    addTree(tree) {
        const trees = this.getTrees();
        if (trees.some(t => String(t.id) === String(tree.id))) {
            return false;
        }
        trees.push(tree);
        localStorage.setItem(this.storageKey, JSON.stringify(trees));
        return true;
    }

//  removes a Tree from localStorage by ID.

    removeTree(treeId) {
        const trees = this.getTrees();
        const initialLength = trees.length;
        const filtered = trees.filter(t => String(t.id) !== String(treeId));
        if (filtered.length === initialLength) {
            return false;
        }
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
        return true;
    }


    isSaved(treeId) {
        const trees = this.getTrees();
        return trees.some(t => String(t.id) === String(treeId));
    }
}
