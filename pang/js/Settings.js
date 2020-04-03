export default class Settings {
    constructor() {
        this.SCREEN_HEIGHT = 300;
        this.SCREEN_WIDTH = 640;
        this.GRAVITY = 9.8 * 10;
        this.PLAYER_SPEED = 200;
        this.HOOK_DURATION = 20;
        this.HOOK_SPEED = 200;
        this.MAX_HOOKS = 3;
        this.MIN_BALL_RADIUS=5;
        this.MARGIN = 12;
    }
    setScreenProp(width, height){
        this.SCREEN_WIDTH=width;
        this.SCREEN_HEIGHT=height;
    }
}