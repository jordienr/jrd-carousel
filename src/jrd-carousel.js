function JrdCarousel(domId, options) {

  const { images = [], interval = 1500, autoplay = true, imagesToPreload = 2 } = options
  const carouselWrapper = document.getElementById(domId)
  const leftBtn = document.createElement('button')
  const rightBtn = document.createElement('button')
  const imagesWrapper = document.createElement('div')
  const carouselBody = document.createElement('div')
  const carouselFooter = document.createElement('div')
  const dotsWrapper = document.createElement('div')
  const totalImages = images?.length - 1
  const dotNodes = images.map(() => {
    const dot = document.createElement('span')
    dot.classList.add('jrdc-dot')
    return dot
  })

  
  // Error prevention
  function throwError(error) {
    throw new Error(error)
  }

  if (!images.length) {
    const error = 'JrdCarousel: no images found'
    console.error(error)
    throwError(error)
  }

  // ☢️ Reactivity
  const state = {
    _currentPage: 0,
    mountedImages: [],
    get currentPage() {
      return this._currentPage
    },
    set currentPage(val) {
      if (val > totalImages || val < 0) {
        return  
      } else {
        this._currentPage = val
        update()
      }
    }
  }

  function mountImagesToPreload() {
    for (let i = 0; i < imagesToPreload; i++) {
      const imageNodeWrapper = document.createElement('div')
      const imageNode = document.createElement('img')


      imageNodeWrapper.classList.add('jrdc-image')
      imageNode.src = images[i].src
      imageNode.alt = images[i].alt || ''
      imageNodeWrapper.appendChild(imageNode)
      state.mountedImages = [...state.mountedImages, imageNodeWrapper]
    }
  }

  function mountBody() {
    carouselWrapper.appendChild(carouselBody)
    carouselWrapper.appendChild(carouselFooter)
    carouselBody.appendChild(leftBtn)
    carouselBody.appendChild(imagesWrapper)
    carouselBody.appendChild(rightBtn)

    carouselWrapper.classList.add('jrdc-container')
    carouselBody.classList.add('jrdc-body')
    imagesWrapper.classList.add('jrdc-images')

  }

  function mountFooter() {
    carouselFooter.appendChild(dotsWrapper)
    dotNodes.forEach(node => dotsWrapper.appendChild(node))

    carouselFooter.classList.add('jrdc-footer')
    dotsWrapper.classList.add('jrdc-dots')
    dotsWrapper.childNodes[0].classList.add('active')
  }

  function mountButtons() {

    leftBtn.classList.add('jrdc-button', 'jrdc-button--left')
    rightBtn.classList.add('jrdc-button', 'jrdc-button--right')

  }



  // Auto swipe on interval
  const autoInterval = setInterval(() => {
    if (autoplay) {
      nextPage()
    }
  }, interval)

  function stopAutoInterval() {
    clearInterval(autoInterval)
  }

  // Lazy load images
  function loadImage(imageIndex) {
    // TODO: Load next image instead of current ?
    const imageNodeWrapper = document.createElement('div')
    const imageNode = new Image()
    imageNodeWrapper.classList.add('jrdc-image')
    imageNode.src = images[imageIndex].src
    imageNode.alt = images[imageIndex].alt || ''
    imageNodeWrapper.appendChild(imageNode)

    state.mountedImages = [...state.mountedImages, imageNodeWrapper]
  }

  function nextPage() {
    const nextPage = (state.currentPage === totalImages) ? 0 : state.currentPage + 1

    // Only load images if they have not been loaded
    if (!state.mountedImages[nextPage]) {
      loadImage(nextPage)
    }
    state.currentPage = nextPage
  }

  function prevPage() {
    const nextPage = (state.currentPage === 0) ? totalImages : state.currentPage - 1 
    if (!state.mountedImages[nextPage]) {
      loadImage(nextPage)
    } 
    state.currentPage = nextPage
  }

  // Manage transition css // TODO: Finish animations
  function animate() {
    imagesWrapper.childNodes[0].classList.toggle('jrdc-slide-out')
    imagesWrapper.childNodes[0].classList.toggle('jrdc-slide-in')
  }

  // Events
  leftBtn.addEventListener('click', () => {
    stopAutoInterval()
    prevPage()
  })
  rightBtn.addEventListener('click', () => {
    stopAutoInterval()
    nextPage()
  })

  // Update functions
  function syncImageWithPage() {
    imagesWrapper.innerHTML = ''
    imagesWrapper.appendChild(state.mountedImages[state.currentPage])
  }

  function syncDotsWithPage() {
    dotsWrapper.querySelector('.active').classList.remove('active')
    dotsWrapper.childNodes[state.currentPage].classList.add('active')
  }

  function update() {
    syncImageWithPage()
    syncDotsWithPage()
  }

  // Mount html & add css // TODO?: Template string might be cleaner
  (function mount() {
    mountImagesToPreload()
    mountButtons()
    mountBody()
    mountFooter()
    
    update()
  })()
}

module.exports = JrdCarousel