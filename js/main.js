'use strict'
let gCanvas
let gCtx
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
  gCanvas = document.querySelector('canvas')
  gCtx = gCanvas.getContext('2d')
  renderGalleryImages()
  addListeners()
}

function handleSectionDisplayV2(showSection) {
  let elGalleryContainer = document.querySelector('.meme-gallery-container')
  let elEditorContainer = document.querySelector('.meme-editor-container')
  let elSavedGalleryContainer = document.querySelector('.saved-memes-container')
  let elAboutMeContainer = document.querySelector('.about-me-container')

  elGalleryContainer.classList.add('hide')
  elEditorContainer.classList.add('hide')
  elSavedGalleryContainer.classList.add('hide')
  elAboutMeContainer.classList.add('hide')

  switch (showSection) {
    case 'gallery':
      elGalleryContainer.classList.remove('hide')
      if (document.body.classList.contains('menu-open')) {
        document.body.classList.toggle('menu-open')
      }
      break;

    case 'editor':
      elEditorContainer.classList.remove('hide')
      break;

    case 'saved-gallery':
      renderSavedMemesGallery();
      elSavedGalleryContainer.classList.remove('hide')
      if (document.body.classList.contains('menu-open')) {
        document.body.classList.toggle('menu-open')
      }
      break;

    case 'about':
      elAboutMeContainer.classList.remove('hide')
      if (document.body.classList.contains('menu-open')) {
        document.body.classList.toggle('menu-open')
      }
      break;
  }
}



function onDownloadCanvas(elLink) {
  // changeIsSaving(true)
  downloadCanvas(elLink)
  // changeIsSaving(false)
}

function changeIsSaving(state) {
  isHighlight = state
  renderMeme()
}

function downloadCanvas(elLink) {
  const dataUrl = gCanvas.toDataURL()
  // gMeme.dataUrl = dataUrl

  elLink.href = dataUrl
  elLink.download = 'my-meme'
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
}

// Read the file from the input
// When done send the image to the callback function
function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()

  reader.onload = function (event) {
    let img = new Image()
    img.src = event.target.result
    img.onload = () => onImageReady(img)
  }
  reader.readAsDataURL(ev.target.files[0])
}



function renderImg(img) {
  console.log('onProgress')
  // console.log('img', img)
  gMeme.uploadedImgUrl = img.src
  resetgMemeLines()
  renderMeme()
  handleSectionDisplayV2('editor')

}


function onShareImg() {
  // Gets the image from the canvas
  const imgDataUrl = gCanvas.toDataURL('image/jpeg')

  function onSuccess(uploadedImgUrl) {
    // Handle some special characters
    const url = encodeURIComponent(uploadedImgUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
  }

  // Send the image to the server
  doShareImg(imgDataUrl, onSuccess)
}

function doShareImg(imgDataUrl, onSuccess) {
  // Pack the image for delivery
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  // Send a post req with the image to the server
  const XHR = new XMLHttpRequest()
  XHR.onreadystatechange = () => {
    // If the request is not done, we have no business here yet, so return
    if (XHR.readyState !== XMLHttpRequest.DONE) return
    // if the response is not ok, show an error
    if (XHR.status !== 200) return console.error('Error uploading image')
    const { responseText: url } = XHR
    // Same as
    // const url = XHR.responseText

    // If the response is ok, call the onSuccess callback function, 
    // that will create the link to facebook using the url we got
    console.log('Got back live url:', url)
    onSuccess(url)
  }
  XHR.onerror = (req, ev) => {
    console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
  }
  XHR.open('POST', '//ca-upload.com/here/upload.php')
  XHR.send(formData)
}


function addListeners() {
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  gCanvas.addEventListener('mousedown', onDown)
  gCanvas.addEventListener('mousemove', onMove)
  gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gCanvas.addEventListener('touchstart', onDown)
  gCanvas.addEventListener('touchmove', onMove)
  gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  const meme = getMeme()
  const pos = getEvPos(ev)
  const click = checkClick(pos)
  if (!click.isLine) {
    isHighlight = true
    renderMeme()
    return
  }
  isHighlight = false
  // console.log('line clicked!!!')

  meme.selectedLineIdx = click.lineIdx
  changeTextInput()
  renderMeme()
  setLineDrag(true)
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function checkClick(clickedPos) {
  const click = { isLine: false }
  gMeme.lines.forEach((line, idx) => {
    const lineStartX = line.pos.x - (line.width / 2)
    const lineStartY = line.pos.y - (line.height / 2)

    if (clickedPos.x > lineStartX && clickedPos.x < (lineStartX + line.width)
      && clickedPos.y > lineStartY && clickedPos.y < (lineStartY + line.height)) {
      click.isLine = true
      click.lineIdx = idx
      return click
    }
  })
  return click
}

function onMove(ev) {
  const meme = getMeme()
  if (!meme.lines[meme.selectedLineIdx].isDrag) return

  const pos = getEvPos(ev)
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveLine(dx, dy)

  gStartPos = pos
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  document.body.style.cursor = 'default'
}


function getEvPos(ev) {

  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    // Prevent triggering the mouse ev
    ev.preventDefault()
    // Gets the first touch point
    ev = ev.changedTouches[0]
    // Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

function setLineDrag(isDrag) {
  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
  gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}



function toggleMenu() {
  document.body.classList.toggle('menu-open')
}