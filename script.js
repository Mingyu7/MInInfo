// 스크롤-투-탑 버튼 기능
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    var mybutton = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

document.getElementById("scrollToTopBtn").addEventListener("click", function () {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
});

// 타이핑 효과
document.addEventListener("DOMContentLoaded", function () {
    const typingTextElement = document.getElementById("typing-text");
    const text = "AI소프트웨어학과 이민규 입니다."; 
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingTextElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100); // 타이핑 속도(ms)
        }
    }
    typeWriter();

    // 스크롤 애니메이션
    const sections = document.querySelectorAll(".fade-in-section");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        observer.observe(section);
    });
});
// 파티클
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let w = window.innerWidth;
let h = window.innerHeight;

canvas.width = w;
canvas.height = h;

const mouse = {
  x: null,
  y: null,
  radius: 150
};

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

const colors = ['#ffffff', '#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1'];

class Particle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.baseRadius = Math.random() * 2 + 1;
    this.radius = this.baseRadius;
    this.vx = (Math.random() - 0.5) * 1;
    this.vy = (Math.random() - 0.5) * 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.growthDirection = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if(this.x < 0) this.x = w;
    else if(this.x > w) this.x = 0;

    if(this.y < 0) this.y = h;
    else if(this.y > h) this.y = 0;

    this.radius += 0.02 * this.growthDirection;
    if(this.radius > this.baseRadius + 0.5 || this.radius < this.baseRadius - 0.5) {
      this.growthDirection *= -1;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const particles = [];
const particleCount = 70;
const maxDistance = 130;

for(let i=0; i<particleCount; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, w, h);

  for(let i=0; i<particleCount; i++) {
    for(let j=i+1; j<particleCount; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);

      if(dist < maxDistance) {
        let opacity = 1 - dist / maxDistance;

        if(mouse.x && mouse.y) {
          const mdx = (particles[i].x + particles[j].x)/2 - mouse.x;
          const mdy = (particles[i].y + particles[j].y)/2 - mouse.y;
          const mdist = Math.sqrt(mdx*mdx + mdy*mdy);
          if(mdist < mouse.radius) {
            opacity = Math.min(opacity + (mouse.radius - mdist)/mouse.radius, 1);
          }
        }

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.7})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
});

