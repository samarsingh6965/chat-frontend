import React, { forwardRef, ForwardedRef, useImperativeHandle } from 'react';

interface SubmitButtonProps {
    label?: string;
}

const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
    ({ label }, ref: ForwardedRef<HTMLButtonElement>) => {
        const buttonRef = React.useRef<HTMLButtonElement>(null);

        // Forward the ref to the underlying button element
        useImperativeHandle(ref, () => buttonRef.current!);

        return (
            <button
                type='submit'
                ref={buttonRef}
                className='py-1.5 text-white px-4 rounded text-sm transition-all duration-300 hover:text-secondary bg-blue-500 hover:bg-blue-600 hover:border-secondary border'
            >
                {label ? label : 'SUBMIT'}
            </button>
        );
    }
);
export default SubmitButton;