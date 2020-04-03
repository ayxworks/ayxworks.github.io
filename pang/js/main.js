import {loadBuster, loadImage, loadLevel, loadBalls, loadHookManager, loadBackground} from "./loaders.js";
import Settings from "./Settings.js";
import {setupKeyboard} from "./input.js";
import {CollisionManager} from "./collisions.js";

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
Settings.SCREEN_WIDTH=canvas.width;
Settings.SCREEN_HEIGHT=canvas.height;

export let settings = new Settings();
settings.setScreenProp(400,300);

Promise.all([loadImage("img/player.png"),loadImage("img/hookRope.png"), loadImage("img/backgrounds.png"), loadLevel('1')])
    .then( ([image, hookImage, background, levelSpec]) => {
        const buster = loadBuster(image, levelSpec.player);
        const balls = loadBalls(levelSpec.balls);
        const hooks = new Set();
        const hookManager = loadHookManager(hookImage, hooks);
        var colision = new CollisionManager(hooks,balls);
        const backgroundSprites = loadBackground(background);

        buster.setHookManager(hookManager);

        let deltaTime =0;
        let lastTime =0;

        function update(time) {
            deltaTime = time - lastTime;
            context.clearRect(0, 0, settings.SCREEN_WIDTH, settings.SCREEN_HEIGHT);
            backgroundSprites(context)

            balls.forEach(ball=>{
                ball.draw(context);
                ball.update(deltaTime/1000);
            })

            hooks.forEach(hook =>{
                hook.draw(context);
                hook.update(deltaTime/1000);
                if(hook.to_kill) {
                    hooks.delete(hook);
                }
            })

            colision.check_collisions();
            buster.update(deltaTime/1000);
            buster.draw(context);
            lastTime = time;
            requestAnimationFrame(update);
        }

        const input = setupKeyboard(buster);
        input.listenTo(window);

        update(0);

    });
