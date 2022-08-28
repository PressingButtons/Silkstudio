class TileEditor extends Silk.Object.WorkPane {

    #tilesize = 16;
    #active = false;

    constructor(html) {
        super(html);
    }

    get stamp( ) {
        return this.html.querySelector('.stamp');
    }

    get tilesize( ) {
        return this.#tilesize;
    }

    set tilesize(n) {
        this.#tilesize = n;
        this.#setGrid( );
    }

    #setGrid( ) {
        Silk.Dom.setAttribute(this.svg.querySelector('#smallGrid'), {width: this.tilesize, height: this.tilesize});
        Silk.Dom.setAttribute(this.svg.querySelector('#smallGrid').querySelector('path'), {d: `M ${this.tilesize} 0 L 0 0 0 ${this.tilesize}`});
        Silk.Dom.setAttribute(this.svg.querySelector('#grid'), {width: this.tilesize * 10, height: this.tilesize * 10});
        Silk.Dom.setAttribute(this.svg.querySelector('#grid').querySelector('path'), {d: `M ${this.tilesize * 10} 0 L 0 0 0 ${this.tilesize * 10}`});
        Silk.Dom.setAttribute(this.stamp, {width: this.tilesize, height: this.tilesize});
    }

    bindListener(eventname, func) {
        this.listener.bindListener(eventname, func);
    }

    initMap(tilemap) {
        this.tilesize = tilemap.tilesize;
        this.resize(tilemap.rows, tilemap.columns);
    }

    mousedown(pos) {
        this.#active = true;
    }

    mouseup(pos) {
        this.#active = false;
    }

    mousemove(pos) {
        Silk.Dom.setStyle(this.stamp, {top: pos.row * this.tilesize + "px", left: pos.col * this.tilesize + "px"});
        this.stamp.classList.add('show');
    }

    mouseout(pos){
        this.#active = false;
        this.stamp.classList.remove('show');
    }

    on(eventname, position) {
        this[eventname](position);
    }

    resize(rows, columns) {
        this.canvas.width = columns * this.#tilesize;
        this.canvas.height = rows * this.#tilesize;
    }

    shutdown( ) {
        this.bindListener.unbindAllListeners( );
    }

}


export default TileEditor;