import { describe, it, expect } from "vitest";
import {
  formattedDate,
  formattedIncome,
  getObjectiveData,
  processObjectivesData,
} from "@/utils/utils";
import axios from "axios";
import { createUser } from "@/utils/factories";

describe("Objectives Logic", () => {
  it("Must calculate the sum and progress given one objective", () => {
    const mockObjective = {
      targetAmount: 1000,
      contributions: [{ amount: 200 }, { amount: 300 }],
    };
    const result = getObjectiveData(mockObjective);
    expect(result.sum).toBe(500);
    expect(result.progress).toBe(50);
  });

  it("Must not return progress over 100% (cap the progress at 100%)", () => {
    const mockObjective = {
      targetAmount: 100,
      contributions: [{ amount: 150 }],
    };
    const result = getObjectiveData(mockObjective);
    expect(result.progress).toBe(100);
  });

  it("Must round the progress to the closest integer", () => {
    const mockObjective = {
      targetAmount: 300,
      contributions: [{ amount: 100 }],
    };
    const result = getObjectiveData(mockObjective);
    expect(result.progress).toBe(33);
  });

  it("processObjectivesData deve retornar zeros se a lista de objetivos for vazia", () => {
    const result = processObjectivesData([]);
    expect(result.sum).toBe(0);
    expect(result.percentage).toBe(0);
  });

  it("Must calculate correct average between list items", () => {
    const mockList = [
      { targetAmount: 100, contributions: [{ amount: 100 }] },
      { targetAmount: 100, contributions: [{ amount: 0 }] },
    ];
    const result = processObjectivesData(mockList);
    expect(result.percentage).toBe(50);
    expect(result.sum).toBe(100);
  });

  it("getObjectiveData deve lidar com a ausência do array de contribuições", () => {
    const mockObjective = { targetAmount: 1000 };
    const result = getObjectiveData(mockObjective);
    expect(result.sum).toBe(0);
    expect(result.progress).toBe(0);
  });

  it("Must not throw error if 0", () => {
    const mockObjective = { targetAmount: 0, contributions: [{ amount: 50 }] };
    const result = getObjectiveData(mockObjective);

    expect(result.progress).toBe(100);
  });

  it("Must sum correctly values with floating numbers", () => {
    const mockList = [
      {
        targetAmount: 100,
        contributions: [{ amount: 10.55 }, { amount: 20.45 }],
      },
    ];
    const result = processObjectivesData(mockList);
    expect(result.sum).toBe(31);
  });

  it("Must convert numeric strings to number before sum", () => {
    const mockObjective = {
      targetAmount: "1000",
      contributions: [{ amount: "500" }],
    };
    const result = getObjectiveData(mockObjective);
    expect(result.sum).toBe(500);
    expect(result.progress).toBe(50);
  });

  it("Must sum a long contribution list correctly", () => {
    const contributions = Array(100).fill({ amount: 10 });
    const mockObjective = { targetAmount: 1000, contributions };
    const result = getObjectiveData(mockObjective);
    expect(result.sum).toBe(1000);
    expect(result.progress).toBe(100);
  });
});

describe("Api", () => {
  it("Must return the correct categories on quote", async () => {
    const response = await axios.get(
      "https://inspirational-quotes-api.vercel.app/api/v1/quotes?category=motivation,momentum&random=true"
    );

    expect(response.data.data[0].categories).toEqual(
      expect.arrayContaining(["Motivation", "Momentum"])
    );
  });

  it("Must return logs list", async () => {
    const response = await axios.get("http://localhost:3000/logs");

    expect(response.status).toBe(200);
  });

  it("Must return users list", async () => {
    const response = await axios.get("http://localhost:3000/users");

    expect(response.status).toBe(200);
  });

  it("Must return specific user (user 1)", async () => {
    const response = await axios.get("http://localhost:3000/users/1");
    expect(response.data.id).toBe("1");
  });

  it("Must return wallets for user 1", async () => {
    const response = await axios.get("http://localhost:3000/wallets?userId=1");
    console.log(response.data);

    expect(response.data.length).toBeGreaterThanOrEqual(1);
  });
});

describe("Factories", () => {
  it("Creates a user with the correct format", () => {
    const result = createUser("test", "first", "last", "email", "password");

    expect(result.username).toBe("test");
    expect(result.firstName).toBe("first");
    expect(result.lastName).toBe("last");
    expect(result.email).toBe("email");
    expect(result.password).toBe("password");
  });
});

describe("Formats", () => {
  it("Must return formatted income", () => {
    const mockAmount = 1200;

    const result = formattedIncome(mockAmount);
    expect(result).toBe("1200,00\u00a0€");
  });

  it("Must return 0.00 € string if sent empty amount", () => {
    const mockAmount = "";

    const result = formattedIncome(mockAmount);
    expect(result).toBe("0.00 €");
  });

  it("Must return correct formatted date", () => {
    const mockDate = "2026-01-12T03:08:51.745Z";

    const result = formattedDate(mockDate);
    expect(result).toBe("12 DE JANEIRO DE 2026");
  });

  it("Must return empty string if sent empty date", () => {
    const mockDate = "";

    const result = formattedDate(mockDate);
    expect(result).toBe("");
  });
});
