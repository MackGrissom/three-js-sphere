import * as THREE from 'three';
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';
// setting up new scene...
const scene = new THREE.Scene();

//  creating the sphere shape, using geometry
const geometry = new THREE.SphereGeometry(3,64,64)
// 3 = radius,  64= width segment, 64 = height segment

// the material adds texture, color to the geometry
const material = new THREE.MeshStandardMaterial({
  color:"#00ff83",
  roughness: 0.6
})
// the mesh puts the two together
const mesh = new THREE.Mesh(geometry, material); 

// this adds the sphere to the scene
scene.add(mesh);


// sizes
const sizes = {
  width: window.innerWidth, 
  height: window.innerHeight,
};



// light, to  make mesh visible
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 10, 10)
light.intensity = 1.25
scene.add(light);


// camera ..imagine a movie scene with cameras
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20
scene.add(camera);
// perepectivecamera(field of view, aspect ratio, aspect ratio)
//  field of view (anythng above 50 is distorted, like fish eye lens)





// renderer
// using a canvas element in index.html with class name of webgl 
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGL1Renderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene,camera)
renderer.setPixelRatio(2);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
controls.enablePan = false 
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5
// resizer
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  // update camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop)
}
loop();

// timelinbe
const tl = gsap.timeline({defaults: {duration:1}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo('nav', {y:'-100%'}, {y:'0%'})
tl.fromTo('.title', {opacity:0}, {opacity:1} )
tl.fromTo('.title2', {opacity:0}, {opacity:1} )


// movement animation colors
let mouseDown = false;
let rgb = [12,23,55]
window.addEventListener('mousedown', () => (mouseDown = true))
window.addEventListener('mouseup', () => (mouseDown = false))

window.addEventListener('mousemove', (e) => {
  if(mouseDown){
rgb = [
  Math.round((e.pageX / sizes.width) * 255), 
  Math.round((e.pageY / sizes.height) * 255), 
  150,
]
// animation
let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
gsap.to(mesh.material.color,{r:newColor.r, g:newColor.g, b: newColor.b})
  }
});

// 