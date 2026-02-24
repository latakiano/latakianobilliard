// --- مشهد وكاميرا ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x330011);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 60, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('gameContainer').appendChild(renderer.domElement);

// --- أضواء رومانسية ---
const light1 = new THREE.PointLight(0xff99cc, 1.2, 200);
light1.position.set(50, 50, 50);
scene.add(light1);
const light2 = new THREE.PointLight(0xffccff, 0.8, 200);
light2.position.set(-50, 50, -50);
scene.add(light2);
scene.add(new THREE.AmbientLight(0x404040, 0.5));

// --- Cannon.js World ---
const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });

// --- طاولات متعددة ---
let tableIndex = 0;
const tablesData = [
    { color: 0x006400 },
    { color: 0x552200 },
    { color: 0x333366 }
];

let tableShape = new CANNON.Box(new CANNON.Vec3(50, 2.5, 25));
let tableBody = new CANNON.Body({ mass: 0, shape: tableShape });
tableBody.position.set(0, -2.5, 0);
world.addBody(tableBody);

let tableMesh = new THREE.Mesh(new THREE.BoxGeometry(100,5,50), 
    new THREE.MeshPhongMaterial({color: tablesData[tableIndex].color}));
tableMesh.position.copy(tableBody.position);
scene.add(tableMesh);

// --- كرات ---
const balls = [];
const ballMeshes = [];
const ballRadius = 2;
const colors = [0xff0000, 0x0000ff, 0xffff00, 0xffffff];

colors.forEach((color, i) => {
    const sphereShape = new CANNON.Sphere(ballRadius);
    const sphereBody = new CANNON.Body({ mass: 1, shape: sphereShape, position: new CANNON.Vec3(i*5-7.5,2,0) });
    sphereBody.linearDamping = 0.3;
    world.addBody(sphereBody);
    balls.push(sphereBody);

    const sphereGeo = new THREE.SphereGeometry(ballRadius,32,32);
    const sphereMat = new THREE.MeshPhongMaterial({ color: color, shininess: 100 });
    const sphereMesh = new THREE.Mesh(sphereGeo,sphereMat);
    scene.add(sphereMesh);
    ballMeshes.push(sphereMesh);
});

// --- نظام Coins ---
let coins = 0;
function addCoins(amount){ coins += amount; document.getElementById('coins').innerText = "Coins: "+coins; }

// --- تغيير الطاولة ---
function changeTable(){
    tableIndex = (tableIndex+1)%tablesData.length;
    tableMesh.material.color.setHex(tablesData[tableIndex].color);
}
window.changeTable = changeTable;

// --- وضع التدريب ---
function trainingMode(){
    alert("وضع التدريب: حاول ضرب الكرة البيضاء في الهدف المحدد!");
}
window.trainingMode = trainingMode;

// --- النقر على الكرة البيضاء لإطلاقها ---
window.addEventListener('click', () => {
    const cueBall = balls[balls.length-1];
    cueBall.velocity.set(0,0,-30);
    addCoins(5); // مثال: ربح coins عند الضربة
});

// --- تحديث الحركة ---
const timeStep = 1/60;
function animate(){
    requestAnimationFrame(animate);
    world.step(timeStep);

    balls.forEach((ball,i)=> ballMeshes[i].position.copy(ball.position));
    renderer.render(scene,camera);
}
animate();

// --- ضبط الشاشة ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});