import { canvas, CELL_SIZE } from './draw';
import { gameState$ } from './gameState';
import { fromEvent } from 'rxjs';
import { map, withLatestFrom, filter } from 'rxjs/operators';

// Obtiene la posición X e Y del click
const click$ = fromEvent(canvas, 'click').pipe(
    map(val => {
        return {
            x: Math.floor(val.offsetX / CELL_SIZE),
            y: Math.floor(val.offsetY / CELL_SIZE)
        }
    })
);

// Filtra la posición, comprueba si es válida
export const userMove$ = click$.pipe(
    withLatestFrom(gameState$),
    filter(([click, state]) => state.nextPlayer == 1),
    filter(([click, state]) => state.board[click.y][click.x] == 0),
    map(([click, state]) => click)
);

