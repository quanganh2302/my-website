import {
  AppWindow,
  Brain,
  Briefcase,
  Code,
  Computer,
  User,
} from "lucide-react";
import React from "react";
import resumePDF from "@/assets/resume/Doan_Quang_Anh_Developer.pdf";
const AboutMe = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary ">Me</span>
        </h2>

        <div className="grid gird-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary">
              ALWAYS WORKING WITH ACCURACY AND TRANSPARENCY
            </h3>
            <p className="text-muted-foreground text-left">
              From 2024 onward, I have worked on developing C#/.NET Windows
              applications and Python solutions in automation system,
              measurement systems and computer vision projects.
            </p>
            <p className="text-muted-foreground text-left">
              From 2022 to 2023, I designed and developed front-end websites
              using ReactJS, JavaScript, working with REST APIs and building
              responsive interfaces.
            </p>

            <p className="text-muted-foreground text-left">
              I started my career as an electrical engineer, then gradually
              moved into programming through my interest in technology and
              real-world experience. Now, I am pursuing a Master’s degree in
              Computer Science to seriously invest in this career path.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Contact Me
              </a>
              <a
                href={resumePDF}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-center"
              >
                My Resume
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Brain className="text-primary h-6 w-6" />
                </div>
                <div className="text-left">
                  <h4 className="text-semibold text-lg font-semibold">
                    AI & Computer Visiont
                  </h4>
                  <p className="text-muted-foreground">
                    Working with Python to build computer vision and image
                    processing solutions.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <AppWindow className="text-primary h-6 w-6" />
                </div>
                <div className="text-left">
                  <h4 className="text-semibold text-lg font-semibold">
                    Desktop Development (.NET, C#)
                  </h4>
                  <p className="text-muted-foreground">
                    Creating .NET/C# desktop applications for measurement and
                    automated control.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="text-primary h-6 w-6" />
                </div>
                <div className="text-left">
                  <h4 className="text-semibold text-lg font-semibold">
                    Web Development
                  </h4>
                  <p className="text-muted-foreground">
                    Creating responsive and user-friendly websites with modern
                    technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
