import * as THREE from 'three';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';

let camera;
let scene;
let renderer;
let geometry;
let material;
let texture;
let mesh;

let controls;
let scene1;

let arrowForm;
let arrowMaterial;
let arrowRoom;
let arrowStage;
let arrowEntrance;

init();
animate();

const firstScene = document.getElementById('scene1');

/*
*********************************************
Button to go back to the first scene after watching videos
*********************************************
*/
firstScene.addEventListener('click', () => {
    scene = scene1;
    firstScene.style.display = 'none';

    const overlay = document.getElementById('videoOverlay');
    const player = document.querySelector('#videoOverlay iframe');
    
    overlay.style.display = 'none';
    player.src = ""; 
});


function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0, 0, 0.1);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.outputEncoding = THREE.sRGBEncoding;
    
    document.body.appendChild(renderer.domElement);


    /*
    *********************************************
    Creation of the scene
    *********************************************
    */
    scene1 = new THREE.Scene();
    geometry = new THREE.SphereGeometry(50, 32, 32);
    texture = new THREE.TextureLoader().load('public/salle.jpg');
    texture.colorSpace = THREE.SRGBColorSpace;
    material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        });
    mesh = new THREE.Mesh(geometry, material);
    scene1.add(mesh);

    /*
    *********************************************
    Creation of the 360° image
    *********************************************
    */
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(1, -3, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = -0.5;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI;


    /*
    *********************************************
    Creation of the arrows to mark 
    *********************************************
    */
    arrowForm = new THREE.ConeGeometry(1.5, -3, 3 )
    arrowMaterial = new THREE.MeshBasicMaterial({ color: 0xFFF1D0 });
    arrowRoom = new THREE.Mesh(arrowForm, arrowMaterial);
    arrowStage = new THREE.Mesh(arrowForm, arrowMaterial);
    arrowEntrance = new THREE.Mesh(arrowForm, arrowMaterial);

    //stage hotspot
    arrowStage.position.set(40, -10, 5);
    arrowStage.lookAt(0, 0, 0); 
    scene1.add(arrowStage);

    //salle hotspot
    arrowRoom.position.set(0, -10, 0);
    arrowRoom.lookAt(0, 0, 0); 
    scene1.add(arrowRoom);

    //entrance hotspot
    arrowEntrance.position.set(-40, -10, -5);
    arrowEntrance.lookAt(0, 0, 0); 
    scene1.add(arrowEntrance);


    /*
    *********************************************
    Implement the video
    *********************************************
    */
    // students'videos
    const thumbnail = new THREE.TextureLoader().load('https://i3.ytimg.com/vi/D-bA3cG8k2c/sddefault.jpg');
    let videoMaterial = new THREE.MeshBasicMaterial({
        map: thumbnail, 
        side: THREE.FrontSide
    });
    let videoForm = new THREE.BoxGeometry(15, 10, 0);
    let videoScreen = new THREE.Mesh(videoForm, videoMaterial);
    thumbnail.colorSpace = THREE.SRGBColorSpace;
    videoScreen.position.set(-10, 3, 36);
    videoScreen.lookAt(-1, 5, 0); 
    scene1.add(videoScreen);

    const thumbnail2 = new THREE.TextureLoader().load('https://i3.ytimg.com/vi/0f1wrOGvUh4/sddefault.jpg');
    let videoMaterial2 = new THREE.MeshBasicMaterial({
        map: thumbnail2, 
        side: THREE.FrontSide
    });
    let videoForm2 = new THREE.BoxGeometry(15, 10, 0);
    let videoScreen2 = new THREE.Mesh(videoForm2, videoMaterial2);
    thumbnail2.colorSpace = THREE.SRGBColorSpace;
    videoScreen2.position.set(-30, 3, 30);
    videoScreen2.lookAt(-18, 3, 0); 
    scene1.add(videoScreen2);

    const thumbnail3 = new THREE.TextureLoader().load('https://i3.ytimg.com/vi/YnqISPa5EMo/sddefault.jpg');
    let videoMaterial3 = new THREE.MeshBasicMaterial({
        map: thumbnail3, 
        side: THREE.FrontSide
    });
    let videoForm3 = new THREE.BoxGeometry(15, 10, 0);
    let videoScreen3 = new THREE.Mesh(videoForm3, videoMaterial3);
    thumbnail3.colorSpace = THREE.SRGBColorSpace;
    videoScreen3.position.set(-5, 3, -30);
    videoScreen3.lookAt(-8, 2, 2); 
    scene1.add(videoScreen3);

    const thumbnail4 = new THREE.TextureLoader().load('https://i3.ytimg.com/vi/e-_xdZLPIn0/sddefault.jpg');
    let videoMaterial4 = new THREE.MeshBasicMaterial({
        map: thumbnail4, 
        side: THREE.FrontSide
    });
    let videoForm4 = new THREE.BoxGeometry(15, 10, 0);
    let videoScreen4 = new THREE.Mesh(videoForm4, videoMaterial4);
    thumbnail4.colorSpace = THREE.SRGBColorSpace;
    videoScreen4.position.set(-26, 3, -35);
    videoScreen4.lookAt(-30, 2, 2); 
    scene1.add(videoScreen4);

    // Unternehr's video
    const thumbnail5 = new THREE.TextureLoader().load('https://i3.ytimg.com/vi/yJJ0tt6R2HI/sddefault.jpg');
    let videoMaterial5 = new THREE.MeshBasicMaterial({
        map: thumbnail5, 
        side: THREE.FrontSide
    });
    let videoForm5 = new THREE.BoxGeometry(40, 25, 0);
    let videoScreen5 = new THREE.Mesh(videoForm5, videoMaterial5);
    thumbnail5.colorSpace = THREE.SRGBColorSpace;
    videoScreen5.position.set(40, 8, 6);
    videoScreen5.lookAt(-5, 6, 0); 

    // Sociologist's video
    const thumbnail6 = new THREE.TextureLoader().load('https://i3.ytimg.com/vi/g3a5yjGwk9E/sddefault.jpg');
    let videoMaterial6 = new THREE.MeshBasicMaterial({
        map: thumbnail6, 
        side: THREE.FrontSide
    });
    let videoForm6 = new THREE.BoxGeometry(40, 25, 0);
    let videoScreen6 = new THREE.Mesh(videoForm6, videoMaterial6);
    thumbnail6.colorSpace = THREE.SRGBColorSpace;
    videoScreen6.position.set(10, 0, 40);
    videoScreen6.lookAt(0, 0, -25); 

    /*
    *********************************************
    interact with objects and launch video
    *********************************************
    */
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let startX;
    let startY;

    window.addEventListener('mousedown', (event) => {
        startX = event.clientX;
        startY = event.clientY;
    });

    window.addEventListener('mouseup', (event) => {
        const diffX = Math.abs(event.clientX - startX);
        const diffY = Math.abs(event.clientY - startY);

        if (diffX > 5 || diffY > 5) return;

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        
        const clickableObjects = [arrowStage, arrowRoom, arrowEntrance];
        
        if (videoScreen && videoScreen.parent && videoScreen.visible) clickableObjects.push(videoScreen);
        if (videoScreen2 && videoScreen2.parent && videoScreen2.visible) clickableObjects.push(videoScreen2);
        if (videoScreen3 && videoScreen3.parent && videoScreen3.visible) clickableObjects.push(videoScreen3);
        if (videoScreen4 && videoScreen4.parent && videoScreen4.visible) clickableObjects.push(videoScreen4);
        if (videoScreen5 && videoScreen5.parent && videoScreen5.visible) clickableObjects.push(videoScreen5);
        if (videoScreen6 && videoScreen6.parent && videoScreen6.visible) clickableObjects.push(videoScreen6);
        
        const intersects = raycaster.intersectObjects(clickableObjects);
        const listener = new THREE.AudioListener();
        camera.add( listener );
        const sound = new THREE.Audio( listener );
        const audioLoader = new THREE.AudioLoader();

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            if (clickedObject === arrowStage) {
                goToRoom('stage');  
                audioLoader.load( 'public/Whoosh.mp3', function( buffer ) {
                sound.setBuffer( buffer );
                sound.setLoop( false );
                sound.setVolume( 0.5 );
                sound.play();
                });
            }

            if (clickedObject === arrowRoom) {
                goToRoom('salle');
                audioLoader.load( 'public/Whoosh.mp3', function( buffer ) {
                sound.setBuffer( buffer );
                sound.setLoop( false );
                sound.setVolume( 0.5 );
                sound.play();
                });
            } 

            if (clickedObject === arrowEntrance) {
                goToRoom('entrance');
                audioLoader.load( 'public/Whoosh.mp3', function( buffer ) {
                sound.setBuffer( buffer );
                sound.setLoop( false );
                sound.setVolume( 0.5 );
                sound.play();
                });
            } 

            let overlay = document.getElementById('videoOverlay');
            let player = document.querySelector('#videoOverlay iframe');

            if (clickedObject === videoScreen) {
                player.src = "https://www.youtube.com/embed/D-bA3cG8k2c?autoplay=1";
                overlay.style.display = 'block';
                firstScene.style.display = 'block';
                audioLoader.load( '/click.mp3', function( buffer ) {
                sound.setBuffer( buffer );
                sound.setLoop( false );
                sound.setVolume( 0.5 );
                sound.play();
                });
            }
            else if (clickedObject === videoScreen2) {
                player.src = "https://www.youtube.com/embed/0f1wrOGvUh4?autoplay=1";
                overlay.style.display = 'block';
                firstScene.style.display = 'block';
                audioLoader.load( '/click.mp3', function( buffer ) {
                sound.setBuffer( buffer );
                sound.setLoop( false );
                sound.setVolume( 0.5 );
                sound.play();
                });
            } 
            else if (clickedObject === videoScreen3) {
                player.src = "https://www.youtube.com/embed/YnqISPa5EMo?autoplay=1";
                overlay.style.display = 'block';
                firstScene.style.display = 'block';
                audioLoader.load( '/click.mp3', function( buffer ) {
                sound.setBuffer( buffer );
                sound.setLoop( false );
                sound.setVolume( 0.5 );
                sound.play();
                });
            } 
            else if (clickedObject === videoScreen4) {
                player.src = "https://www.youtube.com/embed/e-_xdZLPIn0?autoplay=1";
                overlay.style.display = 'block';
                firstScene.style.display = 'block';
                audioLoader.load( '/click.mp3', function( buffer ) {
                sound.setBuffer( buffer );
                sound.setLoop( false );
                sound.setVolume( 0.5 );
                sound.play();
                });
            } 
            else if (clickedObject === videoScreen5) {
                player.src = "https://www.youtube.com/embed/yJJ0tt6R2HI?autoplay=1";
                overlay.style.display = 'block';
                firstScene.style.display = 'block';
                audioLoader.load( '/click.mp3', function( buffer ) {
                sound.setBuffer( buffer );
                sound.setLoop( false );
                sound.setVolume( 0.5 );
                sound.play();
                });
            } else if (clickedObject === videoScreen6) {
                player.src = "https://www.youtube.com/embed/qITzUqxoDOE?autoplay=1";
                overlay.style.display = 'block';
                firstScene.style.display = 'block';
                audioLoader.load( '/click.mp3', function( buffer ) {
                sound.setBuffer( buffer );
                sound.setLoop( false );
                sound.setVolume( 0.5 );
                sound.play();
                });
            }
        } 
    });

    /*
    *********************************************
    Create the other scene when we click on the arrows
    *********************************************
    */
    const textureSalle = new THREE.TextureLoader().load('public/salle.jpg')
    textureSalle.colorSpace = THREE.SRGBColorSpace;
    const textureStage = new THREE.TextureLoader().load('public/stage.jpg')
    textureStage.colorSpace = THREE.SRGBColorSpace;
    const textureEntrance = new THREE.TextureLoader().load('public/entrance.jpg')
    textureEntrance.colorSpace = THREE.SRGBColorSpace;

    arrowRoom.visible = false;
    arrowStage.visible = true;
    arrowEntrance.visible = true;

    function goToRoom(roomName) {
        if (roomName === 'salle') {
            material.map = textureSalle;
            videoScreen.visible = true;
            videoScreen2.visible = true;
            videoScreen3.visible = true;
            videoScreen4.visible = true;
            videoScreen5.visible = false;
            videoScreen6.visible = false;
            arrowStage.visible = true;
            arrowEntrance.visible = true;
            arrowRoom.visible = false;
            controls.target.set(0, 0, 0);
            arrowStage.position.set(40, -10, 5);
            arrowEntrance.position.set(-40, -10, -5);
            scene1.add( videoScreen );
            scene1.add( videoScreen2 );
            scene1.add( videoScreen3 );
            scene1.add( videoScreen4 );
            scene1.remove(videoScreen5);
            scene1.remove(videoScreen6);
            camera.position.set(1, 0, 0);
        } 
        else if (roomName === 'stage') {
            material.map = textureStage;
            videoScreen.visible = false;
            videoScreen2.visible = false;
            videoScreen3.visible = false;
            videoScreen4.visible = false;
            videoScreen5.visible = true;
            videoScreen6.visible = false;
            arrowStage.visible = false;
            arrowEntrance.visible = false;
            arrowRoom.visible = true;
            arrowRoom.position.set(-40, -10, 0);
            arrowRoom.lookAt(0, 0, 0); 
            scene1.remove(videoScreen);
            scene1.remove(videoScreen2);
            scene1.remove(videoScreen3);
            scene1.remove(videoScreen4);
            scene1.add( videoScreen5 );
            scene1.remove(videoScreen6);
            camera.position.set(-1, 0, 0);
        } 
        else if (roomName === 'entrance') {
            material.map = textureEntrance;
            videoScreen.visible = false;
            videoScreen2.visible = false;
            videoScreen3.visible = false;
            videoScreen4.visible = false;
            videoScreen5.visible = false;
            videoScreen6.visible = true;
            arrowStage.visible = false;
            arrowEntrance.visible = false;
            arrowRoom.visible = true;
            arrowRoom.position.set(48, -8, 4);
            arrowRoom.lookAt(0, 0, 0); 
            scene1.remove(videoScreen);
            scene1.remove(videoScreen2);
            scene1.remove(videoScreen3);
            scene1.remove(videoScreen4);
            scene1.remove(videoScreen5);
            scene1.add(videoScreen6);
            camera.position.set(-2, 0, 0.1);
        }
        
        material.needsUpdate = true;
        controls.update();
    } 

    // Choosing default scene as scene1
    scene = scene1;
}


function animate() {
    requestAnimationFrame(animate);
    controls.update();

    const scale = 1 + Math.sin(Date.now() * 0.005) * 0.1;
    arrowStage.scale.set(scale, scale, scale);
    arrowRoom.scale.set(scale, scale, scale);
    arrowEntrance.scale.set(scale, scale, scale);
    renderer.render(scene, camera); 
}
