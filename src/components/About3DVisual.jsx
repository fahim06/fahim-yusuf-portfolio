import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Points, PointMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Procedural volumetric point cloud generator for a floating human figure
function generateHumanoidParticles(count) {
  const points = [];

  // Helper to check if a point is inside an ellipsoid
  function inEllipsoid(px, py, pz, cx, cy, cz, rx, ry, rz) {
    return ((px - cx) / rx) ** 2 + ((py - cy) / ry) ** 2 + ((pz - cz) / rz) ** 2 <= 1;
  }

  // Helper to check if a point is inside a capsule (cylinder with rounded ends)
  // approximated by multiple overlapping ellipsoids for the limbs to give smoother joints

  while (points.length < count * 3) {
    // Bounding volume for generation (Passport size bust + hands)
    const px = (Math.random() - 0.5) * 3.0;
    const py = (Math.random() - 0.5) * 4.0;
    const pz = (Math.random() - 0.5) * 2.0;

    let inside = false;

    // 1. Head
    if (inEllipsoid(px, py, pz, 0, 0.7, 0, 0.3, 0.4, 0.35)) inside = true;

    // 2. Neck
    if (!inside && inEllipsoid(px, py, pz, 0, 0.2, 0, 0.15, 0.25, 0.15)) inside = true;

    // 3. Shoulders / Upper Chest (The bust)
    if (!inside && inEllipsoid(px, py, pz, 0, -0.3, 0, 0.6, 0.4, 0.3)) inside = true;

    // 4. Left Arm (Upper half only)
    if (!inside && inEllipsoid(px, py, pz, -0.7, -0.5, 0.1, 0.18, 0.45, 0.18)) inside = true; // Bicep

    // 5. Right Arm (Upper half only)
    if (!inside && inEllipsoid(px, py, pz, 0.7, -0.5, 0.1, 0.18, 0.45, 0.18)) inside = true; // Bicep

    if (inside) {
      // Create a "shell" effect by pushing points towards the boundary slightly, or keep uniform
      // Uniform looks like a solid hologram matrix
      points.push(px, py, pz);
    }
  }

  return new Float32Array(points);
}

function HumanHologram({ scrollY }) {
  const { viewport } = useThree();
  const scale = viewport.width < 5 ? viewport.width / 5 : (viewport.width > 12 ? Math.min(1.5, viewport.width / 12) : 1);

  const groupRef = useRef();
  const humanPointsRef = useRef();
  const backgroundPointsRef = useRef();

  // Generate 15,000 points for a passport-size volumetric human bust
  const humanParticles = useMemo(() => generateHumanoidParticles(15000), []);

  // Removed local background dots since they are now in GlobalParticles

  useFrame((state, delta) => {
    if (groupRef.current) {

      // Reactive scrolling rotation (Object only rotates with scroll)
      const targetY = scrollY.current * 0.002;

      // Smoothly interpolate current rotation to track scroll
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, delta * 4);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, delta * 4);
    }
  });

  return (
    <>
      <group ref={groupRef} scale={scale}>
        {/* The Human Hologram */}
        <Points ref={humanPointsRef} positions={humanParticles} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color="#b026ff"
            size={0.03}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.65}
            blending={THREE.AdditiveBlending}
          />
        </Points>
      </group>
    </>
  );
}

export default function About3DVisual() {
  const scrollY = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas style={{ position: 'absolute', inset: 0 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 7.5]} fov={50} />
        <HumanHologram scrollY={scrollY} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={4}
          maxDistance={12}
          autoRotate={false}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
