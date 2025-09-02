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

    // Stati per preferiti e comparazione con localStorage
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('travel-favorites');
        return saved ? JSON.parse(saved) : [];
    });

    const [compareList, setCompareList] = useState(() => {
        const saved = localStorage.getItem('travel-compare');
        return saved ? JSON.parse(saved) : [];
    });

    // Salva preferiti in localStorage quando cambiano
    useEffect(() => {
        localStorage.setItem('travel-favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Salva lista comparazione in localStorage quando cambia
    useEffect(() => {
        localStorage.setItem('travel-compare', JSON.stringify(compareList));
    }, [compareList]);

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

    // Funzioni SEMPLIFICATE per gestire i preferiti
    const toggleFavorite = (travel) => {
        const isAlreadyFavorite = favorites.some(fav => fav.id === travel.id);

        if (isAlreadyFavorite) {
            setFavorites(favorites.filter(fav => fav.id !== travel.id));
        } else {
            setFavorites([...favorites, travel]);
        }
    };

    const isFavorite = (travelId) => {
        return favorites.some(fav => fav.id === travelId);
    };

    // Funzioni SEMPLIFICATE per gestire la comparazione
    const toggleCompare = (travel) => {
        const isAlreadyInCompare = compareList.some(item => item.id === travel.id);

        if (isAlreadyInCompare) {
            setCompareList(compareList.filter(item => item.id !== travel.id));
        } else if (compareList.length < 2) {
            setCompareList([...compareList, travel]);
        }
    };

    const canAddToCompare = (travelId) => {
        const isAlreadyInCompare = compareList.some(item => item.id === travelId);
        return !isAlreadyInCompare && compareList.length < 2;
    };

    const isInCompare = (travelId) => {
        return compareList.some(item => item.id === travelId);
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

        // Preferiti SEMPLIFICATI
        favorites,
        toggleFavorite,
        isFavorite,

        // Comparazione SEMPLIFICATA
        compareList,
        toggleCompare,
        canAddToCompare,
        isInCompare,
        clearCompare
    };

    return (
        <TravelContext.Provider value={value}>
            {children}
        </TravelContext.Provider>
    );
};