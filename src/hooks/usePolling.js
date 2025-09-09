import { useEffect, useRef, useState } from 'react';
import apiService from '../services/apiService';
import { ERROR_MESSAGES } from '../utills/constants';

export const usePolling = (gameId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiOk, setApiOk] = useState(false);
  const inFlightRef = useRef(null);

  useEffect(() => {
    if (!gameId) {
      setError(ERROR_MESSAGES.GAME_ID_NOT_FOUND);
      setIsLoading(false);
      return;
    }

    const fetchOnce = async () => {
      inFlightRef.current?.abort();
      const controller = new AbortController();
      inFlightRef.current = controller;

      try {
        setIsLoading(true);
        setError('');

        const gameData = await apiService.getGameLeaderboard(gameId);
        setData(gameData);
        setApiOk(true);
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Error fetching game data:', err);
        setError(ERROR_MESSAGES.GAME_DATA_ERROR);
        setApiOk(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOnce();

    return () => {
      inFlightRef.current?.abort();
    };
  }, [gameId]);



  return { data, isLoading, error, apiOk };
};
