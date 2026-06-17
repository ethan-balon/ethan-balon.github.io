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
        this.selectedTree = null;

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
                this.view.clearMarkers(this.markers, this.map);
                this.markers = this.view.plotMarkers(this.lastResults, this.map, (tree) => this.showTreeDetails(tree));
                this.view.showResults();
            });
        }

        if (this.view.detailsSaveButton) {
            this.view.detailsSaveButton.addEventListener('click', () => {
                alert('PROTOTYPE MESSAGE: Save button pressed, this is a future feature')
            });
        }

        if (this.view.detailsNavigateButton) {
            this.view.detailsNavigateButton.addEventListener('click', () => {
                if (!this.selectedTree) {
                    alert('No tree selected.');
                    return;
                }
                const destination = `${this.selectedTree.latitude},${this.selectedTree.longitude}`;
                alert('You will be directed to Google Maps for navigation, this is a third party service. Continue?')
                window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
                    "_blank"
                );

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
        this.selectedTree = tree;
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
                    alert(`TreeSpotter could not retrieve your location because: "${error.message}". The application will continue to run, but the results may be less relevant.`)
                    console.log("Geolocation lookup failed or permission denied:", error);
                }
            );
        }
    }
}
