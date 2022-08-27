export class SilkObject {

    #body;
    #listenerMethods = new Map( );

    constructor(element) {
        this.#body = element;
    }

    get body( ) {
        return this.#body;
    }

    bindListener(eventname, func, tgt = this) {
        this.#body.addEventListener(eventname, func.bind(tgt))
        this.#listenerMethods.set(eventname, func.bind(tgt));
    }

    unbindListener(name) {
        this.#body.removeEventListener(name, this.#listenerMethods.get(name));
        this.#listenerMethods.delete(name);
    }

    unbindAllListeners( ) {
        this.#listenerMethods.forEach((value, key) => this.unbindListener(key));
    }

}

export class WorkPane {

    #html;

    constructor(html) {
        this.#html = html;
        this.listener = new SilkObject(html.querySelector('.listener'));
    }

    get html( ) {
        return this.#html;
    }

    get svg( ) {
        return this.#html.querySelector('svg');
    }

    get canvas( ) {
        return this.#html.querySelector('canvas.main');
    }


}