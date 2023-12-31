'use strict'

function onUpdategMemeImg(imgId) {
    //this if is for the upload image
    if (gMeme.uploadedImgUrl) {
        gMeme.uploadedImgUrl = null
    }
    handleSectionDisplayV2('editor')
    updateMemeImg(imgId)
    resetgMemeLines()
    changeTextInput()
    renderMeme()
    console.log('gMeme', gMeme)
}

function renderMeme() {
    let elImg = new Image()
    if (gMeme.uploadedImgUrl) {
        elImg.src = gMeme.uploadedImgUrl
    } else {
        elImg.src = getImageUrl()
    }

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
        renderAllLines()
        if (!isHighlight) {
            drawFrame()
        }

    }

console.log('gMeme', gMeme)
}




function renderAllLines() {
    gMeme.lines.forEach((line, lineIdx) => {
        let txt = line.txt
        drawText(txt, line.pos.x, line.pos.y, lineIdx)
        setLineDimensions(txt, lineIdx)
    })
}

function drawFrame() {
    let line = gMeme.lines[gMeme.selectedLineIdx]
    if (!line || isHighlight) return

    let { pos, width, height } = line
    const padding = 5
    let x = pos.x
    let y = pos.y

    if (line.align === 'center') {
        x = pos.x - width / 2
    }
    else if (line.align === 'start') {
        x = pos.x
    }
    else if (line.align === 'end') {
        x = pos.x - width
    }

    y = y - height / 2;

    gCtx.beginPath();
    gCtx.rect(
        x - padding,
        y - padding,
        width + 2 * padding,
        height + 2 * padding
    );

    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 1
    gCtx.stroke()


}

function drawText(text, x, y, lineIdx) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = gMeme.lines[lineIdx].stroke
    gCtx.fillStyle = gMeme.lines[lineIdx].color
    gCtx.font = `${gMeme.lines[lineIdx].size}px ${gMeme.lines[lineIdx].font}`
    gCtx.textAlign = gMeme.lines[lineIdx].align
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    gMeme.lines[lineIdx].pos = { x, y }
}


function getImageUrl() {
    let elImgUrl = gImgs.find(img => img.id === gMeme.selectedImgId).url
    // var elImg = new Image()
    // elImg.src = elImgUrl
    return elImgUrl
}


function onSetLineTxt(value) {
    setLineTxt(value)
    renderMeme()
}

function onSetTxtColor(value) {
    setTxtColor(value)
    renderMeme()
}

function onSetTxtSize(action) {
    setTxtSize(action)
    renderMeme()
}

function onChangeFont(font) {
    updateTxtFont(font)
    renderMeme()
}

function onSetTxtStroke(value) {
    setTxtStrokeColor(value)
    renderMeme()
}

function onAddLine(value) {
    addLine(value)
    const center = { x: gCanvas.width / 2, y: gCanvas.height / 2 }
    let newLineIdx = gMeme.lines.length - 1
    let newTxt = gMeme.lines[newLineIdx].txt

    drawText(newTxt, center.x, center.y, newLineIdx)
    renderMeme()


}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onSwitchLine() {
    switchLineIdx()
    renderMeme()
    console.log('TEXT LINE NUMBER : ', gMeme.selectedLineIdx)
}

function onAlign(direction) {
    if (!direction) return
    gMeme.lines[gMeme.selectedLineIdx].align = direction
    console.log('gMeme', gMeme)
    renderMeme()

}

function onRenderRandomMeme() {
    console.log('Generating random meme')
    //this if is for the upload image for meme
    if (gMeme.uploadedImgUrl) {
        gMeme.uploadedImgUrl = null
    }
    handleSectionDisplayV2('editor')
    updateRandomMemeImg()
    resetgMemeLines()
    changeTextInput()
    renderMeme()
}

function onSaveMeme() {
    console.log('saving meme')
    saveMeme()
    renderSavedMemesGallery()
    handleSectionDisplayV2('saved-gallery')
}

function onAddSticker(value) {
    onAddLine(value)
}

function changeTextInput() {
    let elTextInput = document.querySelector('.text-edit-input')
    elTextInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
}
