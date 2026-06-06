export class Tree {
    /**
     * Creates an instance of Tree.
     * @param {number|string} id - Unique identifier (TreeID).
     * @param {string} commonName - Common name of the tree.
     * @param {string} botanicName - Botanical name of the tree.
     * @param {number} latitude - Latitude coordinate.
     * @param {number} longitude - Longitude coordinate.
     * @param {string} [seasonality="Unknown"] - Mapped seasonality profile.
     * @param {number} [stockLevel=0] - Mapped/simulated stock level.
     */
    constructor(id, commonName, botanicName, latitude, longitude, seasonality = "Unknown", stockLevel = 0) {
        this.id = id;
        this.commonName = commonName || "Unknown Tree";
        this.botanicName = botanicName || "Unknown Species";
        this.latitude = parseFloat(latitude);
        this.longitude = parseFloat(longitude);
        this.seasonality = seasonality;
        this.stockLevel = stockLevel;
    }
}
