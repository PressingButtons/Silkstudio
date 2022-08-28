import TileEditor from "./tile_editor.js";
import TileMap from './tile_map.js';

let tileEditor;
let tilemap;

window.onload = event => {
    tileEditor = new TileEditor(document.getElementById('tile_editor'));
    createTilemap({
        meta: {
            tilesize: 16,
            rows: 30, 
            columns: 50, 
            tiles: {}
        }
    });
    setListeners( );
}

const createTilemap = config => {
    tilemap = new TileMap( );
    tilemap.init(config);
    tileEditor.initMap(tilemap);
}

const getMousePosition = (event, tilesize) => {
    const rect = event.target.getBoundingClientRect( );
    const x = event.clientX - rect.x;
    const y = event.clientY - rect.y;
    return {
        x: x,
        y: y,
        row: Math.floor(y / tilesize),
        col: Math.floor(x / tilesize)
    }
}

const setListeners = ( ) => {
    tileEditor.bindListener('mousemove',onTileEditorMouse);
    tileEditor.bindListener('mousedown', onTileEditorMouse);
    tileEditor.bindListener('mouseup', onTileEditorMouse);
    tileEditor.bindListener('mouseout', onTileEditorMouse);
    document.addEventListener('new_tile', onNewTile);
    document.getElementById('overpane').onclick = hideOverpane;
}

const hideOverpane = event => {
    if(event && event.target != event.currentTarget ) return;
    const overpane = document.getElementById('overpane');
    overpane.classList.remove('show');
    overpane.innerHTML = "";
}

const onNewTile = async event => {
    const form = await Silk.loadForm('new_tile_map');
    const rows = form.querySelector('input[name="rows"]');
    const cols = form.querySelector('input[name="cols"]');
    const ts = form.querySelector('input[name="tilesize"]');

    function update( ) {
        form.querySelector('.dimensions').innerHTML = parseInt(cols.value) * parseInt(ts.value) + ' x ' + parseInt(rows.value) * parseInt(ts.value); 
    }

    ts.oninput = update;
    rows.oninput = update;
    cols.oninput = update;

    console.log(form);

    form.onsubmit = async function(event) {
        event.preventDefault( );
        const data = new FormData(this);
        const tileset = await Silk.loadImageFromFile(data.get('tileset'));
        const config = {
            tileset: tileset,
            meta: {
                tiles : { },
                rows: data.get('rows'),
                columns: data.get('cols'),
                tilesize: data.get('tilesize')
            }
        }
        createTilemap(config);
        hideOverpane( );
    }
}

const onTileEditorMouse = event => {
    const position = getMousePosition(event, tileEditor.tilesize);
    tileEditor.on(event.type, position);
}