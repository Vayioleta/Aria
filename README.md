**Descripción del Proyecto: Aria - Asistente de Inteligencia Artificial para Consultas SQL**

**Introducción:**
Aria es un innovador asistente de inteligencia artificial diseñado para facilitar la creación, optimización y comprensión de consultas SQL. Con una interfaz amigable y capacidades avanzadas de procesamiento de lenguaje natural, Aria se convierte en una herramienta esencial para desarrolladores, analistas de datos y cualquier profesional que trabaje con bases de datos.

**Características Principales:**

1. **Generación de Consultas SQL:**
   - Aria permite a los usuarios generar consultas SQL complejas mediante instrucciones en lenguaje natural. Simplemente describe lo que necesitas y Aria se encargará del resto.

2. **Explicación de Consultas:**
   - Aria puede desglosar y explicar consultas SQL existentes, facilitando la comprensión de su estructura y funcionamiento, ideal para el aprendizaje y la revisión de código.

3. **Autocompletado Inteligente:**
   - Con funciones de autocompletado inteligentes, Aria sugiere las mejores opciones mientras escribes, acelerando el proceso de codificación y reduciendo errores.

4. **Interfaz Intuitiva:**
   - Diseñada con una interfaz de usuario limpia y moderna, Aria es fácil de usar tanto para principiantes como para expertos.

**Beneficios:**

- **Ahorro de Tiempo:**
  Aria agiliza el proceso de creación de consultas, permitiendo a los usuarios concentrarse en el análisis de datos y la toma de decisiones.

- **Mejora de la Productividad:**
  Con Aria, los equipos pueden mejorar significativamente su eficiencia, dedicando menos tiempo a la escritura de consultas y más a la interpretación de resultados.

**Conclusión:**
Aria revoluciona la forma en que interactuamos con las bases de datos, haciendo que la creación y gestión de consultas SQL sea más accesible, rápida y eficiente. Ya seas un desarrollador experimentado o un principiante, Aria está aquí para ayudarte a sacar el máximo provecho de tus datos.

![UI](/doc/imgs/interface.png)

## Instalación

### Requisitos

- NodeJS
- Servidor de base de datos MySQL o compatible.
- Instancia local de LMStudio con el modelo [lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF](https://huggingface.co/lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF).

### Configuración

1. Establecer servidor MySQL justo a la base de datos y sus credenciales (usuario y contraseña) en el archivo `.env`

```bash
#Database info
HOST=<url-servidor>
USER_DB=<usuario>
PASSWORD=<contraseña>
DATABASE=<base-de-datos>
PORT=<puerto>
```

2. Establecer la url de la instancia de de LMStudio en el archivo `aria/Aria.js`

```javascript
...
this.openai = new OpenAI({
	apiKey: 'lm-studio', // Reemplaza con tu clave de API
	baseURL: 'http://localhost:1234/v1', // URL del servidor local
});
...
```

3. Instalar paquetes necesarios

`npm install`

4. Ejecutar y abrir la url [http://localhost:3001](http://localhost:3001) o en su respectivo puerto (configurado en `.env`).

`node start`
