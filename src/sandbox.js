import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, tap, reduce, scan } from 'rxjs/operators';

export default () => {
    const grid = document.getElementById('grid');

    // reduce: Aplica una misma función a cada evento que llega por el stream de forma secuencial
    // Únicamente devuelve el resultado cuando se cierra el stream
    const clickReduce$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile( ([col, row]) => col != 0 ),
        tap(val => console.log(`cell: [${val}]`)),
        // accumulated: Guarda el valor acumulado
        // current: Guarda el valor actual
        reduce((accumulated, current) => {
            return {
                clicks: accumulated.clicks + 1,
                cells: [...accumulated.cells, current]
            }
        }, { clicks: 0, cells: [] })
    );

    // scan: Cada vez que recibe un evento emite un evento con el valor acumulado
    const clickScan$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile( ([col, row]) => col != 0 ),
        tap(val => console.log(`cell: [${val}]`)),
        scan((accumulated, current) => {
            return {
                clicks: accumulated.clicks + 1,
                cells: [...accumulated.cells, current]
            }
        }, { clicks: 0, cells: [] })
    );

    const subscription = clickScan$.subscribe(data => displayLog(`Clicks: ${data.clicks}. ${JSON.stringify(data.cells)}`));
}