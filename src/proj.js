import * as THREE from 'three';

var renderer, scene, camera
var map = {};

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function createScene() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper( 30 ));
}

function createTableFeet(width, height, depth, x, y, z) {
    const geometry = new THREE.BoxGeometry( width, height, depth);
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true} );
    const cube = new THREE.Mesh( geometry, material );
    cube.rotateZ(Math.PI / 2);
    cube.rotateX(Math.PI / 4);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    scene.add( cube );
}

function createTableTop(width, height, depth, x, y, z) {
    const geometry = new THREE.BoxGeometry( width, height, depth);
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true} );
    const cube = new THREE.Mesh( geometry, material );
    cube.rotateX(Math.PI /2 );
    cube.rotateZ(Math.PI / 4)
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    scene.add( cube );
}

function createStairs(width, height, depth, x, y, z) {
    const geometry = new THREE.BoxGeometry( width, height, depth);
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true} );
    const cube = new THREE.Mesh( geometry, material );
    cube.rotateX(-Math.PI /2 );
    cube.rotateZ(Math.PI / 4)
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    scene.add( cube );
}

function setCamera() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight,1,1000);
    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
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


function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createTableFeet(30,10,9,0,0,50);
    createTableFeet(30,10,9,50,0,0);
    createTableFeet(30,10,9,0,0,-50);
    createTableFeet(30,10,9,-50,0,0);
    createTableTop(46.5,46.5,0,21,30,21);
    createStairs(46.5,10,9,35,0,35);
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