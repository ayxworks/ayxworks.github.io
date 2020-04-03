import {Object2D, Vec2D} from "./math.js";
import {settings} from "./main.js";

class Ball extends Object2D {

    constructor(radius, position, force) {
        super(new Vec2D(radius * 2, radius * 2), position);
        this.radius = radius;
        this.position = position;
        this.force = force;
        this.falling = this.force.y >= 0;
        this.max_height = settings.SCREEN_HEIGHT - 150 - radius * 4;
    }

    update(time_passed) {

        this.force.add(new Vec2D(0, settings.GRAVITY * time_passed));
        this.position.add(this.force._mul(time_passed));

        if (this.x - settings.MARGIN < this.radius || this.x + settings.MARGIN> settings.SCREEN_WIDTH - this.radius) {
           // this.force = new Vec2D(-this.force.x + 30, this.force.y);

            if (this.x - settings.MARGIN < this.radius){
                this.position = new Vec2D(2 * (this.radius + settings.MARGIN) - this.x , this.y);
                this.force = new Vec2D(-this.force.x - 0.2, this.force.y - 0.1);
            }
            else{
                this.position = new Vec2D(2 * (settings.SCREEN_WIDTH - this.radius - settings.MARGIN) - this.x, this.y);
                this.force = new Vec2D(-this.force.x - 0.2, this.force.y + 0.1);
            }
        }
        if (this.y > settings.SCREEN_HEIGHT - this.radius - settings.MARGIN) {
            this.position = new Vec2D(this.x, 2 * (settings.SCREEN_HEIGHT - this.radius - settings.MARGIN) - this.y);
            this.force = new Vec2D(this.force.x, -(((this.y - this.max_height) * 1.5 * settings.GRAVITY) ** .5));
        }else if (this.y < this.radius + settings.MARGIN){
            this.position = new Vec2D(this.x, 2 * (this.radius + settings.MARGIN) - this.y);
            this.force = new Vec2D(this.force.x, +(((this.y - this.max_height) *  settings.GRAVITY) ** .5));
        }

        this.falling = this.force.y > 0;
    }

    draw(ctx) {

        // Añade el método draw a la clase Ball para que se pinte a sí misma en el contexto que se le pasa como parámetro
        ctx.beginPath();
        ctx.strokeStyle = "#00320e";
        ctx.fillStyle = "#11761a";
        ctx.lineWidth = 5;
        ctx.arc(this.x, this.y, this.radius, 50, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    get pos(){
        return this.position;
    }

    get vel(){
        return this.force;
    }
}

export {Ball};
