'use strict'
let gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'men','trump'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['animal'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'sleep', 'baby'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat', 'sleep', 'animal'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'men', 'smile'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['funny', 'baby', 'black'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['men', 'smile'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['funny', 'baby', 'smile'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['men', 'smile', 'black'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['funny', 'men', 'black'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['funny', 'men'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['men', 'smile'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['men', 'black'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['funny', 'men'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['funny', 'men', 'smile'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['men'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['funny'] },
]

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

let gFilterBy = { name: '' }



function getGalleryImages() {
    if (gFilterBy.name === '') {
        return gImgs
    }


    var gImgsCopy = gImgs.filter(img =>
        img.keywords.some(keyword =>
            keyword.toLowerCase().includes(gFilterBy.name.toLowerCase())
        )
    )
    return gImgsCopy
}

