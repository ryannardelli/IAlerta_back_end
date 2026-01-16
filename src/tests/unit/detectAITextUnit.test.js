import { InvalidText } from "../../exceptions/common/InvalidText";
import { MaxTextLenght } from "../../exceptions/common/MaxTextLength";
import { MinTextLength } from "../../exceptions/common/MinTextLength";
import detectAIContentService from "../../services/detectAIContentService";

describe("detectAIContentService - Unit Tests", () => {
  test("throw InvalidText if text are empty", async () => {
    await expect(detectAIContentService("")).rejects.toBeInstanceOf(InvalidText);
  });

  test("throw MaxTextLenght if text are much big", async () => {
    await expect(detectAIContentService("a".repeat(5000))).rejects.toBeInstanceOf(MaxTextLenght);
  });

  test("throw MinTextLenght if text are much short", async () => {
    await expect(detectAIContentService("aa")).rejects.toBeInstanceOf(MinTextLength);
  });
});