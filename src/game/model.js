class GameModel {
    constructor() {
        this.stage = ''
    }

    getStage() {
        return this.stage;
    }

    setStage(stage) {
        this.stage = stage;
    }
}

export default new GameModel();