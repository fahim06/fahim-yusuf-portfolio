import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
          const finalAlpha = alpha * 0.3; 

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
          size={0.08} 
          color="#b026ff" 
          transparent 
          opacity={0.6} 
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
        <fog attach="fog" args={['#0a0a0a', 5, 25]} />
        <Network count={120} />
        <Rig />
      </Canvas>
    </div>
  );
}
