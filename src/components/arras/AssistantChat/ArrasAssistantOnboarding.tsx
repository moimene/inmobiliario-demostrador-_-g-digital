import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PROFILES, DEPTHS } from "@/constants/arras-chat";
import { UserProfile, DepthLevel } from "@/types/chat-assistant";
import { CheckCircle2, HelpCircle, Sparkles } from "lucide-react";

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
    <div className="p-4 bg-gradient-to-b from-primary/5 to-background">
      <div className="flex items-center justify-center gap-3 mb-4">
        <HelpCircle className="h-7 w-7 text-primary" />
        <div className="text-center">
          <h2 className="text-lg font-bold">Asistente de Soporte</h2>
          <p className="text-xs text-muted-foreground">Canal de Arras GDigital</p>
        </div>
      </div>

      {step === 1 && (
        <Card className="border border-primary/20">
          <CardHeader className="py-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              ¿Cuál es tu perfil?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 py-2">
            {PROFILES.map((profile) => (
              <Button
                key={profile.value}
                variant="outline"
                className="w-full justify-start h-auto py-2 px-3 hover:border-primary hover:bg-primary/5"
                onClick={() => handleProfileSelect(profile.value)}
              >
                <div className="text-left">
                  <p className="font-medium text-sm">{profile.label}</p>
                  <p className="text-[10px] text-muted-foreground">{profile.description}</p>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="border border-primary/20">
          <CardHeader className="py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Nivel de detalle
              </CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                {PROFILES.find((p) => p.value === selectedProfile)?.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 py-2">
            {DEPTHS.map((depth) => (
              <Button
                key={depth.value}
                variant={selectedDepth === depth.value ? "default" : "outline"}
                className="w-full justify-start h-auto py-2 px-3"
                onClick={() => setSelectedDepth(depth.value)}
              >
                <div className="text-left">
                  <p className="font-medium text-sm">{depth.label}</p>
                  <p className={`text-[10px] ${selectedDepth === depth.value ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {depth.description}
                  </p>
                </div>
              </Button>
            ))}

            <Button
              className="w-full mt-4"
              size="sm"
              onClick={handleComplete}
            >
              Comenzar Chat
            </Button>

            <Button
              variant="ghost"
              size="sm"
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
