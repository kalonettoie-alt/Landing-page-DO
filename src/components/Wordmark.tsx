export default function Wordmark({ size = 21 }: { size?: number }) {
  return (
    <span className="wordmark" style={{ fontSize: size }}>
      deltom <span className="wm-op">operator</span>
      <span className="wm-dot">.</span>
    </span>
  );
}
