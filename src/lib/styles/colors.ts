import type { ShapeOption } from "$models";

export const COLORS: ShapeOption[] = [
    { label: "Rojo", value: "red" },
    { label: "Ámbar", value: "amber" },
    { label: "Naranja", value: "orange" },
    { label: "Amarillo", value: "yellow" },
    { label: "Lima", value: "lime" },
    { label: "Verde", value: "green" },
    { label: "Esmeralda", value: "emerald" },
    { label: "Turquesa", value: "teal" },
    { label: "Cian", value: "cyan" },
    { label: "Celeste", value: "sky" },
    { label: "Azul", value: "blue" },
    { label: "Índigo", value: "indigo" },
    { label: "Violeta", value: "violet" },
    { label: "Púrpura", value: "purple" },
    { label: "Fucsia", value: "fuchsia" },
    { label: "Rosa", value: "pink" },
    { label: "Rosado", value: "rose" },
    { label: "Gris", value: "gray" },
    { label: "Gris pizarra", value: "slate" },
    { label: "Gris neutro", value: "neutral" },
    { label: "Gris piedra", value: "stone" },
    { label: "Zinc", value: "zinc" },
    { label: "Negro", value: "black" },
    { label: "Blanco", value: "white" },
    { label: "Transparente", value: "transparent" },
    { label: "Actual (current)", value: "currentColor" },
    { label: "Heredado (inherit)", value: "inherit" },
];


export const COLORS_HEX: ShapeOption[] = [
    { label: "Rojo", value: "#ef4444" },
    { label: "Ámbar", value: "#f59e0b" },
    { label: "Naranja", value: "#f97316" },
    { label: "Amarillo", value: "#eab308" },
    { label: "Lima", value: "#84cc16" },
    { label: "Verde", value: "#22c55e" },
    { label: "Esmeralda", value: "#10b981" },
    { label: "Turquesa", value: "#14b8a6" },
    { label: "Cian", value: "#06b6d4" },
    { label: "Celeste", value: "#0ea5e9" },
    { label: "Azul", value: "#3b82f6" },
    { label: "Índigo", value: "#6366f1" },
    { label: "Violeta", value: "#8b5cf6" },
    { label: "Púrpura", value: "#a855f7" },
    { label: "Fucsia", value: "#d946ef" },
    { label: "Rosa", value: "#ec4899" },
    { label: "Rosado", value: "#f43f5e" },
    { label: "Gris", value: "#6b7280" },
    { label: "Gris pizarra", value: "#64748b" },
    { label: "Gris neutro", value: "#737373" },
    { label: "Gris piedra", value: "#78716c" },
    { label: "Zinc", value: "#71717a" },
    { label: "Negro", value: "#000000" },
    { label: "Blanco", value: "#ffffff" },
    { label: "Transparente", value: "transparent" },
    { label: "Actual (currentColor)", value: "currentColor" },
];


export const COLORS_RGBA: ShapeOption[] = [
    { label: "Amarillo",        value: "234, 179, 8" },     // rgba(234, 179, 8, 1)
    { label: "Ámbar",           value: "245, 158, 11" },    // rgba(245, 158, 11, 1)
    { label: "Naranja",         value: "249, 115, 22" },    // rgba(249, 115, 22, 1)
    { label: "Rojo",            value: "239, 68, 68" },     // rgba(239, 68, 68, 1)
    { label: "Lima",            value: "132, 204, 22" },    // rgba(132, 204, 22, 1)
    { label: "Verde",           value: "34, 197, 94" },     // rgba(34, 197, 94, 1)
    { label: "Esmeralda",       value: "16, 185, 129" },    // rgba(16, 185, 129, 1)
    { label: "Turquesa",        value: "20, 184, 166" },    // rgba(20, 184, 166, 1)
    { label: "Cian",            value: "6, 182, 212" },     // rgba(6, 182, 212, 1)
    { label: "Celeste",         value: "14, 165, 233" },    // rgba(14, 165, 233, 1)
    { label: "Azul",            value: "59, 130, 246" },    // rgba(59, 130, 246, 1)
    { label: "Índigo",          value: "99, 102, 241" },    // rgba(99, 102, 241, 1)
    { label: "Violeta",         value: "139, 92, 246" },    // rgba(139, 92, 246, 1)
    { label: "Púrpura",         value: "168, 85, 247" },    // rgba(168, 85, 247, 1)
    { label: "Fucsia",          value: "217, 70, 239" },    // rgba(217, 70, 239, 1)
    { label: "Rosa",            value: "236, 72, 153" },    // rgba(236, 72, 153, 1)
    { label: "Rosado",          value: "244, 63, 94" },     // rgba(244, 63, 94, 1)
    { label: "Gris",            value: "107, 114, 128" },   // rgba(107, 114, 128, 1)
    { label: "Gris pizarra",    value: "100, 116, 139" },   // rgba(100, 116, 139, 1)
    { label: "Gris neutro",     value: "115, 115, 115" },   // rgba(115, 115, 115, 1)
    { label: "Gris piedra",     value: "120, 113, 108" },   // rgba(120, 113, 108, 1)
    { label: "Zinc",            value: "113, 113, 122" },   // rgba(113, 113, 122, 1)
    { label: "Negro",           value: "0, 0, 0" },         // rgba(0, 0, 0, 0)
    { label: "Blanco",          value: "255, 255, 255" },   // rgba(255, 255, 255, 1)
    { label: "Transparente",    value: "transparent" },         // rgba(0, 0, 0, 0)
    { label: "Actual",          value: "currentColor" }
];


export const TRANSPARENCY: ShapeOption[] = [
    { label: "0%", value: "0" },
    { label: "10%", value: "0.1" },
    { label: "20%", value: "0.2" },
    { label: "30%", value: "0.3" },
    { label: "40%", value: "0.4" },
    { label: "50%", value: "0.5" },
    { label: "60%", value: "0.6" },
    { label: "70%", value: "0.7" },
    { label: "80%", value: "0.8" },
    { label: "90%", value: "0.9" },
    { label: "100%", value: "1" }
];

export const TRANSPARENCY_100: ShapeOption[] = [
    { label: "100%", value: "100" },
    { label: "90%", value: "90" },
    { label: "80%", value: "80" },
    { label: "70%", value: "70" },
    { label: "60%", value: "60" },
    { label: "50%", value: "50" },
    { label: "40%", value: "40" },
    { label: "30%", value: "30" },
    { label: "20%", value: "20" },
    { label: "10%", value: "10" },
    { label: "0%", value: "0" }

];