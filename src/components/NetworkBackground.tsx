import { useEffect, useRef } from 'react';

const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[] = [];
    let dataPackets: DataPacket[] = [];

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulsePhase: number;
    }

    interface DataPacket {
      startNode: number;
      endNode: number;
      progress: number;
      speed: number;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createNodes = () => {
      const nodeCount = Math.floor((canvas.width * canvas.height) / 25000);
      nodes = [];
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const createDataPacket = () => {
      if (nodes.length < 2) return;
      const startNode = Math.floor(Math.random() * nodes.length);
      let endNode = Math.floor(Math.random() * nodes.length);
      while (endNode === startNode) {
        endNode = Math.floor(Math.random() * nodes.length);
      }
      
      dataPackets.push({
        startNode,
        endNode,
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
      });
    };

    const draw = (time: number) => {
      ctx.fillStyle = 'rgba(30, 41, 59, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8
      );
      gradient.addColorStop(0, 'rgba(14, 165, 233, 0.08)');
      gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.95)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Draw connections
        nodes.forEach((otherNode, j) => {
          if (i >= j) return;
          const dx = otherNode.x - node.x;
          const dy = otherNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const opacity = (1 - distance / 200) * 0.15;
            ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });

        // Draw node with pulse effect
        const pulseScale = 1 + Math.sin(time * 0.002 + node.pulsePhase) * 0.3;
        const glowRadius = node.radius * 3 * pulseScale;
        
        // Outer glow
        const nodeGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        );
        nodeGradient.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
        nodeGradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.1)');
        nodeGradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
        
        ctx.fillStyle = nodeGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulseScale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw data packets
      dataPackets = dataPackets.filter(packet => {
        packet.progress += packet.speed;
        
        if (packet.progress >= 1) return false;

        const startNode = nodes[packet.startNode];
        const endNode = nodes[packet.endNode];
        if (!startNode || !endNode) return false;

        const x = startNode.x + (endNode.x - startNode.x) * packet.progress;
        const y = startNode.y + (endNode.y - startNode.y) * packet.progress;

        // Draw packet with trail
        const trailLength = 5;
        for (let i = 0; i < trailLength; i++) {
          const trailProgress = Math.max(0, packet.progress - i * 0.02);
          const trailX = startNode.x + (endNode.x - startNode.x) * trailProgress;
          const trailY = startNode.y + (endNode.y - startNode.y) * trailProgress;
          const alpha = (1 - i / trailLength) * 0.8;
          
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.beginPath();
          ctx.arc(trailX, trailY, 2 - i * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Main packet glow
        const packetGradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        packetGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        packetGradient.addColorStop(0.3, 'rgba(56, 189, 248, 0.6)');
        packetGradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
        
        ctx.fillStyle = packetGradient;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Add new data packets periodically
      if (Math.random() < 0.02) {
        createDataPacket();
      }

      // Draw center hexagon pattern
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const hexRadius = Math.min(canvas.width, canvas.height) * 0.3;
      
      for (let ring = 1; ring <= 3; ring++) {
        const ringRadius = hexRadius * (ring / 3);
        const rotation = time * 0.0001 * (ring % 2 === 0 ? 1 : -1);
        
        ctx.strokeStyle = `rgba(14, 165, 233, ${0.05 / ring})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 + rotation;
          const x = centerX + Math.cos(angle) * ringRadius;
          const y = centerY + Math.sin(angle) * ringRadius;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createNodes();
    animationId = requestAnimationFrame(draw);

    window.addEventListener('resize', () => {
      resize();
      createNodes();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(180deg, hsl(222 47% 11%) 0%, hsl(217 32% 17%) 100%)' }}
    />
  );
};

export default NetworkBackground;
