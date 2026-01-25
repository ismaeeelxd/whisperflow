import './Footer.css'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="logo-area">
             <GraphicEqIcon sx={{ color: '#2546F5', fontSize: 25 ,}} />
            WhisperFlow
          </div>
          <p className="footer-desc">AI-powered study companion for the modern student.</p>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#demo">Demo</a>
          </div>
          <div className="link-group">
            <h4>Resources</h4>
            <a href="#blog">Blog</a>
            <a href="#community">Community</a>
            <a href="#help">Help Center</a>
          </div>
          <div className="link-group">
            <h4>Legal</h4>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
      </div>
      <div className="container copyright">
        <p>© 2026 WhisperFlow. All rights reserved.</p>
        <div className="social-icons">
          <a href="#twitter" aria-label="Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#linkedin" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.6.6 0 00.11.54V19h-3v-9h3v1.25a3 3 0 012.77-1.5c1.1 0 2.25.5 2.5 1.83a.45.45 0 00.1 1.05z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
