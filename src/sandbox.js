import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, tap, startWith, endWith } from 'rxjs/operators';

export default () => {
    const grid = document.getElementById('grid');

    // startWith: Modifica el observable para emitir ciertos valores de forma previa a cualquier evento del observable original
    // endWith: Modifica el observable para emitir ciertos valores una vez finalizado el stream
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile( ([col, row]) => col != 0 ),
        tap(val => console.log(`cell: [${val}]`)),
        startWith('Grid dimensions', '10x10'),
        endWith('Stream finished')
    );

    const subscription = click$.subscribe(data => displayLog(data));

    /** end coding */
}