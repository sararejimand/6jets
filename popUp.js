const legalOverlay = document.getElementById('legalOverlay');
const legalBtn = document.getElementById('legalBtn');
const closeLegal = document.getElementById('closeLegal');

legalBtn.addEventListener('click', () => {
    legalOverlay.style.display = 'block';
});

closeLegal.addEventListener('click', () => {
    legalOverlay.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === legalOverlay) {
        legalOverlay.style.display = 'none';
    }
});