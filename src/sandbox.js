import { updateDisplay, displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

export default () => {
    
    const inputBox = document.getElementById('input-box');

    // debounceTime: Cuando se recibe un evento se inicia una espera en la que se escuchan valores y al acabar la espera se emite el valor más actual
    // La diferencia con auditTime es que debounceTime además reinica la espera con cada nuevo valor recibido
    const inputSrc$ = fromEvent(inputBox, 'input').pipe(
        map(res => res.target.value),
        debounceTime(1000)
    );

    const suscription = inputSrc$.subscribe(res => displayLog(res));
}