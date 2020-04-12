import { updateDisplay, displayLog } from './utils';
import { fromEvent, zip, merge } from 'rxjs';
import { map, tap, scan, filter, distinctUntilChanged } from 'rxjs/operators';

export default () => {
    /** start coding */

    /** init canvas and context reference  */
    const canvas = document.getElementById('drawboard');
    const ctx = canvas.getContext('2d');

    /** method to draw a line in canvas  */
    const drawLine = (initCoords, endCoords) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(initCoords.x, initCoords.y);
        ctx.lineTo(endCoords.x, endCoords.y);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    /** helper method to retrieve local coords from click */
    const getLocalClickCoords = (event, parent) =>{
        return {
            x: event.clientX - parent.offsetLeft,
            y: event.clientY - parent.offsetTop,
        }
    }

    /** observable from canvas mouse down events */
    const mouseStart$ = fromEvent(canvas, 'mousedown').pipe(
        map(event => {
            return {
                label: 'start',
                coords: getLocalClickCoords(event, canvas)
            }
        }));

    /** observable from canvas mouse up events */
    const mouseEnd$ = fromEvent(canvas, 'mouseup').pipe(
        map(event => {
            return {
                label: 'end',
                coords: getLocalClickCoords(event, canvas)
            }
        }));

    /** observable from canvas mouse move events */
    const mouseMove$ = fromEvent(canvas, 'mousemove').pipe(
        map(event => {
            return {
                label: 'drawing',
                coords: getLocalClickCoords(event, canvas)
            }
        }));        


    //TODO: draw event line

    const computeDrawState = (prevState, event) => {
        switch(prevState.label) {
            case 'init':
            case 'end':
                if (event.label == 'start') {
                    return { origin: event.coords, ...event }
                }
                break;
            case 'start':
            case 'drawing':
                return { origin: prevState.origin, ...event }
        };
        return prevState;
    };

    // zip: Combina varios flujos de datos en un único observable que devuelve un array con los valores de los observables de entrada
    // Se espera a tener un valor de cada entrada para emitir el evento de salida
    const drawLineZip$ = zip(mouseStart$, mouseEnd$).pipe(
        tap(res => console.log(res)),
        map(([start, end]) => {
            return {
                origin: start.coords,
                end: end.coords
            }
        })
    );

    // merge: Entrelaza los flujos de distintos observables en un único flujo de datos
    // No espera a tener datos de todos los flujos de entrada ni los devuelve como un array
    const drawLineMerge$ = merge(mouseStart$, mouseMove$, mouseEnd$).pipe(
        scan(computeDrawState, { label: 'init'}),
        tap(res => console.log(res)),
        filter(res => res.origin && res.coords),
        distinctUntilChanged(),
        tap(res => console.log(res))
    );

    const subscription = drawLineMerge$.subscribe(res => drawLine(res.origin, res.coords));

    

    /** end coding */
}