'use strict'

function onUpdategMemeImg(imgId) {
    updateMemeImg(imgId)
    renderMeme()
}

function renderMeme() {
    let elImg = getImage()
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

        const center = { x: gCanvas.width / 2, y: gCanvas.height / 2 }
        //selectedLineIdx
        let txt1 = gMeme.lines[0].txt
        let txt2 = gMeme.lines[1].txt
        drawText(txt1, center.x, center.y - 150, 0)
        drawText(txt2, center.x, center.y + 150, 1)
        // renderAllLines()
    }

}

function renderAllLines() {
    // let txt1 = gMeme.lines[0].txt
    // let txt2 = gMeme.lines[1].txt
    // drawText(txt1, center.x, center.y - 150, 0)
    // drawText(txt2, center.x, center.y + 150, 1)
    if (gMeme.lines.length > 2) {
        gMeme.lines.forEach((line, lineIdx) => {
            let txt = line.txt
            console.log('txt', txt)
            console.log('lineIdx', lineIdx)
            // drawText(txt,line.x,line.y,lineIdx)
        })
    }
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
}


function getImage() {
    let elImgUrl = gImgs.find(img => img.id === gMeme.selectedImgId).url
    var elImg = new Image()
    elImg.src = elImgUrl
    return elImg
}



function onDownloadCanvas(elLink) {
    const dataUrl = gCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'my-meme'

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

function onAddLine() {
    addLine()
    const center = { x: gCanvas.width / 2, y: gCanvas.height / 2 }
    let newLineIdx = gMeme.lines.length - 1
    let newTxt = gMeme.lines[newLineIdx].txt

    drawText(newTxt, center.x, center.y, newLineIdx)

}

function onDeleteLine(){
    console.log('DELETE LINE IN PROGRESS CONTINUE LATER')
    // deleteLine()
    // renderMeme()
}

function onSwitchLine() {
    switchLineIdx()
    console.log('TEXT LINE NUMBER : ', gMeme.selectedLineIdx)
}

function onAlign(direction) {
    if (!direction) return
    gMeme.lines[gMeme.selectedLineIdx].align = direction
    console.log('gMeme', gMeme)
    renderMeme()

}
