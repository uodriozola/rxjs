import { canvas, CELL_SIZE } from './draw';
import { Subject, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export const computerMove$ = new Subject();

// Simula un click del sistema
export const simulateComputerTurn = (validCells) => {
    const randomCell = Math.floor(Math.random() * validCells.length);
    // Paso la posición de entre las celdas validas elegida de forma random
    timer(500).subscribe(computerMove$.next(validCells[randomCell]));
}