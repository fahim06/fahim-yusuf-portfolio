import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function MorphingVisual({ mode }) {
  const { viewport } = useThree();
  const scale = viewport.width < 5 ? viewport.width / 5 : (viewport.width > 12 ? Math.min(1.5, viewport.width / 12) : 1);
  const ref = useRef();
  const matRef = useRef();
  const count = 3000;

  const colorGlobe = useMemo(() => new THREE.Color(0xb026ff), []);
  const colorAI = useMemo(() => new THREE.Color(0xb026ff), []);
  const colorWEB = useMemo(() => new THREE.Color(0xb026ff), []);

  // Pre-calculate target positions for each state
  const targets = useMemo(() => {
    const chaos = new Float32Array(count * 3);
    const globe = new Float32Array(count * 3);
    const brain = new Float32Array(count * 3);
    const cube = new Float32Array(count * 3);

    // 0. Chaos (Scattered particles matching About section)
    for (let i = 0; i < count; i++) {
      chaos[i * 3] = (Math.random() - 0.5) * 20;
      chaos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      chaos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    // 1. Data Globe (Default)
    for (let i = 0; i < count; i++) {
      const r = 2.5;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      globe[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      globe[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      globe[i * 3 + 2] = r * Math.cos(phi);
    }

    // 2. Neural Network Brain (AI & Data Science)
    for (let i = 0; i < count; i++) {
      const hemisphere = Math.random() > 0.5 ? 1 : -1;
      const r = 2.0 * Math.cbrt(Math.random());
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta) * 0.75;
      let z = r * Math.cos(phi) * 1.2;

      x = x * 0.8 + (0.4 * hemisphere);

      brain[i * 3] = x;
      brain[i * 3 + 1] = y;
      brain[i * 3 + 2] = z;
    }

    // 3. Rigid Wireframe Viewport/Browser Cube (Web Development)
    for (let i = 0; i < count; i++) {
      const edge = i % 12;
      const t = (Math.random() - 0.5) * 4.5;
      const s = 2.25;

      const noise = () => (Math.random() - 0.5) * 0.15;
      let x = 0, y = 0, z = 0;

      switch (edge) {
        case 0: x = t; y = s; z = s; break;
        case 1: x = t; y = s; z = -s; break;
        case 2: x = t; y = -s; z = s; break;
        case 3: x = t; y = -s; z = -s; break;
        case 4: x = s; y = t; z = s; break;
        case 5: x = -s; y = t; z = s; break;
        case 6: x = s; y = t; z = -s; break;
        case 7: x = -s; y = t; z = -s; break;
        case 8: x = s; y = s; z = t; break;
        case 9: x = -s; y = s; z = t; break;
        case 10: x = s; y = -s; z = t; break;
        case 11: x = -s; y = -s; z = t; break;
      }

      cube[i * 3] = x + noise();
      cube[i * 3 + 1] = y + noise();
      cube[i * 3 + 2] = z + noise();
    }

    return { chaos, globe, brain, cube };
  }, [count]);

  // Start perfectly as chaos so we can condense in
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    pos.set(targets.chaos);
    return pos;
  }, [count, targets]);

  useFrame((state, delta) => {
    if (!ref.current || !matRef.current) return;

    let targetPositions = targets.globe;
    let targetColor = colorGlobe;
    let foldSpeed = 0;

    if (mode === 'CHAOS') {
      targetPositions = targets.chaos;
      targetColor = colorGlobe;
    } else if (mode === 'AI') {
      targetPositions = targets.brain;
      targetColor = colorAI;
    } else if (mode === 'WEB') {
      targetPositions = targets.cube;
      targetColor = colorWEB;
      foldSpeed = 2.0;
    }

    // 1. Smooth Morphing Transition
    // Move slightly faster when coming out of chaos
    const morphSpeed = mode === 'CHAOS' ? 2.0 : 4.0;
    const curr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count * 3; i++) {
      curr[i] += (targetPositions[i] - curr[i]) * delta * morphSpeed;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;

    // 2. Color Interpolation
    matRef.current.color.lerp(targetColor, delta * 4.0);

    // 3. Rotate & Fold Animations
    if (mode === 'WEB') {
      const fold = Math.sin(state.clock.elapsedTime * foldSpeed) * 0.15;
      ref.current.scale.lerp(new THREE.Vector3(1, 1 - fold, 1), delta * 5);

      ref.current.rotation.y += delta * 0.4;
      ref.current.rotation.x += delta * 0.2;
    } else {
      ref.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 5);
      ref.current.rotation.y -= delta * 0.15;
      ref.current.rotation.x -= delta * 0.05;
    }
  });

  return (
    <group scale={scale}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        {/* Same aesthetic rules as About section: size=0.03/0.05, opacity=0.5, AdditiveBlending */}
        <PointMaterial
          ref={matRef}
          transparent
          color={colorGlobe}
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function Services3DVisual({ hoveredIndex, isVisible }) {
  let mode = isVisible ? 'DEFAULT' : 'CHAOS';

  if (isVisible && hoveredIndex !== null) {
    if ([0, 1, 3].includes(hoveredIndex)) {
      mode = 'AI';
    } else {
      mode = 'WEB';
    }
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas style={{ position: 'absolute', inset: 0 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 7.5]} fov={45} />
        <MorphingVisual mode={mode} />
      </Canvas>
    </div>
  );
}
