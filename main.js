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
let camera2;
let scene1;
let scene2;
let geometry2;
let material2;
let texture2;
let mesh2;


let arrowForm;
let arrowMaterial;
let arrowRoom;
let arrowStage;
let arrowEntrance;


init();
animate();

const firstScene = document.getElementById('scene1');

/* Buttons to handle scene switch */
firstScene.addEventListener('click', ()=>{
    scene = scene1
    console.log(scene);
})



function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0, 0, 0.1);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio( window.devicePixelRatio );

    document.body.appendChild(renderer.domElement);


    /*
    *********************************************
    Creation of the first scene
    *********************************************
    */
    scene1 = new THREE.Scene();
    geometry = new THREE.SphereGeometry(50, 32, 32);
    texture = new THREE.TextureLoader().load('salle.jpg');
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
    arrowMaterial = new THREE.MeshBasicMaterial({ color: 0xf5f5f5 });
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

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        
        const intersects = raycaster.intersectObjects([arrowStage, arrowRoom, arrowEntrance]);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            if (clickedObject === arrowStage){
                goToRoom('stage');
                console.log('tu es dans la salle');
            } 
            if (clickedObject === arrowRoom){
                goToRoom('salle');
            } 
            if (clickedObject === arrowEntrance){
                goToRoom('entrance');
            } 
        }
    });


    const textureSalle = new THREE.TextureLoader().load('salle.jpg')
    const textureStage = new THREE.TextureLoader().load('stage.jpg')
    const textureEntrance = new THREE.TextureLoader().load('entrance.jpg')


    arrowRoom.visible = false;
    arrowStage.visible = true;
    arrowEntrance.visible = true;

    function goToRoom(roomName) {
        if (roomName === 'salle') {
            material.map = textureSalle;
            arrowStage.visible = true;
            arrowEntrance.visible = true;
            arrowRoom.visible = false;
            controls.target.set(1, 0, 0);
            arrowStage.position.set(40, -10, 5);
            arrowEntrance.position.set(-40, -10, -5);
            scene1.add( videoScreen );
        } 
        else if (roomName === 'stage') {
            material.map = textureStage;
            arrowStage.visible = false;
            arrowEntrance.visible = false;
            arrowRoom.visible = true;
            arrowRoom.position.set(-40, -10, 0);
            arrowRoom.lookAt(0, 0, 0); 
            scene1.remove(videoScreen);
        } 
        else if (roomName === 'entrance') {
            material.map = textureEntrance;
            arrowStage.visible = false;
            arrowEntrance.visible = false;
            arrowRoom.visible = true;
            arrowRoom.position.set(48, -8, 4);
            arrowRoom.lookAt(0, 0, 0); 
            scene1.remove(videoScreen);
        }
        
        material.needsUpdate = true;
        controls.update();
    } 


    /*
    *********************************************
    Implement the video
    *********************************************
    */
    const video = document.getElementById( 'video' );
    const videotexture = new THREE.VideoTexture( video );

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    let videoMaterial = new THREE.MeshBasicMaterial({
        map: videotexture,
        side: THREE.FrontSide,
        toneMapped: false,
    });

    let videoForm = new THREE.BoxGeometry(15, 10, 1);
    let videoScreen = new THREE.Mesh(videoForm, videoMaterial);
    videoScreen.position.set(-10, 3, 20)
    videoScreen.lookAt(-6, 5, 0); 
    scene1.add( videoScreen );



    /////////////////////////////////////////////////
    //       Scene 2                               //
    /////////////////////////////////////////////////
    camera2 = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera2.position.z = 500;

    scene2 = new THREE.Scene();

    /*
    *********************************************
    When you click on the video in scene1, it leads you to the scene2
    *********************************************
    */
    const raycaster1 = new THREE.Raycaster();
    const mouse1 = new THREE.Vector2();


    window.addEventListener('click', (e)=>{
        mouse1.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse1.y = -(e.clientY / window.innerHeight) * 2 + 1;

        raycaster1.setFromCamera(mouse1, camera2);
        
        const intersects = raycaster.intersectObjects([videoScreen]);
        console.log(intersects);

        if (intersects.length > 0) {
            scene = scene2
            console.log(scene);
        }
    
    })


    geometry2 = new THREE.BoxGeometry(100, 10, 10);
    material2 = new THREE.MeshNormalMaterial();

    mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.position.set(0, 0, 150);
    scene2.add(mesh2); // so note need to be able to switch this on 

    // Choosing default scene as scene1
    scene = scene1;
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    if (scene == scene1){
        renderer.render(scene, camera);
    } else{
        renderer.render(scene, camera2);
    }   
}
