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


function deleteSavedMeme(dataUrl) {
    console.log(dataUrl)
    let savedMemes = loadFromStorage(STORAGE_KEY)
    console.log(savedMemes)
    let memeIdx = savedMemes.findIndex(meme => meme.dataUrl === dataUrl)
    console.log(memeIdx)
    savedMemes.splice(memeIdx, 1)
    saveToStorage(STORAGE_KEY, savedMemes)
}


