
أنت قلت:
انت اعطيتني هذا الكود لاضعه في ملف index.html في جيت هب وقلت لي ستضع ملفات اخرى مثل style وغيرها لاحقا لتكون لعبة عالمية ثلاثية الابعاد تضاهي 8pall
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Latakiano Billiard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Latakiano Billiard</h1>
    <canvas id="gameCanvas" width="800" height="400"></canvas>
    <script src="game.js"></script>
</body>
</html>

قال ChatGPT:
تمام! الكود الذي أعطيتك إياه هو الهيكل الأساسي لصفحة HTML للعبة البلياردو. الآن نحتاج إلى ملفات إضافية لتعمل اللعبة بشكل كامل، مثل:

style.css → لتصميم واجهة اللعبة (ألوان، خلفيات، خطوط، أزرار).

game.js → لتشغيل اللعبة نفسها: حركة الكرات، الفيزياء، التصادمات، الحسابات الثلاثية الأبعاد.

لنجعل اللعبة ثلاثية الأبعاد وعالمية مثل 8Ball، سأعطيك مثال مبسط جدًا لكيفية تنظيم هذه الملفات، مع إمكانية تطويرها لاحقًا.

1️⃣ ملف style.css (تصميم واجهة اللعبة)
body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #2c3e50; /* خلفية داكنة */
    color: white;
    font-family: Arial, sans-serif;
}

h1 {
    margin-bottom: 20px;
}

canvas {
    border: 2px solid #ecf0f1;
    background-color: #27ae60; /* لون طاولة البلياردو */
}
2️⃣ ملف game.js (أساسيات الحركة والفيزياء)
سأضع لك مثال مبسط جدًا على محاكاة كرات البلياردو في 2D أولًا قبل أن ندخل الثلاثية الأبعاد. لاحقًا يمكن استخدام مكتبة مثل three.js لتحويلها لـ 3D.

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = Math.random() * 4 - 2;
        this.vy = Math.random() * 4 - 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // التصادم مع حدود الطاولة
        if(this.x + this.radius > canvas.width || this.x - this.radius < 0) this.vx *= -1;
        if(this.y + this.radius > canvas.height || this.y - this.radius < 0) this.vy *= -1;
    }
}

// إنشاء الكرات
const balls = [];
for(let i=0; i<8; i++){
    balls.push(new Ball(Math.random()*canvas.width, Math.random()*canvas.height, 15, 'white'));
}

function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    balls.forEach(ball => {
        ball.update();
        ball.draw();
    });
    requestAnimationFrame(animate);
}

animate();
