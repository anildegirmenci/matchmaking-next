"use client"
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/Card";
import { Users } from "lucide-react";

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
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-3xl">
              <Users className="w-6 h-6" />
              5v5 Team Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-special font-semibold">Team 1 Players</h3>
                {names.slice(0, 5).map((name, index) => (
                  <div key={index} className="relative">
                    <Input
                      value={name}
                      onChange={(e) => handleChange(index, e.target.value)}
                      placeholder={`Player ${index + 1}`}
                      className="pl-8"
                    />
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-special font-semibold">Team 2 Players</h3>
                {names.slice(5, 10).map((name, index) => (
                  <div key={index + 5} className="relative">
                    <Input
                      value={name}
                      onChange={(e) => handleChange(index + 5, e.target.value)}
                      placeholder={`Player ${index + 6}`}
                      className="pl-8"
                    />
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      {index + 6}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-destructive mt-4 text-center font-special">{error}</p>
            )}

            <Button
              onClick={generateTeams}
              className="w-full mt-6"
              size="lg"
            >
              Generate Teams
            </Button>

            {team1.length > 0 && (
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                <Card className="bg-primary/10 border-primary/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-primary">
                      Team Blue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 font-special">
                      {team1.map((player, index) => (
                        <li key={index} className="flex items-center gap-2 text-foreground">
                          <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
                            {index + 1}
                          </span>
                          {player}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-destructive/10 border-destructive/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-destructive">
                      Team Red
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 font-special">
                      {team2.map((player, index) => (
                        <li key={index} className="flex items-center gap-2 text-foreground">
                          <span className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center text-sm font-medium text-destructive">
                            {index + 1}
                          </span>
                          {player}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}