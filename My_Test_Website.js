import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Chart from 'chart.js/auto'; // Import Chart.js

// Chosen Palette: Calm Harmony
// Main Background: #F8F8F8 (Warm Neutral Light Gray)
// Primary Text: #333333 (Dark Gray)
// Secondary Text/Subtle Accents: #666666 (Medium Gray)
// Accent Color (Subtle): #007BFF (Soft Blue for links/highlights)
// Complementary Colors: #E0E0E0 (Lighter Gray for borders/dividers), #F0F0F0 (Even Lighter Gray for section backgrounds)

// Application Structure Plan:
// The application is structured as a multi-page application using Next.js routing. This allows for clear, distinct sections for Home, About Me, Projects, Blog, and Contact Me, which is intuitive for users exploring a portfolio.
// - Home: Welcoming entry point, brief overview. (SSG)
// - About Me: Detailed CV, skills, experience. (SSG)
// - Projects: Listing of projects with clickable cards leading to individual project detail pages. (SSG for list and individual pages)
// - Blog: Listing of blog posts with clickable cards leading to individual post detail pages. (SSG for list and individual pages)
// - Contact Me: Interactive form for inquiries. (SSG for page, SSR/API Route for form submission handling)
// This structure was chosen for usability because it provides clear navigation paths, allows for deep dives into specific content (projects/blog), and leverages SSG for performance while accommodating dynamic form submission.

// Visualization & Content Choices:
// - Home: Textual content (intro, call to action).
// - About Me: Textual content for CV details. A Chart.js bar chart for skill proficiency (quantitative data) to make it visually engaging. Interaction: Hover on chart for tooltips. Justification: Visualizes skills effectively.
// - Projects: Textual project summaries with links to detail pages. Interaction: Clickable cards. Justification: Clear overview and drill-down capability.
// - Blog: Textual blog post summaries with links to detail pages. Interaction: Clickable cards. Justification: Clear overview and drill-down capability. Placeholder for Google Ads.
// - Contact Me: Form inputs. Interaction: Form submission via API route. Justification: Standard contact mechanism.
// CONFIRMATION: NO SVG graphics used. NO Mermaid JS used.

// Utility function to wrap chart labels
const wrapLabel = (label, maxLength = 16) => {
  if (label.length <= maxLength) return label;
  const words = label.split(' ');
  let currentLine = '';
  const lines = [];
  words.forEach(word => {
    if ((currentLine + word).length > maxLength && currentLine.length > 0) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });
  lines.push(currentLine.trim());
  return lines;
};

// Layout Component
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-inter">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          .chart-container {
            position: relative;
            width: 100%;
            max-width: 600px; /* Max width for chart container */
            margin-left: auto;
            margin-right: auto;
            height: 300px; /* Base height */
            max-height: 400px; /* Max height */
          }
          @media (min-width: 640px) { /* sm breakpoint */
            .chart-container {
              height: 350px;
            }
          }
          @media (min-width: 768px) { /* md breakpoint */
            .chart-container {
              height: 400px;
            }
          }
          /* Custom scrollbar for better aesthetics */
          ::-webkit-scrollbar {
              width: 8px;
              height: 8px;
          }
          ::-webkit-scrollbar-track {
              background: #f0f0f0;
              border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb {
              background: #bdbdbd;
              border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
              background: #888;
          }
        `}</style>
      </Head>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  const router = useRouter();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Me', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <Link href="/" className="text-2xl font-bold text-blue-600 mb-4 md:mb-0">
          YourName.dev
        </Link>
        <div className="flex flex-wrap justify-center md:space-x-4 space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`px-3 py-2 rounded-lg transition-colors duration-200
                ${router.pathname === item.path || (item.path !== '/' && router.pathname.startsWith(item.path))
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            <span role="img" aria-label="LinkedIn">🔗</span> LinkedIn
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            <span role="img" aria-label="GitHub">🐙</span> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

// Data (Simulated from Markdown/API)
const projectsData = [
  {
    slug: 'project-a',
    title: 'Enterprise CRM Solution',
    category: 'Software Development',
    description: 'Developed a scalable CRM platform for a large enterprise, integrating sales, marketing, and customer service modules. Focused on robust backend architecture and intuitive user interfaces.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    imagePlaceholder: 'https://placehold.co/600x400/E0E0E0/333333?text=CRM+Solution',
    fullContent: `
      <p>This project involved designing and implementing a comprehensive Customer Relationship Management (CRM) system tailored for enterprise-level operations. The primary goal was to centralize customer data, streamline sales processes, and enhance customer service efficiency.</p>
      <p>Key features included lead management, sales pipeline tracking, customer support ticketing, and detailed analytics dashboards. We utilized a microservices architecture to ensure scalability and maintainability, with independent services for user authentication, data management, and reporting.</p>
      <h3>Challenges & Solutions:</h3>
      <ul>
        <li><strong>Data Migration:</strong> Migrated vast amounts of legacy customer data from disparate systems, ensuring data integrity and minimal downtime.</li>
        <li><strong>Real-time Updates:</strong> Implemented WebSocket technology for real-time updates on sales activities and customer interactions, providing immediate insights to sales teams.</li>
        <li><strong>Security:</strong> Employed industry-standard encryption, role-based access control, and regular security audits to protect sensitive customer information.</li>
      </ul>
      <h3>Outcome:</h3>
      <p>The deployed CRM solution led to a <strong>25% increase in sales team productivity</strong> and a <strong>15% improvement in customer satisfaction scores</strong> within the first six months of operation. Its modular design allows for easy future expansion and integration with other enterprise systems.</p>
    `,
  },
  {
    slug: 'project-b',
    title: 'E-commerce Analytics Dashboard',
    category: 'Data Analysis',
    description: 'Built an interactive dashboard to visualize e-commerce sales trends, customer behavior, and inventory insights. Enabled data-driven decision-making for marketing and operations teams.',
    technologies: ['Python', 'Pandas', 'Dash', 'SQL', 'Tableau'],
    imagePlaceholder: 'https://placehold.co/600x400/E0E0E0/333333?text=Analytics+Dashboard',
    fullContent: `
      <p>This project focused on developing an advanced analytics dashboard for an e-commerce platform. The objective was to provide key stakeholders with actionable insights into sales performance, customer demographics, and product popularity.</p>
      <p>The dashboard aggregated data from various sources, including transactional databases, web analytics tools, and marketing campaign platforms. Custom visualizations were created to highlight trends, identify top-performing products, and pinpoint areas for improvement in customer engagement.</p>
      <h3>Methodology:</h3>
      <ul>
        <li><strong>Data Collection:</strong> Automated scripts were developed to extract data from disparate sources into a centralized data warehouse.</li>
        <li><strong>ETL Processes:</strong> Implemented robust ETL (Extract, Transform, Load) pipelines using Python and SQL to clean, transform, and load data for analysis.</li>
        <li><strong>Interactive Visualizations:</strong> Utilized Dash (Plotly) to create interactive charts and graphs, allowing users to filter data by date range, product category, and customer segment.</li>
      </ul>
      <h3>Impact:</h3>
      <p>The dashboard facilitated a <strong>10% reduction in marketing spend</strong> by optimizing campaign targeting and a <strong>5% increase in average order value</strong> due to better product recommendations.</p>
    `,
  },
  {
    slug: 'project-c',
    title: 'Mobile App for Event Management',
    category: 'Mobile Development',
    description: 'Designed and developed a cross-platform mobile application for managing events, including registration, scheduling, and real-time updates for attendees.',
    technologies: ['React Native', 'Firebase', 'Redux'],
    imagePlaceholder: 'https://placehold.co/600x400/E0E0E0/333333?text=Mobile+App',
    fullContent: `
      <p>This project involved creating a cross-platform mobile application to streamline event management for organizers and enhance the experience for attendees. The app was built using React Native to ensure a single codebase for both iOS and Android platforms.</p>
      <p>Features included event discovery, personalized schedules, push notifications for real-time updates, interactive maps of venues, and attendee networking capabilities. Firebase was used for backend services, including user authentication, real-time database, and cloud functions.</p>
      <h3>Key Features:</h3>
      <ul>
        <li><strong>User Authentication:</strong> Secure login and registration with email/password and social logins.</li>
        <li><strong>Personalized Schedules:</strong> Attendees could build their own schedules by selecting sessions and workshops.</li>
        <li><strong>Real-time Notifications:</strong> Sent immediate updates on session changes, speaker announcements, and event news.</li>
        <li><strong>Offline Capability:</strong> Implemented data caching to allow users to access event information even without an internet connection.</li>
      </ul>
      <h3>Result:</h3>
      <p>The app successfully supported events with over 5,000 attendees, significantly improving engagement and reducing the need for physical information desks. It received positive feedback for its intuitive interface and reliable performance.</p>
    `,
  },
];

const blogPostsData = [
  {
    slug: 'ai-cybersecurity-trends',
    title: 'The Latest Trends in AI for Cybersecurity',
    date: 'July 3, 2025',
    excerpt: 'Artificial intelligence is rapidly transforming the cybersecurity landscape, offering both unprecedented opportunities and new challenges. This post explores key trends like AI-powered threat detection, automated incident response, and the ethical considerations of AI in security.',
    fullContent: `
      <p>Artificial intelligence (AI) is no longer a futuristic concept but a present reality that is profoundly reshaping the cybersecurity domain. Its capabilities in processing vast amounts of data, identifying complex patterns, and automating responses are proving invaluable in the ongoing battle against sophisticated cyber threats.</p>
      <h3>Key Trends:</h3>
      <ul>
        <li><strong>AI-Powered Threat Detection:</strong> Machine learning algorithms are now capable of analyzing network traffic, user behavior, and endpoint data in real-time to detect anomalies and identify emerging threats that traditional signature-based systems might miss. This includes advanced malware, zero-day exploits, and insider threats.</li>
        <li><strong>Automated Incident Response:</strong> AI is enabling security operations centers (SOCs) to automate repetitive tasks like threat triage, containment, and even remediation. This significantly reduces response times and frees up human analysts for more complex strategic tasks.</li>
        <li><strong>Predictive Analytics:</strong> By analyzing historical attack data and threat intelligence, AI models can predict potential future attack vectors and vulnerabilities, allowing organizations to proactively strengthen their defenses.</li>
        <li><strong>Behavioral Analytics:</strong> AI excels at establishing baselines for normal user and system behavior. Any deviation from these baselines can trigger alerts, helping to identify compromised accounts or malicious insider activities.</li>
      </ul>
      <h3>Challenges and Ethical Considerations:</h3>
      <p>Despite its promise, the integration of AI in cybersecurity is not without its challenges. These include the potential for AI systems to be biased, the complexity of explaining AI decisions (the "black box" problem), and the risk of AI being used by adversaries for more sophisticated attacks (e.g., AI-powered phishing or malware generation).</p>
      <p>Ethical considerations are paramount. Ensuring transparency, accountability, and fairness in AI algorithms used for security is crucial to maintain trust and prevent unintended consequences. The balance between automated defense and human oversight will be a continuous area of development.</p>
      <h3>Conclusion:</h3>
      <p>AI is undeniably a game-changer for cybersecurity. As the threat landscape evolves, AI's ability to adapt, learn, and automate will be critical for effective defense. Staying abreast of these trends and understanding both the opportunities and challenges will be vital for ICT professionals.</p>
    `,
  },
  {
    slug: 'web3-future-internet',
    title: 'Web3: The Decentralized Future of the Internet?',
    date: 'June 20, 2025',
    excerpt: 'Web3 promises a new era of the internet built on decentralization, blockchain, and user ownership. This post explores the core concepts, potential applications, and the challenges facing its widespread adoption.',
    fullContent: `
      <p>Web3 represents the next generation of the internet, aiming to shift power from large centralized entities back to individual users. Built on the foundational technologies of blockchain, cryptocurrencies, and non-fungible tokens (NFTs), Web3 envisions a decentralized web where users have greater control over their data and digital assets.</p>
      <h3>Core Concepts:</h3>
      <ul>
        <li><strong>Decentralization:</strong> Unlike Web2, where applications often run on centralized servers controlled by a few tech giants, Web3 applications (dApps) are built on decentralized networks (blockchains), meaning no single entity controls them.</li>
        <li><strong>Blockchain Technology:</strong> Provides a secure, transparent, and immutable ledger for transactions and data, forming the backbone of Web3.</li>
        <li><strong>Cryptocurrency & NFTs:</strong> Enable new economic models, digital ownership, and unique digital assets within Web3 ecosystems.</li>
        <li><strong>User Ownership:</strong> Users own their data and digital identities, rather than platforms.</li>
      </ul>
      <h3>Potential Applications:</h3>
      <ul>
        <li><strong>Decentralized Finance (DeFi):</strong> Financial services built on blockchain, offering alternatives to traditional banking.</li>
        <li><strong>Gaming (GameFi):</strong> Play-to-earn models where players own in-game assets as NFTs.</li>
        <li><strong>Social Media:</strong> Decentralized social platforms where users control their content and data.</li>
        <li><strong>Supply Chain Management:</strong> Transparent and traceable supply chains using blockchain.</li>
      </ul>
      <h3>Challenges to Adoption:</h3>
      <p>Despite the excitement, Web3 faces significant hurdles for mainstream adoption. These include:</p>
      <ul>
        <li><strong>Scalability:</strong> Many blockchains struggle with transaction speed and volume.</li>
        <li><strong>Usability:</strong> The user experience for dApps can be complex for non-technical users.</li>
        <li><strong>Regulation:</strong> The regulatory landscape for cryptocurrencies and decentralized technologies is still evolving.</li>
        <li><strong>Environmental Concerns:</strong> The energy consumption of some proof-of-work blockchains is a concern.</li>
      </ul>
      <h3>The Future:</h3>
      <p>Web3 is still in its early stages, but its potential to reshape digital interactions is immense. As an ICT professional, understanding its underlying principles and emerging applications is crucial for navigating the evolving internet landscape.</p>
    `,
  },
];

// Home Page
export function HomePage() {
  return (
    <Layout>
      <section className="text-center py-16 bg-white rounded-lg shadow-lg mb-8">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Hello, I'm <span className="text-blue-600">Your Name</span>
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          An ICT Professional passionate about building innovative solutions and exploring the latest in technology.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/projects" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md">
            View My Projects
          </Link>
          <Link href="/about" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-colors duration-200 shadow-md">
            Learn More About Me
          </Link>
        </div>
      </section>

      <section className="py-12 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
          What I Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <span className="text-5xl text-blue-600 mb-4 block">💻</span>
            <h3 className="text-xl font-semibold mb-2">Frontend Development</h3>
            <p className="text-gray-600">Crafting intuitive and responsive user interfaces with modern web technologies.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <span className="text-5xl text-blue-600 mb-4 block">📊</span>
            <h3 className="text-xl font-semibold mb-2">Data Analysis</h3>
            <p className="text-gray-600">Transforming complex data into actionable insights for strategic decision-making.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <span className="text-5xl text-blue-600 mb-4 block">💡</span>
            <h3 className="text-xl font-semibold mb-2">Information Architecture</h3>
            <p className="text-gray-600">Designing logical and user-friendly structures for complex information systems.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

// About Me Page
export function AboutPage() {
  const chartRef = React.useRef(null);
  const chartInstance = React.useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['JavaScript', 'Python', 'SQL', 'React', 'Node.js', 'Tailwind CSS', 'Data Viz', 'Cloud (AWS)'].map(label => wrapLabel(label)),
        datasets: [{
          label: 'Skill Proficiency',
          data: [90, 85, 80, 90, 75, 95, 88, 70], // Example proficiency scores
          backgroundColor: [
            'rgba(0, 123, 255, 0.7)', // Blue
            'rgba(40, 167, 69, 0.7)',  // Green
            'rgba(255, 193, 7, 0.7)',  // Yellow
            'rgba(220, 53, 69, 0.7)',  // Red
            'rgba(108, 117, 125, 0.7)',// Gray
            'rgba(23, 162, 184, 0.7)', // Teal
            'rgba(111, 66, 193, 0.7)', // Purple
            'rgba(253, 126, 20, 0.7)'  // Orange
          ],
          borderColor: [
            'rgba(0, 123, 255, 1)',
            'rgba(40, 167, 69, 1)',
            'rgba(255, 193, 7, 1)',
            'rgba(220, 53, 69, 1)',
            'rgba(108, 117, 125, 1)',
            'rgba(23, 162, 184, 1)',
            'rgba(111, 66, 193, 1)',
            'rgba(253, 126, 20, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y + '%';
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Proficiency (%)'
            }
          },
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <Layout>
      <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Me</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to my personal corner of the internet! I'm an ICT professional with a passion for leveraging technology to solve real-world problems. My journey in the tech world has been driven by curiosity and a commitment to continuous learning, allowing me to adapt to diverse challenges and master new tools.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          My expertise spans across frontend development, data analysis, UI/UX design, and information architecture. I believe in creating solutions that are not only technically sound but also intuitive, user-friendly, and visually appealing.
        </p>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">My Skills</h2>
        <div className="chart-container mb-8 bg-gray-100 p-4 rounded-lg shadow-inner">
          <canvas ref={chartRef}></canvas>
        </div>
        <p className="text-md text-gray-600 mb-8">
          The chart above illustrates my proficiency across various technical skills. I continuously strive to expand my knowledge base and stay updated with the latest industry trends.
        </p>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Experience</h2>
        <div className="space-y-6 mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-600">Senior Frontend Developer</h3>
            <p className="text-gray-800 font-semibold">Tech Innovations Inc. | Jan 2022 - Present</p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Led the development of responsive web applications using React, Next.js, and Tailwind CSS.</li>
              <li>Optimized application performance, reducing load times by 30% through code splitting and image optimization.</li>
              <li>Collaborated with UI/UX designers to translate wireframes and mockups into high-fidelity user interfaces.</li>
            </ul>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-600">Data Analyst</h3>
            <p className="text-gray-800 font-semibold">Global Analytics Corp. | Jun 2019 - Dec 2021</p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Performed in-depth data analysis to identify key trends and insights for business growth strategies.</li>
              <li>Developed interactive dashboards using Python (Pandas, Matplotlib) and Tableau for various departments.</li>
              <li>Assisted in designing and implementing ETL processes for data warehousing.</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Education</h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-600">Master of Science in Information Technology</h3>
            <p className="text-gray-800 font-semibold">University of Technology | 2018</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-600">Bachelor of Science in Computer Science</h3>
            <p className="text-gray-800 font-semibold">National University | 2016</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

// Projects List Page
export function ProjectsPage({ projects }) {
  return (
    <Layout>
      <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">My Projects</h1>
        <p className="text-lg text-gray-700 mb-8">
          This section showcases a selection of my work, demonstrating my skills in various ICT domains. Each project highlights a problem solved, technologies used, and the impact achieved.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="block bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img src={project.imagePlaceholder} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-blue-600 mb-2">{project.title}</h2>
                <p className="text-gray-700 text-sm mb-3">{project.category}</p>
                <p className="text-gray-600 text-base line-clamp-3">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      projects: projectsData,
    },
  };
}

// Individual Project Detail Page
export function ProjectDetailPage({ project }) {
  if (!project) {
    return <Layout><div className="text-center py-16">Project not found.</div></Layout>;
  }
  return (
    <Layout>
      <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
        <p className="text-gray-700 text-lg mb-4">{project.category}</p>
        <img src={project.imagePlaceholder} alt={project.title} className="w-full rounded-lg mb-6 shadow-md" />
        <div className="prose max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: project.fullContent }} />
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Technologies Used:</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span key={tech} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link href="/projects" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-colors duration-200 shadow-md">
            ← Back to Projects
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = projectsData.map((project) => ({
    params: { slug: project.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = projectsData.find((p) => p.slug === params.slug);
  return {
    props: {
      project,
    },
  };
}

// Blog List Page
export function BlogPage({ posts }) {
  return (
    <Layout>
      <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">My Blog</h1>
        <p className="text-lg text-gray-700 mb-8">
          Welcome to my blog, where I share insights on the latest tech trends, development tips, and my thoughts on the evolving ICT landscape.
        </p>

        {/* Google AdSense Placeholder */}
        <div className="w-full bg-gray-100 p-4 text-center text-gray-600 rounded-lg border border-dashed border-gray-300 mb-8">
          {/*
            Replace this div with your actual Google AdSense code.
            Example (replace data-ad-client and data-ad-slot with your own):
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_CLIENT_ID" crossorigin="anonymous"></script>
            <ins class="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-YOUR_ADSENSE_CLIENT_ID"
                data-ad-slot="YOUR_AD_SLOT_ID"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          */}
          <p>Advertisement Placeholder (Google AdSense)</p>
          <p className="text-sm">Your Google AdSense code would go here to display ads.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-blue-600 mb-2">{post.title}</h2>
                <p className="text-gray-700 text-sm mb-3">{post.date}</p>
                <p className="text-gray-600 text-base line-clamp-3">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts: blogPostsData,
    },
  };
}

// Individual Blog Post Page
export function BlogPostPage({ post }) {
  if (!post) {
    return <Layout><div className="text-center py-16">Post not found.</div></Layout>;
  }
  return (
    <Layout>
      <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <p className="text-gray-700 text-lg mb-6">Published on {post.date}</p>
        <div className="prose max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.fullContent }} />
        <div className="mt-10 text-center">
          <Link href="/blog" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-colors duration-200 shadow-md">
            ← Back to Blog
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = blogPostsData.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = blogPostsData.find((p) => p.slug === params.slug);
  return {
    props: {
      post,
    },
  };
}

// Contact Me Page
export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('Message sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(`Failed to send message: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      setStatus('An error occurred while sending the message.');
    }
  };

  return (
    <Layout>
      <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Me</h1>
        <p className="text-lg text-gray-700 mb-8">
          Have a question, a project idea, or just want to connect? Feel free to reach out using the form below. I'll do my best to respond as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Message
            </button>
          </div>
          {status && (
            <p className={`text-center mt-4 text-lg ${status.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {status}
            </p>
          )}
        </form>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

// API Route for Contact Form Submission (SSR part)
// This file would typically be located at `pages/api/contact.js`
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // In a real application, you would:
    // 1. Validate input more thoroughly.
    // 2. Send an email using a service like Nodemailer, SendGrid, Mailgun, etc.
    // 3. Store the message in a database.
    // For this example, we'll just simulate success.

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Simulate sending email/processing
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    console.log('Contact form submission received:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    res.status(200).json({ message: 'Message received successfully!' });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// _app.js (This file wraps all pages and applies global styles/layout)
// This file would typically be located at `pages/_app.js`
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// Index page (main entry point)
// This file would typically be located at `pages/index.js`
export { HomePage as default };

// Other pages would be in their respective files:
// pages/about.js -> export { AboutPage as default };
// pages/projects.js -> export { ProjectsPage as default };
// pages/projects/[slug].js -> export { ProjectDetailPage as default, getStaticPaths, getStaticProps };
// pages/blog.js -> export { BlogPage as default };
// pages/blog/[slug].js -> export { BlogPostPage as default, getStaticPaths, getStaticProps };
// pages/contact.js -> export { ContactPage as default };

