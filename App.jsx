import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Download, Menu, X } from "lucide-react";
import "./App.css";
import "./Fraud.css";

const profilePhoto = "/assets/profile.png";
const resumeUrl = "/assets/Ayush_Pathak_Resume.pdf";
const github = "https://github.com/Ayush-Pathakk";
const linkedin = "https://www.linkedin.com/in/ayush-pathak-057145323";
const email = "ayush.a.pathak0007@gmail.com";

const navItems = ["About", "Experience", "Projects", "Writing", "Contact"];
const projects = [
  {
    number: "01", id: "rag-study-agent", title: "RAG Study Agent", type: "LLM SYSTEMS / RAG", status: "RESEARCHED + TESTED",
    description: "A study assistant that answers academic questions from an 8,100+ chunk RGPV corpus using a retrieval pipeline built for inspectable answers.",
    tags: ["Python", "Pinecone", "BM25", "Flask", "Docker"], link: "https://github.com/Ayush-Pathakk/RAG-agent-rgpv",
    details: "Hybrid retrieval combines Pinecone dense search with BM25, then Reciprocal Rank Fusion and cross-encoder reranking shape the final context. The 49-test regression suite uses mocked Pinecone and LLM clients. Debugging focused on reranker score calibration, a BM25 zero-IDF edge case, and context accumulation across follow-up turns.",
    architecture: ["Document retrieval", "RRF + reranking", "Context construction", "Answer generation"],
  },
  {
    number: "02", id: "signal-digest", title: "Signal-Digest", type: "DATA ENGINEERING / NLP", status: "ACTIVE PIPELINE",
    description: "An automated AI news-curation pipeline that turns noisy feeds into a ranked top-10 newsletter worth opening.",
    tags: ["Python", "Groq", "SQLite", "GitHub Actions", "Streamlit"], link: "https://infomaaxing.streamlit.app/",
    details: "The pipeline aggregates 12 RSS feeds and processes 100+ articles daily. URL deduplication and keyword filtering happen before LLM inference, followed by structured JSON output, retries, automated email delivery, and a ranked top-10 digest.",
    architecture: ["12 RSS feeds", "Deduplication", "Keyword filtering", "LLM scoring", "Ranked newsletter"],
  },
  {
    number: "03", id: "fraud-document-detector", title: "Fraud Document Detector", type: "COMPUTER VISION / EXPLORATION", status: "MVP / IN PROGRESS",
    description: "An exploration of image-based methods for distinguishing potentially fraudulent official documents from legitimate ones.",
    tags: ["Computer Vision", "Image Analysis", "MVP"], link: null,
    details: "Current work is an MVP exploration with a Kaggle notebook and working demo photographs. The notebook and images document the investigation so far; model details and evaluation results remain to be added. No reliability or production-readiness claims are made yet.",
    architecture: ["Problem framing", "Image-based analysis", "Evaluation TBD"], placeholder: true,
    kaggle: "https://www.kaggle.com/code/ayushhpathak/notebook4f7becee20",
    images: [
      { src: "/assets/fraud-demo-1.jpg", alt: "Fraud document detector working demo sample one" },
      { src: "/assets/fraud-demo-2.jpg", alt: "Fraud document detector working demo sample two" },
    ],
  },
];

function ExternalLink({ href, children, label }) {
  return <a data-testid={label} className="text-link" href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={14} /></a>;
}

function SectionLabel({ index, children }) {
  return <div className="section-label" data-testid={`section-label-${index}`}><span>{index}</span><span>{children}</span></div>;
}

function ProjectCard({ project, expanded, onToggle }) {
  return (
    <article className={`project-card ${expanded ? "is-expanded" : ""}`} id={project.id} data-testid={`project-card-${project.number}`}>
      <div className="project-topline"><span>{project.number} / {project.type}</span><span className={project.placeholder ? "status status-muted" : "status"}>{project.status}</span></div>
      <div className="project-heading"><h3>{project.title}</h3><button className="case-toggle" data-testid={`project-toggle-${project.number}`} onClick={onToggle} aria-expanded={expanded} aria-controls={`${project.id}-details`}>{expanded ? "Close case study" : "Read case study"}<ChevronDown size={16} className={expanded ? "rotated" : ""} /></button></div>
      <p className="project-description" data-testid={`project-description-${project.number}`}>{project.description}</p>
      <div className="tag-row">{project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
      {expanded && <div className="case-study" id={`${project.id}-details`} data-testid={`project-details-${project.number}`}>
        <div><p className="eyebrow">How it works</p><div className="architecture">{project.architecture.map((step, i) => <span key={step}><b>0{i + 1}</b>{step}{i < project.architecture.length - 1 && <i>→</i>}</span>)}</div></div>
        <p className="case-copy">{project.details}</p>
        {project.placeholder && <>
          <div className="placeholder-note" data-testid="fraud-placeholder-note"><strong>Working material added</strong><span>Notebook and demo photographs available · model details and evaluation results TBD</span></div>
          <div className="demo-material" data-testid="fraud-demo-material"><div className="demo-material-heading"><span className="eyebrow">Working demo images</span><ExternalLink href={project.kaggle} label="fraud-kaggle-link">View Kaggle notebook</ExternalLink></div><div className="demo-gallery">{project.images.map((image, index) => <img key={image.src} src={image.src} alt={image.alt} data-testid={`fraud-demo-image-${index + 1}`} />)}</div></div>
        </>}
      </div>}
      <div className="project-footer">{project.link ? <ExternalLink href={project.link} label={`project-link-${project.number}`}>{project.number === "02" ? "View live demo" : "View repository"}</ExternalLink> : <span className="pending-link" data-testid="project-link-pending">Public link pending</span>}<span className="project-marker">↳</span></div>
    </article>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openProject, setOpenProject] = useState("rag-study-agent");
  useEffect(() => {
    document.title = "Ayush Pathak — AI Engineer";
  }, []);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  return <div className="site-shell">
    <header className="site-header"><a href="#top" className="wordmark" data-testid="site-wordmark">AP<span>.</span></a><nav className={menuOpen ? "nav-open" : ""} data-testid="main-navigation">{navItems.map((item) => <a key={item} data-testid={`nav-${item.toLowerCase()}`} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>)}<a data-testid="nav-resume" href={resumeUrl} target="_blank" rel="noreferrer">Resume <Download size={14} /></a></nav><button className="menu-button" onClick={toggleMenu} aria-label="Toggle navigation" data-testid="mobile-menu-button">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></header>

    <main id="top">
      <section className="hero page-grid" data-testid="hero-section"><div className="hero-copy"><p className="eyebrow hero-kicker">AI ENGINEER / ML &amp; LLM SYSTEMS</p><h1>Ayush<br /><em>Pathak</em></h1><p className="hero-intro" data-testid="hero-introduction">I build AI systems that solve practical problems, with a focus on retrieval-augmented generation, LLM applications, and reliable software pipelines.</p><div className="availability" data-testid="availability-label"><span></span>Open to AI/ML internship opportunities</div><div className="hero-links"><ExternalLink href={github} label="hero-github-link">GitHub</ExternalLink><ExternalLink href={linkedin} label="hero-linkedin-link">LinkedIn</ExternalLink><a className="text-link" data-testid="hero-resume-link" href={resumeUrl} target="_blank" rel="noreferrer">Resume <Download size={14} /></a><a className="text-link" data-testid="hero-contact-link" href={`mailto:${email}`}>Contact <ArrowUpRight size={14} /></a></div></div><div className="hero-photo-wrap"><div className="photo-label">/ PROFILE_01</div><img src={profilePhoto} alt="Ayush Pathak" className="hero-photo" data-testid="profile-photo" /><span className="photo-caption">Gwalior / Remote, India</span></div></section>

      <section className="section page-grid" id="about" data-testid="about-section"><SectionLabel index="01">About</SectionLabel><div className="section-content about-content"><h2>Curious about how systems behave under pressure.</h2><div className="about-text"><p>I’m pursuing a B.Tech in Computer Science at ITM University, Gwalior. My interests sit at the intersection of machine learning, RAG systems, LLM applications, and the engineering required to make them dependable.</p><p>I learn by implementing, breaking, and debugging. The work I enjoy most is making the path from an idea to a working system more observable, testable, and useful.</p></div><div className="facts"><div><span>Currently</span><strong>B.Tech Computer Science</strong></div><div><span>Focus</span><strong>RAG · LLM Apps · AI Engineering</strong></div></div></div></section>

      <section className="section page-grid" id="experience" data-testid="experience-section"><SectionLabel index="02">Experience</SectionLabel><div className="section-content timeline"><article className="timeline-item"><div className="timeline-meta"><span>05.2026 — 09.2026</span><span>REMOTE</span></div><h3>AI Engineering Intern <span>↗</span></h3><p className="company">Tiledesk</p><ul><li>Prototyped a WhatsApp-to-Knowledge-Base ingestion feature using webhook payload parsing and an existing self-learning pipeline.</li><li>Investigated the RAG architecture and recommended reusing its embedding, retrieval, and knowledge-generation capabilities.</li><li>Worked with backend routes and service modules, validated payloads using Postman, and addressed dependency issues.</li><li>Documented integration decisions, selective-ingestion ideas, and technical handoff notes.</li></ul></article><article className="timeline-item"><div className="timeline-meta"><span>09.2025 — PRESENT</span><span>ITM UNIVERSITY</span></div><h3>Python Head <span>↗</span></h3><p className="company">Google Developer Student Clubs / GDG on Campus</p><p className="timeline-copy">Leading Python and ML projects while mentoring student developers through implementation, debugging, and practical engineering habits.</p></article></div></section>

      <section className="section page-grid projects-section" id="projects" data-testid="projects-section"><SectionLabel index="03">Selected projects</SectionLabel><div className="section-content"><div className="projects-intro"><h2>Work that makes the machinery visible.</h2><p>Case studies in retrieval, automated curation, and the questions that come before a model is ready to make a claim.</p></div>{projects.map((project) => <ProjectCard key={project.id} project={project} expanded={openProject === project.id} onToggle={() => setOpenProject(openProject === project.id ? "" : project.id)} />)}</div></section>

      <section className="section page-grid skills-section" id="skills" data-testid="skills-section"><SectionLabel index="04">Technical skills</SectionLabel><div className="section-content skills-grid"><div className="skill-group"><span className="eyebrow">AI &amp; LLM SYSTEMS</span><p>RAG · LLM applications · embeddings · hybrid search · reranking · vector databases · prompt engineering · agentic workflows</p></div><div className="skill-group"><span className="eyebrow">PYTHON &amp; BACKEND</span><p>Python · Flask · FastAPI · Node.js · Express · REST APIs · webhooks</p></div><div className="skill-group"><span className="eyebrow">ML &amp; DATA</span><p>Scikit-learn · PyTorch · NumPy · Pandas · Matplotlib</p></div><div className="skill-group"><span className="eyebrow">INFRASTRUCTURE &amp; TOOLS</span><p>Docker · Git · GitHub · pytest · Postman · GitHub Actions · Pinecone · ChromaDB · LlamaIndex · LangChain · LangGraph · Groq · Google Gemini</p></div></div></section>

      <section className="section page-grid writing-section" id="writing" data-testid="writing-section"><SectionLabel index="05">Writing</SectionLabel><div className="section-content writing-empty"><div className="empty-mark">//</div><h2>Notes from the build loop.</h2><p>Technical articles, implementation notes, and engineering experiments will live here.</p><span className="status status-muted" data-testid="writing-empty-state">No published writing yet — check back soon.</span></div></section>

      <section className="contact-section page-grid" id="contact" data-testid="contact-section"><div className="contact-copy"><p className="eyebrow">06 / CONTACT</p><h2>Let’s build something<br /><em>reliable.</em></h2><p>Interested in building reliable AI systems or discussing an engineering opportunity? Let’s connect.</p></div><div className="contact-links"><a href={`mailto:${email}`} data-testid="contact-email">{email}<ArrowUpRight size={16} /></a><ExternalLink href={github} label="contact-github">GitHub</ExternalLink><ExternalLink href={linkedin} label="contact-linkedin">LinkedIn</ExternalLink><ExternalLink href="https://codeforces.com/profile/Ayush-Pathak" label="contact-codeforces">Codeforces</ExternalLink></div></section>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} AYUSH PATHAK</span><span>BUILT WITH CURIOSITY / <a href="#top" data-testid="footer-back-to-top">BACK TO TOP ↑</a></span></footer>
  </div>;
}