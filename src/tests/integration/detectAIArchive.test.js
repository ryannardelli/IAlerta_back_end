import { InvalidText } from "../../exceptions/common/InvalidText";
import { MaxTextLenghtExtractFromArchive } from "../../exceptions/common/MaxTextLenghtExtractFromArchive";
import { MinTextLenghtExtractFromArchive } from "../../exceptions/common/MinTextLenghtExtractFromArchive";
import { InternalServiceDocument } from "../../exceptions/domain/InternalServiceDocument";

import detectAIArchiveService from "../../services/detectAIArchiveService";
import normalizeText from "../../utils/normalizeText";

jest.mock('../../utils/normalizeText.js');

describe("POST /detector-ai-archive", () => {
    test("it throw InvalidText if the extracted text of archive are empty or is not a string", async () => {
        await expect(detectAIArchiveService("")).rejects.toBeInstanceOf(InvalidText);
    });

    test("it throw MaxTextLenghtExtractFromArchive if text extracted are much big", async () => {
          await expect(detectAIArchiveService("a".repeat(5000))).rejects.toBeInstanceOf(
            MaxTextLenghtExtractFromArchive
          );
    });
  
    test('it throw MinTextLenghtExtractFromArchive if text extracted are not enough to analyse', async() => {
      await expect(detectAIArchiveService("a".repeat(3))).rejects.toBeInstanceOf(
          MinTextLenghtExtractFromArchive
      );
    });

    test('it divide text in chunks of 1000 caracteres and call api to each chunk', async() => {
      const mockFecth = jest.fn().mockResolvedValue({
        ok: true,
        json: async() => ({ result: "ok" }),
      });

    global.fetch = mockFecth;
    normalizeText.mockImplementation(text => text);

    const text = "a".repeat(2500); // 3 chunks
    await detectAIArchiveService(text);

    expect(mockFecth).toHaveBeenCalledTimes(3);
    });

    test('it return the results of API to each chunk', async() => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async() => ({ result: "ai_detected" }),
      });

      global.fetch = mockFetch;
      normalizeText.mockImplementation(text => text);

      const text = "a".repeat(1200); // 2 chunks
      const results = await detectAIArchiveService(text);

      expect(results).toHaveLength(2);
      expect(results[0]).toEqual({ result: "ai_detected" });
      expect(results[1]).toEqual({ result: "ai_detected" });
    });

    test('it throw InternalServiceDocument if api return error', async() => {
      const mockFetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });
    global.fetch = mockFetch;
    normalizeText.mockImplementation(text => text);

    const text = "a".repeat(100);
    await expect(detectAIArchiveService(text))
      .rejects.toThrow(InternalServiceDocument);
    })
})