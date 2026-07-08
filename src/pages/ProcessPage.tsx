import { motion } from 'framer-motion'
import { Search, Compass, Hammer, Rocket } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: '01. Discovery',
    description: 'We immerse ourselves in your world. Through research and workshops, we uncover your goals, audience, and the unique challenges you face.'
  },
  {
    icon: Compass,
    title: '02. Strategy',
    description: 'We map the path forward. Defining the brand architecture, user journeys, and technical roadmap required to achieve your objectives.'
  },
  {
    icon: Hammer,
    title: '03. Build',
    description: 'Where strategy meets execution. We design, prototype, and engineer the solution using modern, scalable technologies.'
  },
  {
    icon: Rocket,
    title: '04. Launch',
    description: 'We prepare for impact. QA testing, deployment, and post-launch support to ensure a seamless transition and sustained growth.'
  }
]

export default function ProcessPage() {
  return (
    <div className="pt-32 pb-20 md:pt-40 md:pb-32 min-h-screen">
      <div className="container-custom">
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            How We Work
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground"
          >
            A proven methodology designed to mitigate risk and maximize value. We don't just build websites; we engineer digital ecosystems.
          </motion.p>
        </div>

        <div className="space-y-12 md:space-y-24">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row gap-8 md:gap-16 items-start"
              >
                <div className="w-16 h-16 shrink-0 bg-secondary rounded-2xl flex items-center justify-center border border-border mt-1">
                  <Icon size={32} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold mb-4">{step.title}</h3>
                  <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
