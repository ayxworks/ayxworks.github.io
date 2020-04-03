import {Object2D, Vec2D} from "./math.js";
import Settings from "./Settings.js";
import {navigatorCheck,check} from "./check_browser.js";
import {settings} from "./main.js";

const frames  = ['idle', 'buster', 'buster-1', 'buster-2', 'buster-3'];

export default class Player extends Object2D {

    constructor(size, pos, spriteSheet) {
        super(size, pos);
        this.force = new Vec2D(0, 0);
        this.spriteSheet = spriteSheet;
        this.direction = new Vec2D(0,0);
        this.distance = 0;
        this.hookManager = null;
    }

    routeFrame(){
        if( this.direction.x !== 0){
            const frameIndex = Math.floor(this.distance/10 ) % frames.length;
            const frameName = frames[frameIndex];
            return frameName;
        }

        return 'idle';
    }

    // time respresenta el tiempo que ha pasado desde la última ejecución
    update(time) {
        if (this.direction.x !== 0){
            this.distance += settings.PLAYER_SPEED * time;
        }else{
            this.distance = 0;
        }

        /*
        Asume por el momento que Settings.SCREEN_HEIGHT y Settings.SCREEN_WIDTH indican el tamaño de
        la pantalla del juego. Settings tiene otras constantes definidas (échales un vistazo)
        El objeto player tiene una altura (height) y una anchura (width)
         */
        // si buster está cayendo (está por debajo de la altura de la pantalla)
        // fuerza = añadir fuerza vertical de gravedad * tiempo
        // position = añadir fuerza * tiempo al eje y
        //console.log(this.position)
        if(this.y < settings.SCREEN_HEIGHT ){
            this.force.add(new Vec2D(0, settings.GRAVITY * time));
            this.position.add(this.force._mul(time));
        }
        // position = añadir dirección * tiempo * velocidad del jugador al eje x
        this.position.add(new Vec2D(this.direction.x*settings.PLAYER_SPEED*time, this.force.y));

        // si buster se sale por la izquierda de la pantalla
        // position = 0,y
        if(this.x < settings.MARGIN ){
            this.position.x = settings.MARGIN;
            this.direction= new Vec2D(0,0);
        }

        // sino, si buster se sale por la derecha
        // position = lo más a la derecha sin salirse , y
        else if(this.x > (settings.SCREEN_WIDTH - this.width - settings.MARGIN)){
            this.position.x = settings.SCREEN_WIDTH - this.width - settings.MARGIN;
            this.direction= new Vec2D(0,0);
        }

        // si buster se sale por la parte inferior de la pantalla
        // position = x, lo más abajo sin salirse
        else if(this.y >= settings.SCREEN_HEIGHT- (this.height + settings.MARGIN-12)){
            this.position.y = settings.SCREEN_HEIGHT-this.height-12;

        }

        //por si acaso se sale por arriba
        if(this.y < 0 ){
            this.position.y = 0;
        }

    }
    moveLeft(){
        this.direction = new Vec2D(-1,0);
    }
    moveRight(){
        this.direction = new Vec2D(1,0);
    }
    moveUp(){

    }
    moveDown(){

    }
    shoot(){
        this.hookManager(this.position.x+12, settings.SCREEN_HEIGHT-50);
    }
    stop(){
        this.direction = new Vec2D(0,0);
    }
    setHookManager(hookmanager){
        this.hookManager = hookmanager;
    }
    draw(context) {
        // pintar this.sprite en el contexto (en posicion x,y)
        context.drawImage(this.spriteSheet.get(this.routeFrame()), this.x, this.y);
    }
}

