export const fallingCoins = (duration = 5000) => {
  const exists = document.getElementById('gimmick');
  if (exists) {
    exists.parentNode.removeChild(exists);
    return false;
  }

  const element = document.querySelector('body');
  const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

  let focused = false;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%';
  canvas.id = 'gimmick';

  const coin = new Image();
  coin.src = 'http://i.imgur.com/5ZW2MT3.png';
  // 440 wide, 40 high, 10 states
  coin.onload = function () {
    element.appendChild(canvas);
    focused = true;

    drawloop();

    setTimeout(() => {
      focused = false;
      canvas.parentNode.removeChild(canvas);
    }, duration);
  };
  const coins = [];

  function drawloop() {
    if (focused) {
      requestAnimationFrame(drawloop);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.3) {
      coins.push({
        x: (Math.random() * canvas.width) | 0,
        y: -50,
        dy: 3,
        s: 0.5 + Math.random(),
        state: (Math.random() * 10) | 0,
      });
    }
    var i = coins.length;
    while (i--) {
      var x = coins[i].x;
      var y = coins[i].y;
      var s = coins[i].s;
      var state = coins[i].state;
      coins[i].state = state > 9 ? 0 : state + 0.1;
      coins[i].dy += 0.3;
      coins[i].y += coins[i].dy;

      ctx.drawImage(coin, 44 * Math.floor(state), 0, 44, 40, x, y, 44 * s, 40 * s);

      if (y > canvas.height) {
        coins.splice(i, 1);
      }
    }
  }
};
