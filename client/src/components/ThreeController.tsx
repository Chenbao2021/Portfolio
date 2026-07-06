import { JSX, useEffect, useRef } from "react";
import * as THREE from "three";

function buildController(): THREE.Group {
  const group = new THREE.Group();

  const addEdges = (mesh: THREE.Mesh, opacity = 0.7) => {
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const mat = new THREE.LineBasicMaterial({
      color: 0x2d2d2d,
      transparent: true,
      opacity,
    });
    mesh.add(new THREE.LineSegments(edges, mat));
  };

  const toon = (hex: number) =>
    new THREE.MeshToonMaterial({ color: hex });

  // Main body
  const bodyMesh = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.4, 0.45), toon(0xf9fafb));
  addEdges(bodyMesh);
  group.add(bodyMesh);

  // Left handle
  const lHandleMesh = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.8, 0.45), toon(0xf9fafb));
  lHandleMesh.position.set(-1.15, -1.1, 0);
  addEdges(lHandleMesh);
  group.add(lHandleMesh);

  // Right handle
  const rHandleMesh = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.8, 0.45), toon(0xf9fafb));
  rHandleMesh.position.set(1.15, -1.1, 0);
  addEdges(rHandleMesh);
  group.add(rHandleMesh);

  // D-pad horizontal
  const dH = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.22, 0.12), toon(0xe5e7eb));
  dH.position.set(-0.9, 0.1, 0.28);
  addEdges(dH, 0.5);
  group.add(dH);

  // D-pad vertical
  const dV = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.85, 0.12), toon(0xe5e7eb));
  dV.position.set(-0.9, 0.1, 0.29);
  addEdges(dV, 0.5);
  group.add(dV);

  // ABXY buttons
  const btnGeo = new THREE.SphereGeometry(0.18, 8, 8);
  const btns: Array<[number, number, number, number]> = [
    [0.85, 0.28, 0.28, 0xfca5a5],  // top (A)
    [1.12, 0.0, 0.28, 0x86efac],   // right (B)
    [0.58, 0.0, 0.28, 0x93c5fd],   // left (X)
    [0.85, -0.28, 0.28, 0xfde047], // bottom (Y)
  ];
  btns.forEach(([x, y, z, color]) => {
    const btn = new THREE.Mesh(btnGeo, toon(color));
    btn.position.set(x, y, z);
    group.add(btn);
  });

  // Left bumper
  const lBump = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.18, 0.22), toon(0xd1d5db));
  lBump.position.set(-1.1, 0.8, 0.08);
  addEdges(lBump, 0.5);
  group.add(lBump);

  // Right bumper
  const rBump = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.18, 0.22), toon(0xd1d5db));
  rBump.position.set(1.1, 0.8, 0.08);
  addEdges(rBump, 0.5);
  group.add(rBump);

  // Start / Select buttons
  const smallBtnGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 8);
  const sBtnMat = toon(0xd1d5db);
  const sel = new THREE.Mesh(smallBtnGeo, sBtnMat);
  sel.position.set(-0.2, 0.08, 0.27);
  sel.rotation.x = Math.PI / 2;
  group.add(sel);
  const sta = new THREE.Mesh(smallBtnGeo, sBtnMat);
  sta.position.set(0.2, 0.08, 0.27);
  sta.rotation.x = Math.PI / 2;
  group.add(sta);

  return group;
}

export default function ThreeController(): JSX.Element {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = 210;
    const H = 148;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 0.3, 7);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(3, 4, 5);
    scene.add(dir);
    const rimLight = new THREE.DirectionalLight(0xca8a04, 0.25);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    const group = buildController();
    scene.add(group);

    let animId: number;
    let t = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.016;

      group.rotation.y = Math.sin(t * 0.5) * 0.55;
      group.rotation.x = Math.sin(t * 0.3) * 0.12;
      group.position.y = Math.sin(t * 0.8) * 0.08;

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
      style={{ width: 210, height: 148, pointerEvents: "none" }}
    />
  );
}
