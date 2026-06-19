import { Tree } from "../models/tree.js";

// Lookup map for seasonality.
//placeholder changed to apricot as a more realistic placeholder
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


    determineSeasonality(commonName, botanicName) {
        const name = `${commonName || ""} ${botanicName || ""}`.toUpperCase();
        for (const key of Object.keys(SEASONALITY_MAP)) {
            if (name.includes(key.toUpperCase())) {
                return SEASONALITY_MAP[key];
            }
        }
        return "Unknown";
    }


    calculateStockLevel(treeId) {

        return "Unknown";
    }

// Fetches tree data from Christchurch database
    async fetchTrees(searchQuery = "") {
        const url = new URL(this.apiUrl);

        const fruitConditions = FRUIT_KEYWORDS.map(kw => `UPPER(CommonName) LIKE '%${kw}%'`).join(" OR ");
        let whereClause = `(${fruitConditions})`;

        if (searchQuery.trim() !== "") {
            const cleanedQuery = searchQuery.replace(/'/g, "''").toUpperCase();
            whereClause += ` AND (UPPER(CommonName) LIKE '%${cleanedQuery}%' OR UPPER(BotanicName) LIKE '%${cleanedQuery}%')`;
        }

        url.searchParams.append("where", whereClause);
        url.searchParams.append("outFields", "*");
        url.searchParams.append("f", "geojson");

        //temporary result limit for testing
        url.searchParams.append("resultRecordCount", "50");


        // If query is empty, limit results to prevent performance/browser lag issues
        if (searchQuery.trim() === "") {
            url.searchParams.append("resultRecordCount", "50");
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


    getTrees() {
        return this.trees;
    }
}
