// =============================================
// PORTFOLIO DATA — Fahim Yusuf
// =============================================

export const personalInfo = {
  name: "Fahim Yusuf",
  title: "Software Engineer",
  subtitle: "AI/ML Researcher & Full-Stack Developer",
  email: "fahim.yusuf06@gmail.com",
  avatarUrl: "https://avatars.githubusercontent.com/u/68291728?v=4",
  bio: `Hello! I'm Fahim Yusuf a Software Engineer with a deep passion for Artificial Intelligence, Machine Learning, and Full-Stack Development. With an M.Sc. in Computer Science & Engineering from Jahangirnagar University, my work sits at the intersection of cutting-edge research and real-world impact.

I've architected deep learning systems that achieve state-of-the-art accuracy from 99.85% citrus genus classification using MobileNet & Inception V3, to brain tumor detection at 95.21% accuracy with VGG-16. Beyond research, I build scalable web applications using React, Django, and modern cloud infrastructure.

Whether it's training neural networks, designing RESTful APIs, or crafting pixel-perfect UIs, I bring the same level of dedication and curiosity to every challenge. Explore my projects, or reach out. I'm always open to meaningful collaborations.`,
  location: "Dhaka, Bangladesh",
};

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/fahim06", icon: "github", description: "Code & Open Source" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/fahim06/", icon: "linkedin", description: "Professional Network" },
  { name: "Behance", url: "https://www.behance.net/fahimyusufstudio", icon: "behance", description: "Design Portfolio" },
  { name: "Dribbble", url: "https://dribbble.com/fahim-yusuf", icon: "dribbble", description: "UI/UX & Visual Work" },
  { name: "Upwork", url: "https://www.upwork.com/freelancers/~01f658a35fde39968a?mp_source=share", icon: "upwork", description: "Freelance Services" },
  { name: "X", url: "https://x.com/fahim1206", icon: "x", description: "Updates & Insights" },
];

export const education = [
  {
    degree: "M.Sc. in Computer Science & Engineering",
    school: "Jahangirnagar University",
    location: "Dhaka, Bangladesh",
    period: "2023 – 2025",
    description: "Advanced studies in machine learning, deep learning, and computer vision.",
    highlights: [
      "Thesis: Optimizing Citrus Genus Identification using MobileNet and Inception V3",
      "Achieved 99.85% accuracy in citrus classification using deep learning",
      "Research focus on CNN architectures and transfer learning techniques",
    ],
    color: "#6366f1",
  },
  {
    degree: "B.Sc. in Computer Science & Engineering",
    school: "Daffodil International University",
    location: "Dhaka, Bangladesh",
    period: "2018 – 2022",
    description: "Comprehensive foundation in computer science, software engineering, and AI.",
    highlights: [
      "Thesis: Brain Tumor Identification using Deep Learning (VGG-16 achieved 95.21% accuracy)",
      "Studied algorithms, data structures, database systems, and machine learning",
      "Developed multiple software projects including web applications and mobile apps",
    ],
    color: "#8b5cf6",
  },
];

export const skills = {
  Languages: [
    { name: "Python", level: 95 },
    { name: "JavaScript", level: 88 },
    { name: "Java", level: 75 },
    { name: "PHP", level: 70 },
    { name: "C", level: 72 },
    { name: "SQL", level: 85 },
    { name: "HTML/CSS", level: 92 },
  ],
  "Frameworks & ML": [
    { name: "React", level: 88 },
    { name: "Django", level: 85 },
    { name: "Django REST Framework", level: 83 },
    { name: "PyTorch", level: 82 },
    { name: "TensorFlow", level: 80 },
    { name: "Keras", level: 82 },
    { name: "Scikit-learn", level: 85 },
    { name: "Bootstrap", level: 88 },
  ],
  Databases: [
    { name: "PostgreSQL", level: 82 },
    { name: "MySQL", level: 80 },
    { name: "SQLite", level: 85 },
  ],
  "Tools & Platforms": [
    { name: "Git / GitHub Actions", level: 88 },
    { name: "Docker", level: 72 },
    { name: "VS Code", level: 95 },
    { name: "Jupyter Notebook", level: 90 },
    { name: "Vercel", level: 80 },
    { name: "OpenCV", level: 80 },
  ],
};

export const services = [
  {
    icon: "🌐",
    title: "Web Applications",
    description: "Building modern, responsive full-stack web applications using React and Django with clean APIs and seamless user experiences.",
    color: "#6366f1",
  },
  {
    icon: "🧠",
    title: "AI / ML Solutions",
    description: "Designing and training deep learning models for image classification, object detection, NLP, and predictive analytics using PyTorch and TensorFlow.",
    color: "#8b5cf6",
  },
  {
    icon: "🔬",
    title: "Research & Development",
    description: "Conducting applied ML research with publication-quality results — from architecture benchmarking to novel model optimization techniques.",
    color: "#06b6d4",
  },
  {
    icon: "🌱",
    title: "Open-Source Contribution",
    description: "Actively contributing to the developer community through open-source projects, tools, and sharing knowledge through code.",
    color: "#10b981",
  },
  {
    icon: "⚡",
    title: "REST API Development",
    description: "Architecting robust, scalable RESTful APIs with Django REST Framework, with proper auth, documentation, and testing.",
    color: "#f59e0b",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Crafting visually compelling, accessible interfaces with attention to typography, color theory, and micro-interactions.",
    color: "#ec4899",
  },
];

export const projects = [
  {
    name: "NeuroLens",
    description: "My first Machine Learning project featuring a GUI. It is a large-scale project currently under active development, focusing on leveraging neural networks for advanced image processing and visual analytics, providing an intuitive interface for complex machine learning tasks.",
    language: "Python / GUI",
    tags: ["Machine Learning", "GUI", "Under Development"],
    githubUrl: "https://github.com/fahim06/NeuroLens",
    liveUrl: null,
    badge: "Top Flagship Project",
    stars: 1,
    color: "#06b6d4",
  },
  {
    name: "Student Management System",
    description: "Comprehensive student management system designed for educational institutions. It features full CRUD operations, detailed academic reporting, secure user authentication, and a clean, responsive dashboard interface for administrators and teachers to easily manage student records.",
    language: "HTML",
    tags: ["Web App", "CRUD", "Management"],
    githubUrl: "https://github.com/fahim06/student_management_system",
    liveUrl: null,
    badge: "Top Project",
    stars: 1,
    color: "#f59e0b",
  },
  {
    name: "Brain Tumor Detection",
    description: "An automated brain tumor identification system utilizing deep learning and Convolutional Neural Networks (VGG-16 architecture). Developed as my B.Sc. thesis project, this model successfully achieved 95.21% classification accuracy on a diverse dataset of MRI scans.",
    language: "Jupyter Notebook",
    tags: ["Deep Learning", "Medical AI", "TensorFlow"],
    githubUrl: "https://github.com/fahim06/Brain_Tumor",
    liveUrl: null,
    stars: 1,
    color: "#8b5cf6",
  },
  {
    name: "Citrus Genus Classification",
    description: "Advanced deep learning model designed for precise citrus genus identification. Built using transfer learning with MobileNet and Inception V3 architectures, this thesis research project achieved an outstanding 99.85% classification accuracy across multiple citrus species.",
    language: "Jupyter Notebook",
    tags: ["Deep Learning", "CNN", "PyTorch"],
    githubUrl: "https://github.com/fahim06/Citrus_Classification",
    liveUrl: null,
    stars: 1,
    color: "#10b981",
  },
  {
    name: "FocusFlow",
    description: "FocusFlow is an innovative, AI-powered study and productivity application. It provides adaptive study planning with personalized, energy-based AI recommendations, intelligent task scheduling, and detailed analytics to help students maintain peak cognitive performance throughout the day.",
    language: "HTML/JS",
    tags: ["AI", "React", "Study App"],
    githubUrl: "https://github.com/fahim06/focusflow",
    liveUrl: "https://focusflow-project-aidf.vercel.app/",
    stars: 0,
    color: "#6366f1",
  },
  {
    name: "ChatBot",
    description: "An intelligent conversational agent built from scratch using Python. It is designed to process complex natural language inputs, parse user intent, and automate contextual responses, serving as a versatile framework for automated customer support and interactive assistance.",
    language: "Python",
    tags: ["NLP", "AI", "Bot"],
    githubUrl: "https://github.com/fahim06/ChatBot",
    liveUrl: null,
    stars: 0,
    color: "#a855f7",
  },
  {
    name: "Task Manager",
    description: "A robust and productivity-focused task management utility designed to help users organize complex workflows, track daily goals, and prioritize their workload effectively. It features a streamlined interface for maximum efficiency and seamless daily planning.",
    language: "Python",
    tags: ["Productivity", "Utility", "CLI"],
    githubUrl: "https://github.com/fahim06/Task-Manager",
    liveUrl: null,
    stars: 0,
    color: "#14b8a6",
  },
  {
    name: "Animated Login Page",
    description: "A visually stunning, meticulously animated login page interface. It showcases modern web design trends including deep glassmorphism effects, smooth state transitions, hover micro-interactions, and fluid CSS animations to deliver a premium user onboarding experience.",
    language: "CSS",
    tags: ["UI/UX", "CSS Animations", "Glassmorphism"],
    githubUrl: "https://github.com/fahim06/AnimatedLoginPage",
    liveUrl: null,
    stars: 1,
    color: "#ec4899",
  },
  {
    name: "KZ EDX Pro 2 Type-C Landing Page",
    description: "A vibrant, highly interactive, and completely dependency-free promotional landing page built for the KZ EDX Pro 2 Type-C earphones. It utilizes vanilla HTML, CSS, and JS to deliver lightning-fast performance, scroll-triggered animations, and a responsive layout.",
    language: "CSS/JS",
    tags: ["Landing Page", "Vanilla JS", "Responsive"],
    githubUrl: "https://github.com/fahim06/landing-page-chatgpt",
    liveUrl: "https://landing-page-chatgpt.vercel.app",
    stars: 0,
    color: "#3b82f6",
  },
  {
    name: "reunion-poster-generator",
    description: "A dynamic web application built with React and TypeScript that allows organizers to quickly generate, customize, and export high-quality digital posters for alumni and family reunions. It features real-time text updates and customizable aesthetic templates.",
    language: "TypeScript",
    tags: ["React", "TypeScript", "Generator"],
    githubUrl: "https://github.com/fahim06/reunion-poster-generator",
    liveUrl: "https://reunion-poster-generator.vercel.app",
    stars: 0,
    color: "#f43f5e",
  }
];

export const stats = [
  { value: "99.85%", label: "Best Model Accuracy" },
  { value: "2", label: "Thesis Projects" },
  { value: "10+", label: "GitHub Repositories" },
  { value: "5+", label: "Years Coding" },
];
