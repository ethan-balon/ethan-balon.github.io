# Tutorial Video Chapters Navigation

This plan details the implementation of video chapter navigation buttons on the tutorial page aside panel. It allows users to skip to the 1-minute, 2-minute, and 3-minute marks of the tutorial video.

## User Review Required

> [!IMPORTANT]
> The HTML `<video>` element in [index.html](file:///t:/ethan-balon.github.io/TreeSpotter/index.html) currently does not have an ID. We will assign `id="tutorial_video"` to it for precise identification by the View layer.
>
> We will also add navigation buttons with `data-time` attributes inside the `#tutorial_aside` element in [index.html](file:///t:/ethan-balon.github.io/TreeSpotter/index.html).

## Proposed Changes

### TreeSpotter Root

---

#### [MODIFY] [index.html](file:///t:/ethan-balon.github.io/TreeSpotter/index.html)
- Add chapter navigation buttons with time attributes (60s, 120s, 180s) inside `<section id="tutorial_aside">`.
- Add `id="tutorial_video"` to the `<video>` element inside `<section id="tutorial_page">`.

### TreeSpotter Views

---

#### [NEW] [tutorialView.js](file:///t:/ethan-balon.github.io/TreeSpotter/views/tutorialView.js)
- Define `TutorialView` class.
- Expose methods to get the video element and the list of chapter buttons.

### TreeSpotter Controllers

---

#### [NEW] [tutorialController.js](file:///t:/ethan-balon.github.io/TreeSpotter/controllers/tutorialController.js)
- Define `TutorialController` class.
- Add event listeners to the chapter buttons to change the video's `currentTime` and trigger playback.

#### [MODIFY] [sectionController.js](file:///t:/ethan-balon.github.io/TreeSpotter/controllers/sectionController.js)
- Import `TutorialController` and instantiate it within `sectionController` constructor to initialize chapter navigation.

## Verification Plan

### Manual Verification
- The user can test by clicking the section buttons and observing video skipping behavior:
  - Click the **Tutorial** button to navigate to the tutorial section.
  - Click the **1 Minute Mark** button on the sidebar: Verify video skips to 01:00 and plays.
  - Click the **2 Minute Mark** button: Verify video skips to 02:00 and plays.
  - Click the **3 Minute Mark** button: Verify video skips to 03:00 and plays.
