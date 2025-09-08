import { createContext, useContext, useState, useEffect } from 'react';

const TravelContext = createContext();

export const useTravel = () => useContext(TravelContext);

export const TravelProvider = ({ children }) => {
    const [allTravels, setAllTravels] = useState([]); /* Contiene tutti i dati originali dalla chiamata del server api, inizialmente è un array vuoto  */
    const [filteredTravels, setFilteredTravels] = useState([]); /* Contiene i viaggi risultanti dalla applicazione del filtro di ricerca */
    const [loading, setLoading] = useState(true); /* Stato che controlla che cosa mostrare all'utente  */

    // Nuovi stati per ricerca e filtri
    const [searchText, setSearchText] = useState(''); /* E lo stato che memorizza il testo di ricerca dell'utente, inizialmente è una stringa vuota */
    const [selectedCategory, setSelectedCategory] = useState(''); /* E lo stato che memorizza le categorie scelte dall'utente  */
    const [sortBy, setSortBy] = useState(''); /* Memorizza il criterio di ordinamento del cliente usando il metodo del Sort */

    // Stato per poter utilizzare il localstorage del browser per mantenere salvati anche dopo la chiusura i viaggi preferiti o comparati e trovarli salvati succesivamente
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

    // Funzioni per gestire i preferiti
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

    // Funzioni per gestire la comparazione 
    const toggleCompare = (travel) => {
        const isAlreadyInCompare = compareList.some(item => item.id === travel.id);

        if (isAlreadyInCompare) {
            setCompareList(compareList.filter(item => item.id !== travel.id));
        } else if (compareList.length < 4) {
            setCompareList([...compareList, travel]);
        }
    };

    const canAddToCompare = (travelId) => {
        const isAlreadyInCompare = compareList.some(item => item.id === travelId);
        return !isAlreadyInCompare && compareList.length < 4;
    };

    const isInCompare = (travelId) => {
        return compareList.some(item => item.id === travelId);
    };

    const clearCompare = () => {
        setCompareList([]);
    };

    const removeFromCompare = (travelId) => {
        setCompareList(compareList.filter(item => item.id !== travelId));
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
        toggleFavorite,
        isFavorite,

        // Comparazione 
        compareList,
        toggleCompare,
        canAddToCompare,
        isInCompare,
        clearCompare,
        removeFromCompare
    };

    return (
        <TravelContext.Provider value={value}>
            {children}
        </TravelContext.Provider>
    );
};