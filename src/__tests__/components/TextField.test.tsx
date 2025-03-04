import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import TextField from '../../components/TextField';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Wrapper = ({ children }: any) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('TextField', () => {
  it('renders correctly with label', () => {
    render(
      <Wrapper>
        <TextField name="testInput" label="Test Input" />
      </Wrapper>
    );

    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
  });

  it('renders correctly without label', () => {
    render(
      <Wrapper>
        <TextField name="testInput" />
      </Wrapper>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <Wrapper>
        <TextField name="testInput" label="Test Input" />
      </Wrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});




