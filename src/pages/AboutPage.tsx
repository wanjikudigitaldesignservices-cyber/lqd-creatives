import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 md:pt-40 md:pb-32 min-h-screen">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-secondary text-primary border border-border text-xs font-semibold uppercase tracking-widest mb-6">
              Who We Are
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
              Based in Nairobi, Serving the World.
            </h1>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                LQD Creatives is a digital consultancy born out of a passion for problem-solving. We specialize in designing and engineering brand, web, and digital experiences that don't just look good, but perform flawlessly.
              </p>
              <p>
                Founded by a self-taught developer who mastered HTML, CSS, JavaScript, and Python, our DNA is deeply technical. We believe that great design must be backed by robust engineering.
              </p>
              <p>
                Today, we partner with organizations globally to build digital strategies aimed at earning trust and driving sustainable growth.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-secondary rounded-2xl border border-border overflow-hidden relative">
              {/* Placeholder for founder/team image */}
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2340&auto=format&fit=crop" 
                alt="LQD Creatives Team"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>
            
            {/* Abstract decorative element */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-secondary border border-border rounded-full flex items-center justify-center p-8 -z-10">
              <div className="w-full h-full border border-dashed border-primary/30 rounded-full animate-[spin_20s_linear_infinite]" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
