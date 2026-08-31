import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, PerspectiveCamera, Text, Box, Plane } from '@react-three/drei';
import * as THREE from 'three';

function QuantumTerminal({ formStatus, isTyping, isHoveringSubmit, isVisible, formData }) {
  const { viewport } = useThree();
  const scale = viewport.width < 5 ? viewport.width / 5 : (viewport.width > 12 ? Math.min(1.5, viewport.width / 12) : 1);
  const groupRef = useRef();

  // Matrix Grid Particles
  const cols = 50;
  const particleCount = 2000;

  const [glitchIntensity, setGlitchIntensity] = useState(0);

  const initialPositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Pick a random column
      const col = Math.floor(Math.random() * cols);
      // Map to a screen of size ~4.5x2.5
      pos[i * 3] = (col / cols - 0.5) * 4.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
      pos[i * 3 + 2] = 0; // Flat on screen
    }
    return pos;
  }, [cols, particleCount]);

  const pointsRef = useRef();
  const matRef = useRef();

  useEffect(() => {
    // We handle idle glitching directly in useFrame now
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Terminal floating animation
    groupRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05 - 0.2; // Slightly angled towards form
    groupRef.current.rotation.x = 0.1;

    // Matrix particle animation
    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes.position.array;
      const speed = isTyping && formStatus !== 'success' ? 0 : (formStatus === 'success' ? 5.0 : (isHoveringSubmit ? 2.0 : 0.5));

      for (let i = 0; i < particleCount; i++) {
        // Fall down like matrix rain
        pos[i * 3 + 1] -= delta * speed;

        // Glitch jitter on typing
        if (glitchIntensity > 0 && Math.random() > 0.8) {
          pos[i * 3] += (Math.random() - 0.5) * 0.2; // Jitter X
          pos[i * 3 + 1] += (Math.random() - 0.5) * 0.2; // Jitter Y
        }

        // Reset to top if it goes over bottom
        if (pos[i * 3 + 1] < -1.25) {
          pos[i * 3 + 1] = 1.25;
          // Snap X back to a grid column (repair glitch)
          const col = Math.floor(Math.random() * cols);
          pos[i * 3] = (col / cols - 0.5) * 4.5;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Pulse colors
    if (matRef.current) {
      const targetColor = new THREE.Color(
        formStatus === 'success' ? "#ffffff" : (isHoveringSubmit ? "#ffffff" : "#b026ff")
      );
      matRef.current.color.lerp(targetColor, delta * 4);
    }

    if (isTyping) {
      if (glitchIntensity > 0) setGlitchIntensity(0);
    } else {
      // Idle Glitch Generation
      if (formStatus !== 'success' && Math.random() > 0.98) {
        setGlitchIntensity(1.0);
      }

      // Decay glitch
      if (glitchIntensity > 0) {
        setGlitchIntensity(Math.max(0, glitchIntensity - delta * 2));
      }
    }
  });

  return (
    <group ref={groupRef} scale={scale} position={[0, 0.5, 0]}>
      {/* Physical Terminal Deck */}
      <Box args={[5.2, 0.3, 3]} position={[0, -1.8, 0.5]} rotation={[0.2, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.4} wireframe={isHoveringSubmit && formStatus !== 'success'} />
      </Box>
      <Box args={[5.2, 1.8, 0.4]} position={[0, -0.9, -1]} rotation={[0.1, 0, 0]}>
        <meshStandardMaterial color="#111" metalness={1.0} roughness={0.2} />
      </Box>

      {/* Screen Backdrop */}
      <Plane args={[4.8, 2.8]} position={[0, 0.2, -0.7]} rotation={[0.1, 0, 0]}>
        <meshBasicMaterial color="#000" transparent opacity={0.85} />
      </Plane>

      {/* Matrix Particles */}
      <group position={[0, 0.2, -0.65]} rotation={[0.1, 0, 0]}>
        <Points ref={pointsRef} positions={initialPositions} stride={3} frustumCulled={false}>
          <PointMaterial
            ref={matRef}
            transparent
            color="#b026ff"
            size={0.03}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.7}
            blending={THREE.AdditiveBlending}
          />
        </Points>

        {/* Success Text */}
        {formStatus === 'success' && (
          <Text
            position={[0, 0, 0.1]}
            fontSize={0.25}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            textAlign="center"
            maxWidth={4}
          >
            {`System.out.print(\n  "Message Transmitted"\n);`}
          </Text>
        )}

        {/* Live Email Draft (shown when typing or submitted) */}
        {isTyping && formStatus !== 'success' && formData && (
          <Text
            position={[-2.2, 1.1, 0.1]} // Top-left alignment
            fontSize={0.15}
            color="#E8E8E8"
            anchorX="left"
            anchorY="top"
            maxWidth={4.4}
            lineHeight={1.4}
          >
            {`NEW MESSAGE\n------------------------\nFROM: ${formData.email || '...'}\nNAME: ${formData.name || '...'}\n\n${formData.message || '...'}`}
          </Text>
        )}
      </group>
    </group>
  );
}

export default function Contact3DVisual({ formStatus, isTyping, isHoveringSubmit, isVisible, formData }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      {/* Camera looks right into the portal */}
      <Canvas style={{ position: 'absolute', inset: 0 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 2]} intensity={1.5} color="#00e5ff" />
        <directionalLight position={[-5, 5, 2]} intensity={1.0} color="#b026ff" />

        <QuantumTerminal
          formStatus={formStatus}
          isTyping={isTyping}
          isHoveringSubmit={isHoveringSubmit}
          isVisible={isVisible}
          formData={formData}
        />
      </Canvas>
    </div>
  );
}
