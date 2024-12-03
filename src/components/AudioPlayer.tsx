"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const AudioPlayer = ({ url = "https://example.com/audio.mp3" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    return () => {
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("timeupdate", () => {});
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full p-4">
      <audio ref={audioRef} src={url} />

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>

      <div className="space-y-2">
        <input
          type="range"
          value={currentTime}
          min="0"
          max={duration}
          onChange={handleTimeChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />

        <div className="flex justify-between text-sm text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
