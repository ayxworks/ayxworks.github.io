import Keyboard from "./Keyboard.js";

const teclado = new Keyboard();
export function setupKeyboard(player){
    teclado.addMapping('ArrowUp', keyState =>{
        console.log('ArrowUp');
        if(keyState==1) player.moveUp();
        else player.stop();
    });
    teclado.addMapping('ArrowLeft', keyState =>{
        console.log('ArrowLeft');
        if(keyState==1) player.moveLeft();
        else player.stop();
    });
    teclado.addMapping('ArrowRight', keyState =>{
        console.log('ArrowRight');
        if(keyState==1) player.moveRight();
        else player.stop();
    });
    teclado.addMapping('ArrowDown', keyState =>{
        console.log('ArrowDown');
        if(keyState==1) player.moveDown();
        else player.stop();
    });
    teclado.addMapping('Space', keyState =>{
        console.log('Space');
        if(keyState==1) player.shoot();
    });
    return teclado;
}

