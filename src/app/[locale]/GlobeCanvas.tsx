'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EARTH_RADIUS = 2.7;
const MARKER_SURFACE_OFFSET = 0.02;
const MARKER_CIRCLE_RADIUS = 0.025;
const MARKER_CIRCLE_SEGMENTS = 32;
const MARKER_LABEL_OUTWARD = 0.18;
const MARKER_LABEL_TANGENT = 0.04;
const CAMERA_FOV = 45;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 100;
const CAMERA_POS = { x: 0, y: 0.6, z: 5.8 };
const EARTH_GROUP_Y = -0.6;
const ATMOSPHERE_SCALE = 1.0005;
const AUTO_ROTATE_SPEED = 0.0008;
const DRAG_SENSITIVITY = 0.0008;
const DRAG_FRICTION = 0.95;
const TARGET_FPS = 60;
const MIN_FRAME_MS = 1000 / TARGET_FPS;
const REF_FRAME_MS = 1000 / 60;

const atmosphereVert = `
varying vec3 vNormalW;
varying vec3 vWorldPosition;
void main() {
  vNormalW = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPosition = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;

const atmosphereFrag = `
uniform vec3 uCameraPosition;
uniform vec3 uAtmosphereColor;
uniform vec3 uAtmosphereColorRim;
uniform float uRimPower;
uniform float uRimStrength;
varying vec3 vNormalW;
varying vec3 vWorldPosition;
void main() {
  vec3 n = normalize(vNormalW);
  vec3 viewDir = normalize(uCameraPosition - vWorldPosition);
  float ndotv = clamp(dot(n, viewDir), 0.0, 1.0);
  float rim = pow(1.0 - ndotv, uRimPower);
  vec3 col = mix(uAtmosphereColor, uAtmosphereColorRim, rim);
  float alpha = rim * uRimStrength;
  gl_FragColor = vec4(col * alpha, alpha);
}`;

interface MarkerDef {
  lat: number;
  lon: number;
  id: string;
  label: string;
}

interface GlobeCanvasProps {
  onMarkerClick?: (id: string) => void;
}

const MARKERS: MarkerDef[] = [
  { lat: 37.55, lon: 126.98, id: 'korea', label: 'Korea' },
  { lat: 40.4168, lon: -3.7038, id: 'spain', label: 'Spain' },
  { lat: 39.9042, lon: 116.4074, id: 'china', label: 'China' },
  { lat: -6.2088, lon: 106.8456, id: 'indonesia', label: 'Indonesia' },
  { lat: 38.7223, lon: -9.1393, id: 'portugal', label: 'Portugal' },
  { lat: 48.8566, lon: 2.3522, id: 'france', label: 'France' },
  { lat: 38.9072, lon: -77.0369, id: 'usa', label: 'USA' },
  { lat: 35.6762, lon: 139.6503, id: 'japan', label: 'Japan' },
];

function latLonToSurface(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function createLabelSprite(text: string): THREE.Sprite | null {
  if (!text) return null;
  const padX = 14, padY = 8, fontSize = 40;
  const font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`;
  const measure = document.createElement('canvas');
  const mctx = measure.getContext('2d')!;
  mctx.font = font;
  const tw = mctx.measureText(text).width;
  const w = Math.ceil(tw + padX * 2);
  const h = Math.ceil(fontSize + padY * 2);
  const pr = Math.min(window.devicePixelRatio, 2);
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.floor(w * pr));
  c.height = Math.max(1, Math.floor(h * pr));
  const ctx = c.getContext('2d')!;
  ctx.scale(pr, pr);
  ctx.font = font;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  const r = 6, bw = w - 2, bh = h - 2;
  ctx.moveTo(1 + r, 1);
  ctx.lineTo(1 + bw - r, 1);
  ctx.quadraticCurveTo(1 + bw, 1, 1 + bw, 1 + r);
  ctx.lineTo(1 + bw, 1 + bh - r);
  ctx.quadraticCurveTo(1 + bw, 1 + bh, 1 + bw - r, 1 + bh);
  ctx.lineTo(1 + r, 1 + bh);
  ctx.quadraticCurveTo(1, 1 + bh, 1, 1 + bh - r);
  ctx.lineTo(1, 1 + r);
  ctx.quadraticCurveTo(1, 1, 1 + r, 1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillText(text, padX, h / 2);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  const worldH = 0.11;
  sprite.scale.set((w / h) * worldH, worldH, 1);
  sprite.renderOrder = 10;
  return sprite;
}

function addMarker(sphere: THREE.Mesh, lat: number, lon: number, label: string) {
  const normal = latLonToSurface(lat, lon, EARTH_RADIUS).normalize();
  const pos = normal.clone().multiplyScalar(EARTH_RADIUS + MARKER_SURFACE_OFFSET);
  const geo = new THREE.CircleGeometry(MARKER_CIRCLE_RADIUS, MARKER_CIRCLE_SEGMENTS);
  const mat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
  const group = new THREE.Group();
  group.position.copy(pos);
  group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  const marker = new THREE.Mesh(geo, mat);
  group.add(marker);
  const sprite = createLabelSprite(label);
  if (sprite) {
    sprite.position.set(0, MARKER_LABEL_TANGENT, MARKER_LABEL_OUTWARD);
    group.add(sprite);
  }
  sphere.add(group);
}

export default function GlobeCanvas({ onMarkerClick }: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const onMarkerClickRef = useRef(onMarkerClick);
  onMarkerClickRef.current = onMarkerClick;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, CAMERA_NEAR, CAMERA_FAR);
    camera.position.set(CAMERA_POS.x, CAMERA_POS.y, CAMERA_POS.z);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.28);
    const fillLight = new THREE.DirectionalLight(0xa8c4ff, 0.45);
    const rimLight = new THREE.DirectionalLight(0xffe8d0, 0.35);
    keyLight.position.set(4, 5, 6);
    fillLight.position.set(-5, 2, 4);
    rimLight.position.set(-2, -3, -6);

    // Earth
    const earthTex = new THREE.TextureLoader().load('/img/main/texture/earth-night.webp');
    earthTex.colorSpace = THREE.SRGBColorSpace;
    const earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 48, 24);
    const sphere = new THREE.Mesh(earthGeo, new THREE.MeshBasicMaterial({ map: earthTex, color: 0xdddddd }));
    sphere.renderOrder = 0;

    // Atmosphere
    const atmosphereMat = new THREE.ShaderMaterial({
      uniforms: {
        uCameraPosition: { value: new THREE.Vector3() },
        uAtmosphereColor: { value: new THREE.Color(0x4a9fff) },
        uAtmosphereColorRim: { value: new THREE.Color(0x88ddff) },
        uRimPower: { value: 2.35 },
        uRimStrength: { value: 0.85 },
      },
      vertexShader: atmosphereVert,
      fragmentShader: atmosphereFrag,
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });
    const atmosphere = new THREE.Mesh(earthGeo, atmosphereMat);
    atmosphere.scale.setScalar(ATMOSPHERE_SCALE);
    atmosphere.renderOrder = 1;

    // Country highlight sphere
    const HIGHLIGHT_MAX_OPACITY = 0.2;
    const HIGHLIGHT_FADE_SPEED = 0.15;
    let highlightTargetOpacity = 0;

    const highlightMat = new THREE.MeshBasicMaterial({
      map: null, transparent: true, opacity: 0,
      depthWrite: false, depthTest: true, side: THREE.FrontSide,
    });
    const highlightSphere = new THREE.Mesh(earthGeo, highlightMat);
    highlightSphere.scale.setScalar(1.002);
    highlightSphere.renderOrder = 2;
    highlightSphere.visible = false;

    const countryTexLoader = new THREE.TextureLoader();
    const countryTexCache: Record<string, THREE.Texture> = {};
    function getCountryTexture(id: string) {
      if (!countryTexCache[id]) {
        const tex = countryTexLoader.load(`/img/main/countries/${id}.png`);
        tex.colorSpace = THREE.SRGBColorSpace;
        countryTexCache[id] = tex;
      }
      return countryTexCache[id];
    }
    function showCountryHighlight(id: string | null) {
      if (!id) { highlightTargetOpacity = 0; return; }
      highlightMat.map = getCountryTexture(id);
      highlightMat.needsUpdate = true;
      highlightSphere.visible = true;
      highlightTargetOpacity = HIGHLIGHT_MAX_OPACITY;
    }

    // Country mask data for UV picking
    const MASK_W = 2048, MASK_H = 1024, MASK_THRESHOLD = 220;
    const countryMaskData: Record<string, ImageData | null> = {};
    function loadMask(id: string) {
      if (countryMaskData[id] !== undefined) return;
      countryMaskData[id] = null;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = MASK_W; c.height = MASK_H;
        const ctx = c.getContext('2d')!;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, MASK_W, MASK_H);
        try { countryMaskData[id] = ctx.getImageData(0, 0, MASK_W, MASK_H); } catch { countryMaskData[id] = null; }
      };
      img.src = `/img/main/countries/${id}.png`;
    }
    MARKERS.forEach(m => loadMask(m.id));

    function pickCountryByUV(uv: THREE.Vector2): string | null {
      for (const id of Object.keys(countryMaskData)) {
        const data = countryMaskData[id];
        if (!data) continue;
        let x = Math.floor(uv.x * data.width);
        let y = Math.floor((1 - uv.y) * data.height);
        x = Math.max(0, Math.min(x, data.width - 1));
        y = Math.max(0, Math.min(y, data.height - 1));
        const alpha = data.data[(y * data.width + x) * 4 + 3];
        if (alpha > MASK_THRESHOLD) return id;
      }
      return null;
    }

    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    let hoveredId: string | null = null;

    const earthGroup = new THREE.Group();
    earthGroup.position.y = EARTH_GROUP_Y;
    earthGroup.add(sphere);
    earthGroup.add(highlightSphere);
    earthGroup.add(atmosphere);

    // Markers
    MARKERS.forEach(m => addMarker(sphere, m.lat, m.lon, m.label));

    scene.add(ambient, keyLight, fillLight, rimLight, earthGroup);

    // Drag
    let baseAngle = 0;
    let dragOffset = 0;
    let velocity = 0;
    let dragging = false;
    let lastPointerX = 0;
    let dragStartX = 0;
    let dragStartY = 0;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      velocity = 0;
      lastPointerX = e.clientX;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    function pickHover(clientX: number, clientY: number) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObject(sphere, false);
      if (hits.length > 0 && hits[0].uv) {
        const id = pickCountryByUV(hits[0].uv);
        if (id !== hoveredId) { hoveredId = id; showCountryHighlight(id); canvas!.style.cursor = id ? 'pointer' : ''; }
      } else if (hoveredId) {
        hoveredId = null; showCountryHighlight(null); canvas!.style.cursor = '';
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - lastPointerX;
        lastPointerX = e.clientX;
        dragOffset += dx * DRAG_SENSITIVITY;
        velocity = dx * DRAG_SENSITIVITY;
        return;
      }
      pickHover(e.clientX, e.clientY);
    };
    const onPointerUp = (e: PointerEvent) => {
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      dragging = false;
      try { canvas.releasePointerCapture(e.pointerId); } catch { /* noop */ }
      // Treat as click if drag distance is small
      if (dist < 5) {
        pickHover(e.clientX, e.clientY);
        if (hoveredId && onMarkerClickRef.current) {
          onMarkerClickRef.current(hoveredId);
        }
      }
    };
    const onPointerLeave = () => { hoveredId = null; showCountryHighlight(null); canvas!.style.cursor = ''; };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', () => { dragging = false; });
    canvas.addEventListener('pointerleave', onPointerLeave);

    // Resize
    const setSize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    setSize();
    window.addEventListener('resize', setSize);
    const ro = new ResizeObserver(setSize);
    ro.observe(container);

    // Render loop
    let isVisible = true;
    let rafId: number | null = null;
    let lastFrameTime = 0;

    const tick = (now: number) => {
      if (!isVisible) { rafId = null; return; }
      rafId = requestAnimationFrame(tick);
      if (lastFrameTime > 0 && now - lastFrameTime < MIN_FRAME_MS) return;
      const elapsed = lastFrameTime > 0 ? now - lastFrameTime : MIN_FRAME_MS;
      lastFrameTime = now;
      const dtScale = elapsed / REF_FRAME_MS;
      baseAngle += AUTO_ROTATE_SPEED * dtScale;
      if (!dragging) {
        const subSteps = Math.max(1, Math.round(dtScale));
        for (let i = 0; i < subSteps; i++) {
          velocity *= DRAG_FRICTION;
          dragOffset += velocity;
        }
      }
      earthGroup.rotation.y = baseAngle + dragOffset;
      atmosphereMat.uniforms.uCameraPosition.value.copy(camera.position);
      // highlight fade
      highlightMat.opacity += (highlightTargetOpacity - highlightMat.opacity) * HIGHLIGHT_FADE_SPEED;
      if (highlightTargetOpacity === 0 && highlightMat.opacity < 0.002) {
        highlightMat.opacity = 0;
        highlightSphere.visible = false;
      }
      renderer.render(scene, camera);
    };

    const startLoop = () => { if (rafId == null) { lastFrameTime = 0; rafId = requestAnimationFrame(tick); } };
    const stopLoop = () => { if (rafId != null) { cancelAnimationFrame(rafId); rafId = null; } };

    const visObs = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting && entry.intersectionRatio > 0;
      if (isVisible) startLoop(); else stopLoop();
    }, { threshold: 0 });
    visObs.observe(canvas);
    startLoop();

    return () => {
      stopLoop();
      visObs.disconnect();
      ro.disconnect();
      window.removeEventListener('resize', setSize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      highlightMat.dispose();
      Object.values(countryTexCache).forEach(t => t.dispose());
      renderer.dispose();
      earthGeo.dispose();
      earthTex.dispose();
      atmosphereMat.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ marginTop: 90, width: '100%', maxWidth: 990, margin: '90px auto 0', aspectRatio: '99 / 61', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', borderRadius: 16 }} />
    </div>
  );
}
