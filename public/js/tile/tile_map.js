import { SilkObject } from "../silk/object.js";

export default class Tilemap extends SilkObject {

    #tileset;
    #map;
    #meta;

    constructor( ) {
       super( ); 
    }

    get tilesize( ) {
        return this.#meta.tilesize;
    }

    get rows( ) {
        return this.#meta.rows;
    }

    get columns( ) {
        return this.#meta.columns;
    }

    exportData(type = "image/webp", options = 1.0) {
        let data = {
            tileset: this.#tileset.toDataURL(type, options),
            mapdata: this.#map.toDataURL(type, options),
            meta: this.#meta
        }
        return JSON.stringify(data);
    }

    async importData(data) {
        this.#tileset = await Silk.loadImage(data.tileset, true);
        this.#map = await Silk.loadImage(data.mapdata, true);
        this.#meta = data.meta;
    }

    init(config) {
        this.#tileset = config.tileset;
        this.#meta = config.meta;
        this.#map = document.createElement('canvas');
        this.#map.width = config.meta
    }

    plot(layer, row, column, value) {
        const y = layer * this.#meta.rows + row;
        const x = layer * this.#meta.columns + column;
        this.#map.fillStyle = "#" + value.join("");
        this.#map.fillRect(x, y, 1, 1);
    }

    clear(layer, row, column) {
        const y = layer * this.#meta.rows + row;
        const x = layer * this.#meta.columns + column;
        this.#map.clearRect(x, y, 1, 1);
    }

    changeMeta(layer, row, column, value) {
        const y = layer * this.#meta.rows + row;
        const x = layer * this.#meta.columns + column;
        let pixel = this.#map.getContext('2d').getImageData(x, y, 1, 1).data;
        pixel[3] = value;
        this.#map.fillStyle = "#" + getRGBA(pixel);
        this.#map.fillRect(x, y, 1, 1);
    }

    addMap() {
        let original = Silk.copyCanvas(this.#map);
        this.#map.width = this.#map.width + this.#meta.columns;
    }

}

function getRGBA(channels) {
    return channels.map( x => "" + parseInt(x, 16).padStart(2, '0')).join("");
}