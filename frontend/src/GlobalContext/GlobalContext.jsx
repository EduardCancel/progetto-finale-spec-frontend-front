import { createContext, useContext, useState, useEffect } from 'react';

const TravelContext = createContext();

export const useTravel = () => useContext(TravelContext);

export const TravelProvider = ({ children }) => {
    const [allTravels, setAllTravels] = useState([]);
    const [filteredTravels, setFilteredTravels] = useState([]);
    const [loading, setLoading] = useState(true);

    // Nuovi stati per ricerca e filtri
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('');

    // Stati per preferiti e comparazione
    const [favorites, setFavorites] = useState([]);
    const [compareList, setCompareList] = useState([]);

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

    // Effetto per filtrare e ordinare i viaggi
    useEffect(() => {
        let filtered = [...allTravels];

        // Filtro per ricerca
        if (searchText) {
            filtered = filtered.filter(travel =>
                travel.title.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        // Filtro per categoria
        if (selectedCategory) {
            filtered = filtered.filter(travel => travel.category === selectedCategory);
        }

        // Ordinamento
        if (sortBy) {
            filtered.sort((a, b) => {
                if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
                if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
                if (sortBy === 'category-asc') return a.category.localeCompare(b.category);
                if (sortBy === 'category-desc') return b.category.localeCompare(a.category);
                return 0;
            });
        }

        setFilteredTravels(filtered);
    }, [allTravels, searchText, selectedCategory, sortBy]);

    // Funzioni per gestire i preferiti
    const addToFavorites = (travel) => {
        if (!favorites.find(fav => fav.id === travel.id)) {
            setFavorites([...favorites, travel]);
        }
    };

    const removeFromFavorites = (travelId) => {
        setFavorites(favorites.filter(fav => fav.id !== travelId));
    };

    const isFavorite = (travelId) => {
        return favorites.some(fav => fav.id === travelId);
    };

    // Funzioni per gestire la comparazione
    const addToCompare = (travel) => {
        if (compareList.length < 2 && !compareList.find(item => item.id === travel.id)) {
            setCompareList([...compareList, travel]);
        }
    };

    const removeFromCompare = (travelId) => {
        setCompareList(compareList.filter(item => item.id !== travelId));
    };

    const clearCompare = () => {
        setCompareList([]);
    };

    const value = {
        // Dati originali
        allTravels,
        filteredTravels,
        loading,

        // Ricerca e filtri
        searchText,
        setSearchText,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,

        // Preferiti
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,

        // Comparazione
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare
    };

    return (
        <TravelContext.Provider value={value}>
            {children}
        </TravelContext.Provider>
    );
};