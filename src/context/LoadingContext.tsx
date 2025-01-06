import LoadingOverlay from '@components/LoadingOverlay/LoadingOverlay';
import React, {createContext, useState, useContext} from 'react'

type LoadingContextType = {
    loading: boolean;
    showLoading: () => void; 
    hideLoading: () => void;
}

type LoadingProviderProps = {  
    children: React.ReactNode;
}

const LoadingContext = createContext<LoadingContextType | null>(null)

const LoadingProvider = ({children} : LoadingProviderProps) => {
    const [loading, setLoading] = useState(false)

    const showLoading = () => setLoading(true)
    const hideLoading = () => setLoading(false)

    return (
        <LoadingContext.Provider value={{loading, showLoading, hideLoading}}>
            {children}
            <LoadingOverlay visible={loading} />
        </LoadingContext.Provider>
    )
}

export const useLoading = () => useContext(LoadingContext) as LoadingContextType

export default LoadingProvider