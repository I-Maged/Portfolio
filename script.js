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

// Starting Typewriter Effect On Window Load
window.onload = function () {
  let textElement = document.querySelector('.typewrite');
  let words = JSON.parse(textElement.getAttribute('data-words'));
  let period = textElement.getAttribute('data-period');
  new TypeWriter(textElement, words, period);
};

//Contact Form
//Form Validation
document.querySelector('button').addEventListener('click', (e) => {
  //Prevent auto submit
  e.preventDefault();
  //Remove success message
  document.querySelector('.sent').style.display = 'none';
  //declaring error messages
  const nameError = document.querySelector('.name-invalid');
  const emailError = document.querySelector('.email-invalid');
  const messageError = document.querySelector('.text-invalid');
  //declaring input fields
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const messageInput = document.querySelector('#textarea');
  //email validation expression
  const emailPattern =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  //name validation
  if (!/[a-zA-Z]/.test(nameInput.value) || nameInput.value.length < 2) {
    nameInput.classList.add('error');
    nameError.style.display = 'block';
    return;
  } else {
    nameInput.classList.remove('error');
    nameError.style.display = 'none';
  }

  //email validation
  if (!emailInput.value.match(emailPattern)) {
    emailInput.classList.add('error');
    emailError.style.display = 'block';
    return;
  } else {
    emailInput.classList.remove('error');
    emailError.style.display = 'none';
  }

  //message validation
  if (!/[a-zA-Z]/.test(messageInput.value) || messageInput.value.length < 10) {
    messageInput.classList.add('error');
    messageError.style.display = 'block';
    return;
  } else {
    messageInput.classList.remove('error');
    messageError.style.display = 'none';
  }

  sendMail(nameInput.value, emailInput.value, messageInput.value);
  nameInput.value = '';
  emailInput.value = '';
  messageInput.value = '';
});

//sending email via EmailJS
function sendMail(name, email, message) {
  const params = {
    full_name: name,
    email_id: email,
    text_message: message,
  };

  emailjs
    .send('service_43you4m', 'template_ayud15n', params, 'Ox0Zr69mEZSVGb1ba')
    .then(
      (result) => {
        document.querySelector('.sent').style.display = 'block';
      },
      (error) => {
        alert('FAILED SENDING MESSAGE');
      }
    );
}
