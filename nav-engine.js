(function() {
  // Inject Navigation DOM Containers into Body
  const navContainer = document.createElement('div');
  navContainer.id = 'salwet-nav-root';
  navContainer.innerHTML = `
    <div class="spotlight" id="spotlight"></div>
    <header class="tier1-header" id="tier1">
      <a href="/official-artist-portal" class="nav-node is-active" data-section="salwet">SALWET</a>
      <a href="/sound-services" class="nav-node" data-section="services">Services</a>
      <a href="/roster" class="nav-node" data-section="artists">Artists</a>
    </header>
    <button class="side-drawer-toggle" id="drawerToggle">☰ Menu</button>
    <nav class="side-drawer" id="sideDrawer">
      <div class="side-drawer-title" id="drawerCategoryTitle">Directory</div>
      <div id="drawerItems" style="display: flex; flex-direction: column; gap: 8px;"></div>
    </nav>
    <div class="floating-widget is-hidden" id="floatingWidget">
      <div class="floating-widget-title">Quick Jump</div>
      <div class="floating-anchors" id="floatingAnchorsList"></div>
    </div>
  `;
  document.body.appendChild(navContainer);

  const navData = {
    salwet: [
      { label: "Music", path: "/music", anchors: [{ label: "Music", target: "#music" }, { label: "Videos", target: "#videos" }, { label: "Content", target: "#content" }] },
      { label: "Merch", path: "/merch", anchors: [] },
      { label: "Private Commissions", path: "/private-commissions", anchors: [{ label: "Custom Song Gift", target: "#custom-song-gift" }, { label: "Hand-Made Illustration", target: "#handmade-illustration" }, { label: "Custom Content", target: "#custom-content" }] },
      { label: "Bookings", path: "/bookings", anchors: [] },
      { label: "Bio", path: "/bio", anchors: [{ label: "Early Life", target: "#early-life" }, { label: "Education", target: "#education" }, { label: "Career", target: "#career" }] }
    ],
    services: [
      { label: "360° Services", path: "/sound-360-services", anchors: [{ label: "For Artists", target: "#artists" }, { label: "Multi-Hyphenates", target: "#multi-hyphenates" }, { label: "ND Entrepreneurs", target: "#neurodivergents" }] },
      { label: "Music Production", path: "/sound-music", anchors: [{ label: "Songwriting", target: "#songwriting" }, { label: "Vocals", target: "#vocals" }, { label: "Beats", target: "#beats" }, { label: "Custom Songs", target: "#custom-songs" }, { label: "Distribution", target: "#music-distribution" }, { label: "Management", target: "#artist-management" }] },
      { label: "Visual Production", path: "/sound-visuals", anchors: [{ label: "Creative Direction", target: "#creative-direction" }, { label: "Music Videos", target: "#music-videos" }, { label: "Short Films", target: "#short-films" }, { label: "Brand Work", target: "#brand-work" }, { label: "Photography", target: "#photography" }, { label: "Graphic Design", target: "#graphic-design" }, { label: "Fine Arts", target: "#fine-arts" }, { label: "Youtube", target: "#youtube" }, { label: "Content", target: "#content-creation" }] },
      { label: "Web Design", path: "/sound-web-design", anchors: [{ label: "Hydra System", target: "#hydra-system" }, { label: "Brand Infra", target: "#brand-infrastructure" }, { label: "Digital Arch", target: "#digital-architecture" }, { label: "App Design", target: "#app-design" }] },
      { label: "Blog", path: "/sound-blog", anchors: [] },
      { label: "Store", path: "/sound-store", anchors: [] },
      { label: "About", path: "/sound-about", anchors: [] }
    ],
    artists: [
      { label: "Active Roster", path: "/roster", anchors: [] },
      { label: "Archive", path: "/archive", anchors: [] }
    ]
  };

  // Mouse Spotlight
  const spotlight = document.getElementById('spotlight');
  window.addEventListener('mousemove', (e) => {
    spotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });

  // Web Audio Synth
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playTone(freq, duration = 0.04) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  // Drawer Controls
  const drawerToggle = document.getElementById('drawerToggle');
  const sideDrawer = document.getElementById('sideDrawer');
  const drawerItems = document.getElementById('drawerItems');
  const drawerTitle = document.getElementById('drawerCategoryTitle');

  drawerToggle.addEventListener('click', () => {
    playTone(850, 0.05);
    sideDrawer.classList.toggle('is-open');
  });

  function renderDrawer(sectionKey) {
    const items = navData[sectionKey] || [];
    drawerTitle.textContent = sectionKey.toUpperCase() + " DIRECTORY";
    drawerItems.innerHTML = items.map(item => `
      <a href="${item.path}" class="nav-node" data-label="${item.label}">
        ${item.label}
      </a>
    `).join('');
  }

  // Floating Corner Widget Controls
  const floatingWidget = document.getElementById('floatingWidget');
  const floatingAnchorsList = document.getElementById('floatingAnchorsList');

  function updateFloatingWidget(anchors) {
    if (!anchors || anchors.length === 0) {
      floatingWidget.classList.add('is-hidden');
      return;
    }
    floatingAnchorsList.innerHTML = anchors.map(anc => `
      <a href="${anc.target}" class="nav-node">${anc.label}</a>
    `).join('');
    floatingWidget.classList.remove('is-hidden');
  }

  document.getElementById('tier1').addEventListener('click', (e) => {
    const node = e.target.closest('.nav-node');
    if (!node) return;
    playTone(1100, 0.08);

    document.querySelectorAll('#tier1 .nav-node').forEach(n => n.classList.remove('is-active'));
    node.classList.add('is-active');

    const sectionKey = node.getAttribute('data-section');
    renderDrawer(sectionKey);
    sideDrawer.classList.add('is-open');
  });

  sideDrawer.addEventListener('click', (e) => {
    const node = e.target.closest('.nav-node');
    if (!node) return;
    playTone(950, 0.06);

    document.querySelectorAll('.side-drawer .nav-node').forEach(n => n.classList.remove('is-active'));
    node.classList.add('is-active');

    const label = node.getAttribute('data-label');
    const activeSection = document.querySelector('#tier1 .is-active')?.getAttribute('data-section') || 'salwet';
    const foundItem = navData[activeSection]?.find(i => i.label === label);
    
    if (foundItem) {
      updateFloatingWidget(foundItem.anchors);
    }
  });

  // Default Initializer
  renderDrawer('salwet');
})();
