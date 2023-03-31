import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, beforeEach, expect, vitest } from 'vitest';
import { button, Button, ButtonProps } from './Button';
import { VariantProps } from 'class-variance-authority';

describe('Button component', () => {
  let props: ButtonProps;

  beforeEach(() => {
    props = {};
  });

  it('should render succesfuly', () => {
    const { baseElement } = render(<Button />);
    expect(baseElement).toBeTruthy();
  });

  it('should trigger onclick', () => {
    const onClick = vitest.fn();
    render(<Button onClick={onClick}>Button</Button>);
    const buttonComponent = screen.getByTestId('button');
    userEvent.click(buttonComponent);
    expect(onClick).toHaveBeenCalled();
  });

  it('should render with icon', () => {
    const buttonComponent = render(<Button buttonIcon="plus">Button</Button>);
    const buttonComponentIcon = buttonComponent.getByTestId('icon');
    expect(buttonComponentIcon).toBeTruthy();
  });

  it('should render with lefIcon', () => {
    const buttonComponent = render(<Button iconLeft="plus">Button</Button>);
    const buttonComponentIcon = buttonComponent.getByTestId('iconLeft');
    expect(buttonComponentIcon).toBeTruthy();
  });

  it('should render with rightIcon', () => {
    const buttonComponent = render(<Button iconRight="plus">Button</Button>);
    const buttonComponentIcon = buttonComponent.getByTestId('iconRight');
    expect(buttonComponentIcon).toBeTruthy();
  });

  it('should render disabled', () => {
    props.disabled = true;
    render(<Button {...props} />);
    const buttonComponent = screen.getByTestId('button');
    expect(
      buttonComponent.classList
        .toString()
        .includes(
          'bg-black-72 border-black-72 cursor-not-allowed text-white-48'
        )
    ).toBeTruthy();
  });

  it('should render with good color', () => {
    const correctButtonTypeClass = {
      primary: 'border-4 bg-grey-100 border-grey-86 hover:bg-darkgrey-72 hover:border-darkgrey-48 focus:bg-darkgrey-86 focus:border-darkgrey-72',
      stroked:  'border-4 border-grey-100',
      backgroundless:  'border-none bg-transparent',
      social:  'border-4 bg-blue-100 border-blue-48 hover:bg-blue-72 hover:border-blue-24 focus:bg-blue-86 focus:border-blue-72',
    };

    for (const buttonType in correctButtonTypeClass) {
      props.intent = buttonType as VariantProps<typeof button>['intent'];
      render(<Button {...props} />);
      const buttonComponent = screen.getByTestId('button');
      const correctClass =
        correctButtonTypeClass[
          buttonType as keyof VariantProps<typeof button>['intent']
        ];
      expect(
        buttonComponent.classList.toString().includes(correctClass)
      ).toBeTruthy();
      cleanup();
    }
  });
});