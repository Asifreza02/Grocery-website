import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
    return (
        <div className='flex justify-center items-center h-full w-full'>
            <Loader2 className='animate-spin text-primary' size={30} />
        </div>
    )
}

export default Loader
