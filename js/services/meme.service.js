'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter text here',
            size: 40,
            color: 'white',
            align: 'center',
            font: 'Arial',
            stroke: 'black'
        },
        {
            txt: 'Enter text here',
            size: 40,
            color: 'white',
            align: 'center',
            font: 'Arial',
            stroke: 'black'
        }

    ]
}

function getMeme() {
    return gMeme
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

function addLine() {
    let line = {
        txt: 'Enter text here',
        size: 40,
        color: 'white',
        align: 'center',
        font: 'Arial'
    }
    gMeme.lines.push(line)
    console.log('gMeme', gMeme)
}

// function deleteLine() {
//     console.log('gMeme.lines', gMeme.lines)
//     let selectedLineIdx = gMeme.selectedLineIdx
//     gMeme.lines.splice(selectedLineIdx, 1)
//     console.log('gMeme.lines', gMeme.lines)
// }

function switchLineIdx() {
    let currentLineIdx = gMeme.selectedLineIdx
    if (currentLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx += 1
    else if (currentLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
}