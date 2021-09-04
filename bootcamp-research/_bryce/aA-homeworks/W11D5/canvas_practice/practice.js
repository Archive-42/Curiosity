document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("mycanvas");
  canvas.height = 500;
  canvas.width = 500;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = "green";
  ctx.fillRect(0,0,500,500);

  ctx.beginPath();
  ctx.arc(250,250,240,0,2*Math.PI);
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.fillStyle = "purple";
  ctx.fill();

  ctx.fillStyle = "magenta";
  ctx.beginPath();
  ctx.moveTo(250, 150);
  ctx.lineTo(150, 250);
  ctx.lineTo(250, 350);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 5;
  ctx.stroke();
});