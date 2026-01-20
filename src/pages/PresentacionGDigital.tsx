import React from 'react';
import { DeckProvider } from '@/contexts/DeckContext';
import { SlideContainer } from '@/components/deck/SlideContainer';
import { DotNavigation } from '@/components/deck/DotNavigation';
import { IntroSlide } from '@/components/deck/slides/IntroSlide';
import { AgendaSlide } from '@/components/deck/slides/AgendaSlide';
import { ProblemSlide } from '@/components/deck/slides/ProblemSlide';
import { SolutionSlide } from '@/components/deck/slides/SolutionSlide';
import { MetricsSlide } from '@/components/deck/slides/MetricsSlide';
import { CaseStudySlide } from '@/components/deck/slides/CaseStudySlide';
import { TeamSlide } from '@/components/deck/slides/TeamSlide';
import { RoadmapSlide } from '@/components/deck/slides/RoadmapSlide';
import { CTASlide } from '@/components/deck/slides/CTASlide';

const slides = [
  <IntroSlide key="intro" />,
  <AgendaSlide key="agenda" />,
  <ProblemSlide key="problem" />,
  <SolutionSlide key="solution" />,
  <MetricsSlide key="metrics" />,
  <CaseStudySlide key="casestudy" />,
  <TeamSlide key="team" />,
  <RoadmapSlide key="roadmap" />,
  <CTASlide key="cta" />,
];

const PresentacionGDigital: React.FC = () => {
  return (
    <DeckProvider totalSlides={slides.length}>
      <div className="w-full h-screen overflow-hidden">
        <SlideContainer>{slides}</SlideContainer>
        <DotNavigation />
      </div>
    </DeckProvider>
  );
};

export default PresentacionGDigital;
