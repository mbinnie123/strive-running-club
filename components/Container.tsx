export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-4">
      <div className="relative z-10">{children}</div>
    </div>
  );
}