import React, { useEffect, useRef } from "react";
import { initThree } from "../three/app";

export default function Home() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // init Three app
    const dispose = initThree(mountRef.current);

    // cleanup khi rời trang
    return () => {
      dispose?.();
    };
  }, []);

  return (
    <section className="w-full h-screen relative">
      <div ref={mountRef} className="w-full h-full" />
    </section>
  );
}