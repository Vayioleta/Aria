import Component from '../client-side-render/Component.js';
import MonacoEditor from "./MonacoEditor.js";
import Router from '../client-side-render/Router.js';

export default class SqlEditor extends Component {

    constructor({props,container}){
        super({props,container});
        this.monacoEditor = undefined;
        this.router = new Router({ ApiUri: 'http://localhost:3001/api' });
    }

    template(){
        const $Component = document.createElement('div');
        $Component.id = `editor`;
        $Component.className = "monaco-container h-[calc(100vh-120px)] overflow-auto"
        $Component.innerHTML = `
            <div class="grid gap-4" data-id="22">
                <div class="bg-gray-800 rounded-2xl flex flex-col h-full" data-id="23">
                    <div class="font-medium sql-container" data-id="24">
                        <div id="monaco-editor"></div>
                    </div>
                </div>
                <div class="flex gap-2" data-id="6">
                    <button class="send-query justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white" data-id="7">
                        <svg data-id="8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polygon points="6 3 20 12 6 21 6 3"></polygon>
                        </svg>Execute Query
                    </button>
                </div>
                <div id="sql-response" class="font-medium sql-respose" data-id="24">SQL RESponse</div>
            </div>`;

        //Editor
        this.monacoEditor = new MonacoEditor({
            props: {},
            container: $Component.querySelector('#monaco-editor')
        });
        this.monacoEditor.renderUpdate();
        this.monacoEditor.mount_component();

        $Component.querySelector('.send-query').onclick = () => {
            this.send_query();
        };
        return $Component;        
    }

    setValue({value}){
        this.monacoEditor.editor.setValue(value);
    }

    async send_query(){
        const query = this.monacoEditor.editor.getValue();       
        if (query) {
            const respose = await this.router.request({
                method: 'sql-execute',
                body: { sql_query: query },
           });
           this.container.querySelector('#sql-response').innerText = JSON.stringify(respose);
           //console.log(respose);
        }
        console.log(query);
    }
}