import { updateDisplay, displayLog } from './utils';

import { fromEvent, combineLatest } from 'rxjs';
import { map, debounceTime, withLatestFrom} from 'rxjs/operators';

export default () => {
    /** start coding */
    
    /** get the form element */
    const form = document.getElementById('form');
    
    /** get observables from each form element */
    const formName$ = fromEvent(form.name, 'input').pipe(
        debounceTime(400),
        map(evt => evt.target.value)
    );
    const formEmail$ = fromEvent(form.email, 'input').pipe(
        debounceTime(400),
        map(evt => evt.target.value)
    );
    const formNumber$ = fromEvent(form.phone, 'input').pipe(
        debounceTime(400),
        map(evt => evt.target.value)
    );

    const submitButton$ = fromEvent(form.btn, 'click');

    // combineLatest: Junta varios streams de entrada, y cada vez que recibe un evento emite un array con el último valor de cada entrada
    const formDataCombine$ = combineLatest(formName$, formEmail$, formNumber$);

    // withLatestFrom: Similar a combineLatest, pero sólo emite datos cuando su stream de origen los emite
        const formDataLatest$ = submitButton$.pipe(
            withLatestFrom(formName$, formEmail$, formNumber$),
            map(res => {
                const [click, ...formData] = res;
                return formData
            })
        );

    formDataLatest$.subscribe(res => displayLog(res));
}