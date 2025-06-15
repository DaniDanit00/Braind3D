import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import "./Podio.css";
import { Canvas } from "@react-three/fiber";
import Girl from "./models-3d/Girl";
import Boy2 from "./models-3d/Boy2";
import Developer from "./models-3d/Developer";
import Lights2 from "./lights/Lights2";

const Podio = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const db = getFirestore();
      const respuestasRef = collection(db, "respuestasQuiz");
      const q = query(respuestasRef, orderBy("aciertos", "desc"));

      try {
        const querySnapshot = await getDocs(q);
        const datos = querySnapshot.docs.map((doc) => doc.data());
        setUsuarios(datos);
      } catch (error) {
        console.error("Error al obtener las respuestas:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const top3 = usuarios.slice(0, 3);
  const resto = usuarios.slice(3);

  return (
    <div className="podio-general">
      {/* Top 3 */}
      <section className="podio-top-container">
        <h2>🏆 Top 3 del Podio</h2>
        <ol className="podio-lista podio-top">
          {top3.map((usuario, index) => (
            <li key={index} className={`puesto puesto-${index + 1}`}>
              <strong>{index + 1}°</strong> - {usuario.nombre} ({usuario.aciertos} aciertos)
            </li>
          ))}
        </ol>
      </section>

      {/* Modelos 3D */}
      <section className="podio-canvas">
        <Canvas shadows camera={{ position: [0, 1, 4] }}>
          <Girl />
          <Developer />
          <Boy2 />
          <Lights2 />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial transparent opacity={0.2} />
          </mesh>
        </Canvas>
      </section>

      {/* Resto de participantes */}
      {resto.length > 0 && (
        <section className="podio-resto-container">
          <h2>🎖️ Otros Participantes</h2>
          <ol className="podio-lista podio-resto">
            {resto.map((usuario, index) => (
              <li key={index + 3}>
                <strong>{index + 4}°</strong> - {usuario.nombre} ({usuario.aciertos} aciertos)
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
};

export default Podio;
