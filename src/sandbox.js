import { updateDisplay } from './utils';
import { fromEvent, Subject, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export default () => {

    // Subject: Es un tipo especial de Observable con 3 propiedades:
        // 1. Permite hacer multicast de sus valores hacia varios Observers (Hot Observable)
        // 2. Además de ser un Observable es también un Observer (también tiene los métodos next, complete y error)
        // 3. Actúa como un distribuidor. Emite a todos sus Observers cualquier valor que reciba como Observer
    
    // BehaviorSubject: Es un Subject que además siempre tiene un estado
    // Ese estado es el valor inicial que le das en el constructor o el último valor emitido por el stream
    // Se guarda el último valor emitido, por lo que se puede consultar en cualquier momento o lugar mediante la propiedad value

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

    //observable that returns the amount of page scroll progress
    const scrollProgress$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        })
    );

    // Creamos un subject y lo utilizamos como Observer del Observable scrollProgress$
    // Nos suscribimos al subject y este se encargará de trasladar los eventos que reciba del Observable a todos sus Observers
    // (mediante una única instancia de datos)
    const scrollProgressHot$ = new Subject();
    scrollProgress$.subscribe(scrollProgressHot$);

    // Creamos un BehaviorSubject y lo usamos igual que usábamos antes el Subject
    // Ya no será necesario emitir un primer evento (.next()) porque este se inicializa al valor indicado y lo emite automáticamente
    const scrollProgressBehavior$ = new BehaviorSubject(0);
    scrollProgress$.subscribe(scrollProgressHot$);

    //subscribe to scroll progress to paint a progress bar
    const subscription = scrollProgressBehavior$.subscribe(updateProgressBar);

    //subscribe to display scroll progress percentage
    const subscription2 = scrollProgressBehavior$.subscribe(
        val => updateDisplay(`${ Math.floor(val) } %`)
    );

    // Emito un primer evento desde el Subject para que al cargar la página por primera vez los Observers lo recojan
    scrollProgressHot$.next(0);

    // BehaviourSubject permite consultar el último valor emitido
    console.log(scrollProgressBehavior$.value)
}