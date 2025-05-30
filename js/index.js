document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.trainer-card');
  const handlers = new WeakMap();

  function addListeners(card) {
    const inner = card.querySelector('.trainer-card__inner');
    if (!inner) return;

    const onMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const mid = rect.width / 2;
      const rotation = x < mid ? -15 : 15;
      inner.style.transform = `rotateY(${rotation}deg)`;
    };

    const onMouseLeave = () => {
      inner.style.transform = 'rotateY(0deg)';
    };

    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
    handlers.set(card, { onMouseMove, onMouseLeave });
  }

  function removeListeners(card) {
    const inner = card.querySelector('.trainer-card__inner');
    const handler = handlers.get(card);
    if (handler) {
      card.removeEventListener('mousemove', handler.onMouseMove);
      card.removeEventListener('mouseleave', handler.onMouseLeave);
      handlers.delete(card);
    }
    if (inner) {
      inner.style.transform = 'rotateY(0deg)';
    }
  }

  function updateListeners() {
    const shouldEnable = window.innerWidth >= 1281;
    cards.forEach((card) => {
      const isActive = handlers.has(card);
      if (shouldEnable && !isActive) {
        addListeners(card);
      } else if (!shouldEnable && isActive) {
        removeListeners(card);
      }
    });
  }

  updateListeners(); 
  window.addEventListener('resize', updateListeners);
  window.addEventListener('orientationchange', updateListeners);
});
