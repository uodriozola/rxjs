import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { fromEvent } from 'rxjs';
import { map, scan, tap, concatMap, catchError, retry } from 'rxjs/operators';

export default () => {

    const button = document.getElementById('btn');

    fromEvent(button, 'click').pipe(
        scan((acc, evt) => acc + 1, 0),            
        concatMap(id => api.getComment(id).pipe(
            // catchError: Permite intervenir el error a nivel de observable, es decir, antes de que se emita hacia la suscripción y la cierre
            // Además del error recibe un objeto con el observable original
            // catchError((err, src$) => { console.log('catch!'); return src$ }),
            // retry: Permite capturar una excepción en el flujo de datos y reintentar su ejecución un número limitado de veces
            retry(3)
        )),
        map(JSON.stringify),
        tap(console.log),
        // Desde la suscripción capturamos el error throwError lanzado desde api.js
    ).subscribe(displayLog, err => console.log('Error: ', err.message));
}