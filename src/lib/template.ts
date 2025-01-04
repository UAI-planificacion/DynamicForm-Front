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
    },{
        "shape"     : "input",
        "type"      : "text",
        "name"      : "lastname",
        "label"     : "Name",
        "required"  : true
    },{
        "shape"     : "datepicker",
        "type"      : "text",
        "name"      : "ages",
        "label"     : "Selecciona una fecha",
        "required"  : true
    },{
        "id"        : "2",
        "shape"     : "check",
        "name"      : "confirm",
        "label"     : "Confirmar",
        "checked"   : true,
    }, {
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
        "shape"     : "button",
        "name"      : "Send",
        "label"     : "Send",
        "apiUrlSend" : "http://localhost:5173/api/send"
    },
];
