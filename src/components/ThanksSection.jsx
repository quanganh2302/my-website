import { ArrowUp } from "lucide-react";
import React from "react";

const ThanksSection = () => {
  return (
    <section className="py-2 px-4 ">
      <div className="container mx-auto max-w-5xl flex justify-between gap-80">
        <a
          href="#hero"
          className="p-4 rounded-full border-4 border-primary/10 hover:bg-primary/20 text-primary transition-colors"
        >
          <ArrowUp size={40} />
        </a>
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          {" "}
          THANKS
        </h2>
      </div>
    </section>
  );
};

export default ThanksSection;
