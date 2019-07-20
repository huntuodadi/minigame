import gameView from './view';
import gameModel from './model';

class GameController {
    constructor () {
        this.gameModel = gameModel;
        this.gameView = gameView;
    }

    showGameOverPage = () => {
        this.gameView.showGameOverPage();
    }

    restartGame = () => {
        this.gameView.restartGame();
    }

    initPages () {
        const gamePageCallbacks = {
            showGameOverPage: this.showGameOverPage
        };
        const gameOverPageCallbacks = {
            gameRestart: this.restartGame
        }
        this.gameView.initGamePage(gamePageCallbacks);
        this.gameView.initGameOverPage(gameOverPageCallbacks);
    }
}

export default new GameController();