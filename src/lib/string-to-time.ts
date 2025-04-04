import type { Time } from "$models";

type TimeObj = {
    hour: number,
    minute : number
}

export function stringToTime( timeStr: string | TimeObj | undefined ) : Time | undefined {
    if ( !timeStr ) return undefined;
    if ( typeof timeStr === 'string' ) {
        const [ hour, minute ] = timeStr.split(':').map( str => parseInt( str ) );
        return { hour, minute };
    }
    return timeStr;
}