import GamePage from '../pages/game-page';
import GameOverPage from '../pages/game-over-page';

class GameView {
    constructor() {

    }

    showGameOverPage = () => {
        this.gameOverPage.show();
    }
    showGamePage = () => {
        this.gameOverPage.hide();
        this.gamePage.restart();
        this.gamePage.show();
    }
    restartGame = () => {
        this.gamePage.restart();
    }

    initGameOverPage(callbacks) {
        this.gameOverPage = new GameOverPage(callbacks);
        console.log('scene:', this.gamePage.scene);
        this.gameOverPage.init({
            scene: this.gamePage.scene
        });
    }

    initGamePage(callbacks) {
        this.gamePage = new GamePage(callbacks);
        this.gamePage.init();
    }
}
export default new GameView();