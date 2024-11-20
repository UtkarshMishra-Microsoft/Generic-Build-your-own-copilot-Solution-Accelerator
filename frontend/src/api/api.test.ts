import {
    conversationApi,
    getUserInfo,
    fetchChatHistoryInit,
    historyList,
    historyRead,
    historyGenerate,
    historyUpdate,
    historyDelete,
    historyDeleteAll,
    historyClear,
    historyRename,
    historyEnsure,
    frontendSettings,
    historyMessageFeedback,
    sectionGenerate,
    documentRead
  } from './api'; // Ensure the path matches your folder structure
  
  global.fetch = jest.fn(); // Mock the global fetch function
  
  describe('API Tests', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('conversationApi sends POST request successfully', async () => {
      const mockResponse = new Response(JSON.stringify({ success: true }), { status: 200 });
      (fetch as jest.Mock).mockResolvedValueOnce(mockResponse);
  
      const result = await conversationApi({ messages: [] }, new AbortController().signal);
      expect(fetch).toHaveBeenCalledWith('/conversation', expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  
    test('getUserInfo returns user information', async () => {
      const mockResponse = new Response(JSON.stringify([{ name: 'User' }]), { status: 200 });
      (fetch as jest.Mock).mockResolvedValueOnce(mockResponse);
  
      const result = await getUserInfo();
      expect(result).toEqual([{ name: 'User' }]);
    });
  
    test('fetchChatHistoryInit returns sample data', () => {
      const result = fetchChatHistoryInit();
      expect(result).toBeDefined(); // Ensure sample data is returned
    });
  
    test('historyList fetches conversation list', async () => {
      const mockResponse = new Response(JSON.stringify([{ id: 1, title: 'Conversation' }]), { status: 200 });
      (fetch as jest.Mock).mockResolvedValueOnce(mockResponse);
  
      const result = await historyList();
      expect(result).toEqual(expect.any(Array));
    });
  
    test('historyRead fetches messages for a conversation', async () => {
      const mockResponse = new Response(
        JSON.stringify({ messages: [{ id: 'msg1', role: 'user', content: 'Hello' }] }),
        { status: 200 }
      );
      (fetch as jest.Mock).mockResolvedValueOnce(mockResponse);
  
      const result = await historyRead('convId');
      expect(result).toEqual([{ id: 'msg1', role: 'user', content: 'Hello' }]);
    });
  
    test('historyGenerate sends POST request successfully', async () => {
      const mockResponse = new Response(JSON.stringify({ success: true }), { status: 200 });
      (fetch as jest.Mock).mockResolvedValueOnce(mockResponse);
  
      const result = await historyGenerate({ messages: [] }, new AbortController().signal);
      expect(result).toEqual(mockResponse);
    });
  
    test('frontendSettings fetches settings successfully', async () => {
      const mockResponse = new Response(JSON.stringify({ setting: true }), { status: 200 });
      (fetch as jest.Mock).mockResolvedValueOnce(mockResponse);
  
      const result = await frontendSettings();
      expect(result).toEqual({ setting: true });
    });
  
    test('documentRead fetches document data successfully', async () => {
      const mockResponse = new Response(JSON.stringify({ content: 'Document Content' }), { status: 200 });
      (fetch as jest.Mock).mockResolvedValueOnce(mockResponse);
  
      const result = await documentRead('docId');
      expect(result).toEqual(mockResponse);
    });
  });