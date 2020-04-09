import { displayLog } from './utils';
import { of, range } from 'rxjs';

export default () => {
    // OF: Sirve para crear secuencias de observables a partir de prácticamente cualquier cosa
    const source = of(1, 2, 3, 4, 5, 6);
    const source2 = of([1, 2, 3], 'Hello world', { foo: 'bar'}, function sayHello() { return 'Hi' });
    // RANGE: Sirve para crear un observable a partir de una secuencia ordenada de números
    const source3 = range(3, 10);

    const subscription = source3.subscribe(res => displayLog(res));
}