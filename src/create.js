import { displayLog } from './utils';
import { interval, timer } from 'rxjs';

export default () => {

    // INTERVAL: Sirve para emitir secuencias de valores cada ciertos intervalo
    const observable = interval(500);

    const subscription = observable.subscribe(res => displayLog(res));

    // TIMER: Es el método equivalente a setTimeout de javascript para rxjs
    timer(2000).subscribe(() => subscription.unsubscribe());

    // Con timer también se pueden crear intervalos a partir del primer evento
    // La primer vez se ejecuta a los 4 segundos y luego cada 100 milisegundos
    const timerObservable = timer(4000, 100);

    const subscription2 = timerObservable.subscribe(res => displayLog(`2 - ${res}`));

    timer(6000).subscribe(() => subscription2.unsubscribe());

    /* setTimeout(() => {
        subscription.unsubscribe();
    }, 10000); */
    
}