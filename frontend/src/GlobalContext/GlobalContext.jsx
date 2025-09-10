
import { useState, useEffect, useContext, createContext, useMemo, useCallback } from 'react';

const TravelContext = createContext();

// Hook personalizzato per usare il context
const useTravel = () => useContext(TravelContext);

export const TravelProvider = ({ children }) => {


    // STATI PRINCIPALI - DATI

    // Stato che contiene tutti i viaggi ricevuti dal server, inizialmente array vuoto fino al caricamento
    const [allTravels, setAllTravels] = useState([]);

    // Stato booleano per controllare quando mostrare il loading spinner all'utente
    const [loading, setLoading] = useState(true);


    // STATI RICERCA E FILTRI

    // Stato che memorizza quello che l'utente sta digitando nella barra di ricerca
    const [searchText, setSearchText] = useState('');

    // Versione ritardata di searchText, si aggiorna solo dopo 1 secondo di pausa nella digitazione
    // Evito di fare troppe chiamate di filtro mentre l'utente sta ancora scrivendo
    const [debouncedSearchText, setDebouncedSearchText] = useState('');

    // Stato che memorizza la categoria selezionata dall'utente nel dropdown
    const [selectedCategory, setSelectedCategory] = useState('');

    // Stato che memorizza il criterio di ordinamento scelto dall'utente (title-asc, title-desc, etc.)
    const [sortBy, setSortBy] = useState('');


    // STATI PREFERITI E CONFRONTO

    // Stato per i viaggi preferiti con inizializzazione dal localStorage
    // Uso una funzione nell'useState perché viene eseguita solo al primo render
    const [favorites, setFavorites] = useState(() => {
        // Cerco nel browser se ho già salvato preferiti in precedenza con questa chiave
        const saved = localStorage.getItem('travel-favorites');
        // Se trovo dati li converto da stringa JSON a array JavaScript, altrimenti parto da array vuoto
        return saved ? JSON.parse(saved) : [];
    });

    // Stato per la lista di confronto con inizializzazione dal localStorage
    // Stessa logica dei preferiti ma con chiave diversa
    const [compareList, setCompareList] = useState(() => {
        // Controllo se ci sono viaggi già salvati per il confronto
        const saved = localStorage.getItem('travel-compare');
        // Converto da JSON a array se esistono, altrimenti array vuoto
        return saved ? JSON.parse(saved) : [];
    });


    //  SALVATAGGIO LOCALSTORAGE

    // Salvataggio automatico dei preferiti ogni volta che cambiano
    useEffect(() => {
        // Converto l'array JavaScript in stringa JSON per poterlo salvare nel browser
        // localStorage accetta solo stringhe, non oggetti o array
        localStorage.setItem('travel-favorites', JSON.stringify(favorites));
    }, [favorites]); // Si attiva quando favorites cambia (aggiunta/rimozione preferiti)

    // Salvataggio automatico della lista confronto ogni volta che cambia
    useEffect(() => {
        // Stesso meccanismo dei preferiti: converto in JSON e salvo nel browser
        localStorage.setItem('travel-compare', JSON.stringify(compareList));
    }, [compareList]); // Si attiva quando compareList cambia (aggiunta/rimozione viaggi dal confronto)


    // DEBOUNCE RICERCA

    // Implementazione del debounce per la ricerca - ritardo nell'aggiornamento
    useEffect(() => {
        // Creo un timer che aspetta 1 secondo prima di aggiornare debouncedSearchText
        // Se l'utente continua a digitare, il timer viene cancellato e ricreato
        const timer = setTimeout(() => {
            // Dopo 1 secondo di pausa, aggiorno il testo di ricerca "definitivo"
            setDebouncedSearchText(searchText);
        }, 1000);

        // Cleanup function: cancello il timer precedente se searchText cambia prima dello scadere
        // Questo evita che si attivino filtri multipli mentre l'utente sta ancora digitando
        return () => clearTimeout(timer);
    }, [searchText]); // Si riattiva ogni volta che l'utente digita qualcosa


    // CARICAMENTO DATI

    // Caricamento iniziale di tutti i viaggi dal server al primo avvio dell'app
    useEffect(() => {
        // Definisco funzione asincrona perché devo aspettare le risposte del server
        const fetchTravels = async () => {
            try {
                // Mostro il loading per dare feedback all'utente che sto caricando
                setLoading(true);

                // Prima chiamata: ottengo la lista base di tutti i viaggi (senza dettagli completi)
                const response = await fetch('http://localhost:3001/travels');

                // Converto la risposta HTTP in array JavaScript
                const basicTravels = await response.json();

                // Per ogni viaggio base, faccio una chiamata separata per ottenere i dettagli completi
                // Promise.all permette di eseguire tutte le chiamate in parallelo invece che una alla volta
                const completeTravels = await Promise.all(
                    // map trasforma ogni elemento dell'array in una nuova Promise
                    basicTravels.map(async (travel) => {
                        // Chiamata specifica per i dettagli di questo singolo viaggio
                        const detailResponse = await fetch(`http://localhost:3001/travels/${travel.id}`);

                        // Converto la risposta in oggetto JavaScript
                        const detailData = await detailResponse.json();

                        // Restituisco solo la parte travel, non tutto l'oggetto risposta
                        return detailData.travel;
                    })
                );

                // Salvo tutti i viaggi completi nello stato principale
                setAllTravels(completeTravels);

            } catch (error) {
                // Se qualcosa va storto, stampo l'errore in console per debug
                console.error('Errore nel caricamento viaggi:', error);
            } finally {
                // Nascondo sempre il loading, sia che tutto vada bene sia che ci siano errori
                setLoading(false);
            }
        };

        // Eseguo immediatamente la funzione di caricamento
        fetchTravels();
    }, []); // Array vuoto = eseguo solo una volta al mount del componente


    // FUNZIONE PER LA SELEZIONE DELLA CATEGORIA DALLA DROPDOWN (fornisce la lista per popolare la select dell'interfaccia)
    const categories = useMemo(() => {
        // Set rimuove i duplicati, ma ciò che restituisce non è un array (è un oggetto Set: { "mare", "montagna" }), quindi lo spread lo converte automaticamente in array)
        const uniqueCategories = [...new Set(allTravels.map(travel => travel.category))];
        // mi ritorna le categorie in ordine alfabetico
        return uniqueCategories.sort(); // stringhe
    }, [allTravels]);

    // FUNZIONE PER OTTENERE I VIAGGI FILTRATI SOLO PER TITOLO
    const searchFilteredTravels = useMemo(() => {
        // se non c'è testo di ricerca, mostro tutti i viaggi
        if (!debouncedSearchText) {
            return allTravels;
        }
        // filtro solo per il titolo del viaggio
        return allTravels.filter(travel =>
            travel.title.toLowerCase().includes(debouncedSearchText.toLowerCase())
        );
    }, [allTravels, debouncedSearchText]);

    // FUNZIONE PER OTTENERE I VIAGGI FILTRATI SOLO PER CATEGORIA
    const categoryFilteredTravels = useMemo(() => {
        // se non c'è categoria selezionata, mostro tutti i viaggi
        if (!selectedCategory) {
            return allTravels;
        }
        // filtro solo per la categoria selezionata
        return allTravels.filter(travel => travel.category === selectedCategory);
    }, [allTravels, selectedCategory]);

    // FUNZIONE PER L'ORDINE ALFABETICO DEI VIAGGI
    const sortedTravels = useMemo(() => {
        // se non c'è ordinamento selezionato, mostro tutti i viaggi senza ordinamento
        if (!sortBy) {
            return allTravels;
        }
        // applico solo l'ordinamento alfabetico
        if (sortBy === "title-asc") {
            return [...allTravels].sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "title-desc") {
            return [...allTravels].sort((a, b) => b.title.localeCompare(a.title));
        }
        // se sortBy non corrisponde a nessuna opzione, restituisco tutti i viaggi
        return allTravels;
    }, [allTravels, sortBy]);


    // FUNZIONI GESTIONE PREFERITI

    // GESTIONE PREFERITI - aggiunta e rimozione toggle
    const toggleFavorite = useCallback((travel) => {
        // some() verifica se almeno un elemento dell'array soddisfa la condizione
        // Controllo se questo viaggio è già presente nei miei preferiti
        const isAlreadyFavorite = favorites.some(fav => fav.id === travel.id);

        if (isAlreadyFavorite) {
            // Se è già presente, lo rimuovo creando un nuovo array senza questo elemento
            // filter() mantiene tutti gli elementi TRANNE quello che voglio rimuovere
            setFavorites(favorites.filter(fav => fav.id !== travel.id));
        } else {
            // Se non è presente, lo aggiungo alla fine dell'array esistente
            // [...favorites, travel] crea nuovo array con tutto quello che c'era + il nuovo elemento
            setFavorites([...favorites, travel]);
        }
    }, [favorites]); // Dipende da favorites - si ricrea solo quando favorites cambia

    // Funzione di utilità per controllare se un viaggio è nei preferiti
    const isFavorite = useCallback((travelId) => {
        // Restituisce true/false cercando se l'ID esiste nell'array favorites
        // Uso questa funzione per mostrare icone diverse nell'interfaccia (cuore pieno/vuoto)
        return favorites.some(fav => fav.id === travelId);
    }, [favorites]); // Dipende da favorites


    // FUNZIONI GESTIONE CONFRONTO

    // GESTIONE CONFRONTO - aggiunta e rimozione con limite massimo
    const toggleCompare = useCallback((travel) => {
        // Verifico se questo viaggio è già nella lista di confronto
        const isAlreadyInCompare = compareList.some(item => item.id === travel.id);

        if (isAlreadyInCompare) {
            // Se è già presente, lo rimuovo dalla lista
            setCompareList(compareList.filter(item => item.id !== travel.id));
        } else if (compareList.length < 4) {
            // Se non è presente E ho meno di 4 viaggi, posso aggiungerlo
            // Il limite di 4 evita di sovraccaricare l'interfaccia di confronto
            setCompareList([...compareList, travel]);
        }
        // Se ho già 4 viaggi, non succede nulla (nessun else finale)
    }, [compareList]); // Dipende da compareList

    // Controllo se posso aggiungere un viaggio al confronto
    const canAddToCompare = useCallback((travelId) => {
        // Verifico prima se è già presente
        const isAlreadyInCompare = compareList.some(item => item.id === travelId);
        // Restituisco true solo se: NON è già presente E ho ancora spazio (meno di 4)
        // Uso questa funzione per abilitare/disabilitare pulsanti nell'interfaccia
        return !isAlreadyInCompare && compareList.length < 4;
    }, [compareList]); // Dipende da compareList

    // Controllo se un viaggio specifico è nella lista di confronto
    const isInCompare = useCallback((travelId) => {
        // Semplice verifica di presenza nell'array
        // Uso questa funzione per mostrare stati diversi dei pulsanti (aggiunto/non aggiunto)
        return compareList.some(item => item.id === travelId);
    }, [compareList]); // Dipende da compareList

    // Svuoto completamente la lista di confronto
    const clearCompare = useCallback(() => {
        // Imposto array vuoto per rimuovere tutti i viaggi dal confronto
        // Il salvataggio nel localStorage avviene automaticamente tramite useEffect
        setCompareList([]);
    }, []); // Non dipende da nulla, sempre la stessa funzione

    // Rimuovo un singolo viaggio dalla lista di confronto
    const removeFromCompare = useCallback((travelId) => {
        // Creo nuovo array mantenendo tutti gli elementi TRANNE quello con l'ID specificato
        // Uso questa funzione quando l'utente clicca "X" su un viaggio nella pagina confronto
        setCompareList(compareList.filter(item => item.id !== travelId));
    }, [compareList]); // Dipende da compareList


    // PROVIDER VALUE - ESPORTAZIONE

    // Oggetto con tutti i valori e funzioni che voglio rendere disponibili ai componenti figli
    const value = {
        // Dati principali
        allTravels,                    // Tutti i viaggi dal server
        searchFilteredTravels,         // Viaggi filtrati solo per ricerca titolo
        categoryFilteredTravels,       // Viaggi filtrati solo per categoria
        sortedTravels,                 // Viaggi ordinati solo alfabeticamente
        loading,                       // Stato caricamento
        categories,                    // Categorie uniche derivate dai viaggi

        // Controlli ricerca e filtri
        searchText,           // Testo attuale nella barra ricerca
        setSearchText,        // Funzione per aggiornare testo ricerca
        selectedCategory,     // Categoria attualmente selezionata
        setSelectedCategory,  // Funzione per cambiare categoria
        sortBy,               // Criterio di ordinamento attuale
        setSortBy,            // Funzione per cambiare ordinamento

        // Sistema preferiti
        favorites,            // Array dei viaggi preferiti
        toggleFavorite,       // Aggiungi/rimuovi preferito
        isFavorite,           // Controlla se è preferito

        // Sistema confronto
        compareList,          // Array viaggi da confrontare
        toggleCompare,        // Aggiungi/rimuovi dal confronto
        canAddToCompare,      // Controlla se può essere aggiunto
        isInCompare,          // Controlla se è già nel confronto
        clearCompare,         // Svuota lista confronto
        removeFromCompare     // Rimuovi singolo dal confronto
    };

    return (
        <TravelContext.Provider value={value}>
            {children}
        </TravelContext.Provider>
    );
};

export { useTravel };
