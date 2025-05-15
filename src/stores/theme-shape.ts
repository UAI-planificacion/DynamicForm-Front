import { writable, get } from 'svelte/store';
import type { ThemeShape, ThemeAttribute } from '$models';
import { UAITheme } from '$lib/styles/themes';

// Store principal para el tema
const themeShapeStore = writable<ThemeShape>(UAITheme());

const themeNameStore = writable<string>( 'uai' );
const themeColorStore = writable<string>( 'zinc' );

function updateThemeName(name: string) {
    themeNameStore.set(name);
}

function updateThemeColor(color: string) {
    themeColorStore.set(color);
}

// Función para inicializar el theme shape completo
function initThemeShape(initialTheme: ThemeShape) {
    themeShapeStore.set(initialTheme);
}

// Función para actualizar el theme shape completo
function updateThemeShape(newTheme: ThemeShape) {
    themeShapeStore.update(currentTheme => {
        return { ...currentTheme, ...newTheme };
    });
}

// Funciones para actualizar propiedades específicas
function updateFontSize(fontSize: string) {
    themeShapeStore.update(currentTheme => {
        return { ...currentTheme, fontSize };
    });
}

function updateHeight(height: string) {
    themeShapeStore.update(currentTheme => {
        return { ...currentTheme, height };
    });
}

function updateBorderRadius(borderRadius: string) {
    themeShapeStore.update(currentTheme => {
        return { ...currentTheme, borderRadius };
    });
}

function updateBoxShadow(boxShadow: string) {
    themeShapeStore.update(currentTheme => {
        return { ...currentTheme, boxShadow };
    });
}

function updateRingSize(ringSize: string) {
    themeShapeStore.update(currentTheme => {
        return { ...currentTheme, ringSize };
    });
}

function updateBorderSize(borderSize: string) {
    themeShapeStore.update(currentTheme => {
        return { ...currentTheme, borderSize };
    });
}

// Funciones para actualizar atributos de tema específicos (light/dark)
function updateThemeAttribute(mode: 'light' | 'dark', updates: Partial<ThemeAttribute>) {
    themeShapeStore.update(currentTheme => {
        return {
            ...currentTheme,
            [mode]: {
                ...currentTheme[mode],
                ...updates
            }
        };
    });
}

// Funciones específicas para background, color y ring
function updateBackground(mode: 'light' | 'dark', background: string) {
    updateThemeAttribute(mode, { background });
}

function updateBackgroundColor(mode: 'light' | 'dark', backgroundColor: string) {
    updateThemeAttribute(mode, { backgroundColor });
}

function updateBackgroundTonality(mode: 'light' | 'dark', backgroundTonality: string) {
    updateThemeAttribute(mode, { backgroundTonality });
}

function updateBackgroundOpacity(mode: 'light' | 'dark', backgroundOpacity: string) {
    updateThemeAttribute(mode, { backgroundOpacity });
}

function updateColor(mode: 'light' | 'dark', color: string) {
    updateThemeAttribute(mode, { color });
}

function updateColorColor(mode: 'light' | 'dark', colorColor: string) {
    updateThemeAttribute(mode, { colorColor });
}

function updateColorTonality(mode: 'light' | 'dark', colorTonality: string) {
    updateThemeAttribute(mode, { colorTonality });
}

function updateColorOpacity(mode: 'light' | 'dark', colorOpacity: string) {
    updateThemeAttribute(mode, { colorOpacity });
}

// Funciones para actualizar atributos secundarios de fondo
function updateSecondaryBackground(mode: 'light' | 'dark', secondaryBackground: string) {
    updateThemeAttribute(mode, { secondaryBackground });
}

function updateSecondaryBackgroundColor(mode: 'light' | 'dark', secondaryBackgroundColor: string) {
    updateThemeAttribute(mode, { secondaryBackgroundColor });
}

function updateSecondaryBackgroundTonality(mode: 'light' | 'dark', secondaryBackgroundTonality: string) {
    updateThemeAttribute(mode, { secondaryBackgroundTonality });
}

function updateSecondaryBackgroundOpacity(mode: 'light' | 'dark', secondaryBackgroundOpacity: string) {
    updateThemeAttribute(mode, { secondaryBackgroundOpacity });
}

// Funciones para actualizar atributos secundarios de color
function updateSecondaryColor(mode: 'light' | 'dark', secondaryColor: string) {
    updateThemeAttribute(mode, { secondaryColor });
}

function updateSecondaryColorColor(mode: 'light' | 'dark', secondaryColorColor: string) {
    updateThemeAttribute(mode, { secondaryColorColor });
}

function updateSecondaryColorTonality(mode: 'light' | 'dark', secondaryColorTonality: string) {
    updateThemeAttribute(mode, { secondaryColorTonality });
}

function updateSecondaryColorOpacity(mode: 'light' | 'dark', secondaryColorOpacity: string) {
    updateThemeAttribute(mode, { secondaryColorOpacity });
}

function updateRing(mode: 'light' | 'dark', ring: string) {
    updateThemeAttribute(mode, { ring });
}

function updateRingColor(mode: 'light' | 'dark', ringColor: string) {
    updateThemeAttribute(mode, { ringColor });
}

function updateRingTonality(mode: 'light' | 'dark', ringTonality: string) {
    updateThemeAttribute(mode, { ringTonality });
}

function updateRingOpacity(mode: 'light' | 'dark', ringOpacity: string) {
    updateThemeAttribute(mode, { ringOpacity });
}

// Función para actualizar el evento focus
function updateFocusEvent(mode: 'light' | 'dark', focusUpdates: Partial<ThemeAttribute>) {
    themeShapeStore.update(currentTheme => {
        return {
            ...currentTheme,
            [mode]: {
                ...currentTheme[mode],
                event: {
                    ...currentTheme[mode].event,
                    focus: {
                        ...currentTheme[mode].event.focus,
                        ...focusUpdates
                    }
                }
            }
        };
    });
}

// Obtener el tema actual
function getCurrentTheme(): ThemeShape {
    return get(themeShapeStore);
}


export {
    themeShapeStore,
    initThemeShape,
    updateThemeShape,
    updateFontSize,
    updateHeight,
    updateBorderRadius,
    updateBoxShadow,
    updateRingSize,
    updateBorderSize,
    updateThemeAttribute,
    updateBackground,
    updateBackgroundColor,
    updateBackgroundTonality,
    updateBackgroundOpacity,
    updateColor,
    updateColorColor,
    updateColorTonality,
    updateColorOpacity,
    updateSecondaryBackground,
    updateSecondaryBackgroundColor,
    updateSecondaryBackgroundTonality,
    updateSecondaryBackgroundOpacity,
    updateSecondaryColor,
    updateSecondaryColorColor,
    updateSecondaryColorTonality,
    updateSecondaryColorOpacity,
    updateRing,
    updateRingColor,
    updateRingTonality,
    updateRingOpacity,
    updateFocusEvent,
    getCurrentTheme,
    themeNameStore,
    themeColorStore,
    updateThemeName,
    updateThemeColor
};
