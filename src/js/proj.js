import * as THREE from 'three';

var renderer, scene, camera, nave, nose, naveBB
var map = {};
var theta, phi;
var trash = [];
var trashBB = [];

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function randomSpherePoint(x0,y0,z0,radius){
    var u = Math.random();
    var v = Math.random();
    theta = 2 * Math.PI * u;
    phi = Math.acos(2 * v - 1);
    var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
    var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
    var z = z0 + (radius * Math.cos(phi));
    return [x,y,z];
 }

function addCone(scene, radius, size_1, size_2, size_3, colorTo, rotation) {
    var mesh = new THREE.Mesh(
        new THREE.ConeGeometry(size_1, size_2, size_3), 
        new THREE.MeshBasicMaterial({ color: colorTo })
    );
    const [x,y,z] = randomSpherePoint(0,0,0,radius);
    mesh.position.set(x, y, z);
    mesh.rotation.z = Math.PI / rotation;
    scene.add(mesh);
    return mesh;
}

function addCube(scene, radius, size_1, size_2, size_3, colorTo, rotation) {
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(size_1, size_2, size_3), 
        new THREE.MeshBasicMaterial({ color: colorTo })
    );
    const [x,y,z] = randomSpherePoint(0,0,0,radius);
    mesh.position.set(x, y, z);
    mesh.rotation.y = Math.PI / rotation;
    scene.add(mesh);
    return mesh;
}

function addPyramid(scene, radius, size_1, size_2, size_3, size_4, size_5, colorTo) {
    const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(size_1,size_2,size_3, size_4, size_5), 
        new THREE.MeshBasicMaterial({ color: colorTo })
    );
    const [x,y,z] = randomSpherePoint(0,0,0,radius);  
    mesh.position.set(x, y, z);
    mesh.rotation.y = Math.PI / 4;
    scene.add(mesh);
    return mesh;
}

function addOctahedron(scene, radius, size_1, size_2, colorTo) {
    const mesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(size_1, size_2), 
        new THREE.MeshBasicMaterial({ color: colorTo })
    );
    const [x,y,z] = randomSpherePoint(0,0,0,radius);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    return mesh;
}

function addSpaceship(scene,x,y,z) {
    nave = new THREE.Object3D();
    const material1 = new THREE.MeshBasicMaterial({ color: 0x0af0e8 });
    const material2 = new THREE.MeshBasicMaterial({ color: 0xf50505 });
    const geometry1 = new THREE.CylinderGeometry(2, 2, 6, 32, 1);
    const geometry2 = new THREE.CylinderGeometry(1, 1, 3, 32, 1);
    const geometry3 = new THREE.CapsuleGeometry(0.5, 2, 10, 20)
    const mesh1 = new THREE.Mesh(geometry1, material1);
    const mesh2 = new THREE.Mesh(geometry2, material1);
    const mesh3 = new THREE.Mesh(geometry3, material2);
    const mesh4 = new THREE.Mesh(geometry3, material2);
    const mesh5 = new THREE.Mesh(geometry3, material2);
    const mesh6 = new THREE.Mesh(geometry3, material2);

    nave.add(mesh1);
    mesh2.position.y = mesh1.position.y + 4.5;
    nave.add(mesh2);
    nose = mesh2;
    mesh3.position.x = mesh1.position.x + 2.5;
    nave.add(mesh3);
    mesh4.position.x = mesh1.position.x - 2.5;
    nave.add(mesh4);
    mesh5.position.z = mesh1.position.z + 2.5;
    nave.add(mesh5);
    mesh6.position.z = mesh1.position.z - 2.5;
    nave.add(mesh6);
    nave.position.set(x,y,z);
    nave.rotation.z = Math.PI / 1.3;
    naveBB = new THREE.Sphere(nave.position,1);
    scene.add(nave);
    scene.add(naveBB);
}

function createBoundingSpheres() {
    for (var i = 0; i < 20; i++) {
        trashBB[i] = new THREE.Sphere(trash[i].position,1);
        scene.add(trashBB[i]);
    }

    
}

function createTrash(radius) {
    trash[0] = addCone(scene, radius, 1.75, 4, 32, 0xf57e42, 2);
    trash[1] = addCone(scene, radius,  1.75, 4, 32, 0xbff542, 5);
    trash[2] = addCone(scene, radius,  1.75, 4, 32, 0xa5a5a5, 3);
    trash[3] = addCone(scene, radius,  1.75, 4, 32, 0x8673a1, 4);
    trash[4] = addCone(scene, radius,  1.75, 4, 32, 0xc2b078, 1);
    trash[5] = addCube(scene, radius, 4, 4, 4, 0xd41111, 3);
    trash[6] = addCube(scene, radius, 3.5, 3.5, 3.5, 0x0c7d27, 3);
    trash[7] = addCube(scene, radius, 4, 4, 4, 0x826c34, 2);
    trash[8] = addCube(scene, radius, 4, 4, 4, 0x3b83bd, 4);
    trash[9] = addCube(scene, radius, 3.5, 3.5, 3.5, 0xb44c43, 2);
    trash[10] = addPyramid(scene, radius, 0, 2, 4, 4, 1, 0x1128d4);
    trash[11] = addPyramid(scene, radius, 0, 2, 4, 4, 1, 0xde4321);
    trash[12] = addPyramid(scene, radius, 0, 1.75, 4, 4, 1, 0xae4f43);
    trash[13] = addPyramid(scene, radius, 0, 1.75, 4, 4, 1, 0x308446);
    trash[14] = addPyramid(scene, radius, 0, 2, 4, 4, 1, 0xf44611);
    trash[15] = addOctahedron(scene, radius, 2, 0, 0xa718d6);
    trash[16] = addOctahedron(scene, radius, 2, 0, 0xe55137);
    trash[17] = addOctahedron(scene, radius, 2, 0, 0xf3da0b);
    trash[18] = addOctahedron(scene, radius, 2, 0, 0xea899a);
    trash[19] = addOctahedron(scene, radius, 2, 0, 0x256d7b);
    createBoundingSpheres();
    
}

function createRocket() {
    const [x,y,z] = randomSpherePoint(0,0,0,96);
    addSpaceship(scene,x,y,z);
}

function createGlobe(radius) {
    var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 30, 15), 
        new THREE.MeshBasicMaterial({color: 0x33ACFF , wireframe: true })
    );
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
}

function createScene() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper( 80 ));

    createGlobe(80);
    createTrash(96);
    createRocket();
}

function setCamera(type_1, type_2, type_3) {
    if (type_1 == 1) {
        camera = new THREE.OrthographicCamera( window.innerWidth / - 7, window.innerWidth / 7, window.innerHeight / 7, window.innerHeight / - 7, 1, 1000 );
        camera.userData = {mobile: false};
        camera.position.x = 0;
        camera.position.y = 30;
        camera.position.z = 150;
        camera.lookAt(scene.position);  
    }
    else if (type_2 == 1) {
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight,1,1000);
        camera.userData = {mobile: false};
        camera.position.x = 0;
        camera.position.y = 30;
        camera.position.z = 150;
        camera.lookAt(scene.position);
    }
    else if (type_3 == 1) {
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight,1,1000);
        camera.userData = {mobile: true};
        camera.position.x = nave.position.x;
        camera.position.y = nave.position.y;
        camera.position.z = nave.position.z;
    }
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}

function changeRocketPosition(left, up, right, down) {
    var ro1 = 96;
    var theta1 = Math.atan2(nave.position.z, nave.position.x) % (2 * Math.PI);
    var phi1 = Math.acos(nave.position.y / 96);
    if(down == 1) {
        theta1 = theta1 - 0.02;
    }
    if(left == 1) {
        phi1 = phi1 - 0.02;
    }
    if(up == 1) {
        theta1 = theta1 + 0.02;
    }
    if(right == 1) {
        phi1 = phi1 + 0.02
    }
    nave.position.x = ro1 * Math.sin(phi1) * Math.cos(theta1);
    nave.position.y = ro1 * Math.cos(phi1);
    nave.position.z = ro1 * Math.sin(phi1) * Math.sin(theta1);   

    if (camera.userData.mobile == true) {
        camera.position.x = nave.position.x;
        camera.position.y = nave.position.y + 6;
        camera.position.z = nave.position.z;
        camera.lookAt(nose.position.x, nose.position.y, nose.position.z);
    }
}

function changeCameras() {
    'use strict';
    if(map[49]) { // 1
        setCamera(1,0,0);
    }
    if(map[50]) { // 2
        setCamera(0,1,0);
    }
    if(map[51]) { // 3
        setCamera(0,0,1);
    }
}

function onKeyDown(event){ 
    var keyCode = event.keyCode;
    map[keyCode] = true;
    changeCameras();
}

function onKeyUp(event){ 
    var keyCode = event.keyCode;
    map[keyCode] = false;
}


function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    setCamera(1,0,0);

    window.addEventListener("resize", onResize);
    document.addEventListener("keydown", onKeyDown, true); 
    document.addEventListener("keyup", onKeyUp, true);
}

function animate() {
    'use strict';
    updateRocketPosition();
    detectCollision();
    render();
    requestAnimationFrame(animate);
}

function updateRocketPosition() {
    'use strict';
    if(map[37]) { // arrowLeft
        changeRocketPosition(1,0,0,0);
    }
    if(map[38]) { // arrowUp
        changeRocketPosition(0,1,0,0);
    }
    if(map[39]) { // arrowRight
        changeRocketPosition(0,0,1,0);
    }
    if(map[40]) { // arrowDown
        changeRocketPosition(0,0,0,1);
    }
}

function detectCollision() {
    for (var i = 0; i < 20; i++) {
        if (4 >= (trashBB[i].center.x - naveBB.center.x)**2 + (trashBB[i].center.y - naveBB.center.y)**2 + (trashBB[i].center.z - naveBB.center.z)**2 ) {
            scene.remove(trashBB[i]);
            scene.remove(trash[i]);
        }
    }
}

init();
animate();