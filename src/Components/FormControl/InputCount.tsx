import type { FC } from 'react';

interface InputCountProps {
    count: number
    setCount: React.Dispatch<React.SetStateAction<number>>
}

const InputCount: FC<InputCountProps> = ({ count, setCount }) => {
    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    return (
        <div className="flex items-center justify-start space-x-4 gap-1">
            <span
                className="bg-secondary flex items-center justify-center cursor-pointer bg-opacity-90 hover:bg-opacity-100 text-white font-bold py-2 px-4 rounded-full"
                onClick={decrement}
            >
                -
            </span>
            <span className="text-2xl">{count}</span>
            <span
                className="bg-secondary flex items-center justify-center cursor-pointer bg-opacity-90 hover:bg-opacity-100 text-white font-bold py-2 px-4 rounded-full"
                onClick={increment}
            >
                +
            </span>
        </div>
    );
}

export default InputCount;
