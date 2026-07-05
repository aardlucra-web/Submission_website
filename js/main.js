
// this is SVG string so that i can have a Github button
const icons = {
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
    0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
    -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
    .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
    -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0
    1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
    1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
    1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>`,
};

// when a page louds check localstorage and see if dark body was on last visit
function initDarkMode() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }
}

// flips dark mode on or off then saves state to localstorage
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

// grabs from sitedata then sets the content.
function buildHero() {
  const h = siteData.hero;
  document.getElementById('hero-name').textContent = h.name;
  document.getElementById('hero-subtitle').textContent = h.subtitle;

  const av = document.getElementById('hero-avatar');
  if (h.avatar) {
    av.innerHTML = `<img src="${h.avatar}" alt="photo of Adrianne">`;
  } else {
    av.textContent = h.avatarEmoji;
  }
}

// more building stuff
function buildAbout() {
  const a = siteData.about;
  document.getElementById('about-name').textContent = a.fullName;
  document.getElementById('about-meta').textContent = `${a.location} · ${a.school}`;
  document.getElementById('about-bio').textContent = a.bio;

  document.getElementById('about-tags').innerHTML = a.interests
    .map((x, i) => `<span class="tag${i % 3 === 2 ? ' green' : ''}">${x}</span>`)
    .join('');
}


// bar for my hard skills
function buildSkills() {
  const s = siteData.skills;

  document.getElementById('skills-hard').innerHTML = s.hard.map(skill => `
    <div class="skill-item">
      <span class="skill-name">${skill.name}</span>
      <div class="skill-bar-bg">
        <div class="skill-bar" style="width:${skill.value}%"></div>
      </div>
    </div>
  `).join('');

  document.getElementById('skills-soft').innerHTML = s.soft
    .map(x => `<span class="tag">${x}</span>`)
    .join('');
}

// this is for my projects 
function buildProjects() {
  document.getElementById('projects-list').innerHTML = siteData.projects.map(p => `
    <div class="project-card">
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.description}</div>
      <div class="project-tags">
        ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      <a href="${p.link}" target="_blank" rel="noopener" class="project-link">↗ ${p.linkLabel}</a>
    </div>
  `).join('');
}

// guess what, this is for the contacts, its the same pattern as the others where we plug and play some stuff from data.js into the relevant ID's
function buildContact() {
  const c = siteData.contact;
  const el = document.getElementById('contact-email');
  el.textContent = c.email;
  el.href = `mailto:${c.email}`;

  document.getElementById('contact-socials').innerHTML = c.socials
    .map(s => `
      <a href="${s.url}" target="_blank" rel="noopener" class="social-btn">
        ${icons[s.icon] || '↗'}
        ${s.label}
      </a>
    `).join('');
}

// tracks mouse and enables dragging
function makeDraggable(panel) {
  const header = panel.querySelector('.panel-header');
  if (!header) return;

  let dragging = false;
  let startX, startY, startLeft, startTop;

//  when mouse gets held down record mouse and where panel is
  header.addEventListener('mousedown', e => {
    if (e.target.classList.contains('wm-btn')) return;
    if (e.target.classList.contains('panel-close-btn')) return;

    dragging  = true;
    startX    = e.clientX;
    startY    = e.clientY;
    startLeft = panel.offsetLeft;
    startTop  = panel.offsetTop;
    bringToFront(panel);
    e.preventDefault();
  });

// calculates position when mouse moves 
  document.addEventListener('mousemove', e => {
    if (!dragging) return;

    let l = startLeft + (e.clientX - startX);
    let t = startTop  + (e.clientY - startY);

    const d = document.getElementById('desktop');
    // panel no dragging off screen
    l = Math.max(0, Math.min(l, d.offsetWidth  - panel.offsetWidth));
    t = Math.max(0, Math.min(t, d.offsetHeight - panel.offsetHeight));

    panel.style.left = l + 'px';
    panel.style.top  = t + 'px';

    // data attribute to say that user dragged it. so that resize handler will stop snapping panel back
    panel.dataset.userMoved = 'true';
  });

//  when button release dragging = false
  document.addEventListener('mouseup', () => { dragging = false; });
}


// each click on a panel increments z by 1 and assigns it to that panel. 
// since each click is always higher than the last, the most recently clicked panel will always sit on top
let z = 100;
function bringToFront(panel) {
  z++;
  panel.style.zIndex = z;
}

// i didnt like how the panels would spawn, so this is to offset the spawnpoint 
const spawnOffsets = {
  about:    { x: -420, y: -150 },
  skills:   { x:  80,  y: -160 },
  projects: { x: -440, y:  80  },
  contact:  { x:  80,  y:  120 },
};

// only called when a panel opens initially it takes the center then adds the offset from above for the panel
// (it now also makes it so no more spawning off screen)
function positionPanel(name) {
  const panel  = document.getElementById(`panel-${name}`);
  const d      = document.getElementById('desktop');
  const offset = spawnOffsets[name];
  if (!panel || !offset) return;

  let l = (d.offsetWidth  / 2) + offset.x;
  let t = (d.offsetHeight / 2) + offset.y;

  l = Math.max(10, Math.min(l, d.offsetWidth  - panel.offsetWidth  - 10));
  t = Math.max(10, Math.min(t, d.offsetHeight - panel.offsetHeight - 10));

  panel.style.left = l + 'px';
  panel.style.top  = t + 'px';
}

// updates all the stuff that relates to panel (is visible, is hidden)
function showPanel(name) {
  const panel = document.getElementById(`panel-${name}`);
  const btn   = document.querySelector(`.taskbar-btn[data-panel="${name}"]`);
  if (!panel) return;

  panel.classList.add('is-visible');

  if (!panel.dataset.positioned) {
    positionPanel(name);
    panel.dataset.positioned = 'true';
  }

  bringToFront(panel);
  if (btn) btn.classList.remove('is-hidden');
}

// when panel dissapears this removes is-visible and adds the is-hidden back on the buttons
function hidePanel(name) {
  const panel = document.getElementById(`panel-${name}`);
  const btn   = document.querySelector(`.taskbar-btn[data-panel="${name}"]`);
  if (!panel) return;

  panel.classList.remove('is-visible');
  if (btn) btn.classList.add('is-hidden');
}

// panel checker. if panel is visible or not will call on the appotopriate action of hide/show panel 
function togglePanel(name) {
  const panel = document.getElementById(`panel-${name}`);
  if (!panel) return;
  panel.classList.contains('is-visible') ? hidePanel(name) : showPanel(name);
}



// VERY IMPORTANT THIS IS WHERE THE MAGIC HAPENS
// docmcontentloaded checks if HTML is fully parsed before running any JS everything inside the callback ONLY fires when the page is ready
document.addEventListener('DOMContentLoaded', () => {

    // initialise dark mode
  initDarkMode();

//   builds the panels and populate the content.
  buildHero();
  buildAbout();
  buildSkills();
  buildProjects();
  buildContact();

//   every panel gets drag behaviour and click to front behaviour 
  document.querySelectorAll('.panel').forEach(panel => {
    makeDraggable(panel);
    panel.addEventListener('mousedown', () => bringToFront(panel));
  });

  document.querySelectorAll('.taskbar-btn[data-panel]').forEach(btn => {
    btn.addEventListener('click', () => togglePanel(btn.dataset.panel));
  });

  document.querySelectorAll('.hero-link-btn[data-panel]').forEach(btn => {
    btn.addEventListener('click', () => togglePanel(btn.dataset.panel));
  });

  document.querySelectorAll('.panel-close-btn').forEach(btn => {
    btn.addEventListener('click', () => hidePanel(btn.dataset.close));
  });

  document.getElementById('dark-toggle').addEventListener('click', toggleDarkMode);

  window.addEventListener('resize', () => {
    ['about', 'skills', 'projects', 'contact'].forEach(name => {
      const p = document.getElementById(`panel-${name}`);
      if (p && !p.dataset.userMoved && p.classList.contains('is-visible')) {
        positionPanel(name);
      }
    });
  });

});