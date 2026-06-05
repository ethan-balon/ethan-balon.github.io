import { TutorialView } from "../views/tutorialView.js";

export class TutorialController {
    constructor() {
        this.view = new TutorialView();
        this.video = this.view.getVideoElement();
        this.buttons = this.view.getChapterButtons();
        this.bindEvents();
    }

    bindEvents() {
        if (!this.video) return;
        this.buttons.forEach(button => {
            button.onclick = () => {
                const targetTime = parseFloat(button.getAttribute('data-time'));
                if (!isNaN(targetTime)) {
                    this.video.currentTime = targetTime;
                    // Play the video and catch potential playback abort/prevention errors gracefully
                    this.video.play().catch(err => {
                        console.log("Video playback play call prevented (waiting for user interaction):", err);
                    });
                }
            };
        });
    }
}
