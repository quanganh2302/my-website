import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // AI & Computer Vision
  { name: "Python", level: 90, category: "AI" },
  { name: "OpenCV", level: 85, category: "AI" },
  { name: "NumPy", level: 85, category: "AI" },
  { name: "PyTorch", level: 75, category: "AI" },
  { name: "YOLO", level: 75, category: "AI" },

  // Windows Application
  { name: "C#", level: 90, category: "window" },
  { name: ".NET", level: 85, category: "window" },
  { name: "Winforms", level: 85, category: "window" },
  { name: "WPF", level: 80, category: "window" },
  { name: "MVVM Pattern", level: 75, category: "window" },
  { name: "SDK Integration", level: 85, category: "window" },

  // Web Development
  { name: "HTML/CSS", level: 95, category: "webdev" },
  { name: "JavaScript", level: 90, category: "webdev" },
  { name: "React", level: 90, category: "webdev" },
  { name: "TypeScript", level: 85, category: "webdev" },
  { name: "Next.js", level: 80, category: "webdev" },
  { name: "Tailwind", level: 90, category: "webdev" },
  { name: "REST API", level: 80, category: "webdev" },
  { name: "Node.js", level: 80, category: "webdev" },
  { name: "Express", level: 75, category: "webdev" },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 70, category: "tools" },
  { name: "Figma", level: 85, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Blender", level: 95, category: "tools" },

  // PLC & Industrial Automation
  { name: "PLC Programming", level: 80, category: "PLC" },
  { name: "Keyence PLC", level: 85, category: "PLC" },
  { name: "Keyence KV Studio", level: 80, category: "PLC" },
  { name: "Ethernet/IP", level: 75, category: "PLC" },
  { name: "Modbus TCP", level: 75, category: "PLC" },
  { name: "PLC–PC Communication", level: 80, category: "PLC" },
];

const categories = ["all", "AI", "window", "webdev", "tools", "PLC"];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [skillsPerPage, setSkillsPerPage] = useState(12);

  // Detect screen size và set skills per page
  useEffect(() => {
    const updateSkillsPerPage = () => {
      if (window.innerWidth < 640) {
        // Mobile (1 col)
        setSkillsPerPage(8);
      } else if (window.innerWidth < 1024) {
        // Tablet (3 cols)
        setSkillsPerPage(12);
      } else {
        // Desktop (4 cols)
        setSkillsPerPage(20);
      }
      setCurrentPage(1); // Reset về trang 1 khi resize
    };

    updateSkillsPerPage();
    window.addEventListener("resize", updateSkillsPerPage);
    return () => window.removeEventListener("resize", updateSkillsPerPage);
  }, [activeCategory]);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);
  const startIndex = (currentPage - 1) * skillsPerPage;
  const endIndex = startIndex + skillsPerPage;
  const currentSkills = filteredSkills.slice(startIndex, endIndex);

  // Reset trang khi đổi category
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize cursor-pointer",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bg-primary/30"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-8 rounded-lg shadow-xs card-hover flex items-center justify-between"
            >
              <div className="text-left ">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={cn(
                "px-4 py-2 rounded-lg transition-colors cursor-pointer",
                currentPage === 1
                  ? "bg-secondary/30 text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              Prev
            </button>

            <span className="text-sm text-muted-foreground">
              Page {currentPage} / {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={cn(
                "px-4 py-2 rounded-lg transition-colors cursor-pointer",
                currentPage === totalPages
                  ? "bg-secondary/30 text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
