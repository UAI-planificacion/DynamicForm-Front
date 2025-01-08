export const templateJson = [{
        "id"            : "1",
        "shape"         : "input",
        "type"          : "text",
        "name"          : "name ",
        "label"         : "Name",
        "required"      : true,
        "placeholder"   : "Enter your name",
        "description"   : "Please enter your name"
    }, {
        "id"        : "2",
        "shape"     : "select",
        "name"      : "options",
        "label"     : "Select",
        "required"  : true,
        "placeholder" : "Selecciona una opción",
        "options" : [
            { value: "light-monochrome",    label: "Light Monochrome" },
            { value: "dark-green",          label: "Dark Green" },
            { value: "svelte-orange",       label: "Svelte Orange" },
            { value: "punk-pink",           label: "Punk Pink" }
        ]
    }, {
        "id"        : "3",
        "shape"     : "textarea",
        "type"      : "text",
        "name"      : "lastname",
        "label"     : "Lastname",
        "required"  : true
    },{
        "id"        : "4",
        "shape"     : "datepicker",
        "type"      : "text",
        "name"      : "ages",
        "label"     : "Selecciona una fecha",
        "required"  : true,
    },{
        "id"        : "5",
        "shape"     : "check",
        "name"      : "confirm",
        "label"     : "Confirmar",
        "checked"   : true,
    }, {
        "id"        : "6",
        "shape"     : "combobox",
        "name"      : "combobox",
        "label"     : "Combobox",
        "required"  : true,
        "placeholder" : "Selecciona una opción",
        "options" : [
            { value: "light-monochrome",    label: "Light Monochrome" },
            { value: "dark-green",          label: "Dark Green" },
            { value: "svelte-orange",       label: "Svelte Orange" },
            { value: "punk-pink",           label: "Punk Pink" }
        ]
    },{
        "id"            : "7",
        "shape"         : "button",
        "name"          : "Send",
        "label"         : "Send",
        "apiUrlSend"    : "http://localhost:5173/api/send"
    },
];
