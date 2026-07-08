import { motion } from 'framer-motion'
import { ArrowRight, Code, Palette, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  {
    icon: Palette,
    title: 'Brand Engineering',
    description: 'We craft identities that resonate. From logo design to comprehensive brand systems that earn trust.'
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'High-performance websites and web applications built with modern stacks (React, Vite, Next.js).'
  },
  {
    icon: Zap,
    title: 'Digital Strategy',
    description: 'We partner with you to uncover opportunities and build digital roadmaps that drive real growth.'
  }
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-secondary text-primary border border-border text-xs font-semibold uppercase tracking-widest mb-6">
              Nairobi-Based Digital Agency
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
              Engineering Brand, Web,<br className="hidden md:block" /> and Digital Experiences.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              We partner with forward-thinking organizations to build digital strategies that earn trust, captivate audiences, and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/work" className="btn-primary w-full sm:w-auto">
                View Our Work
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/contact" className="btn-secondary w-full sm:w-auto">
                Start a Project
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-secondary/30 border-y border-border">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Our Expertise</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We bring together strategy, design, and engineering to deliver holistic digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-8 group hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center border border-border mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-card p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
              Ready to elevate your digital presence?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Let's collaborate to build something remarkable. We're currently taking on new projects.
            </p>
            <Link to="/contact" className="btn-primary">
              Let's Talk
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
