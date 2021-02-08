import SilkTileEditor from '/src/js/silk.TileEditor.js';
import SilkTileProject from '/src/js/silk.TileProject.js'

const tileApp = (function( ) {


  SilkTileEditor.initialize( );
  SilkTileEditor.setProject( new SilkTileProject( 50, 30, 16 ));

})( );
