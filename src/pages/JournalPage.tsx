import { motion } from 'framer-motion'

const articles = [
  {
    id: 1,
    title: 'The Role of AI in Modern Digital Strategy',
    date: 'Oct 24, 2026',
    category: 'Opinion',
    excerpt: 'How we leverage artificial intelligence to automate research and prototype faster without sacrificing quality.'
  },
  {
    id: 2,
    title: 'Why React and Vite are the Standard for 2027',
    date: 'Sep 12, 2026',
    category: 'Engineering',
    excerpt: 'An inside look at our tech stack and why we shifted away from older frameworks.'
  },
  {
    id: 3,
    title: 'Building Trust Through Brand Engineering',
    date: 'Aug 05, 2026',
    category: 'Research',
    excerpt: 'A brand is more than a logo; it’s a system. Here is how we build scalable brand architectures.'
  }
]

export default function JournalPage() {
  return (
    <div className="pt-32 pb-20 md:pt-40 md:pb-32 min-h-screen">
      <div className="container-custom">
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            The LQD Journal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground"
          >
            Research, opinions, and field notes on digital strategy, engineering, and brand building.
          </motion.p>
        </div>

        <div className="space-y-8">
          {articles.map((article, index) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group block p-8 md:p-10 glass-card hover:bg-secondary transition-colors cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 text-sm font-medium text-muted-foreground">
                <span className="text-primary">{article.category}</span>
                <span className="hidden md:inline-block w-1 h-1 rounded-full bg-border" />
                <span>{article.date}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary/80 transition-colors">
                {article.title}
              </h2>
              <p className="text-muted-foreground max-w-3xl">
                {article.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
