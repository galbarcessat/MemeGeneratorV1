'use strict'

function renderSavedMemesGallery() {
    let elSavedMemesContainer = document.querySelector('.saved-meme-gallery')
    let savedMemesImgs = getSavedMemesImages()
    if (!savedMemesImgs) {
        elSavedMemesContainer.innerHTML = ''
        return
    }
    let strHTML = savedMemesImgs.map(dataUrl => `<div class="saved-meme-card"><img src="${dataUrl}" alt="" class="image" 
    onclick="onEditMeme('${dataUrl}')"/>
    <button class="delete-saved-btn" onclick="onDeleteSavedMeme('${dataUrl}')">Delete</button>
    </div>

` ).join('')

    elSavedMemesContainer.innerHTML = strHTML
}


function onEditMeme(dataUrl) {
    let meme = getMemeByDataUrl(dataUrl)
    gMeme = meme
    console.log('gMeme', gMeme)
    if (gMeme.dataUrl) {
        delete gMeme.dataUrl
    }
    changeTextInput()
    renderMeme()
    handleSectionDisplayV2('editor')

    console.log('gMeme', gMeme)
}

function onDeleteSavedMeme(dataUrl){
    deleteSavedMeme(dataUrl)
    renderSavedMemesGallery()
}

