import React, { useEffect, useRef, useMemo } from "react";

interface AntigravityProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: "capsule" | "sphere" | "box" | "tetrahedron";
  fieldStrength?: number;
}

interface Particle {
  t: number;
  speed: number;
  mx: number; // Original x position
  my: number; // Original y position
  mz: number; // Z-axis factor
  cx: number; // Current x position
  cy: number; // Current y position
  cz: number; // Current z position
  randomRadiusOffset: number;
}

const Antigravity: React.FC<AntigravityProps> = ({
  count = 450,
  magnetRadius = 17,
  ringRadius = 8,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = "#FF9FFC",
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = "capsule",
  fieldStrength = 10,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const virtualMouseRef = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);

  // Parse magnet and ring radius to canvas coordinates scale
  const scaleMult = 15;
  const targetMagnetRadius = magnetRadius * scaleMult;
  const targetRingRadius = ringRadius * scaleMult;

  // Initialize particles once canvas size is known or using absolute sizes
  const particles = useMemo<Particle[]>(() => {
    const temp: Particle[] = [];
    const width = 1080;
    const height = 1080;

    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * height;
      const z = (Math.random() - 0.5) * 20;

      const randomRadiusOffset = (Math.random() - 0.5) * 2;

      temp.push({
        t,
        speed,
        mx: x,
        my: y,
        mz: z,
        cx: x,
        cy: y,
        cz: z,
        randomRadiusOffset,
      });
    }
    return temp;
  }, [count]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Center relative mouse coordinates
      mouseRef.current.x = (e.clientX - rect.left) - rect.width / 2;
      mouseRef.current.y = (e.clientY - rect.top) - rect.height / 2;
      lastMouseMoveTime.current = Date.now();
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Draw background or clear
      ctx.clearRect(0, 0, w, h);

      // Save drawing context state
      ctx.save();
      // Translate to center so 0,0 is screen center
      ctx.translate(w / 2, h / 2);

      let destX = mouseRef.current.x;
      let destY = mouseRef.current.y;

      // Auto animate mouse destination if no movement
      if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
        const time = Date.now() / 1000;
        destX = Math.sin(time * 0.5) * (w / 4);
        destY = Math.cos(time * 0.5 * 2) * (h / 4);
      }

      // Smooth virtual mouse tracking
      const smoothFactor = 0.05;
      virtualMouseRef.current.x += (destX - virtualMouseRef.current.x) * smoothFactor;
      virtualMouseRef.current.y += (destY - virtualMouseRef.current.y) * smoothFactor;

      const targetX = virtualMouseRef.current.x;
      const targetY = virtualMouseRef.current.y;

      const globalRotation = (Date.now() / 1000) * rotationSpeed;

      // Update and draw particles
      particles.forEach((p) => {
        p.t += p.speed / 2;

        const projectionFactor = 1 - p.cz / 50;
        const projectedTargetX = targetX * projectionFactor;
        const projectedTargetY = targetY * projectionFactor;

        const dx = p.mx - projectedTargetX;
        const dy = p.my - projectedTargetY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetPos = { x: p.mx, y: p.my, z: p.mz * depthFactor };

        if (dist < targetMagnetRadius) {
          const angle = Math.atan2(dy, dx) + globalRotation;
          const wave = Math.sin(p.t * waveSpeed + angle) * (0.5 * waveAmplitude * scaleMult);
          const deviation = p.randomRadiusOffset * (5 / (fieldStrength + 0.1)) * scaleMult;
          const currentRingRadius = targetRingRadius + wave + deviation;

          targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle);
          targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle);
          targetPos.z = p.mz * depthFactor + Math.sin(p.t) * (1 * waveAmplitude * depthFactor);
        }

        // Apply lerp
        p.cx += (targetPos.x - p.cx) * lerpSpeed;
        p.cy += (targetPos.y - p.cy) * lerpSpeed;
        p.cz += (targetPos.z - p.cz) * lerpSpeed;

        // Draw shape
        const currentDistToMouse = Math.sqrt(
          Math.pow(p.cx - projectedTargetX, 2) + Math.pow(p.cy - projectedTargetY, 2)
        );

        const distFromRing = Math.abs(currentDistToMouse - targetRingRadius);
        let scaleFactor = 1 - distFromRing / (scaleMult * 1.5);
        scaleFactor = Math.max(0, Math.min(1, scaleFactor));

        const pulse = (0.8 + Math.sin(p.t * pulseSpeed) * 0.2 * particleVariance);
        const finalScale = scaleFactor * pulse * particleSize;

        if (finalScale > 0.05) {
          ctx.beginPath();
          ctx.fillStyle = color;

          ctx.save();
          ctx.translate(p.cx, p.cy);

          // Calculate rotation towards mouse
          const rotationAngle = Math.atan2(p.cy - projectedTargetY, p.cx - projectedTargetX) + Math.PI / 2;
          ctx.rotate(rotationAngle);

          const size = finalScale * 2;

          if (particleShape === "capsule") {
            const capWidth = size * 0.6;
            const capHeight = size * 2.2;
            ctx.roundRect(-capWidth / 2, -capHeight / 2, capWidth, capHeight, capWidth / 2);
            ctx.fill();
          } else if (particleShape === "sphere") {
            ctx.arc(0, 0, size * 1.1, 0, Math.PI * 2);
            ctx.fill();
          } else if (particleShape === "box") {
            ctx.fillRect(-size / 2, -size / 2, size, size);
          } else if (particleShape === "tetrahedron") {
            ctx.moveTo(0, -size);
            ctx.lineTo(-size, size);
            ctx.lineTo(size, size);
            ctx.closePath();
            ctx.fill();
          }

          ctx.restore();
        }
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particles, magnetRadius, ringRadius, waveSpeed, waveAmplitude, particleSize, lerpSpeed, color, autoAnimate, particleVariance, rotationSpeed, depthFactor, pulseSpeed, particleShape, fieldStrength]);

  return (
    <canvas
      ref={canvasRef}
      width={1080}
      height={1080}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default Antigravity;
