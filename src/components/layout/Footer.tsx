import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/20 pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="text-3xl font-heading font-bold tracking-tighter text-primary inline-block mb-6"
            >
              LQD.
            </Link>
            <p className="text-muted-foreground max-w-md">
              A Nairobi-based digital agency engineering premium brand, web, and
              digital experiences. Partnering globally to build trust and drive growth.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/work" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/process" className="text-muted-foreground hover:text-primary transition-colors">
                  Process
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/journal" className="text-muted-foreground hover:text-primary transition-colors">
                  The LQD Journal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-6">Socials</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  YouTube
                  <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  X (Twitter)
                  <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  LinkedIn
                  <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} LQD Creatives. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
