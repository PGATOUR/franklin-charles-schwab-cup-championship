function displayVideo(e) {
  const block = e.target.closest('.block');
  const video = block.querySelector('.video');
  video.classList.add('video-play-mode');
  video.querySelector('iframe').src += '&autoplay=1';
}

function closeVideo(e) {
  const video = e.target.closest('.video');
  video.classList.remove('video-play-mode');
  const iframe = video.querySelector('iframe');
  iframe.src = iframe.getAttribute('src').replace('&autoplay=1', '');
}

function buildDefaultVideo(id) {
  const videoUrl = 'https://players.brightcove.net/6082840763001/SmCdEjug_default/index.html?videoId=';
  return `<div class="video-iframe-wrapper">
    <iframe src='${videoUrl}${id}' allow="encrypted-media" allowfullscreen></iframe>
  </div>`;
}

export default function decorate(block) {
  const status = block.getAttribute('data-video-status');
  // eslint-disable-next-line no-useless-return
  if (status === 'loaded') return;

  const id = block.textContent;
  if (id) {
    const video = buildDefaultVideo(id);
    block.innerHTML = video;

    const inHero = [...block.classList].includes('video-hero');
    if (inHero) {
      block.parentNode.classList.add('video-wrapper-hero');
      // build play button
      const playButton = document.createElement('div');
      playButton.classList.add('video-hero-play');
      playButton.addEventListener('click', displayVideo);
      block.parentNode.append(playButton);
      // build close button
      const closeButton = document.createElement('div');
      closeButton.classList.add('video-hero-close');
      closeButton.addEventListener('click', closeVideo);
      block.prepend(closeButton);
    }

    block.setAttribute('data-video-status', 'loaded');
  }
}
