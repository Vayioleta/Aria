import Component from '../client-side-render/Component.js';
require.config({ paths: { vs: "js/monaco-editor/min/vs" } });

export default class MonacoEditor extends Component {
    constructor({props,container}){
        super({props,container});
        this.editor = undefined;
    }

    template(){
        const $Component = document.createElement('div');
        $Component.id = `editor`;
        $Component.className = "monaco-container"
        return $Component;
    }
    
    mount_component(){
        require(['vs/editor/editor.main'], () => {
            // Crear el editor de código SQL
            this.editor = monaco.editor.create( this.container, {
                value: "SHOW DATABASES;",
                language: 'sql',
                readOnly: false,
                minimap: { enabled: false }
            });
            monaco.editor.setTheme('vs-dark');
            // Redimensionar el editor cuando cambia el tamaño de la ventana
   
            window.addEventListener('resize', () => {
                //console.log('La ventana ha cambiado de tamaño');
                const container = this.container.parentNode.parentNode.parentNode.parentNode;
                //console.log(container);
                this.editor.layout({ width: container.clientWidth - 48, height: 500-48 });
                //console.log(container.clientWidth);
            });
            /*
            document.querySelector('.edit-button').addEventListener('click', function() {
                editor.updateOptions({ readOnly: !editor.getOptions().get(monaco.editor.EditorOption.readOnly) });
            });
        
            document.querySelector('.run-button').addEventListener('click', function() {
                var codeContent = editor.getValue();
                console.log("Ejecutar consulta:", codeContent);
                // Aquí puedes agregar la lógica para ejecutar la consulta y mostrar los resultados
            });
            */
        });
    }
}