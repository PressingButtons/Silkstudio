export default class Timeline {

    #source;
    #current;

    constructor(source) {
        this.#source = source;
        this.#bindElements(source);
        this.addFrame(100, 1);
    }

    get rail( ) {
        return this.#source.querySelector('.rail');
    }

    #bindElements(source) {
        source.querySelector('#btn-new-full').onclick = event => this.addFrameFromCurrent( );
        source.querySelector('#btn-new-empty').onclick = event => this.addFrame(100, 1);
        source.querySelector('#btn-delete').onclick = event => this.#deleteCurrent( );
    }

    #deleteCurrent( ) {
        if(this.#current.classList.contains('template')) return;
        const data = this.#getData(this.#current);
        document.dispatchEvent(new CustomEvent(
            'timeline-delete-frame',
            {detail: data}
        ));
        let current = this.#current;
        this.#current = current.nextElementSibling ? current.nextElementSibling : current.previousElementSibling;
        this.rail.removeChild(current);
    }

    #enumerateSegments( ) {
        const frames = [...this.#source.querySelectorAll('.segment:not(.template)')];
        for(let i = 0; i < frames.length; i++) {
            frames[i].querySelector('.frame-number').innerHTML = i + 1;
        }
    }

    #getData(frame) {
        return {
            index: frame.querySelector('.frame-number').innerHTML,
            cell: frame.querySelector('.frame-cell').innerHTML
        }
    }

    addFrame(duration, cell, node) {
        const template = this.#source.querySelector('.template').cloneNode(true);
        template.classList.remove('template');
        template.querySelector('.frame-number').title=`Duration ${duration}ms`;
        template.querySelector('.frame-cell').innerHML = cell;
        if(duration > 100) template.style.width = duration + 'px';
        if(!node) this.rail.appendChild(template);
        else this.rail.insertBefore(node);
        this.#enumerateSegments( );
        this.#current = template;
    }

    addFrameFromCurrent( ) {
        if(!this.#current) return this.addFrame(100, 1);
        else return this.addFrame(this.#current);
    }

}