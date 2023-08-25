'use strict'


function renderGalleryImages() {
    let elImgsContainer = document.querySelector('.meme-gallery')
    let imgs = getGalleryImages()
    let strHTML = imgs.map(img => `<img src="${img.url}" alt="" class="image" onclick="onUpdategMemeImg(${img.id})"/>
    ` ).join('')

    elImgsContainer.innerHTML = strHTML
}

function onSetFilterBy(filterBy) {
    console.log('filterBy', filterBy)
    filterBy = setMemeFilter(filterBy)
    renderGalleryImages()

}

function setMemeFilter(filterBy) {
    if (filterBy.name && isNaN(filterBy.name)) {
        gFilterBy.name = filterBy.name
    } else if (!filterBy.name) {
        gFilterBy.name = ''
    }

    return gFilterBy
}


function onSetFilterByKeyword(value) {
    // console.log('value', value)
    let keyword = value.keyword.toLowerCase()

    setMemeFilter({ name: keyword })
    renderGalleryImages()

    // let elEl = getFilterElement(keyword)
    //לעבור על כל האלמנטים של הסינון ולתת להם גודל לפי המספר פעמים שנלחצו לפי המאפ שלהם
    // console.log('keyword', keyword)
}

function getFilterElement(keyword) {
    let elEl = document.querySelector(`.filter-${keyword}`);
    // console.log('elEl', elEl)
}