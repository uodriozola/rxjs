import { updateDisplay } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap, share } from 'rxjs/operators';

export default () => {
    
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;

    //share: Convierte el Observable de manera que este comparta una única instancia con todas sus suscripciones (Hot Observable)
    // El flujo de datos se inicia con el primer observer que se suscribe y se cancela cuando el último de ellos cancela su suscripción

    // Este operador es útil cuando se tienen varias suscripciones
    // En este ejemplo al tener 2 subscripciones tengo 2 instancias del Observable
    // Cada una de esas instancias ejecutara los operadores a cada evento (salvo si usamos el operador share)

    //function to update progress bar width on view
    const updateProgressBar = (percentage) => {
        progressBar.style.width = `${percentage}%`;
    }

    //observable that returns scroll (from top) on scroll events
    const scroll$ = fromEvent(document, 'scroll').pipe(
        map(() => docElement.scrollTop),
        tap(evt => console.log("[scroll]: ", evt))
    );

    //observable that returns the amount of page scroll progress
    const scrollProgress$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        }),
        share()
    )

    //subscribe to scroll progress to paint a progress bar
    const subscription = scrollProgress$.subscribe(updateProgressBar);

    const subscription2 = scrollProgress$.subscribe(res => updateDisplay(`${Math.floor(res)}%`));
}