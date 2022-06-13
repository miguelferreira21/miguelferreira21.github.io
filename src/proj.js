import * as THREE from 'three';

var renderer, scene, camera
var map = {};

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function createScene() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper( 10 ));
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

function createStairs(width, height, depth, x, y, z) {
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
    //function createTableFeet(width, height, depth, x, y, z)
    createFeet(30,10,9,50,5,20);
    createFeet(30,10,9,50,5,-20);
    createFeet(30,10,9,-50,5,-20);
    createFeet(30,10,9,-50,5,20);
    createStairs(40,10,30,65,5,10);
    createStairs(40,10,15,75,0,10);
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