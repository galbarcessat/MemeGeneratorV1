'use strict'
let gCanvas
let gCtx


function onInit() {
    console.log('on init')
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    renderGalleryImages()
}