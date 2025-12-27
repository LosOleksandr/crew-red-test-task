import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast, Toaster, type ToastProps, type ToastType } from './toast';

const ToastStoryWrapper = ({
    type,
    message,
    closable = true,
    duration = 3000,
}: {
    type: ToastType;
    message: string;
    closable?: boolean;
    duration?: number;
}) => {
    const [toasts, setToasts] = useState<Omit<ToastProps, 'onClose'>[]>([]);

    const addToast = () => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, type, message, closable, duration }]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const colors: Record<string, string> = {
        success: 'bg-green-600 border-green-700 focus:ring-green-500',
        error: 'bg-red-600 border-red-700 focus:ring-red-500',
        warning: 'bg-yellow-600 border-yellow-700 focus:ring-yellow-500',
        info: 'bg-blue-600 border-blue-700 focus:ring-blue-500',
    };

    return (
        <div className="flex min-h-dvh flex-col items-center justify-center p-10">
            <button
                className={`cursor-pointer rounded-lg border px-6 py-3 text-sm font-bold text-white shadow-md transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none active:scale-95 ${colors[type || 'info']}`}
                onClick={addToast}
            >
                Trigger Toast
            </button>

            <Toaster
                toasts={toasts.map((t) => ({ ...t, onClose: removeToast }))}
                removeToast={removeToast}
            />
        </div>
    );
};

const meta: Meta<typeof Toast> = {
    title: 'Components/Toast',
    component: Toast,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'A non-interruptive, lightweight notification used to provide real-time feedback about an operation&apos;s outcome. Unlike modals or alerts, toasts do not require user interaction to disappear, though they can be manually dismissed.',
            },
        },
    },
    tags: ['autodocs'],
    args: {
        duration: 3000,
        closable: true,
    },
    argTypes: {
        duration: {
            control: { type: 'range', min: 1000, max: 10000, step: 500 },
            description: 'Time in ms before auto-dismiss',
        },
        closable: {
            control: 'boolean',
            description: 'Show or hide the manual close button',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
    args: {
        duration: 10000,
    },

    render: (args) => (
        <ToastStoryWrapper {...args} type="success" message="Your profile has been updated!" />
    ),
};

export const Error: Story = {
    args: {
        closable: true,
    },

    render: (args) => (
        <ToastStoryWrapper
            {...args}
            type="error"
            message="Failed to save changes. Please try again."
        />
    ),
};

export const Warning: Story = {
    render: (args) => (
        <ToastStoryWrapper
            {...args}
            type="warning"
            message="Your subscription is about to expire."
        />
    ),
};

export const Info: Story = {
    render: (args) => (
        <ToastStoryWrapper {...args} type="info" message="A new version of the app is available." />
    ),
};

export const NonClosable: Story = {
    name: 'Non Closable (Manual Override)',
    args: {
        closable: true,
    },
    render: (args) => (
        <ToastStoryWrapper
            {...args}
            type="info"
            message="This story defaults to non-closable, but you can toggle it in Controls."
        />
    ),
};
