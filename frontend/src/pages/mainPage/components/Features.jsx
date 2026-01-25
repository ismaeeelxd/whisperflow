import './Features.css'
import TranslateIcon from '@mui/icons-material/Translate'
import StyleIcon from '@mui/icons-material/Style'
import MicNoneIcon from '@mui/icons-material/MicNone'

function Features() {
  const features = [
    {
      icon: <MicNoneIcon sx={{ color: '#0f0092ff',fontSize: 35 ,}} />,
      title: 'Precision AI Transcription',
      desc: "Don't miss a word. Our advanced voice recognition captures every detail from your lecture recordings with high accuracy."
    },
    {
      icon: <TranslateIcon sx={{ color: '#6f0279ff',fontSize: 35 ,}} />,
      title: 'Bilingual Mastery',
      desc: "Instantly translate summaries between English and Arabic. Perfect for bilingual curriculums and language learners."
    },
    {
      icon: <StyleIcon sx={{ color: '#009238ff',fontSize: 35 ,}} />,
      title: 'Smart Slide Generation',
      desc: "Get ready-to-study bullet points automatically formatted into clean, visually organized slides."
    }
  ]

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">WHY WHISPERFLOW?</span>
          <h2 className="section-title">Unlock the power of AI to streamline your study process</h2>
          <p className="section-subtitle">We handle the heavy lifting of note-taking so you can focus on mastering the material.</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
