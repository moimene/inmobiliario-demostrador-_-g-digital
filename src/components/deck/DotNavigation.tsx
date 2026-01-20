import { useDeck } from '@/contexts/DeckContext';
import { cn } from '@/lib/utils';

export const DotNavigation = () => {
  const { currentSlide, totalSlides, goToSlide } = useDeck();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-full bg-gdigital-navy/80 backdrop-blur-sm border border-gdigital-green/20">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300 ease-out",
            currentSlide === index
              ? "bg-gdigital-green scale-125 shadow-[0_0_12px_hsl(145_95%_52%/0.6)]"
              : "bg-gdigital-green/30 hover:bg-gdigital-green/60 hover:scale-110"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};
