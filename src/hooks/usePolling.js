import { useEffect, useRef, useState } from 'react';
import apiService from '../services/apiService';
import { ERROR_MESSAGES, POLLING_INTERVALS } from '../utills/constants';

export const usePolling = (gameId, interval = POLLING_INTERVALS.NORMAL, backoffInterval = POLLING_INTERVALS.BACKOFF) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiOk, setApiOk] = useState(false);

  const timerRef = useRef(null);
  const inFlightRef = useRef(null);
  const stoppedRef = useRef(false);

  useEffect(() => {
    if (!gameId) {
      setError(ERROR_MESSAGES.GAME_ID_NOT_FOUND);
      setIsLoading(false);
      return;
    }

    stoppedRef.current = false;

    const schedule = (ms) => {
      if (stoppedRef.current) return;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(fetchOnce, ms);
    };

    const fetchOnce = async () => {
      if (stoppedRef.current) return;

      inFlightRef.current?.abort();
      const controller = new AbortController();
      inFlightRef.current = controller;

      try {
        if (!data) setIsLoading(true);
        setError('');

        const gameData = await apiService.getGameLeaderboard(gameId);
        setData(gameData);
        setApiOk(true);

        if (gameData.is_finished) {
          stoppedRef.current = true;
          clearTimeout(timerRef.current);
          return;
        }

        schedule(interval);
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Error fetching game data:', err);
        setError(ERROR_MESSAGES.GAME_DATA_ERROR);
        setApiOk(false);
        schedule(backoffInterval);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOnce();

    return () => {
      stoppedRef.current = true;
      clearTimeout(timerRef.current);
      inFlightRef.current?.abort();
    };
  }, [gameId, interval, backoffInterval]);

  return { data, isLoading, error, apiOk };
};
