import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  ReviewStars,
} from "@/components/ui/animated-cards-stack";
import { useTheme } from "next-themes";

const CREATORS = [
  {
    id: "creator-1",
    name: "Sarah Mitchell",
    profession: "Fashion Creator",
    rating: 5,
    description: "Built a thriving online store with 50K+ followers through ONDC platform. The seamless integration helped me scale my business effortlessly.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop",
  },
  {
    id: "creator-2",
    name: "Rajesh Kumar",
    profession: "Food Entrepreneur",
    rating: 4.5,
    description: "Started my cloud kitchen business with ONDC and reached customers across the city. The platform made everything simple and efficient.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
  },
  {
    id: "creator-3",
    name: "Priya Sharma",
    profession: "Handmade Crafts",
    rating: 5,
    description: "My handmade jewelry business found its perfect audience on ONDC. The tools provided helped me manage inventory and orders smoothly.",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop",
  },
  {
    id: "creator-4",
    name: "Michael Chen",
    profession: "Digital Products",
    rating: 4.5,
    description: "ONDC platform transformed how I sell digital courses and products. The analytics and payment integration are game-changers.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop",
  },
];

function getSectionClass(theme: string | undefined) {
  return theme === "dark"
    ? "bg-destructive text-secondary px-8 py-12"
    : "bg-accent px-8 py-12"
}

function getReviewStarsClass(theme: string | undefined) {
  return theme === "dark" ? "text-primary" : "text-teal-500"
}

function getTextClass(theme: string | undefined) {
  return theme === "dark" ? "text-primary-foreground" : ""
}

function getAvatarClass(theme: string | undefined) {
  return theme === "dark"
    ? "!size-12 border border-stone-700"
    : "!size-12 border border-stone-300"
}

function getCardVariant(theme: string | undefined) {
  return theme === "dark" ? "dark" : "light"
}

const CreatorsSection = () => {
  const { theme } = useTheme();

  return (
    <section id="creators" className={getSectionClass(theme)} style={{ scrollMarginTop: '4rem' }}>
      <div className="relative z-10">
        <h3 className="text-center text-4xl font-bold mb-6 !text-foreground">
          Success Stories from Our Creators
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm text-muted-foreground">
          Real creators, real results. See how businesses are thriving on the ONDC platform
        </p>
      </div>
      <ContainerScroll className="container h-[300vh] ">
        <div className="sticky left-0 top-0 h-svh w-full py-12">
          <CardsContainer className="mx-auto size-full h-[450px] w-[350px]">
            {CREATORS.map((creator, index) => (
              <CardTransformed
                arrayLength={CREATORS.length}
                key={creator.id}
                variant={getCardVariant(theme)}
                index={index + 2}
                role="article"
                aria-labelledby={`card-${creator.id}-title`}
                aria-describedby={`card-${creator.id}-content`}
              >
                <div className="flex flex-col items-center space-y-4 text-center">
                  <ReviewStars
                    className={getReviewStarsClass(theme)}
                    rating={creator.rating}
                  />
                  <div className={`mx-auto w-4/5 text-lg ${getTextClass(theme)}`}>
                    <blockquote cite="#">{creator.description}</blockquote>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className={getAvatarClass(theme)}>
                    <AvatarImage
                      src={creator.avatarUrl}
                      alt={`Portrait of ${creator.name}`}
                    />
                    <AvatarFallback>
                      {creator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="block text-lg font-semibold tracking-tight md:text-xl">
                      {creator.name}
                    </span>
                    <span className="block text-sm text-muted-foreground ">
                      {creator.profession}
                    </span>
                  </div>
                </div>
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
    </section>
  );
};

export default CreatorsSection;
