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
