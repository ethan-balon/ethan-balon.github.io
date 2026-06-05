export class TutorialView {
    getVideoElement() {
        return document.getElementById('tutorial_video');
    }

    getChapterButtons() {
        return document.querySelectorAll('.chapter-btn');
    }
}
