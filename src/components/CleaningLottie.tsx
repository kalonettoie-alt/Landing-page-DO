import Lottie from 'lottie-react';
import cleaning from '../assets/cleaning.json';

export default function CleaningLottie({ size = 150 }: { size?: number }) {
  return (
    <Lottie
      animationData={cleaning}
      loop
      autoplay
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
