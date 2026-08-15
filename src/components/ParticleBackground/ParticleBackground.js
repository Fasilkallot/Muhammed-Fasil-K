'use client';
import { useEffect, useRef } from 'react';
import styles from './ParticleBackground.module.css';

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let THREE;
    let scene, camera, renderer, particles, geometryShapes = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;
    const PARTICLE_COUNT = isMobile ? 20 : 60;

    const init = async () => {
      try {
        THREE = (await import('three')).default || await import('three');
      } catch (e) {
        console.warn('Three.js failed to load', e);
        return;
      }

      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
      renderer.setClearColor(0x000000, 0);

      // Particles
      const pGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x00F5D4,
        size: isMobile ? 0.06 : 0.05,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
      });
      particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      // Floating geometric shapes (desktop only)
      if (!isMobile) {
        const shapes = [
          { geo: new THREE.OctahedronGeometry(0.4, 0), color: 0x7B61FF, pos: [3, 1.5, -2] },
          { geo: new THREE.TetrahedronGeometry(0.3, 0), color: 0x00F5D4, pos: [-3.5, -1, -1] },
          { geo: new THREE.IcosahedronGeometry(0.35, 0), color: 0xFF4D6D, pos: [2, -2, -3] },
          { geo: new THREE.OctahedronGeometry(0.2, 0), color: 0x00F5D4, pos: [-2, 2, -2] },
        ];
        shapes.forEach(({ geo, color, pos }) => {
          const mat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.25 });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.set(...pos);
          mesh.userData.floatOffset = Math.random() * Math.PI * 2;
          mesh.userData.rotSpeed   = (Math.random() - 0.5) * 0.006;
          scene.add(mesh);
          geometryShapes.push(mesh);
        });
      }

      animate();
    };

    const clock = { start: Date.now() };
    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      const t = (Date.now() - clock.start) / 1000;

      if (particles) {
        particles.rotation.y = t * 0.02;
        particles.rotation.x = t * 0.01;
      }

      geometryShapes.forEach(mesh => {
        mesh.rotation.x += mesh.userData.rotSpeed;
        mesh.rotation.y += mesh.userData.rotSpeed * 1.3;
        mesh.position.y += Math.sin(t + mesh.userData.floatOffset) * 0.002;
      });

      if (renderer && scene && camera) renderer.render(scene, camera);
    };

    const handleResize = () => {
      width  = window.innerWidth;
      height = window.innerHeight;
      if (camera) { camera.aspect = width / height; camera.updateProjectionMatrix(); }
      if (renderer) renderer.setSize(width, height);
    };

    init();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      if (renderer) renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
