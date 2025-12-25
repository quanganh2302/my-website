import React, { useState, useEffect } from "react";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Point Data Acquisition & Processing",
    description:
      "C# desktop application that collects point-by-point data from the high-precision measurement sensor and stitches it into a large dataset, with basic data processing for stable high-speed measurements.",
    image: "/projects/PSA.gif",
    tags: ["C#", "WPF", "UX/UI", "Python", "Pytorch", "OpenCV"],
    demoUrl: "#",
    githubUrl: "https://github.com/quanganh2302/Point_Scanner_Precitec_WPF",
  },
  {
    id: 2,
    title: "Point Data Acquisition & Stitching",
    description:
      "C# desktop application that collects point-by-point data from the high-precision measurement sensor and stitches it into a large dataset, with basic data processing for stable high-speed measurements.",
    image: "/projects/PointScanner.gif",
    tags: ["C#", "Winforms", "PLC", "Real-time Preview", "Data Processing"],
    demoUrl: "https://www.youtube.com/watch?v=tpXjvLFscr4",
    githubUrl:
      "https://github.com/quanganh2302/Point_Scanner_Precitec_Winforms",
  },
  {
    id: 3,
    title: "Flying Spot Scanning Application",
    description:
      "C# desktop application for a high-precision surface measurement sensor, designed to acquire continuous scan data and build complete surface datasets with efficient data handling for high-speed measurements.",
    image: "/projects/FSS.gif",
    tags: [
      "C#",
      ".NET",
      "Winforms",
      "PLC",
      "Real-time Preview",
      "Data Processing",
    ],
    demoUrl: "https://www.youtube.com/watch?v=bVY6WFHX_78",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Leak Test Application",
    description:
      "C# WinForms application for automated water leakage detection, integrating industrial communication and SQL-based data storage to monitor.",
    image: "/projects/leak_test.png",
    tags: ["C#", "Winforms", ".NET", "SQL", "Industrial Communication", "PLC"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "My 3D Portfolio Website",
    description:
      "A personal website that integrates Three.js to enhance user experience by enabling interactive control 3D models directly in the web environment.",
    image: "/projects/pallettown.png",
    tags: ["React", "Threejs", "TailwindCSS", "Blender"],
    demoUrl: "/",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Education Center Manager",
    description:
      "Management app for education Center with authentication, role-based access, and a real-time dashboard tracking active students and revenue.",
    image: "/projects/ClassManager.png",
    tags: ["Next.js", "TypeScript", "Prisma", "Cleark", "cloudinary", "Docker"],
    demoUrl: "#",
    githubUrl: "https://github.com/quanganh2302/Shoes-shop-home",
  },
  {
    id: 7,
    title: "Repeat Point Measurement",
    description:
      "High-precision vision system for object detection, and repeatability measurement using OpenCV.",
    image: "/projects/Ruler.gif",
    tags: ["C++", "C#", "WPF", "Opencv", "MVVM"],
    demoUrl: "#",
    githubUrl:
      "https://github.com/quanganh2302/Repeated_Point_Measurement-Camera_Ruler_3000",
  },
  {
    id: 8,
    title: "E-commerce Platform",
    description:
      "Full-featured e-commerce platform with user authentication and database product.",
    image: "/projects/WondersShop.gif",
    tags: ["React", "Node.js", "TailwindCSS", "MySQL Database", "Express"],
    demoUrl: "#",
    githubUrl: "https://github.com/quanganh2302/Shoes-shop-home",
  },
  {
    id: 9,
    title: "TSA Website clone",
    description:
      "Full-featured clone of the Hanoi University of Science and Technology’s TSA competency assessment website.",
    image: "/projects/tsa_clone.gif",
    tags: ["React", "HTML", "CSS", "Ant design", "Javascript", "FireBase"],
    demoUrl: "#",
    githubUrl: "https://github.com/quanganh2302/tsa-test",
  },
  {
    id: 10,
    title: "Control Motor App",
    description:
      "Applications integrating optical measurement sensors to control corresponding motor axes..",
    image: "/projects/controlaxes.png",
    tags: ["C#", "Winforms", "PLC", "Material UI"],
    demoUrl: "https://www.youtube.com/watch?v=3qMprX11c4k",
    githubUrl: "https://github.com/quanganh2302/Motor_Control_4_Axis",
  },
];

const ProjectSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6; // Hiển thị 6 projects mỗi trang

  // Tính toán phân trang
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Every project is meaningful and require a lot of effort to reach the
          goals, Regardless of which goals you are looking to meet, I can work
          with you to reach them. Below you can see some of the project I've
          worked in and see my skills set. I hope you enjoy them:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-lg overflow-hidden shadow-xs hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                currentPage === 1
                  ? "bg-secondary/30 text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
              }`}
            >
              Prev
            </button>

            <span className="text-sm text-muted-foreground font-medium">
              Page {currentPage} / {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                currentPage === totalPages
                  ? "bg-secondary/30 text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
              }`}
            >
              Next
            </button>
          </div>
        )}

        <div className="text-center mt-12">
          <a
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/quanganh2302"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
