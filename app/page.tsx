"use client"
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";

export default function Home() {
  const [names, setNames] = useState<string[]>(Array(10).fill(""));
  const [team1, setTeam1] = useState<string[]>([]);
  const [team2, setTeam2] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleChange = (index: number, value: string) => {
    const updatedNames = [...names];
    updatedNames[index] = value;
    setNames(updatedNames);
  };

  const generateTeams = () => {
    const filledNames = names.filter((name) => name.trim() !== "");
    if (filledNames.length !== 10) {
      setError("Please enter exactly 10 names.");
      return;
    }

    setError("");
    const shuffledNames = [...filledNames].sort(() => Math.random() - 0.5);
    setTeam1(shuffledNames.slice(0, 5));
    setTeam2(shuffledNames.slice(5, 10));
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        {/* <h1 className="text-2xl font-bold mb-4">5v5 Random Team Generator</h1> */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {names.map((name, index) => (
            <input
              key={index}
              type="text"
              value={name}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Player ${index + 1}`}
              className="p-2 rounded bg-tertiary text-white placeholder-gray-300 text-center"
            />
          ))}
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <button
          onClick={generateTeams}
          className="mt-4 p-3 bg-white text-black rounded-lg hover:scale-105 transition-all"
        >
          Generate Teams
        </button>
        {team1.length > 0 && (
          <div className="mt-6 w-full max-w-md">
            <h2 className="text-xl font-bold">Teams</h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-black p-4 rounded-lg">
                <h3 className="text-lg font-bold text-blue-400">Team 1</h3>
                <ul>
                  {team1.map((player, index) => (
                    <li key={index} className="mt-1">{player}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-black p-4 rounded-lg">
                <h3 className="text-lg font-bold text-red-400">Team 2</h3>
                <ul>
                  {team2.map((player, index) => (
                    <li key={index} className="mt-1">{player}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}