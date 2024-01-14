import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    genero: "Masculino",
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/clientes");
      const data = await response.json();

      if (Array.isArray(data)) {
        setClients(data);
      } else if (typeof data === "object" && data.id) {
        // Tratar caso a resposta seja um objeto
        setClients([data]);
      } else {
        console.error(
          "O retorno da API não é um array ou objeto válido:",
          data
        );
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCadastro = async () => {
    // Verificar se os campos obrigatórios estão preenchidos
    if (!formData.nome || !formData.email || !formData.senha) {
      console.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const novoCliente = {
      ...formData,
    };

    try {
      const response = await fetch("http://localhost:3001/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoCliente),
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setClients([...clients, ...data]);
      } else if (typeof data === "object" && data.id) {
        // Tratar caso a resposta seja um objeto
        setClients([...clients, data]);
      } else {
        console.error(
          "O retorno da API não é um array ou objeto válido:",
          data
        );
      }

      setFormData({
        nome: "",
        email: "",
        senha: "",
        genero: "Masculino",
      });
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h2>Clientes</h2>
      <label>
        <span>Nome</span>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
        />
      </label>
      <label>
        <span>Email</span>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        <span>Senha</span>
        <input
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleInputChange}
        />
      </label>
      <label>
        <span>Gênero</span>
        <select
          name="genero"
          value={formData.genero}
          onChange={handleInputChange}
        >
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>
      </label>
      <button type="button" onClick={handleCadastro}>
        Cadastrar
      </button>
      {loading && <p>Carregando...</p>}
      <table className="client-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(clients) &&
            clients.map((c) => (
              <tr
                key={c.id}
                className={c.genero === "Masculino" ? "gender-male" : ""}
              >
                <td>{c.nome}</td>
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
