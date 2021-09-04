document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM Content Loaded!');
  const canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const context = canvas.getContext('2d');

  //   context.fillRect(x, y, width, height);
  context.fillRect(100, 100, 100, 100);
});
