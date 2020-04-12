import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { fromEvent } from 'rxjs';
import { map, scan, tap, mergeMap, switchMap, concatMap } from 'rxjs/operators';

export default () => {
    const button = document.getElementById('btn');

    /** get comments on button click */
    /* fromEvent(button, 'click').pipe(
        scan((acc, evt) => acc + 1, 0),            
        mergeMap(id => api.getComment(id)),
        map(JSON.stringify),
        tap(console.log),
    ).subscribe(displayLog); */

    // switchMap: Cuando recibe un evento genera un observable interno y se suscribe a él para pasarle sus eventos al observable externo
    // Cuando recibe un nuevo evento externo cancela la suscripción del evento interno anterior antes de suscribirse a un nuevo evento interno
    /* fromEvent(button, 'click').pipe(
        scan((acc, evt) => acc + 1, 0),            
        switchMap(id => api.getComment(id)),
        map(JSON.stringify),
        tap(console.log),
    ).subscribe(displayLog); */

    // concatMap: Se suscribe a los observables internos de forma ordenada
    // Hasta que no se completen los eventos del primer observable interno no se suscribirá al segundo, y así sucesivamente
    fromEvent(button, 'click').pipe(
        scan((acc, evt) => acc + 1, 0),            
        concatMap(id => api.getComment(id)),
        map(JSON.stringify),
        tap(console.log),
    ).subscribe(displayLog);
}