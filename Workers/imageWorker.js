onmessage = function( event ) {
  if( event.data[0] == 'image') {
    getImage( event.data[1] )
    .then( image => { postMessage({type:'image', data: image})})
    .catch( onError );
  }

  if( event.data[0] == 'data' ) {
    getColorSeperatedImageData( data[1] );
  }

}

const breakDownImageElement = imageElement => {
  getImageData( imageElement ).then( seperateColors ).then( imageDataPkg => {
    postMessage({type: 'seperatedImage', })
  })
  let canvas = new OffscreenCanvas( imageElement.width, imageElement.height );
  let ctx = canvas.getContext('2d');
  ctx.drawImage( imageElement, 0, 0 );
  let data = ctx.getIm
}

const getColorSeperatedImageData = function( imgOrURL ) {
  if( imgOrURL instanceof HTMLImageElement ) breakDownImageElement( imgOrURL );
  else if ( imgOrURL instanceof String ) getImage( imgOrURL ).then( breakDownImageElement ).catch( onError );
}

const getImage = function( url ) {
  return new Promise(function(resolve, reject) {
    const image = new Image();
    image.onload = function( ) {
      resolve( image );
    }
    image.onerror = function( ) {
      reject(`failed to load image from url: ${url}`)
    }
  });
}

const onError = function( error ) {
  postMessage({ type: 'error', data: error });
}
