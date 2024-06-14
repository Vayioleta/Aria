import OpenAI from 'openai';
import context from './context.js';

class Aria {
  
  constructor() {
    this.context = context;
    this.openai = new OpenAI({
      apiKey: 'lm-studio', // Reemplaza con tu clave de API
      baseURL: 'http://localhost:1234/v1', // URL del servidor local
    });

    this.temperature = 0.5;
    this.max_tokens = 250;
  }

  async Inference({ prompt }) {
    //console.log(prompt);
    const completion = await this.openai.chat.completions.create({
      model: 'lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF',
      messages: [
        { role: 'system', content: this.context },
        { role: 'user', content: `'Lenguaje Natural: "${prompt}"'` }
      ],
      temperature: this.temperature,
      max_tokens: this.max_tokens,
    });    
    return completion.choices[0].message.content;
  } //end  Inference  

} //end class

export default Aria;