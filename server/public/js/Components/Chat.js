import Component from '../client-side-render/Component.js'
import Router from '../client-side-render/Router.js';
//Components
import Messages from './Messages.js';

export default class Chat extends Component {
    constructor({ props, container, containerMessages }){
        super({ props, container });
        this.Messages = new Messages({ props, container: containerMessages });
        this.router = new Router({ ApiUri: 'http://localhost:3001/api' });
    }

    async generateResponse(message){
        return await this.router.request({
             method: 'message',
             body: { message: message },
        });
    }

    async sendMessage() {
        console.log(this.container);
        const userInput = this.container.querySelector('textarea');
        const message = userInput.value.trim();
        
        if (message) {
            this.Messages.addMessage({sender:'user', text:message});
            userInput.value = '';
            let ia_respose = await this.generateResponse(message); //generate ia response
            this.Messages.addMessage({sender:'aria', text:ia_respose.message});
        }
    }

    template(){
        //textarea
        let textarea = document.createElement('textarea');
        textarea.className = "flex min-h-[80px] w-full border bg-background px-3 py-2 text-xl ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 rounded-2xl border-gray-300 dark:border-gray-700 dark:bg-gray-300dark:text-white pr-12";
        textarea.placeholder = "Type your message...";
        textarea.rows = "1";
        textarea.onkeydown = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { // Verificar si se presionó "Enter" sin presionar "Shift"
                e.preventDefault(); // Evitar el salto de línea predeterminado
                this.sendMessage(); // Llamar a la función sendMessage()
            }
        };

        //button
        let button = document.createElement('button');
        button.className = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent h-10 w-10 ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50";
        button.innerHTML = `
        <svg data-id="96" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
            <path d="m22 2-7 20-4-9-9-4Z"></path>
            <path d="M22 2 11 13"></path>
        </svg>
        <span class="sr-only" data-id="97">Send</span>`;

        //contenedor
        let container = document.createElement('div');
        container.appendChild(textarea);
        container.appendChild(button);
        container.className = "bg-gray-100 dark:bg-gray-950 p-4 flex items-center";
        //container.innerHTML = template;

        return container;
    }
}