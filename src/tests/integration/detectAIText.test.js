import { InvalidText } from "../../exceptions/common/InvalidText";
import { MaxTextLenght } from "../../exceptions/common/MaxTextLength";
import { MinTextLength } from "../../exceptions/common/MinTextLength";
import { InvalidFormatHug } from "../../exceptions/domain/InvalidFormatHug";
import detectAIContentService from "../../services/detectAIContentService";

describe("POST /detector-ai-text", () => {
  test("it throw InvalidText if text are empty or is not a string", async () => {
    await expect(detectAIContentService("")).rejects.toBeInstanceOf(InvalidText);
  });

   test("it throw MaxTextLenght if text are much big", async () => {
      await expect(detectAIContentService("a".repeat(5000))).rejects.toBeInstanceOf(
        MaxTextLenght
      );
  });

  test('it throw MinTextLenght if text are not enough to analyse', async() => {
    await expect(detectAIContentService("a".repeat(3))).rejects.toBeInstanceOf(
        MinTextLength
    );
  });

  test("it throw InvalidFormatHug if return is not JSON", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    text: async () => "Is not JSON",
  });
  
  const validText = "a".repeat(100);

  await expect(detectAIContentService(validText)).rejects.toBeInstanceOf(
    InvalidFormatHug
  );
});


  // test("it throw InvalidFormatHug if return is not JSON", async () => {
  //     global.fetch = jest.fn().mockResolvedValue({
  //       ok: true,
  //       text: async () => "Is not JSON",
  //     });
  //     await expect(detectAIContentService("Hello")).rejects.toBeInstanceOf(
  //       InvalidFormatHug
  //     );
  // });
});
