import type { Meta, StoryObj } from '@storybook/react';
import { Input, type InputProps } from './input';
import { useState } from 'react';
import { Mail, Search } from 'lucide-react';

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        docs: {
            description: {
                component:
                    'A highly versatile and accessible form element used to capture user data. It extends the standard HTML input with enhanced features like iconography, validation states, and specialized interactive modules for passwords and clearable text.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'password', 'number', 'email'],
        },
        onClear: { action: 'cleared' },
    },
    decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        type: 'text',
        placeholder: 'Enter text...',
        label: 'Username',
    },
};

export const WithIcon: Story = {
    args: {
        type: 'email',
        placeholder: 'Enter your email',
        label: 'Email',
        icon: Mail,
    },
};

export const Password: Story = {
    args: {
        type: 'password',
        placeholder: 'Enter password',
        label: 'Password',
    },
};

export const SearchInput: Story = {
    args: {
        type: 'text',
        placeholder: 'Search...',
        icon: Search,
        clearable: true,
    },
};

const ClearableInput = (args: InputProps) => {
    const [value, setValue] = useState('');
    return (
        <Input
            {...args}
            placeholder="Type to clear"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onClear={() => setValue('')}
        />
    );
};

export const Clearable: Story = {
    render: (args) => <ClearableInput {...args} />,
    args: {
        label: 'Clearable Field',
        clearable: true,
    },
};

export const WithError: Story = {
    args: {
        type: 'text',
        label: 'Email',
        value: 'invalid-email',
        error: 'Please enter a valid email address.',
    },
};
