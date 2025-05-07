import { CalendarDate, type DateValue } from "@internationalized/date";

//Retorna la fecha actual formateada
export const getDefaultDate = (): DateValue => {
    return new CalendarDate(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate()
    );
};


//Alterna el estado del popup
export function togglePopup(
    showPopup      : boolean,
    shapeInput     : { disabled?: boolean; readonly?: boolean },
    currentDateRef : () => DateValue,
    setShowPopup   : ( value: boolean ) => void,
    setCurrentDate : ( value: DateValue ) => void
): void {
    if ( shapeInput.disabled || shapeInput.readonly ) return;

    const next = !showPopup;
    setShowPopup( next );

    if ( next && !currentDateRef()?.year ) {
        setCurrentDate( getDefaultDate() );
    }
}


export function handleClickOutside(
    event           : MouseEvent,
    container       : HTMLElement | null,
    showPopup       : boolean,
    popupClass      : string,
    setShowPopup    : ( value: boolean ) => void
): void {
    if ( !showPopup || !container || container.contains(event.target as Node)) return;

    const popupElement   = document.querySelector(`.${popupClass}`);
    const isClickInPopup = popupElement && popupElement.contains(event.target as Node);

    if ( showPopup && !isClickInPopup ) {
        setShowPopup( false );
    }
}
