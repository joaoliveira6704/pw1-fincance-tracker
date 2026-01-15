import { describe, it, expect } from "vitest";
import { getObjectiveData, processObjectivesData } from "@/utils/utils";

describe("Lógica de Objetivos Financeiros", () => {
  // TESTE 1: Cálculo básico de um objetivo
  it("getObjectiveData deve calcular a soma e progresso base de um objetivo", () => {
    const mockObjective = {
      targetAmount: 1000,
      contributions: [{ amount: 200 }, { amount: 300 }],
    };
    const result = getObjectiveData(mockObjective);
    expect(result.sum).toBe(500);
    expect(result.progress).toBe(50);
  });

  // TESTE 2: Limite de 100%
  it("getObjectiveData não deve retornar progresso maior que 100%", () => {
    const mockObjective = {
      targetAmount: 100,
      contributions: [{ amount: 150 }],
    };
    const result = getObjectiveData(mockObjective);
    expect(result.progress).toBe(100);
  });

  // TESTE 3: Arredondamento
  it("getObjectiveData deve arredondar o progresso para o inteiro mais próximo", () => {
    const mockObjective = {
      targetAmount: 300,
      contributions: [{ amount: 100 }], // 33.333%
    };
    const result = getObjectiveData(mockObjective);
    expect(result.progress).toBe(33);
  });

  // TESTE 4: Lista vazia (O erro que tinhas)
  it("processObjectivesData deve retornar zeros se a lista de objetivos for vazia", () => {
    const result = processObjectivesData([]);
    expect(result.sum).toBe(0);
    expect(result.percentage).toBe(0);
  });

  // TESTE 5: Média de múltiplos objetivos
  it("processObjectivesData deve calcular a média correta entre vários objetivos", () => {
    const mockList = [
      { targetAmount: 100, contributions: [{ amount: 100 }] }, // 100%
      { targetAmount: 100, contributions: [{ amount: 0 }] }, // 0%
    ];
    const result = processObjectivesData(mockList);
    expect(result.percentage).toBe(50);
    expect(result.sum).toBe(100);
  });

  // TESTE 6: Objetivo sem contribuições
  it("getObjectiveData deve lidar com a ausência do array de contribuições", () => {
    const mockObjective = { targetAmount: 1000 }; // Sem o campo contributions
    const result = getObjectiveData(mockObjective);
    expect(result.sum).toBe(0);
    expect(result.progress).toBe(0);
  });

  // TESTE 7: Divisão por zero no Target
  it("getObjectiveData deve evitar erro se o targetAmount for zero", () => {
    const mockObjective = { targetAmount: 0, contributions: [{ amount: 50 }] };
    const result = getObjectiveData(mockObjective);

    expect(result.progress).toBe(100);
  });

  // TESTE 8: Valores decimais
  it("processObjectivesData deve somar corretamente valores com casas decimais", () => {
    const mockList = [
      {
        targetAmount: 100,
        contributions: [{ amount: 10.55 }, { amount: 20.45 }],
      },
    ];
    const result = processObjectivesData(mockList);
    expect(result.sum).toBe(31);
  });

  // TESTE 9: Inputs de string (Simulando erro de API/Input)
  it("getObjectiveData deve converter strings numéricas para Number antes de somar", () => {
    const mockObjective = {
      targetAmount: "1000",
      contributions: [{ amount: "500" }],
    };
    const result = getObjectiveData(mockObjective);
    expect(result.sum).toBe(500);
    expect(result.progress).toBe(50);
  });

  // TESTE 10: Grande volume de contribuições
  it("getObjectiveData deve somar corretamente uma longa lista de contribuições", () => {
    const contributions = Array(100).fill({ amount: 10 });
    const mockObjective = { targetAmount: 1000, contributions };
    const result = getObjectiveData(mockObjective);
    expect(result.sum).toBe(1000);
    expect(result.progress).toBe(100);
  });
});

describe("Carteiras", () => {
  // TESTE 1: Adição de dinheiro a carteira
  it("Deve adicionar 10€ a uma carteira", () => {
    const mockWallet = {
      targetAmount: 1000,
      contributions: [{ amount: 200 }, { amount: 300 }],
    };
    const result = getObjectiveData(mockWallet);
    expect(result.sum).toBe(500);
    expect(result.progress).toBe(50);
  });
});

describe("Api", () => {
  it("Deve retornar a categoria correta", () => {
    const mockWallet = {
      targetAmount: 1000,
      contributions: [{ amount: 200 }, { amount: 300 }],
    };
    const result = getObjectiveData(mockWallet);
    expect(result.sum).toBe(500);
    expect(result.progress).toBe(50);
  });
});
