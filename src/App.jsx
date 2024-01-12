import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/clientes");
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Clientes</h2>
      <table className="client-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
          </tr>
        </thead>
        <tbody>
          {clients &&
            clients.map((c) => (
              <tr key={c.id}>
                <td className={c.genero === "Masculino" ? "gender-male" : ""}>
                  {c.nome}
                </td>
                <td>{c.email}</td>
                <td>{c.senha}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
