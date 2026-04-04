"use client";

import React, { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls, Html, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function HologramBase() {
    return (
        <group position={[0, -4.3, 0]}>
            {/* Main Glowing Ring (Top) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.5, 0.03, 16, 100]} />
                <meshStandardMaterial
                    emissive="var(--color-neon-green)"
                    emissiveIntensity={15}
                    color="var(--color-neon-green)"
                />
            </mesh>

            {/* Depth Rings (Stacked downwards) */}
            {[0.1, 0.25, 0.4].map((y, i) => (
                <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -y, 0]}>
                    <torusGeometry args={[1.5 - (y * 0.2), 0.01, 16, 100]} />
                    <meshStandardMaterial
                        emissive="var(--color-neon-green)"
                        emissiveIntensity={10 / (i + 1)}
                        color="var(--color-neon-green)"
                        transparent
                        opacity={0.6 / (i + 1)}
                    />
                </mesh>
            ))}

            {/* Outer Fainter Ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <torusGeometry args={[1.8, 0.01, 16, 100]} />
                <meshStandardMaterial
                    emissive="var(--color-cyber-cyan)"
                    emissiveIntensity={8}
                    color="var(--color-cyber-cyan)"
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Cylindrical Glow "Core" */}
            <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[1.5, 1.3, 0.4, 32, 1, true]} />
                <meshBasicMaterial
                    color="var(--color-neon-green)"
                    transparent
                    opacity={0.15}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Inner Glow Disk (Top) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <circleGeometry args={[1.5, 32]} />
                <meshBasicMaterial color="var(--color-neon-green)" transparent opacity={0.2} />
            </mesh>

            {/* Vertical Support Beams (Subtle) */}
            {[0, 90, 180, 270].map((angle, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.cos(angle * Math.PI / 180) * 1.45,
                        -0.2,
                        Math.sin(angle * Math.PI / 180) * 1.45
                    ]}
                >
                    <boxGeometry args={[0.02, 0.4, 0.02]} />
                    <meshBasicMaterial color="var(--color-neon-green)" transparent opacity={0.4} />
                </mesh>
            ))}
        </group>
    );
}

function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    const modelRef = useRef<THREE.Group>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame((state) => {
        if (!modelRef.current) return;

        // Base auto-rotation (Ultra-slow)
        modelRef.current.rotation.y += 0.0001;

        // Subtle mouse follow (Very smooth)
        modelRef.current.rotation.y += mousePos.x * 0.01;
        modelRef.current.rotation.x = THREE.MathUtils.lerp(
            modelRef.current.rotation.x,
            mousePos.y * 0.01,
            0.015
        );
    });

    return (
        <>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <primitive ref={modelRef} object={scene} scale={8.5} position={[0, -4.2, 0]} />
            </Float>
            <HologramBase />
        </>
    );
}

function Loader() {
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-8 h-8 border-2 border-[var(--color-neon-green)] border-t-transparent rounded-full animate-spin" />
                <span className="text-[8px] font-['Press_Start_2P'] text-[var(--color-neon-green)] animate-pulse uppercase tracking-tighter">
                    Loading_3D...
                </span>
            </div>
        </Html>
    );
}

const Profile3D: React.FC<{ modelUrl?: string }> = ({ modelUrl = "/3dprofile.glb" }) => {
    return (
        <div className="absolute -top-16 -left-8 w-[calc(100%+64px)] h-[calc(100%+80px)] cursor-grab active:cursor-grabbing z-20">
            <Canvas
                shadows
                camera={{ position: [0, 0, 4], fov: 30 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                className="!overflow-visible"
            >
                <Suspense fallback={<Loader />}>
                    <Stage environment="city" intensity={1.5} shadows="contact">
                        <PresentationControls
                            global
                            rotation={[0, 0.3, 0]}
                            polar={[-Math.PI / 3, Math.PI / 3]}
                            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                        >
                            <Model url={modelUrl} />
                        </PresentationControls>
                    </Stage>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Profile3D;
