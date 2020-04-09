import { displayLog } from './utils';
import { fromEvent } from 'rxjs';

export default () => {

    const actionBtn = document.getElementById('action-btn');
    // FROMEVENT: Es una función que asocia un observable a un event target concreto para emitir los eventos generados por este
    const observable = fromEvent(actionBtn, 'click');

    const subscription = observable.subscribe(res => displayLog(`click event at pos ${res.x},${res.y}`));

    fromEvent(document, 'mousemove').subscribe(res => console.log(res));


}