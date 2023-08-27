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


// FIX IT THAT EVERY SAVED MEME WITH UPLOADED IMG HAS ITS OWN IMAGE AND NOT A GLOBAL UPLOADED IMAGE(FOR RE EDITING FROM SAVED GALLERY)
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

function deleteSavedMeme(dataUrl){
    console.log(dataUrl)
    let savedMemes = loadFromStorage(STORAGE_KEY)
    console.log(savedMemes)
    let memeIdx = savedMemes.findIndex(meme => meme.dataUrl === dataUrl)
    console.log(memeIdx)
    savedMemes.splice(memeIdx,1)
    saveToStorage(STORAGE_KEY,savedMemes)
}