import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
} from "@/components/ui/animated-cards-stack";

const CREATORS = [
  {
    id: "creator-1",
    name: "Sarah Mitchell",
    profession: "Fashion Creator",
    description: "Built a thriving online store with 50K+ followers through ONDC platform. The seamless integration helped me scale my business effortlessly.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop",
  },
  {
    id: "creator-2",
    name: "Rajesh Kumar",
    profession: "Food Entrepreneur",
    description: "Started my cloud kitchen business with ONDC and reached customers across the city. The platform made everything simple and efficient.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
  },
  {
    id: "creator-3",
    name: "Priya Sharma",
    profession: "Handmade Crafts",
    description: "My handmade jewelry business found its perfect audience on ONDC. The tools provided helped me manage inventory and orders smoothly.",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop",
  },
  {
    id: "creator-4",
    name: "Michael Chen",
    profession: "Digital Products",
    description: "ONDC platform transformed how I sell digital courses and products. The analytics and payment integration are game-changers.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop",
  },
];

const CreatorsSection = () => {
  return (
    <section id="creators" className="relative py-20 px-6 overflow-hidden">
      {/* Matching hero background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200"></div>
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-pink-200 to-purple-300 rounded-full blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-200 to-cyan-200 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Success Stories from Our <span className="text-gradient">Creators</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real creators, real results. See how businesses are thriving on the ONDC platform
          </p>
        </div>

        <ContainerScroll className="container h-[300vh]">
          <div className="sticky left-0 top-0 h-svh w-full py-12">
            <CardsContainer className="mx-auto size-full h-[450px] w-[350px]">
              {CREATORS.map((creator, index) => (
                <CardTransformed
                  arrayLength={CREATORS.length}
                  key={creator.id}
                  variant="light"
                  index={index + 2}
                  role="article"
                  aria-labelledby={`card-${creator.id}-title`}
                  aria-describedby={`card-${creator.id}-content`}
                >
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="mx-auto w-4/5 text-base">
                      <blockquote cite="#">&quot;{creator.description}&quot;</blockquote>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="!size-12 border-2 border-white/20">
                      <AvatarImage
                        src={creator.avatarUrl}
                        alt={`Portrait of ${creator.name}`}
                      />
                      <AvatarFallback className="bg-white/20">
                        {creator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <span className="block text-lg font-semibold tracking-tight">
                        {creator.name}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {creator.profession}
                      </span>
                    </div>
                  </div>
                </CardTransformed>
              ))}
            </CardsContainer>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
};

export default CreatorsSection;
