import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { concat, fromEvent, observable } from 'rxjs';
import { map, endWith, tap, mergeAll, mergeMap } from 'rxjs/operators';

export default () => {

    // HOO (High Order Observables): Sucede cuando los eventos que emite tu osbservable son a su vez nuevos observables a los que te gustaría suscribirte
    // Son observables que emiten observables

    const button = document.getElementById('btn');

    /** get 4 consecutive comments */
    const getComments = () =>{
        //get observables from fake REST API.
        const comment1$ = api.getComment(1);
        const comment2$ = api.getComment(2);
        const comment3$ = api.getComment(3);
        const comment4$ = api.getComment(4);

        //subscribe to all the observables to get and display comments
        return concat(comment1$, comment2$, comment3$, comment4$).pipe(
            map(JSON.stringify),
            endWith('--------//--------')
        )
    }

    const observable$ = api.getComment(1).pipe(
        map(JSON.stringify)
    )

    // En este caso tendríamos 2 suscripciones anidadas (nada elegante)
    /* fromEvent(button, 'click').subscribe(() => {
        const subscription = observable$.subscribe(displayLog);
    }); */

    // Utilizando map podemos modificar lo que devuelve el observable para que nos devuelva el observable al que queríamos suscribirnos
    // Ahora tendremos un HOO, que devuelve un observable
    /* fromEvent(button, 'click').pipe(
        map(res => observable$), 
        tap(console.log)
    )
    .subscribe(displayLog); */

    // mergeAll: Se suscribe a los observables internos y emite sus eventos como si fueran eventos del HOO
    /* fromEvent(button, 'click').pipe(
        map(res => observable$), // emitimos el observable interno
        mergeAll(), // nos suscribimos y se lo pasamos al HOO
        tap(console.log)
    )
    .subscribe(displayLog); */

    // mergeMap: Recibe una función que devuelve un observable, se suscribe a ese observable interno y emite sus valores a través del HOO (observable externo)
    fromEvent(button, 'click').pipe(
        mergeMap(res => getComments()),
        tap(console.log)
    )
    .subscribe(displayLog);
}