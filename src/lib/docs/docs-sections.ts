import type { DocSection }  from "$models/docs";
import { INTRODUCCION }     from "$lib/docs/first-step/introduction";
import { FIRST_FORM }       from "$lib/docs/first-step/first-form";
import { INPUT_SHAPE }      from "$lib/docs/shape-inputs/input";
import { CHECKBOX_SHAPE }   from "$lib/docs/shape-inputs/checkbox";
import { SELECT_SHAPE }     from "$lib/docs/shape-inputs/select";
import { TEXTAREA_SHAPE }   from "$lib/docs/shape-inputs/textarea";
import { DATE_SHAPE }       from "$lib/docs/shape-inputs/date";
import { MARKDOWN_SHAPE }   from "$lib/docs/shape-inputs/markdown";
import { TIME_SHAPE }       from "$lib/docs/shape-inputs/time";
import { BUTTON_SHAPE }     from "$lib/docs/shape-inputs/button";
import { THEME }            from "./theme/theme-doc";


export const docSections: DocSection[] = [
    {
        id: 'getting-started',
        title: 'Primeros pasos',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
        items: [
            {
                id: 'introduction',
                title: 'Introducción',
                component: INTRODUCCION
            },
            {
                id: 'first-form',
                title: 'Tu primer formulario',
                component: FIRST_FORM
            }
        ]
    },
    {
        id: 'shapes',
        title: 'Formulario',
        icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
        items: [
            {
                id: 'input',
                title: 'Input',
                component: INPUT_SHAPE
            },
            {
                id: 'checkbox',
                title: 'Checkbox',
                component: CHECKBOX_SHAPE
            },
            {
                id: 'select',
                title: 'Seleccionable',
                component: SELECT_SHAPE
            },
            {
                id: 'textarea',
                title: 'Área de Texto',
                component: TEXTAREA_SHAPE
            },
            {
                id: 'date',
                title: 'Fecha',
                component: DATE_SHAPE
            },
            {
                id: 'markdown',
                title: 'Markdown',
                component: MARKDOWN_SHAPE
            },
            {
                id: 'time',
                title: 'Tiempo',
                component: TIME_SHAPE
            },
            {
                id: 'button',
                title: 'Botón',
                component: BUTTON_SHAPE
            }
        ]
    },
    {
        id: 'themes',
        title: 'Temas',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
        items: [
            {
                id: 'customization',
                title: 'Customización',
                component: THEME
            }
        ]
    }
];