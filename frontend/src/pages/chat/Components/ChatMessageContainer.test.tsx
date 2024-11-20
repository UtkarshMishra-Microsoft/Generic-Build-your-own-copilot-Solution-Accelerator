import { render, screen, fireEvent } from '@testing-library/react';
import { ChatMessageContainer } from './ChatMessageContainer';
import { ChatMessage, ChatType } from '../../../api/models';
import { Answer } from '../../../components/Answer';

jest.mock('../../../components/Answer', () => ({
    Answer: jest.fn((props: any) => (
        <div>
            <p>{props.answer.answer}</p>
            <span>Mock Answer Component</span>
            {props.answer.answer === 'Generating answer...' ? (
                <button onClick={() => props.onCitationClicked()}>Mock Citation Loading</button>
            ) : (
                <button onClick={() => props.onCitationClicked({ title: 'Test Citation' })}>
                    Mock Citation
                </button>
            )}
        </div>
    )),
}));

const mockOnShowCitation = jest.fn();

describe('ChatMessageContainer', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const userMessage: ChatMessage = {
        role: 'user',
        content: 'User message',
        id: '1',
        feedback: undefined,
        date: new Date().toDateString(),
    };

    const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: 'Assistant message',
        id: '2',
        feedback: undefined,
        date: new Date().toDateString(),
    };

    const errorMessage: ChatMessage = {
        role: 'error',
        content: 'Error message',
        id: '3',
        feedback: undefined,
        date: new Date().toDateString(),
    };

    it('renders user and assistant messages correctly', () => {
        render(
            <ChatMessageContainer
                messages={[userMessage, assistantMessage]}
                isLoading={false}
                showLoadingMessage={false}
                type={ChatType.Browse}
                onShowCitation={mockOnShowCitation}
            />
        );

        expect(screen.getByText('User message')).toBeInTheDocument();
        expect(screen.getByText('Mock Answer Component')).toBeInTheDocument();
    });

    it('renders an error message correctly', () => {
        render(
            <ChatMessageContainer
                messages={[errorMessage]}
                isLoading={false}
                showLoadingMessage={false}
                type={ChatType.Browse}
                onShowCitation={mockOnShowCitation}
            />
        );

        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('displays the loading message when showLoadingMessage is true', () => {
        render(
            <ChatMessageContainer
                messages={[]}
                isLoading={false}
                showLoadingMessage={true}
                type={ChatType.Browse}
                onShowCitation={mockOnShowCitation}
            />
        );

        expect(screen.getByText('Generating answer...')).toBeInTheDocument();
    });

    it('calls onShowCitation when a citation is clicked', () => {
        render(
            <ChatMessageContainer
                messages={[assistantMessage]}
                isLoading={false}
                showLoadingMessage={false}
                type={ChatType.Browse}
                onShowCitation={mockOnShowCitation}
            />
        );

        const citationButton = screen.getByText('Mock Citation');
        fireEvent.click(citationButton);

        expect(mockOnShowCitation).toHaveBeenCalledWith({ title: 'Test Citation' });
    });

    it('does not call onShowCitation when citation click is a no-op', () => {
        render(
            <ChatMessageContainer
                messages={[]}
                isLoading={false}
                showLoadingMessage={true}
                type={ChatType.Browse}
                onShowCitation={mockOnShowCitation}
            />
        );

        const citationButton = screen.getByRole('button', { name: 'Mock Citation Loading' });
        fireEvent.click(citationButton);

        expect(mockOnShowCitation).not.toHaveBeenCalled();
    });
});