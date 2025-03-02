// Import Three.js and WebXR libraries
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/webxr/ARButton.js';

let scene, camera, renderer, model;

function init() {
    // Create Scene
    scene = new THREE.Scene();
    
    // Set up Camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    scene.add(camera);
    
    // Renderer with WebXR support
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);
    
    // AR Button
    document.body.appendChild(ARButton.createButton(renderer));
    
    // Lighting
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);
    
    // Load 3D Model (Replace with your hosted GLTF/GLB model URL)
    const loader = new GLTFLoader();
    loader.load('models/ufo.glb', (gltf) => {
        model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5); // Adjust size
        model.position.set(0, 0, -1); // Position in front of user
        scene.add(model);
    });
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.setAnimationLoop(() => {
        if (model) model.rotation.y += 0.01; // Rotate model for effect
        renderer.render(scene, camera);
    });
}

init();
animate();
