'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  play: () => void;
  pause: () => void;
  volume: number;
  setVolume: (v: number) => void;
}

const AudioCtx = createContext<AudioContextType>({
  isPlaying: false,
  isMuted: false,
  toggleMute: () => {},
  play: () => {},
  pause: () => {},
  volume: 0.4,
  setVolume: () => {},
});

export function useAudio() {
  return useContext(AudioCtx);
}

// Module-level singleton so audio survives page navigation
let globalAudio: HTMLAudioElement | null = null;

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.4);
  const isMutedRef = useRef(false);
  const volumeRef = useRef(0.4);

  // Sync refs so callbacks always have fresh values
  isMutedRef.current = isMuted;
  volumeRef.current = volume;

  // On mount, sync UI state with whatever globalAudio is doing
  useEffect(() => {
    if (globalAudio) {
      setIsPlaying(!globalAudio.paused);
    }
  }, []);

  const play = useCallback(() => {
    if (!globalAudio) {
      globalAudio = new Audio(
        'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-100-bpm-121529.mp3'
      );
      globalAudio.loop = true;
    }
    globalAudio.volume = isMutedRef.current ? 0 : volumeRef.current;
    globalAudio.play().catch(() => {});
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    if (globalAudio) globalAudio.pause();
    setIsPlaying(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      isMutedRef.current = next;
      if (globalAudio) globalAudio.volume = next ? 0 : volumeRef.current;
      return next;
    });
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    volumeRef.current = v;
    if (globalAudio && !isMutedRef.current) globalAudio.volume = v;
  }, []);

  return (
    <AudioCtx.Provider value={{ isPlaying, isMuted, toggleMute, play, pause, volume, setVolume }}>
      {children}
    </AudioCtx.Provider>
  );
}
