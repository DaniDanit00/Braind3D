/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import "./Huntington.css";
import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
// -----------------------------------------------
import {
  Environment,
  OrbitControls,
  Sky,
  Sparkles,
  Text,
  Text3D,
} from "@react-three/drei";
// MODELOS 3D-----------------------------------------------
import Brain from "./models-3d/Brain";
import Lights from "./lights/Lights";
import Floor from "./models-3d/Floor";
import OldMan from "./models-3d/OldMan";
import Lights2 from "./lights/Lights2";
import Title from "../esquizofrenia/texts/Title";
import Boy from "./models-3d/Boy2";
import Boton3D from "./models-3d/Boton3D";
import TeclaS from "./models-3d/TeclaS";
import TeclaEnter from "./models-3d/TeclaEnter";
import Girl from "./models-3d/Girl";
import TeclaB from "./models-3d/TeclaB";
import Developer from "./models-3d/Developer";
// -----------------------------------------------

const Huntington = () => {
  const devRef = useRef();
  const [isHit, setIsHit] = useState(false);

  const [danceTrigger, setDanceTrigger] = useState(false);
  const playSound = () => {
    new Audio("/sounds/golpe.mp3").play();
  };

  const [saludarTrigger, setSaludarTrigger] = useState(false);
  const handleClickOrKey = () => {
    playSound(); // 🔊 Sonido
    devRef.current?.playNext();
  };
  // Escuchar la tecla Enter
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleClickOrKey();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function CameraReset() {
    const { camera } = useThree();
    const originalCameraPos = useRef(camera.position.clone());

    useFrame(() => {
      const distance = camera.position.distanceTo(originalCameraPos.current);
      if (distance > 0.01) {
        camera.position.lerp(originalCameraPos.current, 0.02);
        camera.lookAt(0, 0, 0);
      }
    });

    return null;
  }

  return (
    <>
      <section id="seccion1">
        <section id="seccion0">
          <div className="div-canvas-2">
            <Canvas
              camera={{
                position: [0, 0, 5],
                fov: 55,
              }}
              shadows={true}
            >
              <CameraReset/>
              <OrbitControls
                target={[0, 0, 0]} // Esto centra los controles en el origen
                enableZoom={true}
                enablePan={true}
              />
              <directionalLight position={[5, 5, 10]} intensity={2} />
              <Title text="Huntington" position={[0, 0, 0]} />
              <Lights />
            </Canvas>
          </div>
        </section>
        <div className="div-container">
          <div className="div-text">
            <section className="quees-info">
              <h1 className="informacion-h1">
                ¿Qué es la Enfermedad de Huntington?
              </h1>
              <p className="informacion-p">
                La enfermedad de Huntington es un trastorno genético
                neurodegenerativo que afecta el cerebro, causando deterioro
                progresivo de las capacidades motoras, cognitivas y
                psiquiátricas. Es una enfermedad hereditaria de patrón
                autosómico dominante, lo que significa que una sola copia del
                gen defectuoso puede causar la enfermedad.
              </p>
            </section>
          </div>
          <div className="div-canvas-1">
            <Canvas camera={{ position: [1, 1, 2] }} shadows>
              <OrbitControls />
              <Brain />
              <Lights />
              <Text />
              <Floor />
              <Sky />
              <Sparkles
                count={256}
                speed={1.5}
                opacity={1}
                color={"yellow"}
                size={3}
                scale={[10, 10, 10]}
                noise={1}
              />
            </Canvas>
          </div>
        </div>
        <div className="div-container">
          <div className="div-text">
            <section className="quees-info">
              <h1 className="informacion-h1">Sintomas</h1>
              <div className="informacion-div">
                <p className="informacion-p">
                  <b>Síntomas motores:</b>
                  <br />
                  •Movimientos involuntarios
                  <br />
                  •Problemas de coordinación
                  <br />
                  •Rigidez muscular
                  <br />
                  •Problemas con la deglución
                </p>
                <p className="informacion-p">
                  <b>Síntomas cognitivos:</b>
                  <br />
                  •Problemas de memoria
                  <br />
                  •Deterioro en el razonamiento y la toma de decisiones
                  <br />
                  •Dificultades en la concentración
                </p>
              </div>
              <button
                onClick={handleClickOrKey}
                style={{
                  display: "block",
                  margin: "0 auto",
                  padding: "10px 20px",
                  background: isHit ? "#ff4444" : "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {isHit ? "Levantar" : "Golpear"}
              </button>
            </section>
          </div>
          <div className="div-canvas-1">
            <Canvas camera={{ position: [1.5, 1, 2] }} shadows>
              <OrbitControls />
              <directionalLight position={[5, 5, 10]} intensity={2} />
              <Developer ref={devRef} onStateChange={setIsHit} />
              <Boton3D
                onClick={handleClickOrKey}
                mensaje={[isHit ? "Levantar" : "Golpear"]}
                color={isHit ? "#ff4444" : "#4CAF50"}
                posicion={[-2, 0, -0.4]}
                tamanio={[2, 0.5, 1]}
              />
              <Environment preset="sunset" background={true} />
              <Text />
              <Lights />
              <Floor />
              <TeclaEnter />
              {/* <Sky /> */}
              <Sparkles
                count={256}
                speed={1.5}
                opacity={1}
                color={"yellow"}
                size={3}
                scale={[10, 10, 10]}
                noise={1}
              />
            </Canvas>
          </div>
        </div>
        <div className="div-container">
          <div className="div-text">
            <section className="quees-info">
              <h1 className="informacion-h1">Tratamiento</h1>
              <p className="informacion-p">
                Actualmente no existe una cura para la enfermedad de Huntington.
                El tratamiento se enfoca en aliviar los síntomas y mejorar la
                calidad de vida. Se utilizan medicamentos para controlar los
                movimientos involuntarios, problemas de ánimo y otros síntomas.
              </p>
              <p className="informacion-p">
                a mantener la funcionalidad y la independencia por más tiempo.
                El apoyo psicológico y social es fundamental para el paciente y
                su familia.
              </p>
              <button
                onClick={() => setSaludarTrigger(true)}
                style={{
                  display: "block",
                  margin: "0 auto",
                  padding: "10px 20px",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Saludar
              </button>
            </section>
          </div>
          <div className="div-canvas-1">
            <Canvas camera={{ position: [1, 1, 2] }} shadows>
              <OrbitControls />
              <directionalLight position={[5, 5, 10]} intensity={2} />
              <Boy
                position={[0, -1, 0]}
                externSaludarTrigger={saludarTrigger}
                resetSaludarTrigger={() => setSaludarTrigger(false)}
              />
              <Environment preset="sunset" background={true} />
              <Text />
              <Boton3D
                position={[0, 0, -2]}
                onClick={() => setSaludarTrigger(true)}
                mensaje={"Saludar"}
                color={"#4CAF50"}
                posicion={[-1, 0, -0.5]}
                tamanio={[2, 0.5, 1]}
              />
              <Lights />
              <Floor />
              <TeclaS />
              <Sparkles
                count={256}
                speed={1.5}
                opacity={1}
                color={"yellow"}
                size={3}
                scale={[10, 10, 10]}
                noise={1}
              />
            </Canvas>
          </div>
        </div>
        <div className="div-container">
          <div className="div-text">
            <section className="quees-info">
              <h1 className="informacion-h1">
                ¿Qué es la Enfermedad de Huntington?
              </h1>
              <p className="informacion-p">
                La enfermedad de Huntington es un trastorno genético
                neurodegenerativo que afecta el cerebro, causando deterioro
                progresivo de las capacidades motoras, cognitivas y
                psiquiátricas.
              </p>
              <p className="informacion-p">
                Es una enfermedad hereditaria de patrón autosómico dominante, lo
                que significa que una sola copia del gen defectuoso puede causar
                la enfermedad.
              </p>
              <button
                onClick={() => setDanceTrigger(true)}
                style={{
                  display: "block",
                  margin: "0 auto",
                  padding: "10px 20px",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ¡Baila!
              </button>
            </section>
          </div>
          <div className="div-canvas-1">
            <Canvas camera={{ position: [1, 1, 2] }} shadows>
              <OrbitControls />
              <directionalLight position={[5, 5, 10]} intensity={2} />
              <Girl
                externDanceTrigger={danceTrigger}
                resetDanceTrigger={() => setDanceTrigger(false)}
              />
              <Text />
              <Environment preset="sunset" background={true} />
              <Lights2 />
              <Floor />
              <TeclaB />
              <Boton3D
                position={[0, 0, -2]}
                onClick={() => setDanceTrigger(true)}
                mensaje={"¡Baila!"}
                color={"#4CAF50"}
                posicion={[-1.5, 0, 0]}
                tamanio={[2, 0.5, 1]}
              />
              <Sparkles
                count={256}
                speed={1.5}
                opacity={1}
                color={"yellow"}
                size={3}
                scale={[10, 10, 10]}
                noise={1}
              />
            </Canvas>
          </div>
        </div>
      </section>
    </>
  );
};

export default Huntington;
