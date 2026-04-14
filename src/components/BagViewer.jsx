import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Float, OrbitControls } from '@react-three/drei';
import useOrderStore from '../store/useOrderStore';

/**
 * Returns metal frame color by frame style.
 * @param {'gold' | 'silver' | 'rose-gold'} frameColor - Selected frame color.
 * @returns {string} Hex color used by the clutch frame.
 */
function getFrameMaterialColor(frameColor) {
  const frameColorMap = {
    gold: '#C9A84C',
    silver: '#C0C0C0',
    'rose-gold': '#E0BFB8',
  };
  return frameColorMap[frameColor] || frameColorMap.gold;
}

/**
 * Procedural 3D Tote Bag mesh.
 * Renders a structured tote with sequined finish and top handles.
 * @returns {JSX.Element} Tote bag mesh group.
 */
function ToteBag() {
  const sequinColor = useOrderStore((state) => state.sequinColor);
  const sequinStyle = useOrderStore((state) => state.sequinStyle);
  const roughness = sequinStyle === 'glossy' ? 0.16 : 0.85;
  const metalness = sequinStyle === 'glossy' ? 0.58 : 0.28;

  return (
    <group>
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[2.55, 2.95, 0.95]} />
        <meshStandardMaterial color={sequinColor} roughness={roughness} metalness={metalness} />
      </mesh>
      <mesh position={[0, 1.26, 0.42]}>
        <boxGeometry args={[2.45, 0.15, 0.16]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.75} metalness={0.2} />
      </mesh>
      <mesh position={[-0.72, 1.77, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.36, 0.07, 24, 48, Math.PI]} />
        <meshStandardMaterial color={sequinColor} roughness={roughness} metalness={metalness} />
      </mesh>
      <mesh position={[0.72, 1.77, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.36, 0.07, 24, 48, Math.PI]} />
        <meshStandardMaterial color={sequinColor} roughness={roughness} metalness={metalness} />
      </mesh>
    </group>
  );
}

/**
 * Procedural 3D Clutch Bag mesh.
 * Renders a slim rectangular clutch with metallic frame and colored panel.
 * @returns {JSX.Element} Clutch bag mesh group.
 */
function ClutchBag() {
  const frameColor = useOrderStore((state) => state.frameColor);
  const panelColor = useOrderStore((state) => state.panelColor);
  const frameMaterialColor = getFrameMaterialColor(frameColor);

  return (
    <group>
      <mesh>
        <boxGeometry args={[3, 1.8, 0.62]} />
        <meshStandardMaterial color="#18181b" roughness={0.3} metalness={0.62} />
      </mesh>
      <mesh position={[0, 0, 0.33]}>
        <planeGeometry args={[2.6, 1.42]} />
        <meshStandardMaterial color={panelColor} roughness={0.35} metalness={0.22} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[3.08, 0.08, 0.72]} />
        <meshStandardMaterial color={frameMaterialColor} metalness={0.92} roughness={0.12} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[3.08, 0.08, 0.72]} />
        <meshStandardMaterial color={frameMaterialColor} metalness={0.92} roughness={0.12} />
      </mesh>
      <mesh position={[-1.4, 0.9, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color={frameMaterialColor} metalness={0.96} roughness={0.08} />
      </mesh>
      <mesh position={[1.4, 0.9, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color={frameMaterialColor} metalness={0.96} roughness={0.08} />
      </mesh>
    </group>
  );
}

/**
 * Main 3D viewer component with React Three Fiber.
 * Displays the selected bag type with live customization updates.
 * @returns {JSX.Element} Styled viewer with interactive canvas.
 */
export default function BagViewer() {
  const bagType = useOrderStore((state) => state.bagType);

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px] border border-stone-200 bg-gradient-to-b from-white to-stone-100 shadow-[0_25px_50px_rgba(28,27,27,0.12)]">
      <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-stone-300 bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sacimak-variant">
        3D Viewer
      </div>
      <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full border border-sacimak-primary/25 bg-sacimak-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sacimak-primary">
        {bagType}
      </div>

      <Canvas camera={{ position: [0, 0.2, 8], fov: 46 }}>
        <ambientLight intensity={0.55} />
        <spotLight position={[10, 14, 10]} angle={0.18} penumbra={1} intensity={1.1} />
        <pointLight position={[-8, 1, -8]} intensity={0.4} />
        <Environment preset="city" />

        <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.32}>
          {bagType === 'tote' ? <ToteBag /> : <ClutchBag />}
        </Float>

        <ContactShadows position={[0, -2, 0]} opacity={0.45} blur={2.5} scale={7} />
        <OrbitControls enablePan={false} minDistance={5} maxDistance={12} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
