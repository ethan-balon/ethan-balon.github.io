import { Tree } from "../models/tree.js";

// Lookup map for seasonality. Currently contains a placeholder "TEST" entry.
//placeholder changed to apricot as a more realistic placeholder (NOTICE: this is only test data and is not accurate)
const SEASONALITY_MAP = {
    "APRICOT": "Summer"
};

export const FRUIT_KEYWORDS = [
    "PLUM", "APPLE", "PEAR", "WALNUT", "CHESTNUT", "OLIVE", "PEACH",
    "APRICOT", "HAZEL", "MULBERRY", "LOQUAT", "QUINCE", "ALMOND",
    "CHERRY", "ELDERBERRY", "FIG", "FEIJOA", "CITRUS", "LEMON", "ORANGE",
    "STRAWBERRY TREE", "HONEY LOCUST", "SWEET BAY", "JUNIPER", "MACADAMIA"
];

export class DataController {
    constructor() {
        this.trees = [];
        this.apiUrl = "https://gis.ccc.govt.nz/server/rest/services/OpenData/Tree/FeatureServer/0/query";
    }

    /**
     * Determines seasonality using the SEASONALITY_MAP lookup.
     * Loops through keys in the mapping dictionary and does a substring check.
     * @param {string} commonName 
     * @param {string} botanicName 
     * @returns {string}
     */
    determineSeasonality(commonName, botanicName) {
        const name = `${commonName || ""} ${botanicName || ""}`.toUpperCase();
        for (const key of Object.keys(SEASONALITY_MAP)) {
            if (name.includes(key.toUpperCase())) {
                return SEASONALITY_MAP[key];
            }
        }
        return "Unknown";
    }

    /**
     * Deterministically calculates stock level based on TreeID.
     * Returns a number between 1 and 15.
     * @param {number|string} treeId 
     * @returns {number}
     */
    //placeholder as stock level data is currently unfetchable
    calculateStockLevel(treeId) {

        return "Unknown";
    }

    /**
     * Fetches tree data from the CCC Open Data FeatureServer.
     * @param {string} [searchQuery=""] - Optional text to search/filter by name.
     * @returns {Promise<Tree[]>} - Resolves to the array of Tree models.
     */
    async fetchTrees(searchQuery = "") {
        const url = new URL(this.apiUrl);

        // Base condition selecting only fruit or nut trees
        const fruitConditions = FRUIT_KEYWORDS.map(kw => `UPPER(CommonName) LIKE '%${kw}%'`).join(" OR ");
        let whereClause = `(${fruitConditions})`;

        if (searchQuery.trim() !== "") {
            // Clean single quotes to prevent basic SQL syntax issues from user inputs
            const cleanedQuery = searchQuery.replace(/'/g, "''").toUpperCase();
            whereClause += ` AND (UPPER(CommonName) LIKE '%${cleanedQuery}%' OR UPPER(BotanicName) LIKE '%${cleanedQuery}%')`;
        }

        url.searchParams.append("where", whereClause);
        url.searchParams.append("outFields", "*");
        url.searchParams.append("f", "geojson");

        //temporary test limit as too many results
        url.searchParams.append("resultRecordCount", "10");


        // If query is empty, limit results to prevent performance/browser lag issues
        // limit has been pushed back to 10 for testing purposes
        if (searchQuery.trim() === "") {
            url.searchParams.append("resultRecordCount", "10");
        }

        try {
            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.features && Array.isArray(data.features)) {
                this.trees = data.features
                    .map(feature => {
                        const props = feature.properties || {};
                        const coords = feature.geometry && feature.geometry.coordinates ? feature.geometry.coordinates : [0, 0];
                        // GeoJSON coordinates are in [longitude, latitude] format
                        const longitude = coords[0];
                        const latitude = coords[1];
                        const id = props.TreeID || props.OBJECTID || Math.random().toString(36).substr(2, 9);
                        const commonName = props.CommonName || "";
                        const botanicName = props.BotanicName || "";

                        const seasonality = this.determineSeasonality(commonName, botanicName);
                        const stockLevel = this.calculateStockLevel(id);

                        return new Tree(id, commonName, botanicName, latitude, longitude, seasonality, stockLevel);
                    })
                    .filter(tree => {
                        // Double check client-side that the common name matches our fruit/nut keywords
                        const upperCommon = tree.commonName.toUpperCase();
                        return FRUIT_KEYWORDS.some(kw => upperCommon.includes(kw));
                    });
            } else {
                this.trees = [];
            }
        } catch (error) {
            console.error("Error fetching tree data from CCC API:", error);
            this.trees = [];
            throw error;
        }

        return this.trees;
    }

    /**
     * Gets the currently cached tree listings.
     * @returns {Tree[]}
     */
    getTrees() {
        return this.trees;
    }
}
