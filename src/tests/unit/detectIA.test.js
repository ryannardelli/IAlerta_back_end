// import { InvalidText } from "../../exceptions/common/InvalidText";
// import { MaxTextLenght } from "../../exceptions/common/MaxTextLength";
// import { InvalidFormatHug } from "../../exceptions/domain/InvalidFormatHug";
// import detectAIContent from "../../services/detectAIService";

// global.fetch = jest.fn();

// describe("detectIAContent - Unit Tests", () => {
//   beforeEach(() => fetch.mockClear());

//   test('it throw error if text are invalid', async() => {
//     await expect((detectAIContent("")).rejects.toThrow(InvalidText));
//   });

//   test('it throw error if text are much big', async() => {
//     await expect(detectAIContent(longText)).rejects.toThrow(MaxTextLenght);
//   });

//   test('it throw error if Hugging Face return invalid JSON', async() => {
//     fetch.mockResolvedValueOnce({
//       ok: true,
//       text: async () => "Resposta não JSON"
//     });

//     await expect(detectAIContent("Hello World")).rejects.toThrow(InvalidFormatHug);
//   });
  
//   test('it correctly result in the of success', async() => {
//     fetch.mockResolvedValueOnce({
//       ok: true,
//       text: async() => JSON.stringify([{ label: "AI-generated", score: 0.9 }])
//     });

//     const result = await detectAIContent("Hello world");
//     expect(result.likelihood).toBe("AI-generated");
//     expect(result.confidence).toBeCloseTo(0.9, 3);
//     expect(result.provider).toBe("huggingface");
//   })
// });

// MOCK do fetch antes da importação
global.fetch = jest.fn();

import detectAIContent from "../../services/detectAIService.js";
import { InvalidText } from "../../exceptions/common/InvalidText";
import { MaxTextLenght } from "../../exceptions/common/MaxTextLength";
import { InvalidFormatHug } from "../../exceptions/domain/InvalidFormatHug";

describe("detectIAContent - Unit Tests", () => {
  const longText = "a".repeat(10001);

  beforeEach(() => {
    fetch.mockClear();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // esconde logs de erro
  });

  test('throws error if text is invalid', async () => {
    await expect(detectAIContent("")).rejects.toThrow(InvalidText);
  });

  test('throws error if text is too long', async () => {
    await expect(detectAIContent(longText)).rejects.toThrow(MaxTextLenght);
  });

  test('throws error if Hugging Face returns invalid JSON', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => "Resposta não JSON"
    });

    await expect(detectAIContent("Hello World")).rejects.toThrow(InvalidFormatHug);
  });

  test('returns correct result on success', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify([{ label: "AI-generated", score: 0.9 }])
    });

    const result = await detectAIContent("Hello world");

    expect(result.likelihood).toBe("AI-generated");
    expect(result.confidence).toBeCloseTo(0.9, 3);
    expect(result.provider).toBe("huggingface");
  });
});
