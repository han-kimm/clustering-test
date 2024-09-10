"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

function Scatter3D({
  data,
}: {
  data: {
    x: number;
    y: number;
    z: number; // z 축 데이터 추가
    cluster: number;
    callId: string;
    text: string;
    common: string;
  }[];
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, Renderer 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // OrbitControls 설정
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 감속 효과 활성화
    controls.dampingFactor = 0.25; // 감속 계수
    controls.enableZoom = true; // 줌 활성화

    // 텍스트 레이블 생성 함수
    const createTextLabel = (text: string) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) return null;

      context.font = "30px Arial";
      context.fillStyle = "rgba(255, 255, 255, 1)";
      context.fillText(text, 0, 24);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(2, 1, 1); // 텍스트 크기 조정

      return sprite;
    };

    // 데이터 포인트 및 레이블 추가
    data.forEach((point) => {
      const geometry = new THREE.SphereGeometry(0.3, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: `hsl(${point.cluster * 20}, 100%, 50%)`,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(point.x, point.y, point.z);
      scene.add(sphere);

      const label = createTextLabel(point.text);
      if (label) {
        label.position.set(point.x, point.y, point.z); // 점 위에 레이블 배치
        scene.add(label);
      }
    });

    camera.position.z = 20;

    // 애니메이션 루프
    const animate = function () {
      requestAnimationFrame(animate);
      controls.update(); // OrbitControls 업데이트
      renderer.render(scene, camera);
    };

    animate();

    // 클린업
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, [data]);

  return <div ref={mountRef} style={{ width: "100%", height: "500px" }} />;
}

export { Scatter3D };
