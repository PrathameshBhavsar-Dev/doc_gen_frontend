import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

function SilkPlane() {
  const materialRef = useRef();
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 256, 256]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `}
        fragmentShader={`

precision highp float;
varying vec2 vUv;
uniform float uTime;

float hash(vec2 p){
  return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
}

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(
    mix(hash(i), hash(i+vec2(1.0,0.0)), u.x),
    mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x),
    u.y
  );
}

void main() {

  vec2 uv = vUv;
  float time = uTime * 0.7;

  // ---- FABRIC FLOW DISTORTION ----
  float flow1 = sin(uv.y * 4.0 + time);
  float flow2 = sin(uv.x * 3.0 - time * 1.2);
  float organic = noise(uv * 3.0 + time) * 0.3;

  uv.x += (flow1 * 0.08);
  uv.y += (flow2 * 0.06);
  uv += organic * 0.05;

  // ---- SILK THREAD SHINE ----
  vec2 dir = normalize(vec2(1.0, 0.7));
  float thread = dot(uv, dir) * 18.0;

  float shimmer = sin(thread + time * 4.0);
  shimmer = shimmer * 0.5 + 0.5;

  // moving light sweep
  float sweep = sin(dot(uv, vec2(0.5,1.0)) * 5.0 + time * 1.5);
  sweep = sweep * 0.5 + 0.5;

  float shine = shimmer * 0.5 + sweep * 0.7;

  // ---- BASE GRADIENT ----
  vec3 deepPurple  = vec3(0.06, 0.03, 0.22);
  vec3 midPurple   = vec3(0.40, 0.18, 0.65);
  vec3 lightPurple = vec3(0.80, 0.55, 0.95);

  vec3 base = mix(deepPurple, midPurple, uv.x);
  vec3 color = mix(base, lightPurple, clamp(shine, 0.0, 1.0));

  gl_FragColor = vec4(color, 1.0);
}

  `}
      />
    </mesh>
  );
}

export default function SilkBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      style={{ position: "absolute", inset: 0 }}
      // gl={{ antialias: true }}
      // frameloop="always"
    >
      <SilkPlane />
    </Canvas>
  );
}
