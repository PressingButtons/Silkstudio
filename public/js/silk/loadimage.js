export function loadImage(url, toCanvas = false) {

    return new Promise(function(resolve, reject) {

        const image = new Image( );

        image.onload = event => {
            if(toCanvas) resolve(convertToCanvas(image));
            resolve(image);
        }

        image.onerror = event => {
            reject(event);
        }

        image.src = url;

    });

}

export async function loadImageFromFile(file, toCanvas) {
    const url = await readImageFile(file);
    return loadImage(url, toCanvas);
}


function readImageFile(file) {
    return new Promise(function(resolve, reject) {
        const reader = new FileReader( );
        reader.onload = event => {
            resolve(event.target.result);
        }

        reader.onerror = event => {
            reject(event);
        }
        reader.readAsDataURL(file);
    });
}


function convertToCanvas(image) {

    const canvas = document.createElement('canvas');

    canvas.width = image.width;
    canvas.height = image.height;

    canvas.getContext('2d').imageSmoothingEnabled = false;
    canvas.getContext('2d').drawImage(image, 0, 0);

    return canvas;

}