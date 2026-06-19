import { MapView } from "../views/mapView.js";
import { DataController } from "./dataController.js";
import { SavedList } from "../models/savedList.js";

export class MapController {
    constructor() {
        this.view = new MapView();
        this.dataController = new DataController();
        this.savedList = new SavedList();

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
                this.view.infoBar.textContent = `Searching for ${query ? query : "all trees"}..`
                await this.performSearch(query);
                this.view.infoBar.textContent = `Showing results for ${query ? query : "all trees"}`
            });
        }

        if (this.view.resultsBackButton) {
            this.view.resultsBackButton.addEventListener('click', () => {
                this.view.clearMarkers(this.markers, this.map);
                this.markers = [];
                this.view.showSearch();
                this.view.infoBar.textContent = `Type on the search bar to search for a tree, or press enter to display all trees in your area.`
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
                if (!this.selectedTree) {
                    alert('No tree selected.');
                    return;
                }
                const success = this.savedList.addTree(this.selectedTree);
                if (success) {
                    alert(`"${this.selectedTree.commonName}" has been successfully saved to My List.`);
                } else {
                    alert(`"${this.selectedTree.commonName}" is already in your saved list.`);
                }
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

            this.view.clearMarkers(this.markers, this.map);
            this.markers = [];
            const trees = await this.dataController.fetchTrees(query);
            this.lastResults = trees;
            this.view.renderResults(trees, (tree) => this.showTreeDetails(tree));
            this.markers = this.view.plotMarkers(trees, this.map, (tree) => this.showTreeDetails(tree));

            this.view.showResults();
        } catch (error) {
            console.error("Search failed:", error);
            alert("Failed to search/fetch tree data. Please try again.");
        }
    }

    showTreeDetails(tree) {
        this.selectedTree = tree;
        this.view.clearMarkers(this.markers, this.map);
        this.markers = this.view.plotMarkers([tree], this.map, (t) => this.showTreeDetails(t));
        this.view.renderDetails(tree);
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
                }
            );
        }
    }
}
