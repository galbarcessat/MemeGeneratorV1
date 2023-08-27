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
    // <button class="delete-saved-btn">Delete</button> לעטוף בדיב את התמונה והכפתור
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
