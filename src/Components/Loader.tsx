import type { FC } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner'

interface LoaderProps {
    loader: boolean
}

const Loader: FC<LoaderProps> = ({ loader }) => {
    return (
        <>
            {loader === true && <div className="w-full h-full flex items-center justify-center bg-gray-200 inset-0 absolute z-50">
                <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor='#c0efff'
                    color='#e15b64'
                />
            </div>}
        </>
    )
}

export default Loader;
