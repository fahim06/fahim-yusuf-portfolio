import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. Procedural wave component (Liquid Mercury)
function WavePlane({ scrollY }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime() * 0.5;
    const scroll = scrollY.current * 0.002;
    const positions = meshRef.current.geometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      const wave1 = Math.sin(x * 0.4 + time + scroll) * 0.6;
      const wave2 = Math.cos(y * 0.3 - time + scroll) * 0.5;
      const wave3 = Math.sin((x + y) * 0.2 + time) * 0.4;

      const z = wave1 + wave2 + wave3;
      positions.setZ(i, z);
    }

    positions.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} position={[0, -2.5, -5]} rotation={[-Math.PI / 2 + 0.1, 0, 0]}>
      <planeGeometry args={[60, 60, 120, 120]} />
      <meshStandardMaterial
        color="#1a1a1a"
        roughness={0.15}
        metalness={0.9}
      />
    </mesh>
  );
}

// 2. Volumetric Dust Particles
function DustParticles({ scrollY }) {
  const pointsRef = useRef();

  const particleCount = 1000; // balanced for performance
  const particles = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array;
    const scrollSpeed = scrollY.current * 0.0001;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.05 * delta;
      positions[i * 3 + 2] += (0.5 + scrollSpeed) * delta;

      if (positions[i * 3 + 2] > 5) {
        positions[i * 3 + 2] = -25;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#b026ff"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// 3. Interactive Particle Constellation
function Constellation() {
  const { viewport } = useThree();

  const particleCount = 200; // slightly increased to fill wider space
  const maxDistance = 3.5;

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 10
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        )
      });
    }
    return data;
  }, []);

  const pointsGeometry = useMemo(() => new THREE.BufferGeometry(), []);
  const linesGeometry = useMemo(() => new THREE.BufferGeometry(), []);

  const mouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame((state, delta) => {
    const positions = new Float32Array(particleCount * 3);
    const mouseWorldX = (mouse.current.x * viewport.width) / 2;
    const mouseWorldY = (mouse.current.y * viewport.height) / 2;
    const mousePos = new THREE.Vector3(mouseWorldX, mouseWorldY, 0);

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      p.position.addScaledVector(p.velocity, delta);

      if (p.position.x > 25) p.position.x = -25;
      if (p.position.x < -25) p.position.x = 25;
      if (p.position.y > 15) p.position.y = -15;
      if (p.position.y < -15) p.position.y = 15;
      if (p.position.z > 5) p.position.z = -5;
      if (p.position.z < -5) p.position.z = 5;

      const distToMouse = p.position.distanceTo(mousePos);
      if (distToMouse < 4.0) {
        const force = p.position.clone().sub(mousePos).normalize().multiplyScalar(delta * 2.0 * (4.0 - distToMouse));
        p.position.add(force);
      }

      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;
    }

    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const linePositions = [];
    const lineColors = [];
    const color = new THREE.Color("#00e5ff");

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const p1 = particles[i].position;
        const p2 = particles[j].position;
        const dist = p1.distanceTo(p2);

        if (dist < maxDistance) {
          linePositions.push(p1.x, p1.y, p1.z);
          linePositions.push(p2.x, p2.y, p2.z);

          const alpha = Math.max(0, 1.0 - (dist / maxDistance));
          lineColors.push(color.r, color.g, color.b, alpha);
          lineColors.push(color.r, color.g, color.b, alpha);
        }
      }
    }

    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4));
  });

  return (
    <group position={[0, 0, -2]}>
      <points geometry={pointsGeometry}>
        <pointsMaterial color="#00e5ff" size={0.08} sizeAttenuation={true} transparent opacity={0.9} />
      </points>
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

export default function BackgroundCombined() {
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="background-combined-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: '#050505'
      }}
    >
      <Canvas camera={{ position: [0, 1, 8], fov: 60 }}>
        {/* Abstract Fog */}
        <fog attach="fog" args={['#050505', 4, 18]} />

        {/* Volumetric Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, -2]} intensity={2.0} color="#b026ff" />
        <directionalLight position={[-5, 5, -2]} intensity={2.0} color="#00e5ff" />
        <pointLight position={[0, 2, 0]} intensity={1.5} color="#ffffff" />

        <WavePlane scrollY={scrollY} />
        <DustParticles scrollY={scrollY} />
        <Constellation />
      </Canvas>
    </div>
  );
}
