import './style.css'
import * as THREE from 'three'

// 1. Scene, camera, renderer
const canvas = document.querySelector('#bg')
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)
camera.position.z = 6

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// 2. The main 3D shape
const geometry = new THREE.IcosahedronGeometry(1.8, 1)
const material = new THREE.MeshStandardMaterial({
  color: 0x8b5cf6,
  wireframe: true,
})
const shape = new THREE.Mesh(geometry, material)
shape.position.x = window.innerWidth > 700 ? 2.5 : 0
scene.add(shape)

// 3. Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.6))
const light = new THREE.PointLight(0xffffff, 100)
light.position.set(5, 5, 5)
scene.add(light)

// 4. Floating stars
const starCount = 800
const positions = new Float32Array(starCount * 3)
for (let i = 0; i < starCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 30
}
const starGeometry = new THREE.BufferGeometry()
starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
const stars = new THREE.Points(
  starGeometry,
  new THREE.PointsMaterial({ color: 0xffffff, size: 0.03 })
)
scene.add(stars)

// 5. Mouse movement
let mouseX = 0
let mouseY = 0
window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX / window.innerWidth - 0.5
  mouseY = e.clientY / window.innerHeight - 0.5
})

// 6. Animation loop (runs about 60 times per second)
function animate() {
  requestAnimationFrame(animate)

  shape.rotation.y += 0.004 + mouseX * 0.02
  shape.rotation.x += 0.002 + mouseY * 0.02
  stars.rotation.y += 0.0003

  renderer.render(scene, camera)
}
animate()

// 7. Keep it working when the window is resized
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  shape.position.x = window.innerWidth > 700 ? 2.5 : 0
})

