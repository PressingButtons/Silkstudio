'use strict';
let SilkTileEditor = (function( ){

  const svgNamespace = "http://www.w3.org/2000/svg";
  let elements = { }, collision_tiles = { };
  let tool = { type: 'collision', index: 0,  value: ' ', active: false, enabled: false };
  let project = null;
  let mouse = { x: null, y: null }

  const initialize = ( ) => {
    elements.svg_container = document.getElementById('svg_container');
    elements.small_grid = document.getElementById('smallGrid');
    elements.grid = document.getElementById('grid');
    elements.grid_space = document.getElementById('gridSpace');
    elements.collision_tiles = document.getElementById('collision_tiles');
    elements.graphic_tiles = document.getElementById('graphic_tiles');
    elements.camera = document.getElementById('camera');
    elements.camera_bounds = document.getElementById('camera_bounds');
    elements.cursor = document.getElementById('cursor');
    setListeners( );
  }

  const setListeners = ( ) => {
    window.addEventListener('mousemove', onSVGMouseEvent );
    window.addEventListener('mousedown', onSVGMouseEvent );
    window.addEventListener('mouseup', onSVGMouseEvent );
    elements.svg_container.addEventListener('mouseleave', onSVGMouseEvent );
    elements.svg_container.addEventListener('mouseenter', onSVGMouseEvent );
    document.addEventListener('keydown', onKeyEvent )
  }

  //Methods ===============================================================
  const cameraResize = ( width, height ) => {
    let cameraW = Math.min( project.width, width );
    let cameraH = Math.min( project.height, height );
    let x = project.width/2 - cameraW/2;
    let y = project.height/2 - cameraH/2;
    svgSetAttributes( elements.camera, { width: cameraW, height: cameraH, x: x, y: y } );
  }

  const cameraResizeBounds = ( width, height ) => {
    let boundW = Math.max( elements.camera.width, width );
    let boundH = Math.max( elements.camera.height, height );
    let x = project.width/2 - boundW/2;
    let y = project.height/2 - boundH/2;
    svgSetAttributes( elements.camera_bounds, {width: boundW, height: boundH, x: x, y: y })
  }

  const cursorRender = ( point ) => {
    if( tool.value == ' ' ) cursorRenderDelete( gridGetPosition(point.x, point.y), project.data.tile_size);
    if( tool.value == 'S_sq' ) cursorRenderSquare( gridGetPosition(point.x, point.y), project.data.tile_size, 'rgba(255,255,255,0.8)');
  }

  const cursorRenderDelete = ( point, ts ) => {
    let params = {
      fill: 'none', stroke: 'red',
      d: ["M", point.x, point.y, "L", point.x + ts, point.y, point.x + ts, point.y + ts, point.x, point.y + ts, point.x, point.y, point.x + ts, point.y + ts].join(" ")
    }
    svgSetAttributes( elements.cursor, params);
  }

  const cursorRenderSquare = ( point, ts, color ) => {
    let params = {
      fill: "none", stroke: color,
      d: ["M", point.x, point.y, "L", point.x + ts, point.y, point.x + ts, point.y + ts, point.x, point.y + ts, point.x, point.y].join(" ")
    }
    svgSetAttributes( elements.cursor, params )
  }

  const editorDeleteTile = (container, list_object, point, map = null) => {
    let child = list_object[ point.row + "_" + point.column ];
    if( child == null ) return;
    document.getElementById(container).removeChild( child );
    delete list_object[point.row + "_" + point.column];
  }

  const editorMouseDownAction = point => {
    if(!tool.enabled) return;
    tool.active = true;
    editorToolAction( point );
  }

  const editorMouseUpAction = point => {
    tool.active = false;
  }

  const editorPlotCollisionTile = (value, point, ts) => {
    let path = null;
    if( value == ' ' ) editorDeleteTile( 'collision_tiles', collision_tiles, point, project.data.collision_tiles);
    if( value == 'S_sq' ) editorPlotSquareTile( 'collision_tiles', collision_tiles, point, ts, 'rgba(255,255,255,0.75)');
  }

  const editorPlotSquareTile = ( container_id, list_object, point, ts, color ) => {
    editorDeleteTile( container_id, list_object, point)
    const path = svgCreateElement('path', {
      fill: color,
      d: ["M", point.x, point.y, "L", point.x + ts, point.y, point.x + ts, point.y + ts, point.x, point.y + ts, point.x, point.y].join(" "),
    })
    list_object[ point.row + "_" + point.column ] = path;
    document.getElementById(container_id).append( path );
  }

  const editorToolAction = point => {
    if( tool.type == 'collision' ) editorPlotCollisionTile(tool.value, gridGetPosition(point.x, point.y), project.data.tile_size);
  }

  const editorUpdateInterface = ( ) => {
    let tile_size = project.data.tile_size
    svgSetAttributes(elements.small_grid, {width: tile_size, height: tile_size });
    svgSetAttributes(elements.small_grid.querySelector('path'), {d: `M ${tile_size} 0 L 0 0 0 ${tile_size}`});
    svgSetAttributes(elements.grid,  { width: tile_size * 10, height: tile_size * 10 });
    svgSetAttributes(elements.grid.querySelector('rect'), { width: tile_size * 10, height: tile_size * 10 });
    svgSetAttributes(elements.grid.querySelector('path'), { d: `M ${tile_size * 10} 0 L 0 0 0 ${tile_size* 10}` });
    svgSetAttributes(elements.cursor, { width: tile_size, height: tile_size});
  }

  const gridGetPosition = (x ,y) => {
    let row = Math.floor( y / project.data.tile_size );
    let column = Math.floor( x / project.data.tile_size );
    return {
      x: column * project.data.tile_size, y: row * project.data.tile_size,
      row: row, column: column
    }
  }

  const mouseGetRelativePoint = event => {
    let rect = elements.svg_container.getBoundingClientRect( );
    return { x: event.clientX - rect.x, y: event.clientY - rect.y }
  }

  const projectSetProject = _project => {
    project = _project;
    editorUpdateInterface( );
  }

  const renderCursorIcon = ( point ) => {
    let ts = project.data.tile_size
    if( tool.type == 'collision' && tool.value == ' ')
      svgSetAttributes( elements.cursor, { fill: 'none', d: `M ${point.x} ${point.y} L ${point.x + ts} ${point.y + ts} A ${point.x + ts/2} ${point.y + ts/2} 360`, stroke: 'red'});
  }

  const svgCreateElement = ( type, options ) => {
    const svg = document.createElementNS( svgNamespace, type );
    svgSetAttributes( svg, options);
    return svg;
  }

  const svgSetAttributes = ( element, options ) => {
    for( var attribute in options ) element.setAttribute( attribute, options[attribute]);
  }

  //Listeners =================================================================
  const onKeyEvent = event => {
    if( event.key.toLowerCase() == '1' ) tool.value = 'S_sq';
    if( event.key.toLowerCase() == 'delete' ) tool.value = ' ';
    cursorRender( mouse );
  }
  const onSVGMouseEvent = event => {
    if( !project) return;
    if( event.type == 'mouseleave') tool.enabled = false;
    if( event.type == 'mouseenter') tool.enabled = true;
    mouse = mouseGetRelativePoint( event );
    if( event.type == 'mousedown' ) editorMouseDownAction( mouse );
    if( event.type == 'mousemove' && tool.active && tool.enabled ) editorToolAction( mouse );
    if( event.type == 'mouseup') editorMouseUpAction( mouse );
    cursorRender( mouse );
  }

  return {
    initialize: initialize,
    setProject: projectSetProject,
  }

})( );

export default SilkTileEditor;
