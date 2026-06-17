import { FRUIT_KEYWORDS } from "../controllers/dataController.js";

export class MapView {
    constructor() {
        // Cache elements
        this.searchSection = document.getElementById('map_search_section');
        this.resultsSection = document.getElementById('map_results_section');
        this.detailsSection = document.getElementById('map_details_section');

        this.searchForm = document.getElementById('treetypediv');
        this.searchInput = document.getElementById('treetypeinput');
        this.resultsList = document.getElementById('map_results_list');
        this.resultsBackButton = document.getElementById('results_back_button');
        this.detailsContainer = document.getElementById('tree_details_container');
        this.detailsBackButton = document.getElementById('details_back_button');
        this.detailsSaveButton = document.getElementById('details_save_button');
        this.detailsNavigateButton = document.getElementById('details_navigate_button');
    }

    /**
     * Initializes and returns the Leaflet Map.
     * @returns {L.Map}
     */
    initMap() {
        // Initialize Leaflet map and set its view to Christchurch
        const map = L.map('map').setView([-43.5320, 172.6362], 13);

        // Load the OpenStreetMap tiles
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        return map;
    }

    /**
     * Switches aside sections.
     */
    showSearch() {
        this.searchSection.classList.add('active');
        this.resultsSection.classList.remove('active');
        this.detailsSection.classList.remove('active');
    }

    showResults() {
        this.searchSection.classList.remove('active');
        this.resultsSection.classList.add('active');
        this.detailsSection.classList.remove('active');
    }

    showDetails() {
        this.searchSection.classList.remove('active');
        this.resultsSection.classList.remove('active');
        this.detailsSection.classList.add('active');
    }

    /**
     * Renders search results to the list.
     * @param {Tree[]} trees 
     * @param {Function} onTreeClick 
     */
    renderResults(trees, onTreeClick) {
        this.resultsList.innerHTML = '';
        if (trees.length === 0) {
            const emptyItem = document.createElement('li');
            emptyItem.textContent = 'No matching fruit/nut trees found.';
            this.resultsList.appendChild(emptyItem);
            return;
        }

        trees.forEach(tree => {
            const listItem = document.createElement('li');
            listItem.style.cursor = 'pointer';
            listItem.style.padding = '5px 0';
            
            // Just outputting names, no complex layout/styling per instruction
            listItem.innerHTML = `<strong>${tree.commonName}</strong> (${tree.botanicName})`;
            
            listItem.addEventListener('click', () => {
                onTreeClick(tree);
            });
            this.resultsList.appendChild(listItem);
        });
    }

    /**
     * Finds matching thumbnail image name for a tree.
     * @param {Tree} tree 
     * @returns {string}
     */
    getThumbnailPath(tree) {
        const fullName = `${tree.commonName || ""} ${tree.botanicName || ""}`.toUpperCase();
        // Find first matching fruit keyword
        const match = FRUIT_KEYWORDS.find(kw => fullName.includes(kw));
        if (match) {
            return `media/tree_thumbnails/${match}.jpg`;
        }
        return `media/tree_thumbnails/GENERIC.jpg`;
    }

    /**
     * Renders details of the selected tree inside the details container.
     * @param {Tree} tree 
     */
    renderDetails(tree) {
        const thumbnailPath = this.getThumbnailPath(tree);
        this.detailsContainer.innerHTML = `
            <div style="margin-bottom: 15px;">
                <img src="${thumbnailPath}" alt="${tree.commonName} thumbnail" id="tree-thumbnail">
            </div>
            <p><strong>Tree ID:</strong> ${tree.id}</p>
            <p><strong>Common Name:</strong> ${tree.commonName}</p>
            <p><strong>Botanical Name:</strong> ${tree.botanicName}</p>
            <p><strong>Seasonality:</strong> ${tree.seasonality}</p>
            <p><strong>Stock Level:</strong> ${tree.stockLevel}</p>
            <p><strong>Coordinates:</strong> ${tree.latitude.toFixed(6)}, ${tree.longitude.toFixed(6)}</p>
        `;
    }

    /**
     * Plots markers on the map.
     * @param {Tree[]} trees 
     * @param {L.Map} map 
     * @param {Function} onMarkerClick 
     * @returns {L.Marker[]} - The newly created markers
     */
    plotMarkers(trees, map, onMarkerClick) {
        const markers = [];
        const latLngs = [];

        trees.forEach(tree => {
            if (typeof tree.latitude === 'number' && typeof tree.longitude === 'number' && !isNaN(tree.latitude) && !isNaN(tree.longitude)) {
                // Plot marker
                const marker = L.marker([tree.latitude, tree.longitude]).addTo(map);
                
                // Add tooltip with the common name
                marker.bindTooltip(tree.commonName);
                
                marker.on('click', () => {
                    onMarkerClick(tree);
                });

                markers.push(marker);
                latLngs.push([tree.latitude, tree.longitude]);
            }
        });

        // Fit map bounds to view all markers if there are any
        if (latLngs.length > 0) {
            if (latLngs.length === 1) {
                map.setView(latLngs[0], 15);
            } else {
                const bounds = L.latLngBounds(latLngs);
                map.fitBounds(bounds, { padding: [30, 30] });
            }
        }

        return markers;
    }

    /**
     * Clears markers from the map.
     * @param {L.Marker[]} markers 
     * @param {L.Map} map 
     */
    clearMarkers(markers, map) {
        markers.forEach(marker => {
            map.removeLayer(marker);
        });
    }

    /**
     * Plots a distinct marker for the user's current location.
     * @param {number} lat 
     * @param {number} lng 
     * @param {L.Map} map 
     * @returns {L.CircleMarker}
     */
    plotUserLocation(lat, lng, map) {
        const marker = L.circleMarker([lat, lng], {
            radius: 9,
            fillColor: '#007BFF',
            color: '#FFFFFF',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9
        }).addTo(map);

        marker.bindTooltip("Your Location", {
            permanent: false,
            direction: 'top'
        });

        return marker;
    }
}
