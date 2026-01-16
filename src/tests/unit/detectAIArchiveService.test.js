import { InvalidText } from "../../exceptions/common/InvalidText.js";
import detectAIArchiveService from "../../services/detectAIArchiveService.js";
import { MaxTextLenghtExtractFromArchive } from "../../exceptions/common/MaxTextLenghtExtractFromArchive.js";
import { MinTextLenghtExtractFromArchive } from "../../exceptions/common/MinTextLenghtExtractFromArchive.js";

jest.mock("../../utils/normalizeText.js");

describe("detectAIArchiveService - Unit Tests", () => {

  test("it throw InvalidText if text are empty", async () => {
    await expect(detectAIArchiveService("")).rejects.toBeInstanceOf(InvalidText);
    await expect(detectAIArchiveService(null)).rejects.toBeInstanceOf(InvalidText);
  });

  test("it throw MinTextLenghtExtractFromArchive if text are much short", async () => {
    await expect(detectAIArchiveService("a".repeat(10))).rejects.toBeInstanceOf(
      MinTextLenghtExtractFromArchive
    );
  });

  test("it throw MaxTextLenghtExtractFromArchive if are text much big", async () => {
    await expect(detectAIArchiveService("a".repeat(4000))).rejects.toBeInstanceOf(
      MaxTextLenghtExtractFromArchive
    );
  });
});
