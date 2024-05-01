import { useState } from 'react'

export default function useHandleParams() {
    const [params, setParams] = useState({})

    const handleParams = (config: any): Promise<any> => {
        return new Promise((resolve) => {
          setParams((prevParams) => {
            const final = { ...prevParams, ...config };
            resolve({ ...final });
            return { ...final };
          });
        });
      };
    
    return { handleParams, params }
}
