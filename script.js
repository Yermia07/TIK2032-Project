document.addEventListener('DOMContentLoaded', function () {
  // Attach a click event to all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  form.addEventListener('submit', function (e) {
    const message = document.querySelector("textarea[name='message']");
    if (!message.value.trim()) {
      e.preventDefault(); // Stop form from submitting
      alert('Please enter a message before sending.');
      message.focus();
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const accordionButtons = document.querySelectorAll('.accordion-btn');

  accordionButtons.forEach((button) => {
    button.addEventListener('click', function () {
      this.classList.toggle('active');
      var panel = this.nextElementSibling;
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
      } else {
        panel.style.display = 'block';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.gallery img');
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  document.body.appendChild(lightbox);

  images.forEach((image) => {
    image.addEventListener('click', () => {
      lightbox.classList.add('active');
      const img = document.createElement('img');
      img.src = image.src;
      // Ensure that the image fits well in the viewport
      img.style.maxWidth = '90%';
      img.style.maxHeight = '80vh';
      while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild);
      }
      lightbox.appendChild(img);
    });
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove('active');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const typeWriterElement = document.querySelector('.hero-content p');
  const textArray = ['Informatics Engineering Student at Universitas Sam Ratulangi, Manadoo', 'Seorang mahasiswa biasa saja0', 'Passionate about technology and innovation0', 'Selalu siap untuk setiap tantangan dan kesempatan0'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 40;
  let erasingDelay = 10;
  let newTextDelay = 500;

  function type() {
    if (isDeleting) {
      if (charIndex > 0) {
        typeWriterElement.textContent = textArray[textIndex].substring(0, charIndex--);
        setTimeout(type, erasingDelay);
      } else {
        isDeleting = false;
        textIndex++;
        if (textIndex >= textArray.length) textIndex = 0;
        setTimeout(type, typingDelay);
      }
    } else {
      if (charIndex < textArray[textIndex].length) {
        typeWriterElement.textContent = textArray[textIndex].substring(0, charIndex++);
        setTimeout(type, typingDelay);
      } else {
        isDeleting = true;
        setTimeout(type, newTextDelay);
      }
    }
  }

  type(); // Start the typing effect
});

document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is in view
    }
  );

  // Select all elements you want to animate
  const elementsToAnimate = document.querySelectorAll('.animated');
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });
});
