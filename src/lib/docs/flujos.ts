export const FLUJOS =  `# Flujos de trabajo
Los flujos de trabajo te permiten automatizar procesos basados en las respuestas de tus formularios.

<h1 class="text-2xl font-bold mb-4">Flujos de trabajo</h1>

<p class="mb-4">Los flujos de trabajo te permiten automatizar procesos basados en las respuestas de tus formularios.</p>

<h2 class="text-xl font-semibold mt-6 mb-3">Creación de un flujo de trabajo</h2>
1- Ve a la sección "Flujos de trabajo" en el panel de administración
<ol class="list-decimal pl-6 mb-4 space-y-2">
    <li>Ve a la sección "Flujos de trabajo" en el panel de administración</li>
    <li>Haz clic en "Nuevo flujo de trabajo"</li>
    <li>Selecciona el formulario al que quieres asociar el flujo</li>
    <li>Define los desencadenantes (triggers) que activarán el flujo</li>
    <li>Configura las acciones que se ejecutarán</li>
    <li>Guarda el flujo de trabajo</li>
</ol>

<h2 class="text-xl font-semibold mt-6 mb-3">Tipos de desencadenantes</h2>
<ul class="list-disc pl-6 mb-4 space-y-2">
    <li><strong>Nueva respuesta:</strong> Se activa cuando se recibe una nueva respuesta</li>
    <li><strong>Respuesta específica:</strong> Se activa cuando se recibe una respuesta con valores específicos</li>
    <li><strong>Programado:</strong> Se activa en momentos específicos (diario, semanal, etc.)</li>
    <li><strong>Manual:</strong> Se activa manualmente por un administrador</li>
</ul>

<h2 class="text-xl font-semibold mt-6 mb-3">Tipos de acciones</h2>
<ul class="list-disc pl-6 mb-4 space-y-2">
    <li><strong>Enviar email:</strong> Envía un correo electrónico a destinatarios específicos</li>
    <li><strong>Notificación:</strong> Envía una notificación en la plataforma</li>
    <li><strong>Actualizar datos:</strong> Actualiza información en la base de datos</li>
    <li><strong>Integración externa:</strong> Envía datos a sistemas externos mediante webhooks</li>
</ul>

<div class="bg-green-50 border-l-4 border-green-500 p-4 mt-6">
    <p class="font-medium">Ejemplo de uso:</p>
    <p>Configura un flujo de trabajo para enviar automáticamente un correo de agradecimiento a cada persona que complete tu formulario.</p>
</div>
`