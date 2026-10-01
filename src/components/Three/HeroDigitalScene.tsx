import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Particle constellation with glowing points
function ParticleConstellation({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points | null>(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 2.8 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      sc[i] = Math.random() * 0.06 + 0.02;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.05;
    pointsRef.current.rotation.x = Math.sin(t * 0.03) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#38bdf8"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Geometric floating shards (Polyhedra, octahedra, tetrahedra)
function FloatingShards({ count = 14 }: { count?: number }) {
  const groupRef = useRef<THREE.Group | null>(null);

  const shards = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 5.2,
        (Math.random() - 0.5) * 4.2,
        (Math.random() - 0.5) * 3.5,
      ] as [number, number, number],
      rotSpeed: [
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
      ] as [number, number, number],
      scale: 0.12 + Math.random() * 0.22,
      geometryType: i % 3,
    }));
  }, [count]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const shard = shards[i];
      if (shard) {
        child.rotation.x += shard.rotSpeed[0];
        child.rotation.y += shard.rotSpeed[1];
        child.rotation.z += shard.rotSpeed[2];
      }
    });
  });

  return (
    <group ref={groupRef}>
      {shards.map((shard, idx) => (
        <mesh key={idx} position={shard.pos} scale={shard.scale}>
          {shard.geometryType === 0 && <octahedronGeometry />}
          {shard.geometryType === 1 && <tetrahedronGeometry />}
          {shard.geometryType === 2 && <dodecahedronGeometry />}
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.45}
            emissive="#0284c7"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Central futuristic abstract core: nested icosahedron, orbital rings, and glowing points
function CoreNexus() {
  const outerCoreRef = useRef<THREE.Mesh | null>(null);
  const innerCoreRef = useRef<THREE.Mesh | null>(null);
  const ringGroupRef = useRef<THREE.Group | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (outerCoreRef.current) {
      outerCoreRef.current.rotation.x = t * 0.2;
      outerCoreRef.current.rotation.y = t * 0.28;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x = -t * 0.35;
      innerCoreRef.current.rotation.z = t * 0.3;
      const pulse = 1 + Math.sin(t * 1.8) * 0.05;
      innerCoreRef.current.scale.set(pulse, pulse, pulse);
    }

    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.z = t * 0.12;
      ringGroupRef.current.rotation.y = Math.sin(t * 0.2) * 0.3;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.8}>
      <group>
        {/* Outer Wireframe Icosahedron */}
        <mesh ref={outerCoreRef}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color="#bae6fd"
            wireframe
            transparent
            opacity={0.38}
            emissive="#0284c7"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Inner Solid Geometric Node */}
        <mesh ref={innerCoreRef}>
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#0ea5e9"
            metalness={0.9}
            roughness={0.15}
            wireframe={false}
            emissive="#38bdf8"
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* Concentric Orbital Rings */}
        <group ref={ringGroupRef}>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2.1, 0.018, 16, 80]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.5}
              transparent
              opacity={0.7}
            />
          </mesh>

          <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
            <torusGeometry args={[2.5, 0.015, 16, 80]} />
            <meshStandardMaterial
              color="#7dd3fc"
              emissive="#0284c7"
              emissiveIntensity={0.3}
              transparent
              opacity={0.5}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

// Interactive Camera controller responding to Mouse & Scroll
function InteractiveController() {
  const { camera, pointer } = useThree();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY * 0.001;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    // Subtle smooth camera parallax based on mouse pointer & scroll
    const targetX = pointer.x * 0.7;
    const targetY = pointer.y * 0.5 - scrollRef.current * 0.4;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export const HeroDigitalScene: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Graceful CSS fallback if WebGL is disabled or reduced motion requested
  if (!hasWebGL || prefersReducedMotion) {
    return (
      <div className="relative w-full aspect-square max-w-[480px] lg:max-w-[540px] mx-auto flex items-center justify-center rounded-3xl border border-zinc-800/80 bg-zinc-950/60 p-8">
        <div className="w-48 h-48 rounded-full border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-center animate-pulse">
          <div className="w-32 h-32 rounded-full border border-sky-400/40 bg-sky-400/10 flex items-center justify-center">
            <span className="font-display font-extrabold text-2xl text-cyan-400">AK</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="hero-scene-container"
      className="relative w-full aspect-square max-w-[480px] lg:max-w-[540px] mx-auto flex items-center justify-center rounded-3xl border border-zinc-800/80 bg-zinc-950/50 backdrop-blur-md overflow-hidden p-2 shadow-2xl shadow-cyan-950/20 group"
    >
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[6, 6, 6]} color="#38bdf8" intensity={1.5} />
        <pointLight position={[-6, -6, -4]} color="#0284c7" intensity={0.9} />
        <directionalLight position={[0, 4, 2]} intensity={0.8} />

        <CoreNexus />
        <FloatingShards count={isMobile ? 6 : 14} />
        <ParticleConstellation count={isMobile ? 50 : 120} />
        <InteractiveController />
      </Canvas>

      {/* Futuristic Corner HUD telemetry */}
      <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[10px] text-zinc-500 pointer-events-none select-none">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>NODE 3D: ACTIVE</span>
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-zinc-500 pointer-events-none select-none">
        INTERACTIVE GEOMETRY
      </div>
    </div>
  );
};
