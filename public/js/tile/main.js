import TileEditor from "./tile_editor.js";

let tileEditor;

window.onload = event => {
    tileEditor = new TileEditor(document.getElementById('tile_editor'));
    setListeners( )
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
}

const onTileEditorMouse = event => {
    const position = getMousePosition(event, tileEditor.tilesize);
    tileEditor.on(event.type, position);
}