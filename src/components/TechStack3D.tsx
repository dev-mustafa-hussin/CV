import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

interface TechSphereProps {
  position: [number, number, number];
  name: string;
  color: string;
  index: number;
}

const TechSphere = ({ position, name, color, index }: TechSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.4 : 1}
        >
          <dodecahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.6 : 0.3}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        <Html
          position={[0, -0.8, 0]}
          center
          style={{
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            pointerEvents: 'none',
          }}
        >
          {name}
        </Html>
      </group>
    </Float>
  );
};

const CentralCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += 0.003;
      coreRef.current.rotation.y += 0.005;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= 0.005;
      innerRef.current.rotation.y -= 0.003;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color="#7C5CFF"
          emissive="#7C5CFF"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#7C5CFF" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

interface TechStack3DProps {
  technologies: { name: string; percentage: number }[];
}

const Scene = ({ technologies }: TechStack3DProps) => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8B500', '#00CED1', '#FF69B4', '#7FFF00', '#FF4500'
  ];

  const limitedTechs = technologies.slice(0, 10);
  
  const techsWithPositions = limitedTechs.map((tech, index) => {
    const angle = (index / limitedTechs.length) * Math.PI * 2;
    const radius = 2.5;
    const heightVariation = (index % 3 - 1) * 0.5;
    
    return {
      ...tech,
      position: [
        Math.cos(angle) * radius,
        heightVariation,
        Math.sin(angle) * radius,
      ] as [number, number, number],
      color: colors[index % colors.length],
    };
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7C5CFF" />
      <spotLight position={[0, 10, 0]} intensity={0.8} color="#00D4FF" angle={0.5} />
      
      <ParticleField />
      <CentralCore />
      
      {techsWithPositions.map((tech, index) => (
        <TechSphere
          key={tech.name}
          position={tech.position}
          name={tech.name}
          color={tech.color}
          index={index}
        />
      ))}
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        minDistance={4}
        maxDistance={12}
      />
    </>
  );
};

const TechStack3D = ({ technologies }: TechStack3DProps) => {
  return (
    <div className="w-full h-[450px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#0a0a1a] to-[#1a1a2e] border border-primary/20">
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
        <Suspense fallback={null}>
          <Scene technologies={technologies} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechStack3D;
