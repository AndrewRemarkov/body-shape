window.addEventListener('DOMContentLoaded', () => {
  const handlers = {
    trainer: new WeakMap(),
    program: new WeakMap(),
  }

  const setupTrainerCard = (card) => {
    const inner = card.querySelector('.trainer-card__inner')
    if (!inner) return

    const onMouseMove = (e) => {
      const { left, width } = card.getBoundingClientRect()
      const rotation = e.clientX - left < width / 2 ? -15 : 15
      inner.style.transform = `rotateY(${rotation}deg)`
    }

    const onMouseLeave = () => {
      inner.style.transform = 'rotateY(0deg)'
    }

    card.addEventListener('mousemove', onMouseMove)
    card.addEventListener('mouseleave', onMouseLeave)
    handlers.trainer.set(card, { onMouseMove, onMouseLeave })
  }

  const setupProgramCard = (card) => {
    const title = card.querySelector('.training-programs__card-title')
    if (!title) return

    const onMouseEnter = () => {
      const shift = card.clientWidth / 2 - title.clientWidth / 2
      title.style.transform = `translateX(${shift}px)`
    }

    const onMouseLeave = () => {
      title.style.transform = 'translateX(0)'
    }

    card.addEventListener('mouseenter', onMouseEnter)
    card.addEventListener('mouseleave', onMouseLeave)
    handlers.program.set(card, { onMouseEnter, onMouseLeave })
  }

  const clearHandlers = () => {
    document.querySelectorAll('.trainer-card').forEach((card) => {
      const handler = handlers.trainer.get(card)
      if (handler) {
        card.removeEventListener('mousemove', handler.onMouseMove)
        card.removeEventListener('mouseleave', handler.onMouseLeave)
        const inner = card.querySelector('.trainer-card__inner')
        if (inner) inner.style.transform = 'rotateY(0deg)'
      }
    })

    document.querySelectorAll('.training-programs__card').forEach((card) => {
      const handler = handlers.program.get(card)
      if (handler) {
        card.removeEventListener('mouseenter', handler.onMouseEnter)
        card.removeEventListener('mouseleave', handler.onMouseLeave)
        const title = card.querySelector('.training-programs__card-title')
        if (title) title.style.transform = ''
      }
    })

    handlers.trainer = new WeakMap()
    handlers.program = new WeakMap()
  }

  const initCards = () => {
    const isDesktop = window.innerWidth >= 1281

    if (!isDesktop) {
      clearHandlers()
      return
    }

    document.querySelectorAll('.trainer-card').forEach((card) => {
      if (!handlers.trainer.has(card)) {
        setupTrainerCard(card)
      }
    })

    document.querySelectorAll('.training-programs__card').forEach((card) => {
      if (!handlers.program.has(card)) {
        setupProgramCard(card)
      }
    })
  }

  let resizeTimer
  const handleResize = () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      initCards()
    }, 100)
  }

  initCards()

  window.addEventListener('resize', handleResize)
  window.addEventListener('orientationchange', handleResize)

  const footerYear = document.querySelector('#footer-year span')
  if (footerYear) footerYear.textContent = new Date().getFullYear()
})
