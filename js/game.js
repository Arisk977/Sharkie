let canvas;
let character = new Image();
let ctx;

function init(){
 canvas = document.getElementById('canvas');
 ctx = canvas.getContext('2d');

 character.src = '../assets/1.Sharkie/1.IDLE/1.png';
 setTimeout(function(){
ctx.drawImage(character, 20, 250, 250, 200);
 }, 2000)
 
}