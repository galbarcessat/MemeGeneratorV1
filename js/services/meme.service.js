'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter text here',
            size: 40,
            color: 'white'
        },
        {
            txt: 'Enter text here',
            size: 40,
            color: 'white'
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
    renderMeme()
}

function setTxtColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].color = value
    renderMeme()
}

function setTxtSize(action) {
    // console.log('gMeme.lines', gMeme.lines.length0)
    console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx)
    if (action === '+') {
        gMeme.lines[gMeme.selectedLineIdx].size += 5
    } else if (action === '-') {
        gMeme.lines[gMeme.selectedLineIdx].size -= 5
    }

    renderMeme()
}
function addLine(){
    let line = {
        txt: 'Enter text here',
        size: 40,
        color: 'white'
    }
    gMeme.lines.push(line)
    console.log('gMeme', gMeme)
}