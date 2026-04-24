export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  level: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  image: string;
  features: string[];
  createdAt: string;
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    shortDescription:
      "Master web development with HTML, CSS, JavaScript, React, and Node.js",
    fullDescription:
      "This comprehensive bootcamp covers everything you need to become a full-stack web developer. From the basics of HTML and CSS to advanced React patterns and Node.js backend development, you'll build real-world projects and gain practical skills that employers are looking for.",
    price: 99.99,
    category: "Web Development",
    level: "Beginner",
    instructor: "Dr. Angela Yu",
    rating: 4.8,
    students: 15420,
    duration: "52 hours",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
    features: [
      "Build 15+ real-world projects",
      "Learn HTML5, CSS3, JavaScript ES6+",
      "Master React and Node.js",
      "Database design with MongoDB",
      "Deploy applications to production",
      "Lifetime access to course materials",
    ],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Advanced Python Programming",
    shortDescription:
      "Deep dive into Python with advanced concepts, OOP, and data structures",
    fullDescription:
      "Take your Python skills to the next level with this advanced course. Learn object-oriented programming, design patterns, data structures, algorithms, and how to write clean, maintainable code. Perfect for intermediate developers looking to level up.",
    price: 79.99,
    category: "Programming",
    level: "Advanced",
    instructor: "Jose Portilla",
    rating: 4.9,
    students: 12350,
    duration: "38 hours",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop",
    features: [
      "Advanced OOP concepts",
      "Design patterns and best practices",
      "Data structures and algorithms",
      "Testing and debugging techniques",
      "Performance optimization",
      "Real-world project included",
    ],
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass",
    shortDescription: "Learn user interface and experience design from scratch",
    fullDescription:
      "Become a skilled UI/UX designer with this comprehensive course. Learn the principles of great design, user research methods, wireframing, prototyping, and how to use industry-standard tools like Figma and Adobe XD.",
    price: 89.99,
    category: "Design",
    level: "Intermediate",
    instructor: "Sarah Johnson",
    rating: 4.7,
    students: 8920,
    duration: "28 hours",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
    features: [
      "User research and personas",
      "Wireframing and prototyping",
      "Visual design principles",
      "Figma and Adobe XD mastery",
      "Design systems and components",
      "Portfolio-ready projects",
    ],
    createdAt: "2024-01-20",
  },
  {
    id: "4",
    title: "Data Science with Machine Learning",
    shortDescription:
      "Master data analysis, visualization, and machine learning algorithms",
    fullDescription:
      "Dive into the world of data science and machine learning. Learn how to analyze data, create visualizations, build predictive models, and deploy machine learning solutions. Uses Python, pandas, scikit-learn, and TensorFlow.",
    price: 119.99,
    category: "Data Science",
    level: "Intermediate",
    instructor: "Andrew Ng",
    rating: 4.9,
    students: 24500,
    duration: "65 hours",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    features: [
      "Data analysis with pandas",
      "Machine learning algorithms",
      "Deep learning with TensorFlow",
      "Real-world datasets",
      "Model deployment techniques",
      "Certificate of completion",
    ],
    createdAt: "2024-01-10",
  },
  {
    id: "5",
    title: "Mobile App Development with React Native",
    shortDescription: "Build cross-platform mobile apps for iOS and Android",
    fullDescription:
      "Learn to build native mobile applications using React Native. Create apps that work on both iOS and Android from a single codebase. Covers navigation, state management, APIs, and publishing to app stores.",
    price: 94.99,
    category: "Mobile Development",
    level: "Intermediate",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.6,
    students: 11200,
    duration: "42 hours",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
    features: [
      "React Native fundamentals",
      "Navigation and routing",
      "State management with Redux",
      "API integration",
      "Push notifications",
      "App store deployment",
    ],
    createdAt: "2024-02-05",
  },
  {
    id: "6",
    title: "Digital Marketing Essentials",
    shortDescription:
      "Complete guide to SEO, social media, and content marketing",
    fullDescription:
      "Master digital marketing strategies that drive real results. Learn SEO, social media marketing, content marketing, email campaigns, and analytics. Perfect for marketers, entrepreneurs, and business owners.",
    price: 69.99,
    category: "Marketing",
    level: "Beginner",
    instructor: "Neil Patel",
    rating: 4.5,
    students: 9800,
    duration: "24 hours",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    features: [
      "SEO fundamentals",
      "Social media strategies",
      "Content marketing",
      "Email marketing campaigns",
      "Google Analytics",
      "Practical marketing plan",
    ],
    createdAt: "2024-01-25",
  },
  {
    id: "7",
    title: "Cloud Computing with AWS",
    shortDescription:
      "Learn Amazon Web Services from basics to advanced deployment",
    fullDescription:
      "Become proficient in Amazon Web Services. Learn to deploy, manage, and scale applications in the cloud. Covers EC2, S3, Lambda, databases, security, and more. Prepare for AWS certification.",
    price: 109.99,
    category: "Cloud Computing",
    level: "Intermediate",
    instructor: "Stephane Maarek",
    rating: 4.8,
    students: 18700,
    duration: "48 hours",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    features: [
      "AWS core services",
      "EC2 and load balancing",
      "S3 and CloudFront",
      "Serverless with Lambda",
      "Security best practices",
      "Exam preparation included",
    ],
    createdAt: "2024-02-10",
  },
  {
    id: "8",
    title: "Blockchain and Cryptocurrency Development",
    shortDescription: "Build decentralized applications and smart contracts",
    fullDescription:
      "Enter the world of blockchain development. Learn how blockchain works, create smart contracts with Solidity, and build decentralized applications (dApps). Covers Ethereum, Web3.js, and cryptocurrency fundamentals.",
    price: 129.99,
    category: "Blockchain",
    level: "Advanced",
    instructor: "Ivan on Tech",
    rating: 4.7,
    students: 7650,
    duration: "36 hours",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop",
    features: [
      "Blockchain fundamentals",
      "Smart contract development",
      "Solidity programming",
      "dApp creation",
      "Web3.js integration",
      "NFT marketplace project",
    ],
    createdAt: "2024-01-30",
  },
];
