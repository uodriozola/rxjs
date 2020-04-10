import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, tap, distinct, distinctUntilChanged } from 'rxjs/operators';

export default () => {
    
    // Son operadores que solo dejan pasar valores que, de algún modo, son distintos a los anteriores

    const grid = document.getElementById('grid');
    // distinct: Operador que no deja pasar ningún valor que coincida con algún valor que ya se ha emitido en el pasado
    const clickDistinct$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile( ([col, row]) => col != 0 ),
        tap(val => console.log(`cell: [${val}]`)),
        map(([col, row]) => col+row),
        tap(val => console.log('sum of col + row is:', val)),
        distinct()
    );

    // distinct sólo funciona con tipos simples y no con objetos (porque aunque 2 objetos sean iguales no dejan de ser objetos distintos)
    // Se le puede pasar una función en la que realizas la comparación del objeto (para decidir si es igual o no a alguno emitido previamente)
    const clickDistinctObject$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile( ([col, row]) => col != 0 ),
        tap(val => console.log(`cell: [${val}]`)),
        distinct(([col, row]) => `${col} ${row}`)
    );

    // distinctUntilChanged: Operador que no deja pasar ningún valor que coincida con el anterior valor emitido
    // La función de comparación (en caso de necesitar una) funciona diferente a distinct
    const clickDistinctUntilChanged$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile( ([col, row]) => col != 0 ),
        tap(val => console.log(`cell: [${val}]`)),
        distinctUntilChanged((cell1, cell2) => cell1[0] == cell2[0] && cell1[1] == cell2[1])
    );

    const subscription = clickDistinctUntilChanged$.subscribe(data => displayLog(data));
}