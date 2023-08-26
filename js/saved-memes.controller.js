'use strict'

function renderSavedMemesGallery() {
    let elSavedMemesContainer = document.querySelector('.saved-meme-gallery')
    let savedMemesImgs = getSavedMemesImages()
    if (!savedMemesImgs) {
        elSavedMemesContainer.innerHTML = ''
        return
    }

    let strHTML = savedMemesImgs.map(dataUrl => `<img src="${dataUrl}" alt="" class="image" onclick="onEditMeme('${dataUrl}')"/>
` ).join('')

    elSavedMemesContainer.innerHTML = strHTML
}

function onEditMeme(dataUrl) {
    handleSectionDisplayV2('editor')
    let meme = getMemeByDataUrl(dataUrl)
    gMeme = meme
    if(gMeme.dataUrl){
        delete gMeme.dataUrl
    }
    renderMeme()
    console.log('gMeme', gMeme)
}
