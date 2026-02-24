// إعداد المشهد والكاميرا
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 100);

// إعداد Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('gameContainer').appendChild(renderer.domElement);

// إضافة إضاءة
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(50, 50, 50);
scene.add(light);

// إنشاء طاولة البلياردو
const tableGeometry = new THREE.BoxGeometry(100, 5, 50);
const tableMaterial = new THREE.MeshPhongMaterial({ color: 0x006400 });
const table = new THREE.Mesh(tableGeometry, tableMaterial);
table.position.y = -2.5;
scene.add(table);

// إنشاء كرات البلياردو
const balls = [];
const colors = [0xff0000, 0x0000ff, 0xffff00, 0xffffff]; // أحمر، أزرق، أصفر، أبيض

colors.forEach((color, i) => {
    const ballGeometry = new THREE.SphereGeometry(2, 32, 32);
    const ballMaterial = new THREE.MeshPhongMaterial({ color: color });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(i * 5 - 7.5, 2, 0);
    scene.add(ball);
    balls.push({ mesh: ball, velocity: new THREE.Vector3(0.1*(i+1), 0, 0.05*(i+1)) });
});

// تحديث الحركة
function animate() {
    requestAnimationFrame(animate);

    // تحريك الكرات
    balls.forEach(b => {
        b.mesh.position.add(b.velocity);

        // ارتداد عند حدود الطاولة
        if (b.mesh.position.x > 50 || b.mesh.position.x < -50) b.velocity.x *= -1;
        if (b.mesh.position.z > 25 || b.mesh.position.z < -25) b.velocity.z *= -1;
    });

    renderer.render(scene, camera);
}

animate();

// ضبط حجم الشاشة عند تغيير نافذة المتصفح
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});