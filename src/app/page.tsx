export default function Home() {
  const layers = Array.from({ length: 2 }, (_, i) => i + 1);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {layers.map((layerNum) => (
        <img
          key={layerNum}
          src={`/layers/Julia_Dreams_Sketchbook_2_[Large]-${layerNum}.png`}
          alt={`Layer ${layerNum}`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: layerNum }}
        />
      ))}

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white">
        <h1 className="text-6xl font-bold tracking-tight drop-shadow-lg">
          Drone Hackathon
        </h1>
        <p className="mt-4 text-xl drop-shadow-md">
          Innovation takes flight
        </p>
      </div>
    </main>
  );
}
