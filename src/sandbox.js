import { updateDisplay } from './utils';
import { fromEvent, interval, merge, NEVER, EMPTY } from 'rxjs';
import { mapTo, scan, takeWhile, switchMap, startWith } from 'rxjs/operators';

export default () => {
    /** start coding */

    /** number of seconds to init countdown */
    const countdownSeconds = 10;
    
    /** access interface buttons */
    const pauseButton = document.getElementById('pause-btn');
    const resumeButton = document.getElementById('resume-btn');

    /** get comments on button click */
    const pause$ = fromEvent(pauseButton, 'click');
    const resume$ = fromEvent(resumeButton, 'click');
    // Hago un merge de pause y resume que devuelva true si se clicka en pause y false si se clicka en resume
    const isPaused$ = merge(pause$.pipe(mapTo(true)), resume$.pipe(mapTo(false)));

    /** 1s negative interval */
    const interval$ = interval(1000).pipe(mapTo(-1));

    // NEVER: Es una función que devuelve un observable vacío, no emite ningún valor ni lanza un error ni se completa, no hace nada
    // Se puede utilizar para diseñar una estrategia de pausa
    // EMPTY: Es una función que devuelve un observable vacío, que tal como recibe una suscripción se completa

    /** countdown timer */
    // Por ejemplo en este caso queremos que la cuenta atrás continúe si isPaused es false, pero queremos que no haga nada si es true (que no se emita ningún valor)
    const countdown$ = isPaused$.pipe(
        startWith(false),
        // En este caso funciona bien también con EMPTY porque las funciones de HOO como switchMap se suscriben a los observable internos que se les pasan (en este caso EMPTY)
        // Y emiten los valores recibidos a través del observable externo
        // Aunque el observable interno complete la suscripción, el observable externo ni se entera
        switchMap(paused => !paused ? interval$ : EMPTY /*NEVER*/),
        scan((acc, curr) => ( curr ? curr + acc : curr ), countdownSeconds),
        takeWhile(v => v >= 0)
    );

    /** subscribe to countdown */
    countdown$.subscribe(updateDisplay);

    
    /** end coding */
}