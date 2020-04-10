import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, first, take, takeWhile } from 'rxjs/operators';

export default () => {

    // Estos operadores sirven para limitar el número de eventos que recibes de un stream

    const grid = document.getElementById('grid');

    // first: Operador que sirve para recibir solo el primer valor emitido por el stream
    // También se le pueden indicar unas condiciones concretas que tiene que cumplir el evento para ser considerado válido
    const clickFirst$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        first(([col, row]) => col > 3)
    );

    // take: Permite indicar cuántos eventos quieres recibir antes de cerrar el stream
    const clickTake$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        take(3)
    );

    // takeWhilte: Emite eventos mientras se cumpla una determinada condición
    const clickTakeWhile$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile(([col, row]) => col > 3)
    );

    const subscription = clickTakeWhile$.subscribe(data => displayLog(data));

}