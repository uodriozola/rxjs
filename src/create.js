import { displayLog } from './utils';
import { Observable } from 'rxjs';

export default () => {
    // Observable
    const hello = Observable.create((observer) => {
        observer.next('Hello');
        setTimeout(() => {
            observer.next('World');
            // Tras llamar al método complete() se dan por finalizadas las subscripciones (evitar memory leaks)
            observer.complete();
        }, 2000);
    });

    // Observer
    const observer = {
        next: event => displayLog(event),
        error: error => console.error('[ERR] - ', error),
        complete: () => displayLog("[DONE]")
    };

    // Subscription al observer por defecto de rxjs
    // Primer parámetro: next
    // Segundo parámetro: error
    // Tercer parámetro: complete
    const subscribe1 = hello.subscribe(res =>
        displayLog(res),
        () => console.error('[ERR] - ', error),
        () => displayLog("[DONE"));

    //Subscription a nuestro observer custom
    const subscribe2 = hello.subscribe(observer);
    // Si me desuscribo del observer en este caso sobre mostrará "Hello"
    // Porque ese primer evento es síncrono. El resto al ser asíncrono no llega a suceder
    subscribe2.unsubscribe();


    /** end coding */
}