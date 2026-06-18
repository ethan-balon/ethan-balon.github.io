import { Tree } from "./tree.js";

export class SavedList {
    constructor() {
        this.storageKey = "saved_trees";
    }

    /**
     * Retrieves all saved Tree objects from localStorage.
     * @returns {Tree[]}
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
     * @param {Tree} tree
     * @returns {boolean} - True if added, false if already exists
     */
    addTree(tree) {
        const trees = this.getTrees();
        if (trees.some(t => String(t.id) === String(tree.id))) {
            return false; // Already saved
        }
        trees.push(tree);
        localStorage.setItem(this.storageKey, JSON.stringify(trees));
        return true;
    }

    /**
     * Removes a Tree from localStorage by ID.
     * @param {string|number} treeId
     * @returns {boolean} - True if removed, false if not found
     */
    removeTree(treeId) {
        const trees = this.getTrees();
        const initialLength = trees.length;
        const filtered = trees.filter(t => String(t.id) !== String(treeId));
        if (filtered.length === initialLength) {
            return false; // Not found
        }
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
        return true;
    }

    /**
     * Checks if a tree is already saved.
     * @param {string|number} treeId
     * @returns {boolean}
     */
    isSaved(treeId) {
        const trees = this.getTrees();
        return trees.some(t => String(t.id) === String(treeId));
    }
}
