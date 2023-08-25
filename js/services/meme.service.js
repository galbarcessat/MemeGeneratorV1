'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: []

}


let isHighlight

function getMeme() {
    return gMeme
}

function resetgMemeLines() {
    const center = { x: gCanvas.width / 2, y: gCanvas.height / 2 }
    gMeme.lines = [
        {
            pos: { x: center.x, y: center.y - 150 },
            txt: 'Enter text here',
            size: 40,
            color: 'white',
            align: 'center',
            font: 'Arial',
            stroke: 'black',
            isDrag: false
        },
        {
            pos: { x: center.x, y: center.y + 150 },
            txt: 'Enter text here',
            size: 40,
            color: 'white',
            align: 'center',
            font: 'Arial',
            stroke: 'black',
            isDrag: false

        }

    ]

}

function setLineDimensions(text, lineIdx) {
    // console.log('gMeme.lines', gMeme.lines)
    let measure = gCtx.measureText(text)
    gMeme.lines[lineIdx].height = measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent
    gMeme.lines[lineIdx].width = measure.actualBoundingBoxLeft + measure.actualBoundingBoxRight
}


function updateMemeImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(value) {
    gMeme.lines[gMeme.selectedLineIdx].txt = value
}

function setTxtColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].color = value
}

function setTxtSize(action) {
    console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx)
    if (action === '+') {
        gMeme.lines[gMeme.selectedLineIdx].size += 5
    } else if (action === '-') {
        gMeme.lines[gMeme.selectedLineIdx].size -= 5
    }

}

function setTxtStrokeColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = value
}

function updateTxtFont(font) {
    console.log('font', font)
    gMeme.lines[gMeme.selectedLineIdx].font = font

}

function addLine(txt = 'Enter text here') {
    let line = {
        pos: {},
        txt,
        size: 40,
        color: 'white',
        align: 'center',
        font: 'Arial',
        isDrag: false
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    setLineDimensions(line.txt, gMeme.selectedLineIdx)
    // console.log('gMeme', gMeme)
}

function deleteLine() {
    let selectedLineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
    // console.log('gMeme.lines', gMeme.lines)
}

function switchLineIdx() {
    let currentLineIdx = gMeme.selectedLineIdx
    if (currentLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx += 1
    else if (currentLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    changeTextInput()
}


function updateRandomMemeImg() {
    let memeImgId = getRandomImgId(gImgs)
    console.log('memeImgId', memeImgId)
    updateMemeImg(memeImgId)
}

function getRandomImgId(imgsArray) {
    const randomIndex = Math.floor(Math.random() * imgsArray.length);
    return imgsArray[randomIndex].id;
}

function saveMeme() {
    let savedMemes = loadFromStorage(STORAGE_KEY)
    if (!savedMemes || !savedMemes.length) savedMemes = []

    let gMemeCopy = structuredClone(gMeme);
    const dataUrl = gCanvas.toDataURL()
    gMemeCopy.dataUrl = dataUrl
    savedMemes.push(gMemeCopy)

    saveToStorage(STORAGE_KEY, savedMemes)
}


