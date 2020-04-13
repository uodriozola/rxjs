import { updateDisplay } from './utils';
import { fromEvent, interval, merge, EMPTY } from 'rxjs';
import { mapTo, scan, takeWhile, switchMap, startWith, materialize, tap, dematerialize } from 'rxjs/operators';

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
    const isPaused$ = merge(pause$.pipe(mapTo(true)), resume$.pipe(mapTo(false)));

    /** 1s negative interval */
    const interval$ = interval(1000).pipe(mapTo(-1));

    // Notificación: Es un objeto que representa una acción push de un observable

    // materialize: Genera eventos a partir de las notificaciones de un observable
    // Incluso cuando hay un error primero se emite un evento con esta información y luego se completa el stream

    // dematerialize: Proporciona el proceso inverso a materialize
    // Recibe eventos en forma de notificaciones y los transforma en acciones sobre el propio observable

    /** countdown timer */
    const countdown$ = isPaused$.pipe(
        startWith(false),
        switchMap(paused => !paused ? interval$.pipe(materialize()) : EMPTY.pipe(materialize())),
        dematerialize(),
        scan((acc, curr) => ( curr ? curr + acc : curr ), countdownSeconds),
        takeWhile(v => v >= 0),
        tap(console.log)
    );

    /** subscribe to countdown */
    countdown$.subscribe(updateDisplay, null, () => console.log('complete'));

    
    /** end coding */
}