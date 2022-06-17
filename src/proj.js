import * as THREE from 'three';
import  { VRButton } from 'vrbutton';

var renderer, scene, pauseScene, camera, pauseCamera,ispause, spotLight, piece1, piece2, piece3, shading, directional
var sceneObjects = [];
var map = {};
var lights = [];
var helpers = [];

function render() {
    'use strict';
    renderer.autoClear = false;
    renderer.clear();
    renderer.render(scene, camera);
    if (ispause == true){
      renderer.clearDepth();
      renderer.render(pauseScene, pauseCamera);
    }
}

function createScene() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper( 10 ));
    createFloor(120,46.5,0,0,20,0);
    createFeet(30,10,9,50,5,20);
    createFeet(30,10,9,50,5,-20);
    createFeet(30,10,9,-50,5,-20);
    createFeet(30,10,9,-50,5,20);
    createStep(40,10,30,65,5,10);
    createStep(40,10,15,75,0,10);
    createSpotlight(-40,60,7);
    createSpotlight(-3,60,7);
    createSpotlight(30,60,7);
    createPiece1();
    createPiece2();
    createPiece3();
    createLight(0,-40,55,5,0.3,25);
    createLight(1,-3,55,5,0.3,25);
    createLight(2,30,55,5,0.3,25);
    createDirectionalLight();
}


function createSpotlight(x,y,z) {
   spotLight = new THREE.Object3D();
    const material1 = new THREE.MeshLambertMaterial({ color: 0x808080});
    const material2 = new THREE.MeshLambertMaterial({ color: 0xcca300});
    const geometry1 = new THREE.ConeGeometry( 5, 10, 32 );
    const geometry2 =  new THREE.SphereGeometry(2, 32, 16 );
    const mesh1 = new THREE.Mesh(geometry1, material1);
    const mesh2 = new THREE.Mesh(geometry2, material2);

    spotLight.add(mesh1);
    mesh2.position.y = mesh1.position.y - 5;
    spotLight.add(mesh2);
    spotLight.position.set(x,y,z);
    scene.add(spotLight);
    sceneObjects.push(spotLight);
}


function createFloor(width, height, depth, x, y, z) {
    const geometry = new THREE.BoxGeometry( width, height, depth);
    const material = new THREE.MeshLambertMaterial( {color: 0xA37758, wireframe: false} );
    material.needsUpdate = true;
    const cube = new THREE.Mesh( geometry, material );
    cube.rotateX(Math.PI/2);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    scene.add( cube );
    sceneObjects.push(cube);
}

function createFeet(width, height, depth, x, y, z) {
    const geometry = new THREE.BoxGeometry( width, height, depth);
    const material = new THREE.MeshLambertMaterial( {color: 0xA37758, wireframe: false} );
    const cube = new THREE.Mesh( geometry, material );
    cube.rotateZ(Math.PI / 2);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    scene.add( cube );
    sceneObjects.push(cube);
}

function createStep(width, height, depth, x, y, z) {
    const geometry = new THREE.BoxGeometry( width, height, depth);
    geometry.computeVertexNormals();
    const material = new THREE.MeshLambertMaterial( {color: 0x653B1D, wireframe: false} );
    const step  = new THREE.Mesh( geometry, material );
    step.rotateX(-Math.PI/2);
    step.rotateZ(Math.PI/2);
    step.position.x = x;
    step.position.y = y;
    step.position.z = z;
    scene.add(step);
    sceneObjects.push(step);
}

function createPiece1() {
    piece1 = new THREE.Object3D();

    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array( [
        -6.0, -6.0,  6.0,
        6.0, -6.0,  5.0,
        6.0,  6.0,  6.0
    ] );
    var uvs = new Float32Array( [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0
    ]);

    var texture = new THREE.TextureLoader().load( './src/textures/paper1.jpg' );

    geometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.computeVertexNormals();
    var material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide } );
    var mesh1 = new THREE.Mesh( geometry, material );

    geometry = new THREE.BufferGeometry();
    vertices = new Float32Array( [
        6.0,  6.0,  6.0,
        -6.0,  6.0,  5.0,
        -6.0, -6.0,  6.0
    ] );

    geometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.computeVertexNormals();
    material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide } );
    var mesh2 = new THREE.Mesh( geometry, material );

    piece1.add(mesh1);
    piece1.add(mesh2);
    piece1.rotation.z = Math.PI / 4;
    piece1.position.y = 35;
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

    var uvs = new Float32Array( [
        0.0, 0.5,
        0.5, 0.0,
        1.0, 0.5,

        0.5, 1.0,
        0.5, 0.5,
        1.0, 0.5
    ]);

    var texture = new THREE.TextureLoader().load( './src/textures/paper1.jpg' );

    geometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.computeVertexNormals();
    var material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide } );
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
    geometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.computeVertexNormals();
    material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide  } );
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
    geometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.computeVertexNormals();
    material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide  } );
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
    piece3 = new THREE.Object3D();

    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array( [
        -6.25, 0.0,  7.0,
        -1.0, -7.0,  7.0,
        10.0,  -7.0,  7.0,

        -6.25, 0.0,  7.0,
        -1.0, -7.0,  7.0,
        9.0,  -4.0,  7.0,

        -6.25, 0.0,  7.0,
        10.0, -7.0,  7.0,
        9.0,  -2.9,  7.0
    ] );

    var uvs = new Float32Array( [
        0.0, 0.9,
        0.6, 0.0,
        1.0, 0.3,

        0.0, 0.9,
        1.0, 0.3,
        0.2, 0.9,

        0.0, 0.9,
        0.9, 0.7,
        0.2, 1.0
    ]);

    var texture = new THREE.TextureLoader().load( './src/textures/paper1.jpg' );

    geometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.computeVertexNormals();
    var material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide  } );
    const mesh1 = new THREE.Mesh( geometry, material );

    geometry = new THREE.BufferGeometry();
    vertices = new Float32Array( [
        6.0, 3.0,  7.3,
        10.0, -7.0,  7.3,
        12.0,  -5.0,  7.3,

        6.0, 3.0,  7.3,
        12.0,  -5.0,  7.3,
        7.0, 3.0,  7.3,

        6.0, 3.0,  7.3,
        11.5,  1.5,  7.3,
        7.0, 4.0,  7.3,
    ] );

    geometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.computeVertexNormals();
    material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide  } );
    const mesh2 = new THREE.Mesh( geometry, material );
    mesh2.position.x -= 0.5;
    mesh2.position.y -= 0.2;

    geometry = new THREE.BufferGeometry();
    vertices = new Float32Array( [
        1.0, -1.0,  7.2,
        -1.0, -7.0,  7.2,
        10.0,  -7.0,  7.2,

        1.0, -1.0,  7.2,
        -1.0, -7.0,  7.2,
        9.0,  -4.0,  7.2,

        1.0, -1.0,  7.2,
        10.0, -7.0,  7.2,
        9.0,  -2.9,  7.2
    ] );

    geometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.computeVertexNormals();
    material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide  } );
    const mesh3 = new THREE.Mesh( geometry, material );

    geometry = new THREE.BufferGeometry();
    vertices = new Float32Array( [
        1.0, -1.0,  7.2,
        2.0, -7.0,  7.2,
        10.0,  -7.0,  7.2,

        1.0, -1.0,  7.2,
        2.0, -7.0,  7.2,
        9.0,  -4.0,  7.2,

        1.0, -1.0,  7.2,
        10.0, -7.0,  7.2,
        9.0,  -2.9,  7.2
    ] );

    geometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.computeVertexNormals();
    material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide  } );
    const mesh4 = new THREE.Mesh( geometry, material );

    piece3.add(mesh1);
    piece3.add(mesh2);
    piece3.add(mesh3);
    piece3.add(mesh4);
    piece3.position.y = 35;
    piece3.position.x = 30;
    scene.add(piece3);
}


function createLight(n,x,y,z,angle,distance) {
    lights[n] = new THREE.SpotLight();
    lights[n].position.set( x, y, z );
    lights[n].userData = {on: false};
    lights[n].angle = angle;
    lights[n].distance = distance;
    helpers[n] = new THREE.SpotLightHelper(lights[n]);
}


function createDirectionalLight() {
    directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.x = 0;
    directional.position.y = 70;
    directional.position.z = 40;
    directional.userData = {on: false};
}

function flickerLight(n) {
    if (lights[n].userData.on == true) {
        scene.remove(lights[n]);
        scene.remove(helpers[n]);
        lights[n].userData.on = false;
    }

    else {
        scene.add(lights[n]);
        scene.add(helpers[n]);
        lights[n].userData.on = true;
    }
}

function flickerDirLight() {
    if (directional.userData.on == true) {
        scene.remove(directional);
        scene.remove(directional.target);
        directional.userData.on = false;
    }

    else {
        scene.add(directional);
        scene.add(directional.target);
        directional.userData.on = true;
    }
}

function setCamera(x, y, z, lookX, lookY, lookZ) {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight,1,1000);
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    camera.lookAt(lookX, lookY, lookZ);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}


function updatePiecesPosition(left_1, right_1, left_2, right_2, left_3, right_3) {
    if(left_1) { // q
        piece1.rotation.y += Math.PI / 16;
    }
    if(right_1) { // w
        piece1.rotation.y -= Math.PI / 16;
    }
    if(left_2) { // e
        piece2.rotation.y += Math.PI / 16;
    }
    if(right_2) { // r
        piece2.rotation.y -= Math.PI / 16;
    }
    if(left_3) { // t
        piece3.rotation.y += Math.PI / 16;
    }
    if(right_3) { // y
        piece3.rotation.y -= Math.PI / 16;
    }
}

function changeMaterials() {
    if(!shading) {
        shading = true;
        for (let i = 0; i < sceneObjects.length; i++) {
            if (i < 5) {
                sceneObjects[i].material = new THREE.MeshPhongMaterial( {color: 0xA37758, wireframe: false} );
            }
            else if(i < 7) {
                sceneObjects[i].material = new THREE.MeshPhongMaterial( {color: 0x653B1D, wireframe: false} );
            }
            else if(i < 10) {
                sceneObjects[i].material = new THREE.MeshPhongMaterial({ color: 0x808080});
            }
        }
        piece1.material = new THREE.MeshPhongMaterial( {color: 0xA37758, wireframe: false} );
        piece2.material = new THREE.MeshPhongMaterial( {color: 0xA37758, wireframe: false} );
        piece3.material = new THREE.MeshPhongMaterial( {color: 0xA37758, wireframe: false} );
        render();
    }
    else {
        shading = false;
        for (let i = 0; i < sceneObjects.length; i++) {
            if (i < 5) {
                sceneObjects[i].material = new THREE.MeshLambertMaterial( {color: 0xA37758, wireframe: false} );
            }
            else if(i < 7) {
                sceneObjects[i].material = new THREE.MeshLambertMaterial( {color: 0x653B1D, wireframe: false} );
            }
            else if(i < 10) {
                sceneObjects[i].material = new THREE.MeshLambertMaterial({ color: 0x808080});
            }
        }
        piece1.material = new THREE.MeshLambertMaterial( {color: 0xA37758, wireframe: false} );
        piece2.material = new THREE.MeshLambertMaterial( {color: 0xA37758, wireframe: false} );
        piece3.material = new THREE.MeshLambertMaterial( {color: 0xA37758, wireframe: false} );
        render();
    }
}

function keys() {
    'use strict';
    if(map[49]) { // 1
        setCamera(0, 60, 100, scene.position.x, scene.position.y, scene.position.z);
    }
    if(map[50]) { // 2
        setCamera(0, 30, 50, 0, 30, 0);
    }
    if(map[65]) { // a
        changeMaterials();
    } 
    if(map[81] && ispause == false) { // q
        updatePiecesPosition(1,0,0,0,0,0);
    }
    if(map[87] && ispause == false) { // w
        updatePiecesPosition(0,1,0,0,0,0);
    }
    if(map[69] && ispause == false) { // e
        updatePiecesPosition(0,0,1,0,0,0);
    }
    if(map[82] && ispause == false) { // r (move piece)
        updatePiecesPosition(0,0,0,1,0,0);
    }
    if(map[84] && ispause == false) { // t
        updatePiecesPosition(0,0,0,0,1,0);
    }
    if(map[89] && ispause == false) { // y
        updatePiecesPosition(0,0,0,0,0,1);
    }
    if(map[90]) { // z
        flickerLight(0);
    }
    if(map[88]) { // x
        flickerLight(1);
    }
    if(map[67]) { // c
        flickerLight(2);
    }
    if(map[68]) { // d
        flickerDirLight();
    }
    if(map[83]) { //s
        ispause = !ispause;
    }
    if(map[82] && ispause == true) { // R (refresh)
        scene.clear();
        pauseScene.clear();
        initScenes();
        const session = renderer.xr.getSession();

        if ( session !== null ) {
          
          session.end();
        
        }
    }
}

function showPauseMessage() {
    pauseScene = new THREE.Scene();
    pauseCamera = new THREE.OrthographicCamera(100 / - 2, 100 / 2, 30 / 2, 30 / - 2, 1, 1000);
    pauseCamera.position.x = 0;
    pauseCamera.position.y = 60;
    pauseCamera.position.z = 100;
    pauseCamera.lookAt(pauseScene.position.x,pauseScene.position.y,pauseScene.position.z);
    pauseScene.add(pauseCamera);
    const geometry = new THREE.PlaneGeometry(50, 20);
    const texture = new THREE.TextureLoader().load( './src/textures/man.jpg' );
    const material = new THREE.MeshBasicMaterial( {
        map: texture
    });
    const plane = new THREE.Mesh( geometry, material );
    plane.position.set(0,15,20)
    pauseScene.add( plane );
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
    document.body.appendChild( VRButton.createButton( renderer ) );
    renderer.xr.enabled = true;
    

    initScenes();


    window.addEventListener("resize", onResize);
    document.addEventListener("keydown", onKeyDown, true); 
    document.addEventListener("keyup", onKeyUp, true);
}

function initScenes() {
    ispause = false;
    shading = false;
    createScene();
    showPauseMessage();
    setCamera(0, 60, 100, scene.position.x, scene.position.y, scene.position.z);
}


function animate() {
    'use strict';

    renderer.setAnimationLoop( function () {

        render();
    
    } );
}

init();
animate();