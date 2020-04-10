import { updateDisplay } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap, pairwise } from 'rxjs/operators';

export default () => {
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;
    const updateProgressBar = (percentage) => {
        progressBar.style.width = `${percentage}%`;
    }

    // pairwise: Se encarga de emitir los eventos en parejas de datos consecutivos

    //observable that returns scroll (from top) on scroll events
    const scroll$ = fromEvent(document, 'scroll').pipe(
        map(() => docElement.scrollTop),
        tap(evt => console.log("[scroll]: ", evt)),
        pairwise(),
        tap(([previous, current]) => updateDisplay(current > previous ? 'DESC' : 'ASC')),
        map(([previous, current]) => current)
    );

    //observable that returns the amount of page scroll progress
    const scrollProgress$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        })
    )

    //subscribe to scroll progress to paint a progress bar
    const subscription = scrollProgress$.subscribe(updateProgressBar);
}