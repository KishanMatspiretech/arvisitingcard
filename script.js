// Ensure Three.js is available globally
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// GLTF Loader
const loader = new THREE.GLTFLoader();
loader.load('https://cdn.jsdelivr.net/gh/kishanmatspiretech/arvisitingcard/models/ufo.glb', 
    function (gltf) {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, 0, -1);
        scene.add(model);
    },
    undefined, 
    function (error) {
        console.error('Error loading GLB model:', error);
    }
);

camera.position.z = 2;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
