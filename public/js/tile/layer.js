export default class MapLayer {

    #map;
    #id;
    #layer;
    #html;
    #aspect;

    constructor(map, id, layer) {
        this.#map = map;
        this.#id = id;
        this.#layer = layer;
        this.#aspect = map.width / map.height;
        this.#setHTML(map, id, layer);
    }

    #setHTML(src, id, layer) {
        const aspect = this.#map.width / this.#map.height;

        this.#html = `<div class="flex maplayer>
            
        </div>`
    }

}