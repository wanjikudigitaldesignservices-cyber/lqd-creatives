import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

// You will paste your project links and info here later
const projects = [
  {
    id: 1,
    title: 'Joy Luck Hardware',
    category: 'E-Commerce & Retail',
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=2400&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 2,
    title: 'Jobcraft AI',
    category: 'AI Application / Digital Strategy',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2400&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 3,
    title: 'Elimu LMS',
    category: 'Web Application / EdTech',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2400&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 4,
    title: 'Safaristay',
    category: 'Hospitality Booking Platform',
    image: 'https://images.unsplash.com/photo-1518182170546-076616fdfaaf?q=80&w=2400&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 5,
    title: 'Luxe Boutique',
    category: 'Brand Engineering & Web',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e08?q=80&w=2400&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 6,
    title: 'Ndifu Construction',
    category: 'Corporate Web Development',
    image: 'https://images.unsplash.com/photo-1541888081622-6789f2d011fb?q=80&w=2400&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 7,
    title: 'Mindforge Wellness',
    category: 'Health & Wellness Platform',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2400&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 8,
    title: 'LQD Dispatch',
    category: 'Logistics & Digital Engineering',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2400&auto=format&fit=crop',
    link: '#',
  }
]

export default function WorkPage() {
  return (
    <div className="pt-32 pb-20 md:pt-40 md:pb-32 min-h-screen">
      <div className="container-custom">
        <div className="max-w-3xl mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            Our Work
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground"
          >
            A selection of projects we've designed and engineered. We partner with ambitious brands to create digital experiences that matter.
          </motion.p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 bg-secondary aspect-[4/3] border border-border">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-primary scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary/80 transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground">{project.category}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}
