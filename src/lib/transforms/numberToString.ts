export const numberFormat = ( number: number ): string =>
    number.toString().replace( /\B(?=(\d{3})+(?!\d))/g, "," );


export const numberWithZero = ( number : number ): string =>
    number < 10 ? `0${number}` : number.toString();
