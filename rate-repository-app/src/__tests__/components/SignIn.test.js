import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignInContainer', () => {
  it('filling the sign in form\'s username and password fields and pressing the submit button will call the onSubmit handler with correct arguments.', async () => {
    const mockOnSubmit = jest.fn();
    render(<SignInContainer onSubmit={mockOnSubmit} />);

    fireEvent.changeText(screen.getByTestId('username'), 'username')
    fireEvent.changeText(screen.getByTestId('password'), 'password')
    fireEvent.press(screen.getByTestId('submit'))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        username: 'username',
        password: 'password',
      }, expect.any(Object))
    })
  })
});