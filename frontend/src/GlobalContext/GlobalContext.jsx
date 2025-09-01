import { createContext, useContext, useState, useEffect } from 'react';

const TravelContext = createContext();

export const useTravel = () => useContext(TravelContext);

export const TravelProvider = ({ children }) => {
    const [allTravels, setAllTravels] = useState([]);
    const [filteredTravels, setFilteredTravels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTravels = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3001/travels');
                const basicTravels = await response.json();

                const completeTravels = await Promise.all(
                    basicTravels.map(async (travel) => {
                        const detailResponse = await fetch(`http://localhost:3001/travels/${travel.id}`);
                        const detailData = await detailResponse.json();
                        return detailData.travel;
                    })
                );

                setAllTravels(completeTravels);
                setFilteredTravels(completeTravels);
            } catch (error) {
                console.error('Errore nel caricamento viaggi:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTravels();
    }, []);

    const value = {
        allTravels,
        filteredTravels,
        loading
    };

    return (
        <TravelContext.Provider value={value}>
            {children}
        </TravelContext.Provider>
    );
};


