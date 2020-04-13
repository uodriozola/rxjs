import { timer, throwError, of } from 'rxjs';
import { mapTo, mergeMap } from 'rxjs/operators';

export class api{

    // throwError: Crea un observable que tal como se crea lanza un error
    // Cuando la suscripción captura un error se cierra
    // Es útil para lanzar errores cuando lo combinas con otros observables
    static getComment(id){
        return timer(Math.random()*1000).pipe(
            mergeMap(() => {
                const isError = Math.random() > 0.6 ? true : false;
                if(isError) {
                    return throwError(new Error('Request Timeout'));
                } else {
                    return of({id:id, comment:`comment number ${id}`})
                }
            })
        );
    }

    static getCommentsList(page){
        const buildCommentsList = (page) =>{
            let comments = [];
            const offset = (page-1)*10;
            for(let i=offset; i < offset+10; i++){
                comments.push({id:i, comment:`comment number ${i}`})
            }
            return comments;
        }
        return timer(Math.random()*1000).pipe(
            mapTo(buildCommentsList(page))
        );
    }    
}