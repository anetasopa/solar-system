function loaded() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  var moonImage = document.getElementById("moonImage");

  let mouseIsDown = false;

  let SCALE = 0.1;
  let OFFSET_X = 150;
  let OFFSET_Y = 150;
  let width = canvas.width * SCALE;
  let height = canvas.height * SCALE;

  let moonJupiter2 = {
    x: width / 2 + OFFSET_X,
    y: height / 2 + OFFSET_Y,
    vx: 0.1,
    vy: 0.1,
    accelerationX: 0.01 * 20,
    accelerationY: 0.01 * 20,
    radius: width / 16,
    imgSize: width / 16,
    img: moonImage,
    draw: function () {
      this.radius = width / 8;
      this.imgSize = width / 22;
      ctx.drawImage(
        moonImage,
        this.x - this.imgSize / 2,
        this.y - this.imgSize / 2,
        this.imgSize,
        this.imgSize
      );
    },
    updatePosition: function () {
      this.vx = this.accelerationX + this.vx;
      this.vy = this.accelerationY + this.vy;
      this.x = this.radius * Math.sin(this.vx) + jupiter.x;
      this.y = this.radius * Math.cos(this.vy) + jupiter.y;
    }
  };

  let moonJupiter = {
    x: width / 2 + OFFSET_X,
    y: height / 2 + OFFSET_Y,
    vx: 0.1,
    vy: 0.1,
    accelerationX: 0.01 * 4,
    accelerationY: 0.01 * 4,
    radius: width / 16,
    imgSize: width / 16,
    img: moonImage,
    draw: function () {
      this.radius = width / 12;
      this.imgSize = width / 25;
      ctx.drawImage(
        moonImage,
        this.x - this.imgSize / 2,
        this.y - this.imgSize / 2,
        this.imgSize,
        this.imgSize
      );
    },
    updatePosition: function () {
      this.vx = this.accelerationX + this.vx;
      this.vy = this.accelerationY + this.vy;
      this.x = this.radius * Math.sin(this.vx) + jupiter.x;
      this.y = this.radius * Math.cos(this.vy) + jupiter.y;
    }
  };

  let moonEarth = {
    x: width / 2 + OFFSET_X,
    y: height / 2 + OFFSET_Y,
    vx: 0.1,
    vy: 0.1,
    accelerationX: (0.01 * 365) / 400,
    accelerationY: (0.01 * 365) / 400,
    radius: width / 20,
    imgSize: width / 20,
    img: moonImage,
    draw: function () {
      this.radius = width / 20;
      this.imgSize = width / 50;
      ctx.drawImage(
        moonImage,
        this.x - this.imgSize / 2,
        this.y - this.imgSize / 2,
        this.imgSize,
        this.imgSize
      );
    },
    updatePosition: function () {
      this.vx = this.accelerationX + this.vx;
      this.vy = this.accelerationY + this.vy;
      this.x = this.radius * Math.sin(this.vx) + earth.x;
      this.y = this.radius * Math.cos(this.vy) + earth.y;
    }
  };

  const dragOffset = { x: 0, y: 0 };
  const lastPostion = { x: OFFSET_X, y: OFFSET_Y };

  canvas.onmousedown = function (e) {
    dragOffset.x = e.x;
    dragOffset.y = e.y;

    mouseIsDown = true;
  };

  canvas.onmouseup = function (e) {
    mouseIsDown = false;

    lastPostion.x = OFFSET_X;
    lastPostion.y = OFFSET_Y;
  };

  canvas.onmousemove = function (e) {
    if (!mouseIsDown) return;

    OFFSET_X = lastPostion.x + e.x - dragOffset.x;
    OFFSET_Y = lastPostion.y + e.y - dragOffset.y;

    return false;
  };

  canvas.onwheel = function (event) {
    let scale = event.deltaY * 0.01 + SCALE;
    if (scale > 0.05 && scale < 1) {
      SCALE = scale;

      width = canvas.width * SCALE;
      height = canvas.height * SCALE;
    }

    /*     console.log('SCALE');
          console.log(SCALE);
          console.log(event.deltaY);
          console.log(width);
          console.log(height); */
  };

  var sunImage = document.getElementById("sunImage");
  var mercuryImage = document.getElementById("mercuryImage");
  var venusImage = document.getElementById("venusImage");
  var earthImage = document.getElementById("earthImage");
  var marsImage = document.getElementById("marsImage");
  var jupiterImage = document.getElementById("jupiterImage");
  var saturnImage = document.getElementById("saturnImage");
  var uranusImage = document.getElementById("uranusImage");
  var neptunImage = document.getElementById("neptunImage");

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function createdStars(options) {
    var createdStar = {
      x: options.x,
      y: options.y,
      radius: options.radius,
      color: options.color,
      draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    };

    return createdStar;
  }

  let stars = [];
  for (let i = 0; i < 500; i++) {
    const options = {
      x: getRndInteger(0, canvas.width),
      y: getRndInteger(0, canvas.height),
      radius: getRndInteger(1, 1),
      color: getRandomColor()
    };
    const createStars = createdStars(options);

    stars.push(createStars);
  }

  function drawOrbit(radius) {
    ctx.beginPath();
    ctx.arc(
      width / 2 + OFFSET_X,
      height / 2 + OFFSET_Y,
      radius,
      0,
      Math.PI * 2,
      true
    );
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function updatePosition(that) {
    that.vx = that.accelerationX + that.vx;
    that.vy = that.accelerationY + that.vy;
    that.x = that.radius * Math.sin(that.vx) + width / 2 + OFFSET_X;
    that.y = that.radius * Math.cos(that.vy) + height / 2 + OFFSET_Y;
  }

  function drawPlanet(that, img) {
    ctx.drawImage(
      img,
      that.x - that.imgSize / 2,
      that.y - that.imgSize / 2,
      that.imgSize,
      that.imgSize
    );
  }

  var sun = {
    x: width / 2 + OFFSET_X,
    y: height / 2 + OFFSET_Y,
    imgSize: width / 9,
    draw: function () {
      this.imgSize = width / 9;
      ctx.drawImage(
        sunImage,
        this.x - this.imgSize / 2,
        this.y - this.imgSize / 2,
        this.imgSize,
        this.imgSize
      );
    },
    updatePosition: function () {
      this.x = width / 2 + OFFSET_X;
      this.y = height / 2 + OFFSET_Y;
    }
  };

  var mercury = {
    vx: 0.1,
    vy: 0.1,
    accelerationX: (0.01 * 365) / 87,
    accelerationY: (0.01 * 365) / 87,
    imgSize: width / 24,
    img: mercuryImage,
    update: function () {
      this.radius = width / 11;
      this.imgSize = width / 24;
      updatePosition(this);
      drawOrbit(this.radius);
      drawPlanet(this, this.img);
    }
  };

  var venus = {
    vx: 0.1,
    vy: 0.1,
    accelerationX: (0.01 * 365) / 244,
    accelerationY: (0.01 * 365) / 244,
    radius: width / 9,
    imgSize: width / 24,
    img: venusImage,
    update: function () {
      this.radius = width / 6;
      this.imgSize = width / 24;
      updatePosition(this);
      drawOrbit(this.radius);
      drawPlanet(this, this.img);
    }
  };

  var earth = {
    vx: 0.1,
    vy: 0.1,
    accelerationX: 0.001,
    accelerationY: 0.001,
    radius: width / 6,
    imgSize: width / 22,
    img: earthImage,
    update: function () {
      this.radius = width / 4;
      this.imgSize = width / 22;
      updatePosition(this);
      drawOrbit(this.radius);
      drawPlanet(this, this.img);
    }
  };

  var mars = {
    vx: 0.1,
    vy: 0.1,
    accelerationX: (0.01 * 365) / 686,
    accelerationY: (0.01 * 365) / 686,
    radius: width / 4,
    imgSize: width / 14,
    img: marsImage,
    update: function () {
      this.radius = width / 3;
      this.imgSize = width / 14;
      updatePosition(this);
      drawOrbit(this.radius);
      drawPlanet(this, this.img);
    }
  };

  var jupiter = {
    vx: 0.1,
    vy: 0.1,
    accelerationX: (0.01 * 365) / 978,
    accelerationY: (0.01 * 365) / 978,
    radius: width / 2.7,
    imgSize: width / 7,
    img: jupiterImage,
    update: function () {
      this.radius = width / 2;
      this.imgSize = width / 7;
      updatePosition(this);
      drawOrbit(this.radius);
      drawPlanet(this, this.img);
    }
  };

  var saturn = {
    vx: 0.1,
    vy: 0.1,
    accelerationX: (0.01 * 365) / 766,
    accelerationY: (0.01 * 365) / 766,
    radius: width / 2,
    imgSize: width / 7,
    img: saturnImage,
    update: function () {
      this.radius = width / 1.5;
      this.imgSize = width / 7;
      updatePosition(this);
      drawOrbit(this.radius);
      drawPlanet(this, this.img);
    }
  };

  var uranus = {
    vx: 0.1,
    vy: 0.1,
    accelerationX: (0.01 * 365) / 686,
    accelerationY: (0.01 * 365) / 686,
    radius: width / 1.5,
    imgSize: width / 18,
    img: uranusImage,
    update: function () {
      this.radius = width / 1.3;
      this.imgSize = width / 18;
      updatePosition(this);
      drawOrbit(this.radius);
      drawPlanet(this, this.img);
    }
  };

  var neptun = {
    vx: 0.1,
    vy: 0.1,
    accelerationX: (0.01 * 365) / 897,
    accelerationY: (0.01 * 365) / 897,
    radius: width / 1.2,
    imgSize: width / 22,
    img: neptunImage,
    update: function () {
      this.radius = width / 1.1;
      this.imgSize = width / 22;
      updatePosition(this);
      drawOrbit(this.radius);
      drawPlanet(this, this.img);
    }
  };

  function animation() {
    window.requestAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const moreStars = stars;

    moreStars.forEach((createdStars) => {
      createdStars.draw();
    });

    sun.draw();
    sun.updatePosition();

    mercury.update();
    venus.update();
    earth.update();
    mars.update();
    jupiter.update();
    saturn.update();
    uranus.update();
    neptun.update();

    moonEarth.draw();
    moonEarth.updatePosition();

    moonJupiter.draw();
    moonJupiter.updatePosition();

    moonJupiter2.draw();
    moonJupiter2.updatePosition();
  }

  animation();

}
