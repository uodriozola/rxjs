import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { merge, fromEvent, concat, forkJoin } from 'rxjs';
import { map, endWith } from 'rxjs/operators';

export default () => {
    /** start coding */
    
    const button = document.getElementById('btn');

    /** get 4 consecutive comments */
    const getComments = () =>{
        //get observables from fake REST API.
        const comment1$ = api.getComment(1);
        const comment2$ = api.getComment(2);
        const comment3$ = api.getComment(3);
        const comment4$ = api.getComment(4);

        //subscribe to all the observables to get and display comments
        /* merge(comment1$, comment2$, comment3$, comment4$).pipe(
            map(({id, comment}) => `#${id} - ${comment}`),
            endWith('--------//--------')
        ).subscribe(data =>{
            displayLog(data);
        }) */

        // concat: Se utiliza para emitir los eventos de un conjunto de Observables en orden
        /* concat(comment1$, comment2$, comment3$, comment4$).pipe(
            map(({id, comment}) => `#${id} - ${comment}`),
            endWith('--------//--------')
        ).subscribe(data =>{
            displayLog(data);
        }) */

        // forkJoin: Recibe varios observables de entrada, se espera a que se completen todos,
        // y entonces emite un array ordenado con el último valor de cada flujo de entrada
        forkJoin(comment1$, comment2$, comment3$, comment4$).pipe(
            map(JSON.stringify),
            endWith('--------//--------')
        ).subscribe(data =>{
            displayLog(data);
        })
    }

    /** get comments on button click */
    fromEvent(button, 'click').subscribe(getComments);

    /** end coding */
}