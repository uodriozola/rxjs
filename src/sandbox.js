import { updateDisplay } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap, sampleTime, auditTime, throttleTime } from 'rxjs/operators';

export default () => {
    
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;

    //function to update progress bar width on view
    const updateProgressBar = (percentage) => {
        progressBar.style.width = `${percentage}%`;
    }

    // sampleTime: Operador que emite el valor más reciente de un flujo de datos cada cierto tiempo
    // siempre y cuando el flujo de datos haya emitido algún valor en el intervalo
    const scrollSample$ = fromEvent(document, 'scroll').pipe(
        tap(evt => console.log(evt)),
        sampleTime(50),
        map(() => docElement.scrollTop),
        tap(evt => console.log("[scroll]: ", evt))
    );

    // auditTime: Espera a detectar un evento, y en ese momento crea una ventana temporal del tamaño indicado
    // Una vez pasado ese tiempo emite el valor del último evento detectado en ese intervalo
    const scrollAudit$ = fromEvent(document, 'scroll').pipe(
        tap(evt => console.log(evt)),
        auditTime(50),
        map(() => docElement.scrollTop),
        tap(evt => console.log("[scroll]: ", evt))
    );

    // throttleTime: Cuando detecta un evento lo emite y acto seguido deja de escuchar el stream durante la ventana temporal que se le indique
    // Cuando acaba ese intervalo de tiempo se vuelve a quedar a la espera para el siguiente nuevo evento
    const scrollThrottle$ = fromEvent(document, 'scroll').pipe(
        tap(evt => console.log(evt)),
        throttleTime(50),
        map(() => docElement.scrollTop),
        tap(evt => console.log("[scroll]: ", evt))
    );

    //observable that returns the amount of page scroll progress
    const scrollProgress$ = scrollThrottle$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        })
    )

    //subscribe to scroll progress to paint a progress bar
    const subscription = scrollProgress$.subscribe(updateProgressBar);


    /** end coding */
}