import SpriteSheet from "./SpriteSheet.js";
import Player from "./Player.js";
import {Vec2D} from "./math.js";
import {Ball} from "./Ball.js";
import {Hook} from "./Hook.js";
import {settings} from "./main.js";

export function loadImage(url){
    return new  Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

export function loadJSON(url){
    return fetch(url, {method: 'get',}).then((response) => response.json());
}

export function loadLevel(currentLevel){
    return fetch(`levels/${currentLevel}.json`).then(r => r.json());}

export function loadBuster(image, playerSpec){
    const spriteSheet = new SpriteSheet(image, 32, 32);
    spriteSheet.define('buster', 1, 0);
    spriteSheet.define('buster-1', 2, 0);
    spriteSheet.define('buster-2', 3, 0);
    spriteSheet.define('buster-3', 0, 0);
    spriteSheet.define('idle', 4, 0);
    const pos = new Vec2D(playerSpec.pos[0], playerSpec.pos[1]);
    const size = new Vec2D(32, 32);

    return new Player(size, pos, spriteSheet);
}

export function loadBalls(ballSpec){
    var bolas = new Set();
    ballSpec.forEach( bola =>{
        const radius = bola.radius;
        const position = new Vec2D(bola.pos[0], bola.pos[1]);
        const force = new Vec2D(bola.force[0], bola.force[1]);
        bolas.add(new Ball(radius, position, force))
    });
    return bolas;
}
export function loadHookManager(hookImage, hooks){
    var hookManager = function (x,y) {
        if(hooks.size < settings.MAX_HOOKS) {
            hooks.add(new Hook(6, new Vec2D(x, y), 0, hookImage));
        }
    };
    return hookManager;
}

export function loadBackground(backgrounds) {
    const buffer = document.createElement('canvas');

    buffer.width = 256;
    buffer.height = 192;

    const context = buffer.getContext("2d");
    context.drawImage(backgrounds, 0, 0,
        buffer.width, buffer.height,0, 0,
        buffer.width, buffer.height);
    return function (ctx) {
        ctx.drawImage(buffer, 0, 0,
            buffer.width, buffer.height, 0, 0,
            settings.SCREEN_WIDTH, settings.SCREEN_HEIGHT);
    }
}