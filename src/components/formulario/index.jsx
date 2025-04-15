import { useState } from "react";
import styles from "./Formulario.module.css";

function CalcularIMC() {
  const [dados, setDados] = useState({ altura: "", peso: "" });
  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calcularIMC = (e) => {
    e.preventDefault();

    const { altura, peso } = dados;

    if (!altura || !peso) {
      alert("Preencha todos os campos");
      return;
    }

    const alturaNum = parseFloat(altura);
    const pesoNum = parseFloat(peso);

    if (alturaNum <= 0 || pesoNum <= 0) {
      alert("Altura e peso devem ser maiores que zero");
      return;
    }

    const imc = pesoNum / (alturaNum * alturaNum);
    setResultado(imc.toFixed(2));
  };

  const getClassificacao = (imc) => {
    if (imc < 18.5) return "Você está abaixo do peso.";
    if (imc < 25) return "Parabéns! Você está no peso ideal.";
    if (imc < 30) return "Você está acima do peso.";
    if (imc < 35) return "Você possui obesidade grau I.";
    if (imc < 40) return "Você possui obesidade grau II";
    return "Você possui obesidade mórbida";
  };

  return (
    <div className={styles.dados}>
      <h1>Calculadora de IMC</h1>
      <form onSubmit={calcularIMC}>
        <div>
          <label htmlFor="altura">Altura (Metros): </label>
          <input
            placeholder="Ex: 1.60 m"
            type="number"
            step="0.1"
            name="altura"
            value={dados.altura}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="peso">Peso (Kilos): </label>
          <input
            placeholder="Ex: 60 kg"
            type="number"
            name="peso"
            value={dados.peso}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Calcular IMC</button>
      </form>

      {resultado && (
        <div>
          <p>Seu IMC é: {resultado}</p>
          <p>Classificação: {getClassificacao(resultado)}</p>
        </div>
      )}
    </div>
  );
}

export default CalcularIMC;
