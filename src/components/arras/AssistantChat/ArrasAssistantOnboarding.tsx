import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PROFILES, DEPTHS } from "@/constants/arras-chat";
import { UserProfile, DepthLevel } from "@/types/chat-assistant";
import { CheckCircle2, Scale, Sparkles } from "lucide-react";
import eidasIcon from "@/assets/eidas-icon.png";

interface Props {
  onComplete: (profile: UserProfile, depth: DepthLevel) => void;
}

export const ArrasAssistantOnboarding = ({ onComplete }: Props) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [selectedDepth, setSelectedDepth] = useState<DepthLevel>("intermediate");

  const handleProfileSelect = (profile: UserProfile) => {
    setSelectedProfile(profile);
    setStep(2);
  };

  const handleComplete = () => {
    if (selectedProfile) {
      onComplete(selectedProfile, selectedDepth);
    }
  };

  return (
    <div className="h-full flex flex-col p-4 bg-gradient-to-b from-primary/5 to-background">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Scale className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-xl font-bold">Asistente Legal de Arras</h2>
          <p className="text-sm text-muted-foreground">Experto en contratos inmobiliarios</p>
        </div>
        <img src={eidasIcon} alt="eIDAS" className="h-10" />
      </div>

      {step === 1 && (
        <Card className="flex-1 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              ¿Cuál es tu perfil?
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Adaptaré mis respuestas a tus necesidades
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {PROFILES.map((profile) => (
              <Button
                key={profile.value}
                variant="outline"
                className="w-full justify-start h-auto py-3 px-4 hover:border-primary hover:bg-primary/5"
                onClick={() => handleProfileSelect(profile.value)}
              >
                <div className="text-left">
                  <p className="font-medium">{profile.label}</p>
                  <p className="text-xs text-muted-foreground">{profile.description}</p>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="flex-1 border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Nivel de detalle
              </CardTitle>
              <Badge variant="secondary">
                {PROFILES.find((p) => p.value === selectedProfile)?.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              ¿Qué tan técnicas quieres las respuestas?
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {DEPTHS.map((depth) => (
              <Button
                key={depth.value}
                variant={selectedDepth === depth.value ? "default" : "outline"}
                className="w-full justify-start h-auto py-3 px-4"
                onClick={() => setSelectedDepth(depth.value)}
              >
                <div className="text-left">
                  <p className="font-medium">{depth.label}</p>
                  <p className={`text-xs ${selectedDepth === depth.value ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {depth.description}
                  </p>
                </div>
              </Button>
            ))}

            <Button
              className="w-full mt-6"
              size="lg"
              onClick={handleComplete}
            >
              Comenzar Chat
            </Button>

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setStep(1)}
            >
              ← Cambiar perfil
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
