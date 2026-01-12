import detectAIService from "../../services/detectAIService";
import { InvalidText } from "../../exceptions/common/InvalidText";
import { MaxTextLenght } from "../../exceptions/common/MaxTextLength";
import { InvalidFormatHug } from "../../exceptions/domain/InvalidFormatHug";

describe('DetectAIContent API - Integration Tests', () => {
  test('it throw InvalidText if text are empty', async() => {
    await expect(detectAIService("")).rejects.toBeInstanceOf(InvalidText);
  });

  test("it throw MaxTextLenght if text are much big", async () => {
    await expect(detectAIService("a".repeat(5000))).rejects.toBeInstanceOf(MaxTextLenght);
  });

  test("it throw InvalidFormatHug if return is not JSON", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => "Is not JSON"
    });
    await expect(detectAIService("Hello")).rejects.toBeInstanceOf(InvalidFormatHug);
  });
});