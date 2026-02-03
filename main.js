import * as THREE from 'three';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color("#de6262");

//initialisation de la caméra
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 0, 0.1 );

//creer une forme
const geometry = new THREE.SphereGeometry(50, 32, 32)
const texture = new THREE.TextureLoader().load('salle.jpg')
const material = new THREE.MeshBasicMaterial({
    map: texture,
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
const triangle = new THREE.Mesh(triForme, triMat);

triangle.position.set(40, 2, 5);
triangle.lookAt(0, 0, 0); 
scene.add(triangle);


//initialisation du renderer
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

function animate() {
    requestAnimationFrame(animate)
	controls.update();
	renderer.render( scene, camera );
}

animate();

// l'objet en cours est-il le fond ? si non, on arrête
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(triangle);

    if (intersects.length > 0) {
        zoomerSurTriangle();
    }
});

function zoomerSurTriangle() {
    camera.fov = 35; 
}



/*
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace; 


const geometry = new THREE.SphereGeometry(50, 32, 32)
const texture = new THREE.TextureLoader().load('360.jpg')
const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
})
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const ambLight = new THREE.AmbientLight(0xFFFFFF);
ambLight.position.set(0,0,0);
ambLight.castShadow = false;
scene.add(ambLight);

function onWindowResize() {
    camera.aspect = window.innerWidth /window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer();
}

window.addEventListener('resize', onWindowResize)

const controls = new DragControls( camera, renderer.domElement );

window.addEventListener('pointerdown', (e) => {
    mouseDownEvent(e);
})

function animate() {
	// required if controls.enableDamping or controls.autoRotate are set to true
    
	controls.update();
	renderer.render( scene, camera );
    requestAnimationFrame(animate);
    //cube.rotateY(0.01);
}

animate();


let raycaster = new THREE.Raycaster();
// let mouse = {
//     x: null,
//     y: null,
// }



const pointer = new THREE.Vector2();

let currentInteractable = null;
const intersects = raycaster.intersectObjects(scene.children);

function mouseDownEvent(e) {
    //mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    //mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    // lancer de rayon pour trouver un object interactable
    raycaster.setFromCamera(pointer, camera);

    

    // debug
    intersects.forEach(element => {
        console.log(element);
    });

    // stockage de l'instance du premier interactble si on en a trouvé un
    if (intersects.length > 0) {
        currentInteractable = intersects[0];
    }

    /*
    const intersect = intersects.length && intersects[0];
    
    if (intersect && intersect.object instanceof Mesh) {
        const { object } = intersect;
        intersectObject = object;
    } else {
        intersectObject = null;
    }
}*/



//detection de la position du souris
/*
function mouseDrag(e) {
    // l'objet en cours est-il le fond ? si non, on arrête
    if(intersects.length > 0){
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    // si oui, suivi du déplament de la souris sur le fond

}

window.addEventListener('mousemove', mouseDrag)

function mouseUpEvent(e) {
    // si l'objet en cours n'est pas le fond, lancer l'animation/réaction associée

    // libérer l'instance de l'interactable
    currentInteractable = null;
} */

//pointerMoveEvent(); 