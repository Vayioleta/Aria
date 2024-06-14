import Component from '../client-side-render/Component.js';
import Chat from "./Chat.js";
import SqlEditor from "./SqlEditor.js";

export default class Layout extends Component {
    template(){
        let content = `<div class="bg-gray-100 dark:bg-gray-950 flex items-center h-screen">
            <div class="grid grid-cols-1 md:grid-cols-2 h-screen w-screen" data-id="1">
                <div class="bg-gray-950 text-white p-6" data-id="2">
                    <div class="flex items-center justify-between mb-6" data-id="3">
                        <div class="flex items-center gap-2" data-id="4">
                            <div class="rounded-full bg-white text-black flex items-center justify-center w-8 h-8" data-id="5">
                                <svg data-id="6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                                    <polyline points="16 18 22 12 16 6"></polyline>
                                    <polyline points="8 6 2 12 8 18"></polyline>
                                </svg>
                            </div>
                            <h1 class="text-lg font-medium" data-id="7">SQL Editor</h1>
                        </div>
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full"
                            data-id="10"
                            type="button"
                            id="radix-:r4e:"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            data-state="closed"
                        >
                            <svg data-id="11" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                                <path
                                    d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                                ></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <span class="sr-only" data-id="12">Settings</span>
                        </button>
                    </div>

                    <div id="sql-editor" class="h-[calc(100vh-120px)] overflow-auto" data-id="21"></div>

                </div>
                <div class="bg-gray-100 dark:bg-gray-950 h-screen overfow-hidden" data-id="29">
                    <header class="bg-gray-950 text-white py-4 px-6 flex items-center justify-between" data-id="30">
                        <div class="flex items-center gap-2" data-id="31">
                            <div class="rounded-full bg-white text-black flex items-center justify-center w-8 h-8" data-id="32">
                                <svg data-id="33" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                                    <path d="M12 8V4H8"></path>
                                    <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                                    <path d="M2 14h2"></path>
                                    <path d="M20 14h2"></path>
                                    <path d="M15 13v2"></path>
                                    <path d="M9 13v2"></path>
                                </svg>
                            </div>
                            <h1 class="text-lg font-medium" data-id="34">Aria SQL</h1>
                        </div>
                        <div dir="ltr" data-orientation="horizontal" class="flex items-center gap-4" data-id="35"></div>
                    </header>
                    
                    <!--Chat Messages -->
                    <div id="messages-container" class="h-[calc(100vh-176px)] overflow-auto p-4 bg-gray-100" data-id="36">                   
                    </div>

                    <!--Chat ToolBar -->
                    <div id="chat-bar" class="bg-gray-100 dark:bg-gray-950 p-4 flex items-center" data-id="79"></div>

                </div>
            </div>
        </div>
        `;

        const container = document.createElement('div');
        container.className = "bg-gray-100 dark:bg-gray-950 flex items-center";
        container.innerHTML = content;

        //sql-editor        
        const sqleditor = new SqlEditor({ 
            props: {},
            container: container.querySelector('#sql-editor'),
        });
        sqleditor.renderUpdate();

        //Chat Tools
        const chat = new Chat({ 
            props: {sqleditor},
            container: container.querySelector('#chat-bar'),
            containerMessages: container.querySelector('#messages-container'),
        });
        chat.renderUpdate();

        return container;
    }
}