export default class Component {
    constructor({ props, container }) {
        this.state = {};
        this.props = props;
        this.container = container;
        this.lastRender = ''; //temp render
    }

    template() {
        return document.createElement('div'); //regresar primer render del componente
    }

    setState({ stateName, stateValue }) {
        if (!stateName) {
            throw new Error('[Component] Se requiere un nombre de estado.');
        }
        this.state[stateName] = stateValue;
    }

    getState({ stateName }) {
        if (!stateName || !this.state.hasOwnProperty(stateName)) {
            throw new Error('[Component] El nombre del estado es inválido o el estado no está definido.');
        }
        return this.state[stateName];
    }

    render() {
        if (!this.template || typeof this.template !== 'function') {
            throw new Error('[Component] El template de renderizado no está definido o no es una función.');
        }

        //renderizar componente
        return this.lastRender = this.template(this.props); //pasar props del componente
    }

    update(){ //actualizar componente
        this.container.replaceWith( this.lastRender ); // Agrega el nuevo contenido
        this.container.remove(); // elimiar elemento del cache
        this.container = this.lastRender; // nueva referencia
    }

    renderUpdate(){
        this.render();
        this.update();
    }
}
