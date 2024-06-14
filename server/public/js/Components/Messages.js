import Component from '../client-side-render/Component.js'
export default class Messages extends Component {

    addMessage({sender, text}) {       
        switch(sender){
            case 'user':
                this.addUserMessage({message:text});
            break;

            case 'aria':
                this.addAssitentMessage({ message:text });
            break;
        }
    }

    processSQLText({ sqlText }){
        sqlText = sqlText.replaceAll(/```sql\n/g, '<sql>').replaceAll(/```\n/g, '</sql>');
        return sqlText;
    }

    addUserMessage({ message }){
        let element = document.createElement('div');
        element.className = "flex items-start gap-4 pt-4";
        element.innerHTML = `<span class="relative flex shrink-0 overflow-hidden rounded-full border w-8 h-8" data-id="53">
            <img data-id="54" src="assets/placeholder.svg" alt="Image" /><span class="flex h-full w-full items-center justify-center rounded-full bg-muted" data-id="55">YO</span>
        </span>
        <div class="grid gap-1 bg-gray-100 dark:bg-gray-200 rounded-2xl p-3 max-w-[80%]" data-id="56">
            <div class="font-medium" data-id="57">You</div>
            <div data-id="58"><p class="message-text" data-id="59">---</p></div>
            <div class="text-xs text-gray-500 dark:text-gray-400 justify-self-end" data-id="60">2:39 PM</div>
        </div>`;
        element.querySelector('.message-text').innerText = message;
        this.container.appendChild(element);
        this.container.scrollHeight;
    }


    addAssitentMessage({ message }){
        let element = document.createElement('div');
        element.className = "flex items-start gap-4 justify-end pt-4";
        element.innerHTML = `<div class="grid gap-1 bg-blue-100 dark:bg-blue-300 rounded-2xl p-3 max-w-[80%]" data-id="62">
            <div class="font-medium" data-id="63">Aria</div>
            <div data-id="64"><p class="message-text" data-id="65">---</p></div>
            <div class="text-xs text-gray-500 dark:text-gray-400 justify-self-end" data-id="66">2:40 PM</div>
        </div>
        <span class="relative flex shrink-0 overflow-hidden rounded-full border border-blue-500 w-8 h-8" data-id="67">
            <img data-id="68" src="assets/human.svg" alt="Image"><span class="flex h-full w-full items-center justify-center rounded-full bg-muted" data-id="69">KY</span>
        </span>`;
        element.querySelector('.message-text').innerHTML = this.processSQLText({ sqlText:message });
        let elements = element.querySelectorAll('sql');
        elements.forEach(item => {
            item.onclick = ()=> {
                console.log(item.innerText);
                this.props.sqleditor.setValue({ value: item.innerText });
            }
        });
        this.container.appendChild(element);
        this.container.scrollHeight;
    }

}