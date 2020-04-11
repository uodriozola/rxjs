import { updateDisplay } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap, delay, bufferTime } from 'rxjs/operators';

export default () => {
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;

    //function to update progress bar width on view
    const updateProgressBar = (percentage) => {
        progressBar.style.width = `${percentage}%`;
    }

    //observable that returns scroll (from top) on scroll events
    const scroll$ = fromEvent(document, 'scroll').pipe(
        map(() => docElement.scrollTop),
        tap(evt => console.log("[scroll]: ", evt))
    );

    // delay: Introduce un retraso entre el origen de los eventos y el flujo de salida observable
    const scrollProgressDelay$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        }),
        delay(500)
    );

    // bufferTime: Acumula muestras durante un periodo de tiempo determinado y luego las emite todas juntas en un array
    // También permite crear un buffer de muestras cada X tiempo pero que esos resultados correspondan a los primeros Y segundos de ese X
    const scrollProgressBufferTime$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        }),
        bufferTime(250, 1000),
        tap(res => console.log(`Buffer: ${res}`))
    );

    //subscribe to scroll progress to paint a progress bar
    const subscription = scrollProgressBufferTime$.subscribe(updateProgressBar);
}