// Toggling Skill Tabs

const tabs = document.querySelectorAll('[data-target]');
const tabContent = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContent.forEach(tabContents => {
            tabContents.classList.remove('skills-active');
        })

        target.classList.add('skills-active');

        tabs.forEach(tab => {
            tab.classList.remove('skills-active');
        })

        tab.classList.add('skills-active');
    })
})

//Mix it up Sorting

let mixerPortfolio = mixitup('.work-container', {
    selectors: {
        target: '.work-card'
    },
    animation: {
        duration: 300
    }
});

// Active link changing

const linkWork = document.querySelectorAll('.work-item');

function activeWork() {
    linkWork.forEach(l => l.classList.remove('active-work'))
    this.classList.add('active-work')
}
linkWork.forEach(l => l.addEventListener('click', activeWork));

//Portfolio Popup

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('work-button')){
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement);
    }
})

function togglePortfolioPopup() {
    document.querySelector('.portfolio-popup').classList.toggle('open');
}

document.querySelector('.portfolio-popup-close').addEventListener('click', togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
    document.querySelector('.pp-thumbnail img').src = portfolioItem.querySelector('.work-img').src;
    document.querySelector('.portfolio-popup-subtitle span').innerHTML = portfolioItem.querySelector('.work-title').innerHTML;
    document.querySelector('.portfolio-popup-body').innerHTML = portfolioItem.querySelector('.portfolio-item-details').innerHTML;
}

//Services Popup
const modalViews = document.querySelectorAll('.services-modal');
const modelBtns = document.querySelectorAll('.services-button');
const modalCloses = document.querySelectorAll('.services-modal-close');

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}

modelBtns.forEach((modelBtn, i) => {
    modelBtn.addEventListener('click', () => {
        modal(i);
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal');
        })
    })
})

//Swiper Testimonial

let swiper = new Swiper(".testimonials-container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 48,
        },
    },
});

// Input Animation

const inputs = document.querySelectorAll('.input');

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add('focus');
}

function blurFunc() {
    let parent = this.parentNode;
    if(this.value == "") {
        parent.classList.remove('focus');
    }
}

inputs.forEach((input) => {
    input.addEventListener('focus', focusFunc);
    input.addEventListener('blur', blurFunc);
})

// Scroll Section Active Link

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', navHighlighter);

function navHighlighter() {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    })
}

// Activating Sidebar

const navMenu = document.getElementById('sidebar');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-sidebar');
    })
}

if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-sidebar');
    })
}



// TAI ANH LEN
let scene, camera, renderer, particles;
let ww, wh;

let mouse = { x: 0, y: 0 };
let isMouseDown = false;
let originalPositions = [];

window.addEventListener("DOMContentLoaded", () => {
  init();
  animate();

  const crewMembers = [
    { name: "Nguyên Thảo", role: "nhóm trưởng" },
    { name: "Hương Giang", role: "Thành viên" },
    { name: "Minh Tâm", role: "Thành viên" },
    { name: "Cát Phượng", role: "Thành viên" },
    { name: "Tuấn Anh", role: "Thành viên" },
    { name: "Tiến Bảo", role: "Thành viên" },
    { name: "Phương Dung", role: "Thành viên" },
    { name: "Hà Linh", role: "Thành viên" },
    { name: "Huy Tựu", role: "Thành viên" },
    { name: "Trâm Ngân", role: "Thành viên" },
    ];

    const crewCards = document.querySelectorAll(".crew-card");
    const crewDots = document.querySelectorAll(".crew-dot");
    const crewName = document.querySelector(".crew-name");
    const crewRole = document.querySelector(".crew-role");
    const leftBtn = document.querySelector(".crew-left");
    const rightBtn = document.querySelector(".crew-right");

    let crewIndex = 0;
    let crewAnimating = false;

    function updateCrewCarousel(newIndex) {
    if (crewAnimating) return;
    crewAnimating = true;

    crewIndex = (newIndex + crewCards.length) % crewCards.length;

    crewCards.forEach((card, i) => {
        const offset = (i - crewIndex + crewCards.length) % crewCards.length;
        card.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");

        if (offset === 0) card.classList.add("center");
        else if (offset === 1) card.classList.add("right-1");
        else if (offset === 2) card.classList.add("right-2");
        else if (offset === crewCards.length - 1) card.classList.add("left-1");
        else if (offset === crewCards.length - 2) card.classList.add("left-2");
        else card.classList.add("hidden");
    });

    crewDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === crewIndex);
    });

    crewName.style.opacity = "0";
    crewRole.style.opacity = "0";

    setTimeout(() => {
        crewName.textContent = crewMembers[crewIndex].name;
        crewRole.textContent = crewMembers[crewIndex].role;
        crewName.style.opacity = "1";
        crewRole.style.opacity = "1";
    }, 300);

    setTimeout(() => {
        crewAnimating = false;
    }, 800);
    }

    leftBtn.addEventListener("click", () => updateCrewCarousel(crewIndex - 1));
    rightBtn.addEventListener("click", () => updateCrewCarousel(crewIndex + 1));
    crewDots.forEach((dot, i) => dot.addEventListener("click", () => updateCrewCarousel(i)));
    crewCards.forEach((card, i) => card.addEventListener("click", () => updateCrewCarousel(i)));

    document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") updateCrewCarousel(crewIndex - 1);
    else if (e.key === "ArrowRight") updateCrewCarousel(crewIndex + 1);
    });

    let touchStart = 0;
    let touchEnd = 0;

    document.addEventListener("touchstart", (e) => {
    touchStart = e.changedTouches[0].screenX;
    });
    document.addEventListener("touchend", (e) => {
    touchEnd = e.changedTouches[0].screenX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
        if (diff > 0) updateCrewCarousel(crewIndex + 1);
        else updateCrewCarousel(crewIndex - 1);
    }
    });

    updateCrewCarousel(0);

});

function init() {

  const homeSection = document.querySelector(".home");
  const canvasEl = document.getElementById("pixel-canvas");

  ww = homeSection.clientWidth;
  wh = homeSection.clientHeight;

  renderer = new THREE.WebGLRenderer({
    canvas: canvasEl,
    alpha: true,
    antialias: true
  });

  renderer.setSize(ww, wh);
  renderer.setPixelRatio(window.devicePixelRatio);

  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera(
    ww / -2, ww / 2,
    wh / 2, wh / -2,
    1,
    1000
  );

  camera.position.z = 10;

  let img = new Image();
  img.crossOrigin = "anonymous";
  img.src = "https://cdnv2.tgdd.vn/bhx-static/bhx/News/Images/2025/10/28/1584894/image1_202510282241163702.jpg";

  img.onload = function () {
    createParticles(img);
  };

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mousedown", () => isMouseDown = true);
  window.addEventListener("mouseup", () => isMouseDown = false);
  window.addEventListener("resize", onResize);
}

function createParticles(image) {

  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");

  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0);

  let imageData = ctx.getImageData(0, 0, image.width, image.height);

  let geometry = new THREE.BufferGeometry();
  let positions = [];
  let colors = [];

  for (let y = 0; y < image.height; y += 3) {
    for (let x = 0; x < image.width; x += 3) {

      let index = (y * image.width + x) * 4;
      let a = imageData.data[index + 3];

      if (a > 100) {

        let posX = x - image.width / 2;
        let posY = -(y - image.height / 2);

        positions.push(posX, posY, 0);
        originalPositions.push(posX, posY, 0);

        colors.push(
          imageData.data[index] / 255,
          imageData.data[index + 1] / 255,
          imageData.data[index + 2] / 255
        );
      }
    }
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );

  let material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);
}

function animate() {
  requestAnimationFrame(animate);

  if (!particles) return;

  let positions = particles.geometry.attributes.position.array;

  for (let i = 0; i < positions.length; i += 3) {

    let dx = mouse.x - positions[i];
    let dy = mouse.y - positions[i + 1];
    let distance = Math.sqrt(dx * dx + dy * dy);

    let force = 0;

    if (isMouseDown) {

        const radius = 40;
        const strength = 40;

        if (distance < radius) {

            const force = Math.exp(-(distance * distance) / (radius * radius));

            positions[i] -= dx * force * 0.2;
            positions[i + 1] -= dy * force * 0.2;
        }

    } else {
      // quay về vị trí gốc
      positions[i] += (originalPositions[i] - positions[i]) * 0.05;
      positions[i + 1] += (originalPositions[i + 1] - positions[i + 1]) * 0.05;
    }

    // idle floating nhẹ
    positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.02;
  }

  particles.geometry.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
}

function onMouseMove(e) {

    const rect = renderer.domElement.getBoundingClientRect();

    // Chuột theo hệ canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouse.x = x - ww / 2;
    mouse.y = -(y - wh / 2);
}

function onResize() {

  const homeSection = document.querySelector(".home");

  ww = homeSection.clientWidth;
  wh = homeSection.clientHeight;

  renderer.setSize(ww, wh);

  camera.left = ww / -2;
  camera.right = ww / 2;
  camera.top = wh / 2;
  camera.bottom = wh / -2;

  camera.updateProjectionMatrix();
}

console.log(canvasEl);

cards.forEach(c => c.classList.remove("active"));
cards[currentIndex].classList.add("active");