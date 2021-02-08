'use strict';
const SilkTileProject = function( rows, columns, tile_size ) {
  this.width = columns * tile_size;
  this.height = columns * tile_size;
  this.data = {
    tile_size: tile_size,
    rows: rows, columns: columns,
    map: { collision_tiles: new Array( rows * columns ).map( entry => ' ' ), graphic_layers: [] },
    image_data: null,
    background: null,
  }
}

SilkTileProject.prototype.setBackground = (type, value) => {
  this.background = { type: type, value: value };
}

SilkTileProject.prototype.addLayer = ( index ) => {
  let layer = {
    map: new Array( this.data.rows * this.data.columns ).map( entry => ' '),
    shader: '#00000000', x:0, y: 0,
  }
  if( index ) this.data.map.graphic_layers.splice( index, 0, layer );
  else this.data.map.graphic_layers.push( layer );
}

SilkTileProject.prototype.deleteLayer = index => {
  this.data.map.graphic_layers( index, 1 );
}

SilkTileProject.prototype.plotGraphicValue = ( value, index, layer ) => {
  this.data.map.graphic_tiles[layer][index] = value;
}

SilkTileProject.prototype.plotCollisionValue = ( value, index ) => {
  this.data.map.collision_tiles[index] = value;
}

SilkTileProject.prototype.export = ( ) => {
  return URL.createObjectURL( new Blob( JSON.stringify( this.data ), {type: 'application/json'}))
}

export default SilkTileProject;
