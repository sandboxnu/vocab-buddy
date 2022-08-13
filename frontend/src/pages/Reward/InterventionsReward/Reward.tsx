import React from 'react';
import RewardPage from './RewardPage';

function Reward() {
  const r = Math.random();
  return <RewardPage randSeed={r} maxBalloon={5} delay={2000} />;
}

export default Reward;
