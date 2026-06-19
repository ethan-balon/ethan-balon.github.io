import { FRUIT_KEYWORDS } from "../controllers/dataController.js";

export class MapView {
    constructor() {
        //elements are now in the constructor for easier controller development
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


        this.infoBar = document.getElementById('infobar_text');
    }


    initMap() {
        // Christchurch coordinates
        const map = L.map('map').setView([-43.5320, 172.6362], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        map.once('moveend', () => {
            map.invalidateSize();
        });

        return map;
    }


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

// Renders search results into list
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
            
            listItem.innerHTML = `<strong>${tree.commonName}</strong> (${tree.botanicName})`;
            
            listItem.addEventListener('click', () => {
                onTreeClick(tree);
            });
            this.resultsList.appendChild(listItem);
        });
    }


    getThumbnailPath(tree) {
        const fullName = `${tree.commonName || ""} ${tree.botanicName || ""}`.toUpperCase();
        // Find first matching fruit keyword
        const match = FRUIT_KEYWORDS.find(kw => fullName.includes(kw));
        if (match) {
            return `media/tree_thumbnails/${match}.jpg`;
        }
        return `media/tree_thumbnails/GENERIC.jpg`;
    }

// reender details Inside of details container
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


    plotMarkers(trees, map, onMarkerClick) {
        const markers = [];
        const latLngs = [];

        trees.forEach(tree => {
            if (typeof tree.latitude === 'number' && typeof tree.longitude === 'number' && !isNaN(tree.latitude) && !isNaN(tree.longitude)) {
                // Plot marker
                const marker = L.marker([tree.latitude, tree.longitude]).addTo(map);
                
                marker.bindTooltip(tree.commonName);
                
                marker.on('click', () => {
                    onMarkerClick(tree);
                });

                markers.push(marker);
                latLngs.push([tree.latitude, tree.longitude]);
            }
        });

        // Animation element to fit all tree plot markers
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


    clearMarkers(markers, map) {
        markers.forEach(marker => {
            map.removeLayer(marker);
        });
    }

// curren location marker
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
