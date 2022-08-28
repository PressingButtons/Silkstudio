import {domLib as Dom} from './dom.js';
import * as Object from './object.js';
import loadForm from './loadform.js';
import {loadImage, loadImageFromFile} from './loadImage.js';

window.Silk = {
    Dom: Dom,
    Object : Object,
    loadForm: loadForm,
    loadImage: loadImage,
    loadImageFromFile: loadImageFromFile
}