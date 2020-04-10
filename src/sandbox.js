import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { mapTo, map, filter } from 'rxjs/operators';

export default () => {
    const grid = document.getElementById('grid');

    // pipe: Método que se utiliza para aplicar operadores a un observable

    // mapTo: Para cada evento que entra transforma la salida devolviendo siempre el mismo valor
    const clickMapTo$ = fromEvent(grid, 'click').pipe(
        mapTo('click'));

    // map: Transforma la salida de cada evento
    const clickMap$ = fromEvent(grid, 'click').pipe(
        map(res => [Math.floor(res.offsetX / 50 ), Math.floor(res.offsetY / 50)]));
    
    // filter: Sirve para dejar pasar sólo a aquellos valores que cumplen una determinada condición
    const clickFilter$ = fromEvent(grid, 'click').pipe(
        map(res => [Math.floor(res.offsetX / 50 ), Math.floor(res.offsetY / 50)]),
        filter(res => (res[0] + res[1]) % 2 !== 0)
    );

    const subscription = clickFilter$.subscribe(res => displayLog(res));
}