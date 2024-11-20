import {
    newChat,
    stopGenerating,
    onShowCitation,
    onCloseModal,
    onViewSource,
    disabledButton,
  } from './Utils';
  
  describe('Utils.js Tests', () => {
    test('newChat updates state correctly', () => {
      const dispatch = jest.fn();
      const setMessages = jest.fn();
      const setProcessMessages = jest.fn();
      const messageStatus = { Processing: 'Processing', Done: 'Done' };
  
      newChat(dispatch, setMessages, setProcessMessages, messageStatus);
      expect(setProcessMessages).toHaveBeenCalledWith('Processing');
      expect(setMessages).toHaveBeenCalledWith([]);
      expect(dispatch).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_CHAT', payload: null });
      expect(setProcessMessages).toHaveBeenCalledWith('Done');
    });
  
    test('stopGenerating aborts processes and updates state', () => {
      const abortFuncs = [{ abort: jest.fn() }, { abort: jest.fn() }];
      const setShowLoadingMessage = jest.fn();
      const setIsLoading = jest.fn();
  
      stopGenerating(abortFuncs, setShowLoadingMessage, setIsLoading);
      expect(abortFuncs[0].abort).toHaveBeenCalled();
      expect(abortFuncs[1].abort).toHaveBeenCalled();
      expect(setShowLoadingMessage).toHaveBeenCalledWith(false);
      expect(setIsLoading).toHaveBeenCalledWith(false);
    });
  
    test('onShowCitation updates modal state correctly', () => {
      const citation = { filepath: 'testFile' };
      const setModalUrl = jest.fn();
      const setIsModalOpen = jest.fn();
  
      onShowCitation(citation, setModalUrl, setIsModalOpen);
  
      // Corrected template literal usage
      expect(setModalUrl).toHaveBeenCalledWith('${window.location.origin}/#/document/testFile');
      expect(setIsModalOpen).toHaveBeenCalledWith(true);
    });
  
    test('onCloseModal closes modal correctly', () => {
      const setIsModalOpen = jest.fn();
      const setModalUrl = jest.fn();
  
      onCloseModal(setIsModalOpen, setModalUrl);
      expect(setIsModalOpen).toHaveBeenCalledWith(false);
      expect(setModalUrl).toHaveBeenCalledWith('');
    });
  
    test('onViewSource opens URL in new tab', () => {
      const windowSpy = jest.spyOn(window, 'open').mockImplementation(() => {});
      const citation = { url: 'https://example.com' };
  
      onViewSource(citation);
      expect(windowSpy).toHaveBeenCalledWith('https://example.com', '_blank');
      windowSpy.mockRestore();
    });
  
    test('disabledButton returns correct status', () => {
      expect(disabledButton(true, [], false, 'Loading')).toBe(true);
      expect(disabledButton(false, [1, 2], false, 'NotLoading')).toBe(false);
    });
  });