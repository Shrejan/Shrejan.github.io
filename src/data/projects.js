import cpuImage from '../assets/projects/32bit-cpu.png'
import aiImage from '../assets/projects/ai-evaluation.png'
import movieImage from '../assets/projects/movie-recommendation.png'
import indentImage from '../assets/projects/easy-indent.png'

export const projects = [
  {
    title: 'AI-Based Answer Script Evaluation System',
    description:
      'An intelligent system that evaluates handwritten answer scripts using OCR and NLP, converting scans into structured text and scoring them against reference answers via semantic similarity and keyword analysis.',
    tags: ['Python', 'FastAPI', 'PaddleOCR', 'TrOCR', 'PyTorch', 'OpenCV'],
    github: 'https://github.com/Shrejan/Ai-Answer-Evaluation-System',
    live: null,
    image: aiImage,
    imageAlt: 'Abstract neural network illustration representing AI answer evaluation',
    highlights: [
      'Handwritten answer recognition with PaddleOCR and TrOCR',
      'Semantic similarity scoring with Sentence Transformers',
      'REST API endpoint returning extracted text and final scores',
    ],
  },
  {
    title: 'ML Movie Recommendation API',
    description:
      'A machine learning recommendation API that generates personalized movie suggestions from user ratings using transformer-based embeddings and cosine similarity across ~50,000 movies.',
    tags: ['Python', 'FastAPI', 'Scikit-learn', 'NumPy', 'Pandas', 'Uvicorn'],
    github: 'https://github.com/Shrejan/ML-movie-recommendation-api',
    live: null,
    image: movieImage,
    imageAlt: 'Cinematic film reel illustration for movie recommendation API',
    highlights: [
      'Transformer-generated movie embeddings from genres, ratings, and tags',
      'Weighted user embedding with cosine similarity search',
      'Production-ready FastAPI backend deployed on Render',
    ],
  },
  {
    title: '32-Bit CPU Architecture in Logisim',
    description:
      'A fully modular 32-bit CPU design built in Logisim, demonstrating instruction fetch, decode, execute, memory-mapped I/O, and register operations at the circuit level.',
    tags: ['Logisim', 'Digital Logic', 'Computer Architecture', 'Java'],
    github: 'https://github.com/Shrejan/32bit-CPU',
    live: null,
    image: cpuImage,
    imageAlt: '32-bit CPU circuit diagram from the Logisim project',
    highlights: [
      'Modular block-based design with Program Counter, ALU, and Control Unit',
      'Memory-mapped I/O for external input and output',
      'Full instruction cycle simulation in Logisim',
    ],
  },
  {
    title: 'KSBCL Auto Indent Chrome Extension',
    description:
      'A Chrome extension that automates the KSBCL indent workflow for retailers — pre-selecting products, monitoring portal opening, and instantly filling and submitting indent forms.',
    tags: ['JavaScript', 'Vite', 'Chrome Extension API', 'HTML/CSS'],
    github: 'https://github.com/Shrejan/Easy-Indent',
    live: null,
    image: indentImage,
    imageAlt: 'Code editor illustration representing the Chrome extension project',
    highlights: [
      'Auto form fill and submission when the portal opens',
      'Product and quantity selection saved via browser local storage',
      'Content scripts with chrome.storage for persistent configuration',
    ],
  },
]
