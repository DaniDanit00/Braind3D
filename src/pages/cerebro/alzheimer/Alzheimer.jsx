/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Lights from "./lights/Ligths";
import Lights2 from "./lights/Lights2";
import Floor from "./models-3d/Floor";
import BrainAl from "./models-3d/BrainAl";
import "./Alzheimer.css";


const Alzheimer = () => {
 return (
     <div className="contenedor-alzheimer">
       <div className="texto-alzheimer">
         <h1>¿Qué es la enfermedad del Alzheimer?</h1>
         <p>
         El Alzheimer es una enfermedad neurodegenerativa que afecta principalmente el cerebro, 
         causando un deterioro progresivo de la memoria y otras funciones cognitivas. 
         Es la forma más común de demencia en personas mayores. 
         </p>
       </div>
 
       <div className="modelo-alzheimer">
        <Canvas
           shadows
           camera={{ position: [0, 3, 5], fov: 40 }}
          style={{ background: '#ffffff' } } // ⬅️ Aquí le ponemos fondo blanco
        >
         <Lights />
         <Lights2 />
         <BrainAl scale={1.8} />
         <Floor />
         <OrbitControls enableZoom={false} />
         
         </Canvas>
       </div>
     </div>
   );
};

export default Alzheimer;
