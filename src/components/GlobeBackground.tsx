import { useEffect, useRef } from 'react';

interface City {
  name: string;
  lat: number;
  lng: number;
  x?: number;
  y?: number;
  z?: number;
}

interface PaymentFlow {
  from: number;
  to: number;
  progress: number;
  speed: number;
  color: string;
}

const GlobeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    // Major financial cities around the world
    const cities: City[] = [
      { name: 'New York', lat: 40.7128, lng: -74.006 },
      { name: 'London', lat: 51.5074, lng: -0.1278 },
      { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
      { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
      { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
      { name: 'Hong Kong', lat: 22.3193, lng: 114.1694 },
      { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
      { name: 'Mumbai', lat: 19.076, lng: 72.8777 },
      { name: 'Frankfurt', lat: 50.1109, lng: 8.6821 },
      { name: 'São Paulo', lat: -23.5505, lng: -46.6333 },
      { name: 'Toronto', lat: 43.6532, lng: -79.3832 },
      { name: 'Shanghai', lat: 31.2304, lng: 121.4737 },
      { name: 'Mexico City', lat: 19.4326, lng: -99.1332 },
      { name: 'Lagos', lat: 6.5244, lng: 3.3792 },
      { name: 'Seoul', lat: 37.5665, lng: 126.978 },
    ];

    let paymentFlows: PaymentFlow[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const latLngToPoint = (lat: number, lng: number, radius: number, rotationOffset: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + rotationOffset) * (Math.PI / 180);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      return { x, y, z };
    };

    const projectPoint = (x: number, y: number, z: number, centerX: number, centerY: number) => {
      const perspective = 800;
      const scale = perspective / (perspective + z);
      
      return {
        x: centerX + x * scale,
        y: centerY - y * scale,
        scale,
        visible: z < 100
      };
    };

    const createPaymentFlow = () => {
      const from = Math.floor(Math.random() * cities.length);
      let to = Math.floor(Math.random() * cities.length);
      while (to === from) {
        to = Math.floor(Math.random() * cities.length);
      }

      const colors = [
        'rgba(56, 189, 248, 1)',   // Cyan
        'rgba(34, 211, 238, 1)',   // Teal
        'rgba(99, 102, 241, 1)',   // Indigo
        'rgba(168, 85, 247, 1)',   // Purple
      ];

      paymentFlows.push({
        from,
        to,
        progress: 0,
        speed: 0.003 + Math.random() * 0.004,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    };

    const drawGlobe = (time: number) => {
      const centerX = canvas.width * 0.5;
      const centerY = canvas.height * 0.4; // Move globe higher
      const radius = Math.min(canvas.width, canvas.height) * 0.28; // Slightly smaller

      // Clear canvas with gradient
      const bgGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, canvas.width
      );
      bgGradient.addColorStop(0, 'rgba(30, 58, 95, 0.3)');
      bgGradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.95)');
      bgGradient.addColorStop(1, 'rgba(15, 23, 42, 1)');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rotation += 0.15;

      // Draw globe glow
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.8,
        centerX, centerY, radius * 1.5
      );
      glowGradient.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
      glowGradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.05)');
      glowGradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw globe outline
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        for (let lng = 0; lng <= 360; lng += 5) {
          const point = latLngToPoint(lat, lng, radius, rotation);
          const projected = projectPoint(point.x, point.y, point.z, centerX, centerY);
          
          if (projected.visible) {
            if (lng === 0) ctx.moveTo(projected.x, projected.y);
            else ctx.lineTo(projected.x, projected.y);
          }
        }
        ctx.stroke();
      }

      // Draw longitude lines
      for (let lng = 0; lng < 360; lng += 30) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        let started = false;
        for (let lat = -90; lat <= 90; lat += 5) {
          const point = latLngToPoint(lat, lng, radius, rotation);
          const projected = projectPoint(point.x, point.y, point.z, centerX, centerY);
          
          if (projected.visible) {
            if (!started) {
              ctx.moveTo(projected.x, projected.y);
              started = true;
            } else {
              ctx.lineTo(projected.x, projected.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Update city positions
      cities.forEach(city => {
        const point = latLngToPoint(city.lat, city.lng, radius, rotation);
        city.x = point.x;
        city.y = point.y;
        city.z = point.z;
      });

      // Draw cities
      cities.forEach(city => {
        const projected = projectPoint(city.x!, city.y!, city.z!, centerX, centerY);
        
        if (projected.visible) {
          // City glow
          const cityGlow = ctx.createRadialGradient(
            projected.x, projected.y, 0,
            projected.x, projected.y, 15 * projected.scale
          );
          cityGlow.addColorStop(0, 'rgba(56, 189, 248, 0.6)');
          cityGlow.addColorStop(0.5, 'rgba(56, 189, 248, 0.2)');
          cityGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');
          
          ctx.fillStyle = cityGlow;
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, 15 * projected.scale, 0, Math.PI * 2);
          ctx.fill();

          // City dot
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, 3 * projected.scale, 0, Math.PI * 2);
          ctx.fill();

          // Pulse effect
          const pulseRadius = 8 + Math.sin(time * 0.003 + city.lat) * 3;
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.3 + Math.sin(time * 0.003 + city.lat) * 0.2})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, pulseRadius * projected.scale, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Draw payment flows
      paymentFlows = paymentFlows.filter(flow => {
        flow.progress += flow.speed;
        
        if (flow.progress >= 1) return false;

        const fromCity = cities[flow.from];
        const toCity = cities[flow.to];

        const fromProjected = projectPoint(fromCity.x!, fromCity.y!, fromCity.z!, centerX, centerY);
        const toProjected = projectPoint(toCity.x!, toCity.y!, toCity.z!, centerX, centerY);

        // Calculate arc path (curved line above globe surface)
        const midProgress = 0.5;
        const arcHeight = 50;
        
        // Draw arc trail
        ctx.beginPath();
        ctx.strokeStyle = flow.color.replace('1)', '0.3)');
        ctx.lineWidth = 2;

        const segments = 30;
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          if (t > flow.progress) break;

          // Interpolate between cities
          const lat = fromCity.lat + (toCity.lat - fromCity.lat) * t;
          const lng = fromCity.lng + (toCity.lng - fromCity.lng) * t;
          
          // Add arc height
          const arcOffset = Math.sin(t * Math.PI) * arcHeight;
          const point = latLngToPoint(lat, lng, radius + arcOffset, rotation);
          const projected = projectPoint(point.x, point.y, point.z, centerX, centerY);

          if (i === 0) ctx.moveTo(projected.x, projected.y);
          else ctx.lineTo(projected.x, projected.y);
        }
        ctx.stroke();

        // Draw moving packet
        const packetT = flow.progress;
        const packetLat = fromCity.lat + (toCity.lat - fromCity.lat) * packetT;
        const packetLng = fromCity.lng + (toCity.lng - fromCity.lng) * packetT;
        const packetArc = Math.sin(packetT * Math.PI) * arcHeight;
        const packetPoint = latLngToPoint(packetLat, packetLng, radius + packetArc, rotation);
        const packetProjected = projectPoint(packetPoint.x, packetPoint.y, packetPoint.z, centerX, centerY);

        // Packet glow
        const packetGlow = ctx.createRadialGradient(
          packetProjected.x, packetProjected.y, 0,
          packetProjected.x, packetProjected.y, 20
        );
        packetGlow.addColorStop(0, flow.color);
        packetGlow.addColorStop(0.3, flow.color.replace('1)', '0.4)'));
        packetGlow.addColorStop(1, flow.color.replace('1)', '0)'));
        
        ctx.fillStyle = packetGlow;
        ctx.beginPath();
        ctx.arc(packetProjected.x, packetProjected.y, 20, 0, Math.PI * 2);
        ctx.fill();

        // Bright center
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(packetProjected.x, packetProjected.y, 4, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Create new payment flows periodically
      if (Math.random() < 0.03 && paymentFlows.length < 8) {
        createPaymentFlow();
      }

      // Draw floating particles
      for (let i = 0; i < 50; i++) {
        const angle = (time * 0.0005 + i * 0.13) % (Math.PI * 2);
        const distance = radius * 1.2 + Math.sin(time * 0.001 + i) * 30;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance * 0.3;
        
        ctx.fillStyle = `rgba(56, 189, 248, ${0.1 + Math.sin(time * 0.002 + i) * 0.05})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(drawGlobe);
    };

    resize();
    // Start with some flows
    for (let i = 0; i < 5; i++) {
      createPaymentFlow();
    }
    animationId = requestAnimationFrame(drawGlobe);

    window.addEventListener('resize', resize);

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

export default GlobeBackground;
