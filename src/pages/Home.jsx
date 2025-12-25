// import { Canvas } from "@react-three/fiber";
// import React, { Suspense } from "react";
// import Loader from "../components/Loader";
// import PalletTown from "../models/PalletTown";

// const Home = () => {
//   const adjustTownForScreen = () => {
//     let screenScale = null;
//     let screenPosition = [0, 10, -43];
//     let rotation = [1, 0, 0];

//     if (window.innerWidth < 768) {
//       // Mobile
//       screenScale = [1.9, 1.9, 1.9];
//       screenPosition = [0, -6.5, -43];
//     } else {
//       screenScale = [1.6, 1.6, 1.6];
//     }
//     return [screenScale, screenPosition, rotation];
//   };

//   const [townScale, townPosition, townRotation] = adjustTownForScreen();

//   return (
//     <section className="w-full h-screen relative">
//       {/* <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
//     Popup
//       </div> */}
//       <Canvas
//         className="w-full h-screen bg-transparent"
//         camera={{ near: 0.1, far: 200, fov: 50, position: [0, 0, 10] }}
//       >
//         <Suspense fallback={<Loader />}>
//           <directionalLight />
//           <ambientLight />
//           <pointLight />
//           <spotLight />
//           <hemisphereLight />
//           <PalletTown
//             scale={townScale}
//             position={townPosition}
//             rotation={townRotation}
//           />
//         </Suspense>
//       </Canvas>
//     </section>
//   );
// };

// export default Home;


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