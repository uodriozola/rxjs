import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, last, tap, takeLast, skip } from 'rxjs/operators';

export default () => {
    /** start coding */
    const grid = document.getElementById('grid');

    // last: Operador que se queda con el último evento emitido e ignora el resto
    // Para ello el stream tiene que cerrarse primero
    const clickLast$ = fromEvent(grid, 'click').pipe(
        map(val => [
            Math.floor(val.offsetX / 50),
            Math.floor(val.offsetY / 50)
        ]),
        takeWhile(([col, row]) => col > 3),
        tap(res => console.log(res)),
        last()
    );

    // takeLast: Operador que se queda con los últimos n eventos emitios e ignora el resto
    const clickTakeLast$ = fromEvent(grid, 'click').pipe(
        map(val => [
            Math.floor(val.offsetX / 50),
            Math.floor(val.offsetY / 50)
        ]),
        takeWhile(([col, row]) => col > 3),
        tap(res => console.log(res)),
        takeLast(2)
    );

    // skip: Operador que omite n eventos
    const clickSkip$ = fromEvent(grid, 'click').pipe(
        map(val => [
            Math.floor(val.offsetX / 50),
            Math.floor(val.offsetY / 50)
        ]),
        takeWhile(([col, row]) => col > 3),
        tap(res => console.log(res)),
        skip(3)
    );

    const subscription = clickSkip$.subscribe(data => displayLog(data));

    /** end coding */
}