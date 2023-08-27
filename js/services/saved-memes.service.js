'use strict'
const STORAGE_KEY = 'savedMemes'

function getSavedMemesImages() {

    const memes = loadFromStorage(STORAGE_KEY)
    if (!memes || !memes.length) return
    let memesImages = memes.reduce((t, meme) => {
        t.push(meme.dataUrl)
        return t
    }, [])
    return memesImages

}

function getMemeByDataUrl(dataUrl) {
    let savedMemes = loadFromStorage(STORAGE_KEY)
    return savedMemes.find(meme => meme.dataUrl === dataUrl)
}


