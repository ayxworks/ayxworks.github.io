export default class Settings {
    static SCREEN_HEIGHT = 300;
    static SCREEN_WIDTH = 640;
    static GRAVITY = 9.8 * 10;
    static PLAYER_SPEED = 50;
}

export default class Settings {
    constructor() {
        this.SCREEN_HEIGHT = 300;
        this.SCREEN_WIDTH = 640;
        this.GRAVITY = 9.8 * 1000;
        this.PLAYER_SPEED = 50;
    }
    setScreenProp(width, height){
        this.SCREEN_WIDTH=width;
        this.SCREEN_HEIGHT=height;
    }
}