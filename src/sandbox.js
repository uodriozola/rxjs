import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export default () => {
    const grid = document.getElementById('grid');
    // tap: Se utiliza para modificar algo (o generar acciones) en base al flujo de datos fuera de este
    const click$ = fromEvent(grid, 'click').pipe(
        tap(res => console.log('Before: ', res)),
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        tap(res => console.log(`After: ${res}`))
    );

    const subscription = click$.subscribe(data => displayLog(data));
}