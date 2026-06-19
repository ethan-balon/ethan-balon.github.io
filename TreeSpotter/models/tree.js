export class Tree {
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
