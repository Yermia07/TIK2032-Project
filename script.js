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
  lightbox.style.zIndex = 3000;
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

document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  const numberOfParticles = 100;
  const mouse = {
    x: null,
    y: null,
    radius: 150,
  };

  window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  class Particle {
    constructor(x, y, size, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speedX = speedX;
      this.speedY = speedY;
    }

    update() {
      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse interaction
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius + this.size) {
        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
          this.x += 10;
        }
        if (mouse.x > this.x && this.x > this.size * 10) {
          this.x -= 10;
        }
        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
          this.y += 10;
        }
        if (mouse.y > this.y && this.y > this.size * 10) {
          this.y -= 10;
        }
      }
    }

    draw() {
      ctx.fillStyle = '#8C5523';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 5 + 1;
      let x = Math.random() * (innerWidth - size * 2);
      let y = Math.random() * (innerHeight - size * 2);
      let speedX = Math.random() * 3 - 1.5;
      let speedY = Math.random() * 3 - 1.5;
      particles.push(new Particle(x, y, size, speedX, speedY));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
  }

  function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        let distance = (particles[a].x - particles[b].x) * (particles[a].x - particles[b].x) + (particles[a].y - particles[b].y) * (particles[a].y - particles[b].y);
        if (distance < (canvas.width / 7) * (canvas.height / 7)) {
          opacityValue = 1 - distance / 20000;
          ctx.strokeStyle = 'rgba(140, 85, 31,' + opacityValue + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = (canvas.height / 80) * (canvas.height / 80);
    init();
  });

  init();
  animate();
});

document.addEventListener('scroll', function () {
  const offset = window.pageYOffset;
  document.querySelector('.parallax-background').style.backgroundPositionY = offset * 0.5 + 'px';
});
