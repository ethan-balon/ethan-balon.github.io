# TreeSpotter Architecture Plan

This document outlines the architectural plan for the TreeSpotter application, aligned with the existing codebase structure.

## Overview
TreeSpotter is structured using a modular object-oriented approach inspired by the Model-View-Controller (MVC) pattern. Each section of the application has a corresponding **Controller** and **View** to keep code decoupled and maintainable.

---

## Folder & File Structure

The project components are organized under `controllers/`, `views/`, and `models/` directories within the `TreeSpotter` folder.

```
TreeSpotter/
├── index.html
├── stylesheet.css
├── controllers/
│   ├── sectionController.js            # [Existing] Orchestrates main page/aside switches
│   ├── mapController.js                # [New] Controls Leaflet map, pins, user location
│   ├── tutorialController.js           # [New] Coordinates tutorial video playback & chapters
│   ├── savedListController.js          # [New] Manages saved trees and syncs with localStorage
│   ├── advancedOptionsController.js    # [New] Manages user settings & filters
│   └── dataController.js               # [New] Manages requests to Christchurch City Council API
├── views/
│   ├── sectionView.js                  # [Existing] Gets main navigation and shell elements
│   ├── mapView.js                      # [New] Gets map search inputs, filters, map container
│   ├── tutorialView.js                 # [New] Gets video player and chapter elements
│   ├── savedListView.js                # [New] Gets user's list container and search filters
│   └── advancedOptionsView.js          # [New] Gets advanced settings inputs
└── models/
    ├── tree.js                         # [New] Model representing an individual tree data record
    ├── savedList.js                    # [New] Model representing the user's list collection
    └── settings.js                     # [New] Model representing advanced options/preferences
```

---

## Components & Responsibilities

### 1. Shell & Routing
* **Controller**: [sectionController.js](file:///t:/ethan-balon.github.io/TreeSpotter/controllers/sectionController.js) (Existing)
  * Orchestrates toggling active views and aside sidebars.
  * Manages the text of the `infobar`.
  * Instantiates the section-specific controllers.
* **View**: [sectionView.js](file:///t:/ethan-balon.github.io/TreeSpotter/views/sectionView.js) (Existing)
  * Exposes global elements (navigation buttons, main sections, infobar).

### 2. Map & Search Section
* **Controller**: `mapController.js`
  * Initializes the Leaflet map container.
  * Plots `Tree` model instances onto the map.
  * Uses `dataController.js` to execute queries when search triggers.
* **View**: `mapView.js`
  * Exposes elements under `#map_aside` (search field, distance field, search button).
  * Exposes the Leaflet map target container.
* **Model**: `tree.js`
  * Normalizes the attributes from raw API results: `id`, `commonName`, `botanicName`, `latitude`, `longitude`, `seasonality`, `stockLevel`.

### 3. Tutorial Section
* **Controller**: `tutorialController.js`
  * Handles video controls (play, pause, seek to chapter).
* **View**: `tutorialView.js`
  * References the HTML5 `<video>` player, chapters container, and subtitle track source.

### 4. Saved List Section
* **Controller**: `savedListController.js`
  * Adds/removes trees from user's saved list.
  * Syncs list to `localStorage` (via `StorageController` logic or self-management).
* **View**: `savedListView.js`
  * Interacts with `#saved_list_aside` and `#saved_list_page` to render list items dynamically.

### 5. Advanced Options Section
* **Controller**: `advancedOptionsController.js`
  * Handles saving allergy profile selections and advanced filter thresholds.
* **View**: `advancedOptionsView.js`
  * References filter forms and preference inputs.

### 6. Data Controller (Service Layer)
* **Controller**: `dataController.js`
  * Calls the Christchurch City Council (CCC) Open Data Portal (ArcGIS REST API).
  * Returns formatted GeoJSON mapping tree listings.

---

## Inter-Component Flow Example

1. **User Action**: The user types "Oak" in the search box inside `#map_aside` and clicks **ENTER**.
2. **View Catch**: `mapView.js` intercepts the form submission event.
3. **Controller Handling**: `mapController.js` catches the input from the view and calls `dataController.js` to fetch and filter records.
4. **Data Normalization**: `dataController.js` fetches GeoJSON from the CCC API, instantiates `Tree` objects (from `models/tree.js`), and returns them.
5. **UI Update**: `mapController.js` passes the array of `Tree` objects to Leaflet, placing markers on the map, and asks `UIController` / `mapView` to present details in the side panel.
