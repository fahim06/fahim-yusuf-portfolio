import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

function Network({ count = 120 }) {
  const pointsRef = useRef();
  const linesRef = useRef();

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25; // z
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        )
      );
    }
    return [positions, velocities];
  }, [count]);

  const linePositions = useMemo(() => new Float32Array((count * (count - 1) / 2) * 6), [count]);
  const lineColors = useMemo(() => new Float32Array((count * (count - 1) / 2) * 8), [count]);

  // Neon violet (#b026ff) converted to RGB 0-1
  const r = 0.69;
  const g = 0.15;
  const b = 1.0;

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const p = pointsRef.current.geometry.attributes.position.array;
    let lineIdx = 0;
    let colorIdx = 0;

    // Update positions
    for (let i = 0; i < count; i++) {
      p[i * 3] += velocities[i].x;
      p[i * 3 + 1] += velocities[i].y;
      p[i * 3 + 2] += velocities[i].z;

      // Bounce off boundaries 
      if (Math.abs(p[i * 3]) > 12.5) velocities[i].x *= -1;
      if (Math.abs(p[i * 3 + 1]) > 12.5) velocities[i].y *= -1;
      if (Math.abs(p[i * 3 + 2]) > 12.5) velocities[i].z *= -1;
    }

    // Calculate connections
    const connectDistanceSq = 20;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = p[i * 3] - p[j * 3];
        const dy = p[i * 3 + 1] - p[j * 3 + 1];
        const dz = p[i * 3 + 2] - p[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < connectDistanceSq) {
          const alpha = 1.0 - (distSq / connectDistanceSq);

          // Max opacity scaling
          const finalAlpha = alpha * 0.85; // Increased from 0.3 for higher visibility

          // vertex 1
          linePositions[lineIdx++] = p[i * 3];
          linePositions[lineIdx++] = p[i * 3 + 1];
          linePositions[lineIdx++] = p[i * 3 + 2];

          // vertex 2
          linePositions[lineIdx++] = p[j * 3];
          linePositions[lineIdx++] = p[j * 3 + 1];
          linePositions[lineIdx++] = p[j * 3 + 2];

          // Vertex 1 color & alpha
          lineColors[colorIdx++] = r;
          lineColors[colorIdx++] = g;
          lineColors[colorIdx++] = b;
          lineColors[colorIdx++] = finalAlpha;

          // Vertex 2 color & alpha
          lineColors[colorIdx++] = r;
          lineColors[colorIdx++] = g;
          lineColors[colorIdx++] = b;
          lineColors[colorIdx++] = finalAlpha;
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    linesRef.current.geometry.setDrawRange(0, lineIdx / 3);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;

    // Gentle global rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.2;

    linesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.2;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15} // Increased point size
          color="#b026ff"
          transparent
          opacity={0.9} // Increased point opacity
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 4}
            array={lineColors}
            itemSize={4}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}

function Rig() {
  const { camera, mouse, viewport } = useThree();
  useFrame(() => {
    // Subtle parallax effect based on mouse movement
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, (mouse.x * viewport.width) / 25, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, (mouse.y * viewport.height) / 25, 0.02);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function BinaryRain({ count = 60 }) {
  const groupRef = useRef();

  const [digits] = useState(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 40 + 20,
      z: (Math.random() - 0.5) * 20 - 5,
      speed: Math.random() * 0.04 + 0.02,
      val: Math.random() > 0.5 ? '1' : '0'
    }));
  });

  useFrame(() => {
    const scrollY = window.scrollY;
    const fade = Math.max(0, 1 - scrollY / window.innerHeight);

    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.position.y -= digits[i].speed;
      if (child.position.y < -20) {
        child.position.y = 20 + Math.random() * 10;
        child.position.x = (Math.random() - 0.5) * 40;
      }
      if (child.material) {
        child.material.opacity = fade * 0.3; // Max opacity 0.3 for subtlety
      }
    });
  });

  return (
    <group ref={groupRef}>
      {digits.map((d, i) => (
        <Text
          key={i}
          position={[d.x, d.y, d.z]}
          fontSize={0.4}
          color="#ffffff"
          transparent
          fillOpacity={0.3}
          depthWrite={false}
        >
          {d.val}
        </Text>
      ))}
    </group>
  );
}

function ParticleWave() {
  const pointsRef = useRef();
  const materialRef = useRef();

  const [positions, initialY] = useMemo(() => {
    const size = 60;
    const spacing = 0.6;
    const positions = new Float32Array(size * size * 3);
    const initialY = new Float32Array(size * size);

    let idx = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        positions[idx * 3] = (i - size / 2) * spacing;
        positions[idx * 3 + 1] = -12; // Base Y position (bottom)
        positions[idx * 3 + 2] = (j - size / 2) * spacing - 15; // Push back
        initialY[idx] = positions[idx * 3 + 1];
        idx++;
      }
    }
    return [positions, initialY];
  }, []);

  useFrame((state) => {
    const scrollY = window.scrollY;
    const fade = Math.max(0, 1 - scrollY / window.innerHeight);

    if (materialRef.current) {
      materialRef.current.opacity = fade * 0.5;
    }

    if (!pointsRef.current) return;
    const p = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;

    let idx = 0;
    const size = 60;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const x = p[idx * 3];
        const z = p[idx * 3 + 2];
        const yOffset = Math.sin(x * 0.4 + time * 0.8) * 1.5 + Math.cos(z * 0.3 + time * 1.2) * 1.5;
        p[idx * 3 + 1] = initialY[idx] + yOffset;
        idx++;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.12}
        color="#b026ff"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

export default function Background3D() {
  return (
    <div
      className="background-3d"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: '#0a0a0a' // Solid dark base color for space
      }}
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]}>
        <fog attach="fog" args={['#0a0a0a', 8, 30]} />
        <Network count={180} />
        <BinaryRain count={70} />
        <ParticleWave />
        <Rig />
      </Canvas>
    </div>
  );
}
