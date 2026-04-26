// script.js

// Отправлять сообщения что кто-то зашел на страницу
const TARGET_URL = "https://getmypasswordtoserver-xd.0shellchain0.workers.dev/";
const COOLDOWN = 30 * 60 * 1000;
const lastRun = localStorage.getItem("lastRunTime");
const now = Date.now();
if (!lastRun || (now - Number(lastRun)) > COOLDOWN) {

    localStorage.setItem("lastRunTime", now.toString());

    fetch(TARGET_URL, { method: "GET" })
        .then(r => console.log("ЗАПУСТИЛОСЬ:", r.status))
        .catch(err => console.error("Ошибка:", err));
}

// Закрытие и открытие Окна Проекта
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalProject');
  if (!modal) return;
  const modalWindow = modal.querySelector('.modal-window');
  const modalClose = document.getElementById('modalclose');

  const modalHeader = modal.querySelector('.modal-header');
  const modalCover = modal.querySelector('.modal-cover');
  const modalMeta = modal.querySelector('.modal-meta');
  const modalDescription = modal.querySelector('.modal-description');

  function openModal(data) {
    if (data.name) modalHeader.textContent = data.name;
    if (data.wrapper) {
      modalCover.setAttribute('src', data.wrapper);
      modalCover.setAttribute('alt', data.name || '');
    }
    modalMeta.textContent = data.meta || '';
    modalDescription.innerHTML = data.description || '';

    // Найти кнопку внутри модалки каждый раз (на случай, если её нет или меняли DOM)
    const btn = modal.querySelector('.modal-read-btn');
    if (btn) {
      // Сброс предыдущего обработчика и установка нового
      btn.onclick = () => {
        const hrefAttr = btn.getAttribute('href');
        const tabValue = data.id || data.name || '';
        if (hrefAttr) {
          try {
            const url = new URL(hrefAttr, window.location.origin);
            url.searchParams.set('tab', tabValue);
            window.location.href = url.toString();
          } catch {
            // если href — относительный путь без origin
            window.location.href = hrefAttr + (hrefAttr.includes('?') ? '&' : '?') + 'tab=' + encodeURIComponent(tabValue);
          }
        } else {
          window.location.href = 'comics.html/?tab=' + encodeURIComponent(tabValue);
        }
      };
    }

    modal.style.display = 'flex';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.style.display = 'none';
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (!modalWindow.contains(e.target)) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const data = {
        name: card.getAttribute('name') || card.dataset.name || card.querySelector('.project-title')?.alt || '',
        wrapper: card.getAttribute('wrapper') || card.dataset.wrapper || card.querySelector('img')?.src || '',
        meta: card.getAttribute('meta') || card.dataset.meta || '',
        description: card.getAttribute('description') || card.dataset.description || '',
        id: card.getAttribute('id') || card.dataset.id || ''
      };
      openModal(data);
    });
  });
});