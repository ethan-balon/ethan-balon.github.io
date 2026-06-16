import { MapView } from "../views/mapView.js";
import { DataController } from "./dataController.js";

export class MapController {
    constructor() {
        this.view = new MapView();
        this.dataController = new DataController();

        // Initialize map
        this.map = this.view.initMap();
        this.markers = [];
        this.lastResults = [];
        this.userLocationMarker = null;

        this.bindEvents();
        this.getUserLocation();
    }

    bindEvents() {
        // Bind search form submit
        if (this.view.searchForm) {
            this.view.searchForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const query = this.view.searchInput.value;
                await this.performSearch(query);
            });
        }

        // Bind back buttons
        if (this.view.resultsBackButton) {
            this.view.resultsBackButton.addEventListener('click', () => {
                this.view.clearMarkers(this.markers, this.map);
                this.markers = [];
                this.view.showSearch();
            });
        }

        if (this.view.detailsBackButton) {
            this.view.detailsBackButton.addEventListener('click', () => {
                // Clear the single details marker and restore all search result pins
                this.view.clearMarkers(this.markers, this.map);
                this.markers = this.view.plotMarkers(this.lastResults, this.map, (tree) => this.showTreeDetails(tree));
                this.view.showResults();
            });
        }
    }

    async performSearch(query) {
        try {
            // Clear existing markers
            this.view.clearMarkers(this.markers, this.map);
            this.markers = [];

            // Fetch trees
            const trees = await this.dataController.fetchTrees(query);
            this.lastResults = trees;

            // Render search list results
            this.view.renderResults(trees, (tree) => this.showTreeDetails(tree));

            // Plot markers on the map
            this.markers = this.view.plotMarkers(trees, this.map, (tree) => this.showTreeDetails(tree));

            // Switch view state to results panel
            this.view.showResults();
        } catch (error) {
            console.error("Search failed:", error);
            alert("Failed to search/fetch tree data. Please try again.");
        }
    }

    showTreeDetails(tree) {
        // Clear all pins and show only the selected tree on the map
        this.view.clearMarkers(this.markers, this.map);
        this.markers = this.view.plotMarkers([tree], this.map, (t) => this.showTreeDetails(t));

        // Render detailed details panel
        this.view.renderDetails(tree);

        // Switch view state to details panel
        this.view.showDetails();
    }

    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    this.userLocationMarker = this.view.plotUserLocation(lat, lng, this.map);
                },
                (error) => {
                    console.log("Geolocation lookup failed or permission denied:", error);
                }
            );
        }
    }
}
