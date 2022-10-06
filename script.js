// Responsive Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach((link) =>
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  })
);

// H1 Typewriter Effect
class TypeWriter {
  constructor(textElement, words, period) {
    this.textElement = textElement;
    this.words = words;
    this.text = '';
    this.wordIndex = 0;
    this.period = parseInt(period, 10);
    this.type();
    this.isDeleting = false;
  }
  type = function () {
    // get current index of word
    let current = this.wordIndex % this.words.length;
    // Get full text of current word
    let typeSpeed = 200 - Math.random() * 100;
    // set initial Type Speed
    let fullText = this.words[current];

    if (this.isDeleting) {
      typeSpeed /= 2;
      this.text = fullText.substring(0, this.text.length - 1);
    } else {
      this.text = fullText.substring(0, this.text.length + 1);
    }

    if (!this.isDeleting && this.text === fullText) {
      // Pause at the end
      typeSpeed = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before typing new word
      typeSpeed = 500;
    }

    // Insert new text into HTML
    this.textElement.innerHTML = `<span class="wrap">${this.text}</span>`;
    setTimeout(() => this.type(), typeSpeed);
  };
}

// Starting Effect On Window Load
window.onload = function () {
  let textElement = document.querySelector('.typewrite');
  let words = JSON.parse(textElement.getAttribute('data-words'));
  let period = textElement.getAttribute('data-period');
  new TypeWriter(textElement, words, period);
};
