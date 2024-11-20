import { parseCitationFromMessage, cleanJSON, generateTemplateSections, tryGetRaiPrettyError, parseErrorMessage } from './helpers';

describe('Helpers', () => {
  describe('parseCitationFromMessage', () => {
    it('parses citations from tool messages correctly', () => {
      const mockMessage = {
        role: 'tool',
        content: '{"citations": ["citation1", "citation2"]}',
      };

      const result = parseCitationFromMessage(mockMessage as any);
      expect(result).toEqual(['citation1', 'citation2']);
    });

    it('returns an empty array when message role is not "tool"', () => {
      const mockMessage = {
        role: 'user',
        content: 'No citations',
      };

      const result = parseCitationFromMessage(mockMessage as any);
      expect(result).toEqual([]);
    });

    it('returns an empty array for invalid JSON in content', () => {
      const mockMessage = {
        role: 'tool',
        content: 'Invalid JSON',
      };

      const result = parseCitationFromMessage(mockMessage as any);
      expect(result).toEqual([]);
    });
  });

  describe('cleanJSON', () => {
    it('cleans JSON by removing unnecessary lines', () => {
      const jsonString = `
        json
        \\\`
        { "key": "value" }
        \\\`
      `;

      const result = cleanJSON(jsonString);
      expect(result).toBe('{ "key": "value" }');
    });

    it('returns an empty string for invalid input', () => {
      const jsonString = 'invalid JSON';
      const result = cleanJSON(jsonString);
      expect(result).toBe('');
    });
  });

  describe('generateTemplateSections', () => {
    it('returns error when JSON is invalid', () => {
      const jsonString = 'invalid JSON';
      const result = generateTemplateSections(jsonString);
      expect(result).toContain('I was unable to find content');
    });

    it('generates template sections correctly for valid JSON', () => {
      const jsonString = JSON.stringify({
        template: [
          { section_title: 'Section 1' },
          { section_title: 'Section 2' },
        ],
      });

      const result = generateTemplateSections(jsonString);
      expect(result).toContain('The proposal will include the following sections:');
      expect(result).toContain('Section 1');
      expect(result).toContain('Section 2');
    });
  });

  describe('tryGetRaiPrettyError', () => {
    it('parses and formats error messages with innererror', () => {
      const errorMessage = "'innererror': {'content_filter_result': {'jailbreak': {'filtered': true}}}}";
      const result = tryGetRaiPrettyError(errorMessage);
      const expected =
        'The prompt was filtered due to triggering Azure OpenAI’s content filtering system.\n' +
        'Reason: This prompt contains content flagged as Jailbreak\n\n' +
        'Please modify your prompt and retry. Learn more: https://go.microsoft.com/fwlink/?linkid=2198766';
      expect(result).toBe(expected);
    });

    it('returns the original error message if no innererror is found', () => {
      const errorMessage = 'Some other error';
      const result = tryGetRaiPrettyError(errorMessage);
      expect(result).toBe(errorMessage);
    });
  });

  describe('parseErrorMessage', () => {
    it('parses inner error messages from complex error strings', () => {
      const errorMessage = "500 - {\\'error\\': {\\'message\\': 'Inner error occurred'}}";
      const result = parseErrorMessage(errorMessage);
      expect(result).toContain("500 - 'error': {'message': 'Inner error occurred");
    });

    it('returns the original error message if parsing fails', () => {
      const errorMessage = 'Simple error message';
      const result = parseErrorMessage(errorMessage);
      expect(result).toBe(errorMessage);
    });
  });
});