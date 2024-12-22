import React from 'react';
import { usePlayerGame } from './usePlayerGame';
import GameMap from './GameMap';
import AnswerControls from './AnswerControls';
import QuestionCard from '../QuestionCard';
import type { Question } from '../../types';

interface PlayerViewProps {
  gameId: string;
  playerId: string;
  question: Question;
  questionNumber: number;
  hasAnswered: boolean;
  gameStatus: 'waiting' | 'playing' | 'revealing' | 'finished';
}

export default function PlayerView({
  gameId,
  playerId,
  question,
  questionNumber,
  hasAnswered: initialHasAnswered,
  gameStatus
}: PlayerViewProps) {
  const {
    selectedLocation,
    isSubmitting,
    error,
    hasAnswered,
    markers,
    mapRef,
    mapKey,
    handleMapClick,
    handleSubmit
  } = usePlayerGame({
    gameId,
    playerId,
    question,
    questionNumber,
    initialHasAnswered,
    gameStatus
  });

  return (
    <div className="min-h-screen flex flex-col max-w-3xl mx-auto px-4">
      <div className="flex-none py-4">
        <QuestionCard 
          question={question} 
          questionNumber={questionNumber}
        />
      </div>
      
      <div className="flex-1 min-h-0 rounded-xl overflow-hidden shadow-lg mb-4">
        <GameMap
          ref={mapRef}
          mapKey={mapKey}
          markers={markers}
          onMapClick={gameStatus === 'playing' && !hasAnswered ? handleMapClick : undefined}
          showLabels={gameStatus === 'revealing'}
          showMarkerLabels={gameStatus === 'revealing'}
          interactive={!isSubmitting}
        />
      </div>

      <div className="flex-none py-4">
        <AnswerControls
          error={error}
          gameStatus={gameStatus}
          hasAnswered={hasAnswered}
          isSubmitting={isSubmitting}
          selectedLocation={selectedLocation}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}