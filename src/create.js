import { displayLog } from './utils';
import { from } from 'rxjs';

export default () => {
    /** start coding */
    const myArray = [1, 2, 3, 4, 5];
    const myString = "Hello world";
    const myPromise = new Promise(res => {
        setTimeout(() => {
            res('Hello world');
        }, 2000);
    });

    // El operador from se utiliza para convertir Promises en Observables
    const observable = from(myPromise);

    const subscription = observable.subscribe(res => displayLog(res));

    /** end coding */
}