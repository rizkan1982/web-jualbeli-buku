'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text3D, Center, Environment, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function Book({ position, rotation, color }: { position: [number, number, number], rotation: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1 + rotation[1]
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation} castShadow receiveShadow>
        {/* Book cover */}
        <boxGeometry args={[1.5, 2, 0.2]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
        
        {/* Book pages */}
        <mesh position={[0.05, 0, 0]}>
          <boxGeometry args={[1.35, 1.9, 0.15]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
        </mesh>
        
        {/* Book spine */}
        <mesh position={[-0.7, 0, 0]}>
          <boxGeometry args={[0.15, 2, 0.2]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
        </mesh>
      </mesh>
    </Float>
  )
}

function BookStack() {
  const books = useMemo(() => [
    { position: [-3, 0, 0] as [number, number, number], rotation: [0.1, 0.3, 0] as [number, number, number], color: '#1e40af' },
    { position: [-1.5, 0.5, 1] as [number, number, number], rotation: [-0.1, -0.2, 0.05] as [number, number, number], color: '#3b82f6' },
    { position: [0, 0, 0.5] as [number, number, number], rotation: [0, 0.1, 0] as [number, number, number], color: '#60a5fa' },
    { position: [1.5, 0.3, 0] as [number, number, number], rotation: [0.05, -0.3, 0] as [number, number, number], color: '#1d4ed8' },
    { position: [3, 0, 1] as [number, number, number], rotation: [-0.05, 0.2, -0.05] as [number, number, number], color: '#2563eb' },
  ], [])

  return (
    <>
      {books.map((book, index) => (
        <Book key={index} {...book} />
      ))}
    </>
  )
}

function FloatingParticles() {
  const count = 50
  const mesh = useRef<THREE.InstancedMesh>(null)
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ],
        scale: Math.random() * 0.1 + 0.05,
        speed: Math.random() * 0.5 + 0.2
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.elapsedTime
      particles.forEach((particle, i) => {
        const matrix = new THREE.Matrix4()
        matrix.setPosition(
          particle.position[0],
          particle.position[1] + Math.sin(time * particle.speed + i) * 0.5,
          particle.position[2]
        )
        matrix.scale(new THREE.Vector3(particle.scale, particle.scale, particle.scale))
        mesh.current!.setMatrixAt(i, matrix)
      })
      mesh.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#93c5fd" transparent opacity={0.6} />
    </instancedMesh>
  )
}

export default function Book3D() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#60a5fa" />
        <BookStack />
        <FloatingParticles />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
