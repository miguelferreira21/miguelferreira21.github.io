import * as THREE from 'three';

var renderer, scene, camera, spotLight, piece1, piece2, piece3
var map = {};

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function createScene() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper( 10 ));
}


function createSpotlight(x,y,z) {
   spotLight = new THREE.Object3D();
    const material1 = new THREE.MeshBasicMaterial({ color: 0x808080});
    const material2 = new THREE.MeshBasicMaterial({ color: 0xcca300});
    const geometry1 = new THREE.ConeGeometry( 5, 10, 32 );
    const geometry2 =  new THREE.SphereGeometry(2, 32, 16 );
    const mesh1 = new THREE.Mesh(geometry1, material1);
    const mesh2 = new THREE.Mesh(geometry2, material2);

    spotLight.add(mesh1);
    mesh2.position.y = mesh1.position.y - 5;
    spotLight.add(mesh2);
    spotLight.position.set(x,y,z);
    scene.add(spotLight);

}


function createFloor(width, height, depth, x, y, z) {
    const geometry = new THREE.BoxGeometry( width, height, depth);
    const material = new THREE.MeshBasicMaterial( {color: 0xA37758, wireframe: false} );
    const cube = new THREE.Mesh( geometry, material );
    cube.rotateX(Math.PI/2);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    scene.add( cube );
}

function createFeet(width, height, depth, x, y, z) {
    const geometry = new THREE.BoxGeometry( width, height, depth);
    const material = new THREE.MeshBasicMaterial( {color: 0xA37758, wireframe: false} );
    const cube = new THREE.Mesh( geometry, material );
    cube.rotateZ(Math.PI / 2);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    scene.add( cube );
}

function createStep(width, height, depth, x, y, z) {
    const geometry = new THREE.BoxGeometry( width, height, depth);
    const material = new THREE.MeshBasicMaterial( {color: 0x653B1D, wireframe: false} );
    const step  = new THREE.Mesh( geometry, material );
    step.rotateX(-Math.PI/2);
    step.rotateZ(Math.PI/2);
    step.position.x = x;
    step.position.y = y;
    step.position.z = z;
    scene.add(step);
}

function createPiece1() {
    piece1 = new THREE.Object3D();

    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array( [
        -6.0, -6.0,  6.0,
        6.0, -6.0,  5.0,
        6.0,  6.0,  6.0,
    ] );

    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    var material = new THREE.MeshBasicMaterial( { color: 0xEAEAEA } );
    var mesh1 = new THREE.Mesh( geometry, material );

    geometry = new THREE.BufferGeometry();
    vertices = new Float32Array( [
        6.0,  6.0,  6.0,
        -6.0,  6.0,  5.0,
        -6.0, -6.0,  6.0
    ] );

    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
    var mesh2 = new THREE.Mesh( geometry, material );

    piece1.add(mesh1);
    piece1.add(mesh2);
    piece1.rotation.z = Math.PI / 4;
    piece1.position.y = 37;
    piece1.position.x = -40;
    scene.add(piece1);
}

function createPiece2() {
    piece2 = new THREE.Object3D();

    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array( [
        -6.25, -7.0,  7.0,
        6.25, -10.0,  7.0,
        9.25,  -7.0,  7.0,      
        
        6.25, -3.7,  7.0,
        -6.25, -7.0,  7.0,
        9.25,  -7.0,  7.0,  
    ] );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    var material = new THREE.MeshBasicMaterial( { color: 0xD0CDCD } );
    var mesh1 = new THREE.Mesh( geometry, material )
    
    geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array( [
        -6.25, -7.0,  7.0,
        6.25, -10.0,  7.0,
        5.25,  -7.0,  7.0,      
        
        6.25, -3.7,  7.0,
        -6.25, -7.0,  7.0,
        5.25,  -7.0,  7.0, 
        
    ] );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    material = new THREE.MeshBasicMaterial( { color: 0xF4EFEF } );
    const mesh2 = new THREE.Mesh( geometry, material );

    geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array( [
        -6.25, -7.0,  7.1,
        4.25, -9.6,  7.1,
        5.25,  -7.0,  7.1,      
        
        4.25, -3.84,  7.1,
        -6.25, -7.0,  7.1,
        5.25,  -7.0,  7.1, 
        
    ] );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
    const mesh3 = new THREE.Mesh( geometry, material );
    
    piece2.add(mesh1);
    piece2.add(mesh2);
    piece2.add(mesh3);
    piece2.rotation.z = Math.PI / 2;
    piece2.position.y = 35;
    piece2.position.x = -10;
    scene.add(piece2);

}

function createPiece3() {


    
}

/*
function createLight(x,y,z,fov,near,far) {
    const spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( x, y, z );

    spotLight.castShadow = true;

    scene.add( spotLight );
}*/

function setCamera() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight,1,1000);
    camera.position.x = 0;
    camera.position.y = 50;
    camera.position.z = 100;
    camera.lookAt(scene.position);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}


function keys() {
    'use strict';

    if(map[81]) { // q

    }
    if(map[87]) { // w
        
    }
    if(map[69]) { // e

    }
    if(map[82]) { // r

    }
    if(map[84]) { // t
        
    }
    if(map[89]) { // y
        
    }
    if(map[90]) { // z
        //createLight(-40,50,0);
    }
}

function onKeyDown(event){ 
    var keyCode = event.keyCode;
    map[keyCode] = true;
    keys();
}

function onKeyUp(event){ 
    var keyCode = event.keyCode;
    map[keyCode] = false;
}


function createPodium() {
    createFloor(120,46.5,0,0,20,0);
    createFeet(30,10,9,50,5,20);
    createFeet(30,10,9,50,5,-20);
    createFeet(30,10,9,-50,5,-20);
    createFeet(30,10,9,-50,5,20);
    createStep(40,10,30,65,5,10);
    createStep(40,10,15,75,0,10);
    createPiece1();
    createPiece2();
    createPiece3();
    createSpotlight(-40,60,0);
    createSpotlight(-20,60,-20);
    createSpotlight(0,60,-40);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createPodium();
    setCamera();

    window.addEventListener("resize", onResize);
    document.addEventListener("keydown", onKeyDown, true); 
    document.addEventListener("keyup", onKeyUp, true);
}

function animate() {
    'use strict';
    render();
    requestAnimationFrame(animate);
}

init();
animate();