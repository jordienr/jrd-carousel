const JrdCarousel = require('./jrd-carousel')

const GLOBAL_OPTIONS = {
  images: [
    'http://images.com/image1.jpg',
    'http://images.com/image2.jpg'
  ]
}

beforeEach(() => {
  document.body.innerHTML = "<div id='carousel'></div>"
})

test('Not passing array of images throws an Error', () => {

  const options = {}

  const f = () => {
    JrdCarousel('carousel', options)
  } 
  
  expect(f).toThrow()
})

test('Passing correct options works', () => {
  const f = () => {
    JrdCarousel('carousel', GLOBAL_OPTIONS)
  } 
  expect(f).not.toThrow()
})

test('Calling JrdCarousel mounts the carousel', () => {
  JrdCarousel('carousel', GLOBAL_OPTIONS)
  const jrdCarousel = document.querySelector('.jrdc-container')
  expect(jrdCarousel).toBeTruthy()
})

test('First image is shown after mounting the component', () => {
  JrdCarousel('carousel', GLOBAL_OPTIONS)

  const image = document.querySelector('.jrdc-image').childNodes[0]

  expect(image.src).toEqual(GLOBAL_OPTIONS.images[0])
})

test('Next and previous buttons are mounted', () => {
  JrdCarousel('carousel', GLOBAL_OPTIONS)

  const nextBtn = document.querySelector('.jrdc-button--right')
  const prevBtn = document.querySelector('.jrdc-button--left')

  expect(nextBtn).toBeTruthy()
  expect(prevBtn).toBeTruthy()

})

test('Click on next button loads next image', () => {
  JrdCarousel('carousel', GLOBAL_OPTIONS)

  const nextBtn = document.querySelector('.jrdc-button--right')
  nextBtn.click()
  const imageBeingShown = document.querySelector('.jrdc-image').childNodes[0]

  expect(imageBeingShown.src).toEqual(GLOBAL_OPTIONS.images[1])
})

test('Click on previous button loads last image', () => {
  JrdCarousel('carousel', GLOBAL_OPTIONS)

  const nextBtn = document.querySelector('.jrdc-button--left')
  nextBtn.click()
  const imageBeingShown = document.querySelector('.jrdc-image').childNodes[0]

  expect(imageBeingShown.src).toEqual(GLOBAL_OPTIONS.images[GLOBAL_OPTIONS.images.length - 1])
})