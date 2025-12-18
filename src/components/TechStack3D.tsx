import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, OrbitControls, Stars } from '@react-three/drei';
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
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.3 : 1}
        >
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <Text
          position={[0, -0.9, 0]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          {name}
        </Text>
      </group>
    </Float>
  );
};

const CentralCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += 0.005;
      coreRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={coreRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#7C5CFF"
        emissive="#7C5CFF"
        emissiveIntensity={0.4}
        wireframe
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const ConnectionLines = ({ technologies }: { technologies: { position: [number, number, number] }[] }) => {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={linesRef}>
      {technologies.map((tech, i) => {
        const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...tech.position)];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <line key={i}>
            <bufferGeometry attach="geometry" {...lineGeometry} />
            <lineBasicMaterial attach="material" color="#7C5CFF" opacity={0.3} transparent />
          </line>
        );
      })}
    </group>
  );
};

interface TechStack3DProps {
  technologies: { name: string; percentage: number }[];
}

const TechStack3D = ({ technologies }: TechStack3DProps) => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8B500', '#00CED1', '#FF69B4', '#7FFF00', '#FF4500'
  ];

  const limitedTechs = technologies.slice(0, 12);
  
  const techsWithPositions = limitedTechs.map((tech, index) => {
    const angle = (index / limitedTechs.length) * Math.PI * 2;
    const radius = 3;
    const heightVariation = (index % 3 - 1) * 0.8;
    
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
    <div className="w-full h-[500px] rounded-2xl overflow-hidden bg-gradient-to-b from-background/50 to-card/30 border border-border/30">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7C5CFF" />
        
        <Stars radius={50} depth={50} count={1000} factor={4} fade speed={2} />
        
        <CentralCore />
        
        <ConnectionLines technologies={techsWithPositions} />
        
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
          autoRotateSpeed={0.5}
          minDistance={5}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
};

export default TechStack3D;
