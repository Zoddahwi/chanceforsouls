import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// TouchTexture class handles the interactive fluid trails
class TouchTexture {
  constructor() {
    this.size = 64;
    this.width = this.height = this.size;
    this.maxAge = 64;
    this.radius = 0.25 * this.size;
    this.speed = 1 / this.maxAge;
    this.trail = [];
    this.last = null;
    this.initTexture();
  }

  initTexture() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.texture = new THREE.Texture(this.canvas);
  }

  update() {
    this.clear();
    let speed = this.speed;
    for (let i = this.trail.length - 1; i >= 0; i--) {
      const point = this.trail[i];
      let f = point.force * speed * (1 - point.age / this.maxAge);
      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age++;
      if (point.age > this.maxAge) {
        this.trail.splice(i, 1);
      } else {
        this.drawPoint(point);
      }
    }
    this.texture.needsUpdate = true;
  }

  clear() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addTouch(point) {
    let force = 0;
    let vx = 0;
    let vy = 0;
    const last = this.last;
    if (last) {
      const dx = point.x - last.x;
      const dy = point.y - last.y;
      if (dx === 0 && dy === 0) return;
      const dd = dx * dx + dy * dy;
      let d = Math.sqrt(dd);
      vx = dx / d;
      vy = dy / d;
      force = Math.min(dd * 20000, 2.0);
    }
    this.last = { x: point.x, y: point.y };
    this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
  }

  drawPoint(point) {
    const pos = {
      x: point.x * this.width,
      y: (1 - point.y) * this.height,
    };

    let intensity = 1;
    if (point.age < this.maxAge * 0.3) {
      intensity = Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2));
    } else {
      const t = 1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7);
      intensity = -t * (t - 2);
    }
    intensity *= point.force;

    const radius = this.radius;
    let color = `${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2) * 255}, ${intensity * 255}`;
    let offset = this.size * 5;
    this.ctx.shadowOffsetX = offset;
    this.ctx.shadowOffsetY = offset;
    this.ctx.shadowBlur = radius * 1;
    this.ctx.shadowColor = `rgba(${color},${0.2 * intensity})`;

    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(255,0,0,1)';
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

// GradientBackground handles the WebGL shader rendering
class GradientBackground {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.mesh = null;
    this.uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uColor1: { value: new THREE.Vector3(0.0, 0.545, 0.0) }, // #008b00
      uColor2: { value: new THREE.Vector3(0.863, 0.988, 0.906) }, // #dcfce7
      uColor3: { value: new THREE.Vector3(0.133, 0.773, 0.369) }, // #22c55e
      uColor4: { value: new THREE.Vector3(0.0, 0.545, 0.0) },
      uColor5: { value: new THREE.Vector3(0.863, 0.988, 0.906) },
      uColor6: { value: new THREE.Vector3(0.133, 0.773, 0.369) },
      uSpeed: { value: 1.2 },
      uIntensity: { value: 1.8 },
      uTouchTexture: { value: null },
      uGrainIntensity: { value: 0.08 },
      uZoom: { value: 1.0 },
      uBaseColor: { value: new THREE.Vector3(0.941, 1.0, 0.957) }, // #f0fff4 base
      uGradientSize: { value: 1.0 },
      uGradientCount: { value: 8.0 },
      uColor1Weight: { value: 1.0 },
      uColor2Weight: { value: 1.0 },
    };
  }

  init() {
    const viewSize = this.sceneManager.getViewSize();
    const geometry = new THREE.PlaneGeometry(viewSize.width, viewSize.height, 1, 1);

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
            varying vec2 vUv;
            void main() {
              vec3 pos = position.xyz;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
              vUv = uv;
            }
          `,
      fragmentShader: `
            uniform float uTime;
            uniform vec2 uResolution;
            uniform vec3 uColor1; uniform vec3 uColor2; uniform vec3 uColor3;
            uniform vec3 uColor4; uniform vec3 uColor5; uniform vec3 uColor6;
            uniform float uSpeed; uniform float uIntensity;
            uniform sampler2D uTouchTexture;
            uniform float uGrainIntensity; uniform float uZoom;
            uniform vec3 uBaseColor;
            uniform float uGradientSize; uniform float uGradientCount;
            uniform float uColor1Weight; uniform float uColor2Weight;
            
            varying vec2 vUv;
            
            #define PI 3.14159265359
            
            float grain(vec2 uv, float time) {
              vec2 grainUv = uv * uResolution * 0.5;
              float grainValue = fract(sin(dot(grainUv + time, vec2(12.9898, 78.233))) * 43758.5453);
              return grainValue * 2.0 - 1.0;
            }
            
            vec3 getGradientColor(vec2 uv, float time) {
              float gradientRadius = uGradientSize;
              
              vec2 center1 = vec2(0.5 + sin(time * uSpeed * 0.4) * 0.4, 0.5 + cos(time * uSpeed * 0.5) * 0.4);
              vec2 center2 = vec2(0.5 + cos(time * uSpeed * 0.6) * 0.5, 0.5 + sin(time * uSpeed * 0.45) * 0.5);
              vec2 center3 = vec2(0.5 + sin(time * uSpeed * 0.35) * 0.45, 0.5 + cos(time * uSpeed * 0.55) * 0.45);
              vec2 center4 = vec2(0.5 + cos(time * uSpeed * 0.5) * 0.4, 0.5 + sin(time * uSpeed * 0.4) * 0.4);
              vec2 center5 = vec2(0.5 + sin(time * uSpeed * 0.7) * 0.35, 0.5 + cos(time * uSpeed * 0.6) * 0.35);
              vec2 center6 = vec2(0.5 + cos(time * uSpeed * 0.45) * 0.5, 0.5 + sin(time * uSpeed * 0.65) * 0.5);
              vec2 center7 = vec2(0.5 + sin(time * uSpeed * 0.55) * 0.38, 0.5 + cos(time * uSpeed * 0.48) * 0.42);
              vec2 center8 = vec2(0.5 + cos(time * uSpeed * 0.65) * 0.36, 0.5 + sin(time * uSpeed * 0.52) * 0.44);
              vec2 center9 = vec2(0.5 + sin(time * uSpeed * 0.42) * 0.41, 0.5 + cos(time * uSpeed * 0.58) * 0.39);
              vec2 center10= vec2(0.5 + cos(time * uSpeed * 0.48) * 0.37, 0.5 + sin(time * uSpeed * 0.62) * 0.43);
              vec2 center11= vec2(0.5 + sin(time * uSpeed * 0.68) * 0.33, 0.5 + cos(time * uSpeed * 0.44) * 0.46);
              vec2 center12= vec2(0.5 + cos(time * uSpeed * 0.38) * 0.39, 0.5 + sin(time * uSpeed * 0.56) * 0.41);
              
              float dist1 = length(uv - center1); float dist2 = length(uv - center2);
              float dist3 = length(uv - center3); float dist4 = length(uv - center4);
              float dist5 = length(uv - center5); float dist6 = length(uv - center6);
              float dist7 = length(uv - center7); float dist8 = length(uv - center8);
              float dist9 = length(uv - center9); float dist10 = length(uv - center10);
              float dist11 = length(uv - center11); float dist12 = length(uv - center12);
              
              float influence1 = 1.0 - smoothstep(0.0, gradientRadius, dist1);
              float influence2 = 1.0 - smoothstep(0.0, gradientRadius, dist2);
              float influence3 = 1.0 - smoothstep(0.0, gradientRadius, dist3);
              float influence4 = 1.0 - smoothstep(0.0, gradientRadius, dist4);
              float influence5 = 1.0 - smoothstep(0.0, gradientRadius, dist5);
              float influence6 = 1.0 - smoothstep(0.0, gradientRadius, dist6);
              float influence7 = 1.0 - smoothstep(0.0, gradientRadius, dist7);
              float influence8 = 1.0 - smoothstep(0.0, gradientRadius, dist8);
              float influence9 = 1.0 - smoothstep(0.0, gradientRadius, dist9);
              float influence10 = 1.0 - smoothstep(0.0, gradientRadius, dist10);
              float influence11 = 1.0 - smoothstep(0.0, gradientRadius, dist11);
              float influence12 = 1.0 - smoothstep(0.0, gradientRadius, dist12);
              
              vec2 rotatedUv1 = uv - 0.5;
              float angle1 = time * uSpeed * 0.15;
              rotatedUv1 = vec2(rotatedUv1.x * cos(angle1) - rotatedUv1.y * sin(angle1), rotatedUv1.x * sin(angle1) + rotatedUv1.y * cos(angle1));
              rotatedUv1 += 0.5;
              
              vec2 rotatedUv2 = uv - 0.5;
              float angle2 = -time * uSpeed * 0.12;
              rotatedUv2 = vec2(rotatedUv2.x * cos(angle2) - rotatedUv2.y * sin(angle2), rotatedUv2.x * sin(angle2) + rotatedUv2.y * cos(angle2));
              rotatedUv2 += 0.5;
              
              float radialGradient1 = length(rotatedUv1 - 0.5);
              float radialGradient2 = length(rotatedUv2 - 0.5);
              float radialInfluence1 = 1.0 - smoothstep(0.0, 0.8, radialGradient1);
              float radialInfluence2 = 1.0 - smoothstep(0.0, 0.8, radialGradient2);
              
              vec3 color = vec3(0.0);
              color += uColor1 * influence1 * (0.55 + 0.45 * sin(time * uSpeed)) * uColor1Weight;
              color += uColor2 * influence2 * (0.55 + 0.45 * cos(time * uSpeed * 1.2)) * uColor2Weight;
              color += uColor3 * influence3 * (0.55 + 0.45 * sin(time * uSpeed * 0.8)) * uColor1Weight;
              color += uColor4 * influence4 * (0.55 + 0.45 * cos(time * uSpeed * 1.3)) * uColor2Weight;
              color += uColor5 * influence5 * (0.55 + 0.45 * sin(time * uSpeed * 1.1)) * uColor1Weight;
              color += uColor6 * influence6 * (0.55 + 0.45 * cos(time * uSpeed * 0.9)) * uColor2Weight;
              
              if (uGradientCount > 6.0) {
                color += uColor1 * influence7 * (0.55 + 0.45 * sin(time * uSpeed * 1.4)) * uColor1Weight;
                color += uColor2 * influence8 * (0.55 + 0.45 * cos(time * uSpeed * 1.5)) * uColor2Weight;
                color += uColor3 * influence9 * (0.55 + 0.45 * sin(time * uSpeed * 1.6)) * uColor1Weight;
                color += uColor4 * influence10 * (0.55 + 0.45 * cos(time * uSpeed * 1.7)) * uColor2Weight;
              }
              if (uGradientCount > 10.0) {
                color += uColor5 * influence11 * (0.55 + 0.45 * sin(time * uSpeed * 1.8)) * uColor1Weight;
                color += uColor6 * influence12 * (0.55 + 0.45 * cos(time * uSpeed * 1.9)) * uColor2Weight;
              }
              
              color += mix(uColor1, uColor3, radialInfluence1) * 0.45 * uColor1Weight;
              color += mix(uColor2, uColor4, radialInfluence2) * 0.4 * uColor2Weight;
              
              color = clamp(color, vec3(0.0), vec3(1.0)) * uIntensity;
              
              float luminance = dot(color, vec3(0.299, 0.587, 0.114));
              color = mix(vec3(luminance), color, 1.35);
              color = pow(color, vec3(0.92)); 
              
              float brightness1 = length(color);
              float mixFactor1 = max(brightness1 * 1.2, 0.15); 
              color = mix(uBaseColor, color, mixFactor1);
              
              float maxBrightness = 1.0;
              float brightness = length(color);
              if (brightness > maxBrightness) {
                color = color * (maxBrightness / brightness);
              }
              
              return color;
            }
            
            void main() {
              vec2 uv = vUv;
              
              vec4 touchTex = texture2D(uTouchTexture, uv);
              float vx = -(touchTex.r * 2.0 - 1.0);
              float vy = -(touchTex.g * 2.0 - 1.0);
              float intensity = touchTex.b;
              uv.x += vx * 0.8 * intensity;
              uv.y += vy * 0.8 * intensity;
              
              vec2 center = vec2(0.5);
              float dist = length(uv - center);
              float ripple = sin(dist * 20.0 - uTime * 3.0) * 0.04 * intensity;
              float wave = sin(dist * 15.0 - uTime * 2.0) * 0.03 * intensity;
              uv += vec2(ripple + wave);
              
              vec3 color = getGradientColor(uv, uTime);
              
              float grainValue = grain(uv, uTime);
              color += grainValue * uGrainIntensity;
              
              float timeShift = uTime * 0.5;
              color.r += sin(timeShift) * 0.02;
              color.g += cos(timeShift * 1.4) * 0.02;
              color.b += sin(timeShift * 1.2) * 0.02;
              
              float brightness2 = length(color);
              float mixFactor2 = max(brightness2 * 1.2, 0.15);
              color = mix(uBaseColor, color, mixFactor2);
              
              color = clamp(color, vec3(0.0), vec3(1.0));
              
              float maxBrightness = 1.0;
              float brightness = length(color);
              if (brightness > maxBrightness) {
                color = color * (maxBrightness / brightness);
              }
              
              gl_FragColor = vec4(color, 1.0);
            }
          `,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.z = 0;
    this.sceneManager.scene.add(this.mesh);
  }

  update(delta) {
    if (this.uniforms.uTime) {
      this.uniforms.uTime.value += delta;
    }
  }

  onResize(width, height) {
    const viewSize = this.sceneManager.getViewSize();
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.mesh.geometry = new THREE.PlaneGeometry(viewSize.width, viewSize.height, 1, 1);
    }
    if (this.uniforms.uResolution) {
      this.uniforms.uResolution.value.set(width, height);
    }
  }
}

// React wrapper for the Three.js app
const LiquidGradientBg = ({ scheme = 1 }) => {
  const mountRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    class App {
      constructor(container) {
        this.container = container;
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true, // Output transparent canvas so any HTML background handles the absolute base
          stencil: false,
          depth: false,
        });

        // Setup container sizing instead of window
        const { clientWidth, clientHeight } = this.container;
        this.renderer.setSize(clientWidth, clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setAnimationLoop(null);
        this.container.appendChild(this.renderer.domElement);
        this.renderer.domElement.style.position = 'absolute';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        this.renderer.domElement.style.zIndex = '0';
        this.renderer.domElement.style.pointerEvents = 'none'; // Don't block clicks to overlayed HTML

        this.camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 0.1, 10000);
        this.camera.position.z = 50;
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();

        this.touchTexture = new TouchTexture();
        this.gradientBackground = new GradientBackground(this);
        this.gradientBackground.uniforms.uTouchTexture.value = this.touchTexture.texture;

        this.colorSchemes = {
          1: { // Fresh Light Green (Default)
            color1: new THREE.Vector3(0.0, 0.545, 0.0),   // #008b00 (Brand Green)
            color2: new THREE.Vector3(0.863, 0.988, 0.906), // #dcfce7 (primary-100)
            color3: new THREE.Vector3(0.133, 0.773, 0.369), // #22c55e (primary-500)
            baseColor: new THREE.Vector3(0.941, 1.0, 0.957), // #f0fff4 base
          },
          2: { // Vibrant Brand & Secondary Greens
            color1: new THREE.Vector3(0.0, 0.545, 0.0),   // #008b00
            color2: new THREE.Vector3(0.333, 0.863, 0.525), // #55dc86 (secondary-500)
            color3: new THREE.Vector3(0.133, 0.773, 0.369), // #22c55e
            baseColor: new THREE.Vector3(0.816, 0.969, 0.863), // #d1f7dc base
          },
          3: { // Midnight / Dark Green
            color1: new THREE.Vector3(0.0, 0.231, 0.0),   // #003b00 (primary-900)
            color2: new THREE.Vector3(0.071, 0.373, 0.188), // #125f30 (secondary-900)
            color3: new THREE.Vector3(0.0, 0.545, 0.0),   // #008b00
            baseColor: new THREE.Vector3(0.0, 0.15, 0.0),   // Very dark green base
          },
          4: { // High Contrast Dark
            color1: new THREE.Vector3(0.29, 0.871, 0.502), // #4ade80 (primary-400)
            color2: new THREE.Vector3(0.102, 0.639, 0.314), // #1aa350 (secondary-700)
            color3: new THREE.Vector3(0.0, 0.306, 0.0),   // #004e00 (primary-800)
            baseColor: new THREE.Vector3(0.04, 0.05, 0.04), // Near black base
          },
        };

        this.init();
      }

      setColorScheme(schemeNum) {
        if (!this.colorSchemes[schemeNum]) return;
        const colors = this.colorSchemes[schemeNum];
        const uniforms = this.gradientBackground.uniforms;

        uniforms.uColor1.value.copy(colors.color1);
        uniforms.uColor2.value.copy(colors.color2);
        uniforms.uColor3.value.copy(colors.color3);
        uniforms.uColor4.value.copy(colors.color1);
        uniforms.uColor5.value.copy(colors.color2);
        uniforms.uColor6.value.copy(colors.color3);
        
        uniforms.uBaseColor.value.copy(colors.baseColor);
        
        if (schemeNum === 1 || schemeNum === 2) {
            uniforms.uGradientSize.value = 1.2;
            uniforms.uGradientCount.value = 6.0;
            uniforms.uSpeed.value = 1.0;
            uniforms.uColor1Weight.value = 1.2;
            uniforms.uColor2Weight.value = 1.0;
        } else {
            uniforms.uGradientSize.value = 0.8;
            uniforms.uGradientCount.value = 10.0;
            uniforms.uSpeed.value = 1.3;
            uniforms.uColor1Weight.value = 0.8;
            uniforms.uColor2Weight.value = 1.5;
        }
      }

      init() {
        this.gradientBackground.init();
        this.setColorScheme(1); // will be overridden by component props
        this.boundTick = this.tick.bind(this);
        this.boundOnResize = this.onResize.bind(this);
        this.boundOnMouseMove = this.onMouseMove.bind(this);
        this.boundOnTouchMove = this.onTouchMove.bind(this);

        this.animationId = requestAnimationFrame(this.boundTick);

        window.addEventListener('resize', this.boundOnResize);
        
        // Listen moving on window for global interactivity
        window.addEventListener('mousemove', this.boundOnMouseMove);
        window.addEventListener('touchmove', this.boundOnTouchMove, { passive: false });
      }

      dispose() {
        cancelAnimationFrame(this.animationId);
        window.removeEventListener('resize', this.boundOnResize);
        window.removeEventListener('mousemove', this.boundOnMouseMove);
        window.removeEventListener('touchmove', this.boundOnTouchMove);

        if (this.renderer) {
          this.container.removeChild(this.renderer.domElement);
          this.renderer.dispose();
        }
        if (this.gradientBackground && this.gradientBackground.mesh) {
            this.gradientBackground.mesh.geometry.dispose();
            this.gradientBackground.mesh.material.dispose();
        }
        if (this.touchTexture && this.touchTexture.texture) {
            this.touchTexture.texture.dispose();
        }
      }

      onTouchMove(ev) {
        if (!ev.touches || ev.touches.length === 0) return;
        const touch = ev.touches[0];
        // Don't prevent default on window to allow scrolling, just capture pos
        this.handlePointer(touch.clientX, touch.clientY);
      }

      onMouseMove(ev) {
        this.handlePointer(ev.clientX, ev.clientY);
      }

      handlePointer(clientX, clientY) {
        // Map pointer to container bounds
        const rect = this.container.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));

        if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
             this.touchTexture.addTouch({ x, y });
        }
      }

      getViewSize() {
        const fovInRadians = (this.camera.fov * Math.PI) / 180;
        const height = Math.abs(this.camera.position.z * Math.tan(fovInRadians / 2) * 2);
        return { width: height * this.camera.aspect, height };
      }

      update(delta) {
        this.touchTexture.update();
        this.gradientBackground.update(delta);
      }

      render() {
        const delta = this.clock.getDelta();
        const clampedDelta = Math.min(delta, 0.1);
        this.renderer.render(this.scene, this.camera);
        this.update(clampedDelta);
      }

      tick() {
        this.render();
        this.animationId = requestAnimationFrame(this.boundTick);
      }

      onResize() {
        const { clientWidth, clientHeight } = this.container;
        this.camera.aspect = clientWidth / clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(clientWidth, clientHeight);
        this.gradientBackground.onResize(clientWidth, clientHeight);
      }
    }

    if (mountRef.current && !appRef.current) {
        appRef.current = new App(mountRef.current);
    }
    
    return () => {
        if (appRef.current) {
            appRef.current.dispose();
            appRef.current = null;
        }
    };
  }, []); // Run once on mount

  // Sync scheme prop to WebGL layer
  useEffect(() => {
     if (appRef.current) {
         appRef.current.setColorScheme(scheme);
     }
  }, [scheme]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ overflow: 'hidden' }}
    />
  );
};

export default LiquidGradientBg;
