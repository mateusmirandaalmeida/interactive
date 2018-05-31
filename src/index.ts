import capivara from 'capivarajs';
import { Game } from './game';

class Application {
    private introSoundEnable = true;
    private gameStarted = false;

    constructor() { 
        const oldValue = sessionStorage.getItem('introSoundEnable');
        if (oldValue) {
            const muted = eval(oldValue);
            document.querySelector('audio#intro')['muted'] = muted;
            this.introSoundEnable = !muted;
        }
    }

    handlingSound() {
        const audio = document.querySelector('audio#intro');
        this.introSoundEnable = !this.introSoundEnable;
        audio['muted'] = !this.introSoundEnable;
        sessionStorage.setItem('introSoundEnable', '' + !this.introSoundEnable);
    }

    stopIntro() {
        const audio: any = document.querySelector('audio#intro');
        audio.pause();
        audio.currentTime = 0;
    }

    playIntro() {
        const audio: any = document.querySelector('audio#intro');
        audio.play();
    }

    startGame() {
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.stopIntro();
            new Game(() => {
                this.gameStarted = false;
                this.playIntro();
            }, this.introSoundEnable);
        }
    }

    onKeyUp(evt) {
        if (evt.keyCode == 13) {
            this.startGame();
        }
        if (evt.keyCode == 77) {
            this.handlingSound();
        }
    }

}

capivara.controller(document.body, Application);
