export const templateJson = [{
        "id"            : "1",
        "shape"         : "input",
        "type"          : "text",
        "name"          : "name",
        "label"         : "Name",
        "required"      : true,
        "placeholder"   : "Enter your name",
        "value": "Kevin"
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
        ],
        "selected": 'punk-pink'
    }, {
        "id"        : "3",
        "shape"     : "textarea",
        "type"      : "text",
        "name"      : "lastname",
        "label"     : "Lastname",
        "required"  : true,
        "rows"      : 4,
        "value"     : "Valor por defecto",
		"placeholder": "Enter your lastname"
    },{
        "id"        : "4",
        "shape"     : "datepicker",
        "type"      : "text",
        "name"      : "ages",
        "label"     : "Selecciona una fecha",
        "required"  : true,
        "date" : {
            "year": 2026,
            "month": 5,
            "day": 12,
        }
    },{
        "id"        : "5",
        "shape"     : "check",
        "name"      : "confirm",
        "label"     : "Confirmar",
    }, {
        "id"        : "6",
        "shape"     : "combobox",
        "name"      : "combobox",
        "label"     : "Combobox",
        "required"  : true,
		"multiple"  : true,
        "placeholder" : "Selecciona una opción",
        "options" : [
            { value: "light-monochrome",    label: "Light Monochrome" },
            { value: "dark-green",          label: "Dark Green" },
            { value: "svelte-orange",       label: "Svelte Orange" },
            { value: "punk-pink",           label: "Punk Pink" }
        ],
        "selected" : ["dark-green", "punk-pink"]
    }, {
        "id"        	: "7",
        "shape"     	: "markdown",
        "name"      	: "markdown",
        "label"     	: "Markdown",
		"placeholder" 	: "Escribe algo en Markdown",
        "preview"   	: true,
        "value"     	: '',
        "description" 	: "Esto es un ejemplo de Markdown",
    }, {
        "id"        		: "8",
        "shape"     		: "button",
        "name"      		: "Send",
        "label"     		: "Send",
        "urlSend"   		: "https://daylify.up.railway.app/api/v1/holidays/",
		"method"    		: "get",
		"externalErrorMsg"	: "Error de conexión",
		"invalidErrorMsg"	: "Formulario inválido",
		"httpList" 			: [
			{ code: 200, message: "Operación exitosa" },
			{ code: 400, message: "Error en la operación" },
			{ code: 500, message: "Error en el servidor" },
		],
    },
    
];


