import * as THREE from 'three';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color("#de6262");

//camera initialisation
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 0, 0.1 );

//create a form
const geometry = new THREE.SphereGeometry(50, 32, 32)
const textureSalle = new THREE.TextureLoader().load('salle.jpg')
const textureStage = new THREE.TextureLoader().load('stage.jpg')
const textureEntrance = new THREE.TextureLoader().load('entrance.jpg')

const material = new THREE.MeshBasicMaterial({
    map: textureSalle,
    side: THREE.DoubleSide
})
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


const ambLight = new THREE.AmbientLight(0xFFFFFF);
ambLight.position.set(0,0,0);
ambLight.castShadow = false;
scene.add(ambLight);


const triForme = new THREE.ConeGeometry(1.5, -3, 3 )
const triMat = new THREE.MeshBasicMaterial({ color: 0xf5f5f5 });
const triangleSalle = new THREE.Mesh(triForme, triMat);
const triangleStage = new THREE.Mesh(triForme, triMat);
const triangleEntrance = new THREE.Mesh(triForme, triMat);


//stage hotspot
triangleStage.position.set(40, -10, 5);
triangleStage.lookAt(0, 0, 0); 
scene.add(triangleStage);

//salle hotspot
triangleSalle.position.set(0, -10, 0);
triangleSalle.lookAt(0, 0, 0); 
scene.add(triangleSalle);

//entrance hotspot
triangleEntrance.position.set(-40, -10, -5);
triangleEntrance.lookAt(0, 0, 0); 
scene.add(triangleEntrance);

//renderer initialisation 
const canvas = document.querySelector('canvas')
console.log(canvas);

const renderer = new THREE.WebGLRenderer({canvas})

renderer.setSize(window.innerWidth,window.innerHeight)

//orbitControls
const controls = new OrbitControls(camera, canvas);
controls.target.set(1, 0, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = -0.5;
controls.enableZoom = false;
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI;

function animate() {
    requestAnimationFrame(animate)
	controls.update();
	renderer.render( scene, camera );
}

animate();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
 



// Go to room function
window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    
    const intersects = raycaster.intersectObjects([triangleStage, triangleSalle, triangleEntrance]);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        if (clickedObject === triangleStage) goToRoom('stage');
        if (clickedObject === triangleSalle) goToRoom('salle');
        if (clickedObject === triangleEntrance) goToRoom('entrance');
    }
});

triangleSalle.visible = false;
triangleStage.visible = true;
triangleEntrance.visible = true;

function goToRoom(roomName) {
    if (roomName === 'salle') {
        material.map = textureSalle;
        triangleStage.visible = true;
        triangleEntrance.visible = true;
        triangleSalle.visible = false;
        controls.target.set(1, 0, 0);
        triangleStage.position.set(40, -10, 5);
        triangleEntrance.position.set(-40, -10, -5);
    } 
    else if (roomName === 'stage') {
        material.map = textureStage;
        triangleStage.visible = false;
        triangleEntrance.visible = false;
        triangleSalle.visible = true;
        triangleSalle.position.set(-40, -10, 0);
        triangleSalle.lookAt(0, 0, 0);  
    } 
    else if (roomName === 'entrance') {
        material.map = textureEntrance;
        triangleStage.visible = false;
        triangleEntrance.visible = false;
        triangleSalle.visible = true;
        triangleSalle.position.set(48, -8, 4);
        triangleSalle.lookAt(0, 0, 0); 
    }
    
    material.needsUpdate = true;
    controls.update();
}
