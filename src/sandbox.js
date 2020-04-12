import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { fromEvent, from } from 'rxjs';
import { map, scan, tap, concatMap, mergeMap } from 'rxjs/operators';

export default () => {

    const button = document.getElementById('btn');

    /** get comments on button click */
    fromEvent(button, 'click').pipe(
        scan((acc, evt) => acc + 1, 0), 
        // recibimos un evento con un array de valores procecentes de un observable          
        concatMap(page => api.getCommentsList(page)),
        // transformamos el evento anterior en una secuencia de eventos donde hay un evento por cada elemento del array
        mergeMap(comments => from(comments)),
        map(JSON.stringify),
        tap(console.log),
    ).subscribe(displayLog);

}