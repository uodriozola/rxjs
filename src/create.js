import { displayLog } from './utils';
import { from } from 'rxjs';

export default () => {
    /** start coding */
    const myArray = [1, 2, 3, 4, 5];

    const observable = from(myArray);

    const subscription = observable.subscribe(res => displayLog(res));

    /** end coding */
}