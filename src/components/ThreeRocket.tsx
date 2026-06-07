import { JSX, useEffect, useRef } from "react";
import * as THREE from "three";

function buildRocket(): { group: THREE.Group; flame: THREE.Mesh } {
  const group = new THREE.Group();

  const addEdges = (mesh: THREE.Mesh) => {
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x2d2d2d,
      transparent: true,
      opacity: 0.65,
    });
    const lines = new THREE.LineSegments(edges, lineMat);
    mesh.add(lines);
  };

  // Nose cone
  const noseGeo = new THREE.ConeGeometry(0.38, 0.75, 8);
  const noseMat = new THREE.MeshToonMaterial({ color: 0xca8a04 });
  const nose = new THREE.Mesh(noseGeo, noseMat);
  nose.position.y = 1.2;
  addEdges(nose);
  group.add(nose);

  // Body
  const bodyGeo = new THREE.CylinderGeometry(0.38, 0.38, 1.1, 8);
  const bodyMat = new THREE.MeshToonMaterial({ color: 0xfef9c3 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.35;
  addEdges(body);
  group.add(body);

  // Window
  const winGeo = new THREE.SphereGeometry(0.18, 8, 8);
  const winMat = new THREE.MeshToonMaterial({ color: 0x93c5fd });
  const win = new THREE.Mesh(winGeo, winMat);
  win.position.set(0, 0.42, 0.32);
  group.add(win);

  // Fins
  const finGeo = new THREE.BoxGeometry(0.12, 0.5, 0.08);
  const finMat = new THREE.MeshToonMaterial({ color: 0xca8a04 });

  const finPositions = [
    { x: 0.42, z: 0, rotY: 0 },
    { x: -0.42, z: 0, rotY: 0 },
    { x: 0, z: 0.42, rotY: Math.PI / 2 },
  ];

  finPositions.forEach(({ x, z, rotY }) => {
    const fin = new THREE.Mesh(finGeo, finMat);
    fin.position.set(x, -0.45, z);
    fin.rotation.y = rotY;
    addEdges(fin);
    group.add(fin);
  });

  // Flame
  const flameGeo = new THREE.ConeGeometry(0.22, 0.55, 8);
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xfb923c });
  const flame = new THREE.Mesh(flameGeo, flameMat);
  flame.rotation.z = Math.PI;
  flame.position.y = -1.08;
  group.add(flame);

  // Inner flame
  const innerGeo = new THREE.ConeGeometry(0.12, 0.38, 8);
  const innerMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });
  const inner = new THREE.Mesh(innerGeo, innerMat);
  inner.rotation.z = Math.PI;
  inner.position.y = -1.0;
  group.add(inner);

  return { group, flame };
}

export default function ThreeRocket(): JSX.Element {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = 36;
    const H = 48;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(2, 3, 3);
    scene.add(dirLight);

    const { group, flame } = buildRocket();
    scene.add(group);

    let animId: number;
    let t = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.04;

      group.rotation.y += 0.025;
      group.rotation.z = Math.sin(t * 0.7) * 0.12;
      flame.scale.y = 0.8 + Math.sin(t * 4) * 0.25;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      scene.traverse((obj) => {
        const o = obj as any;
        o.geometry?.dispose();
        if (o.material) {
          const m = o.material;
          Array.isArray(m) ? m.forEach((x: THREE.Material) => x.dispose()) : m.dispose();
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: 36, height: 48, pointerEvents: "none", flexShrink: 0 }}
    />
  );
}
