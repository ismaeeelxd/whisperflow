import React from 'react';
import './Header.css';

import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import SaveIcon from '@mui/icons-material/Save';
import IosShareIcon from '@mui/icons-material/IosShare';

const Header = () => {
    return (
        <header className="header-container">
            <div className="header-brand">
                <div className="brand-icon">
                    <GraphicEqIcon />
                </div>
                <h2 className="brand-title">WhisperFlow</h2>
            </div>
            <div className="header-project-info">
                <p className="project-name">Project: Intro to Neural Networks_v2</p>
            </div>
            <div className="header-actions">
                <button className="btn-secondary">
                    <SaveIcon sx={{ fontSize: 18 }} />
                    <span className="btn-text">Save</span>
                </button>
                <button className="btn-primary">
                    <IosShareIcon sx={{ fontSize: 18 }} />
                    <span className="btn-text">Export PDF</span>
                </button>
                <div className="user-avatar" 
                     style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCg8dQVKTGuXU_r3uXVRamphxIfMC8lApzKRCtsQpb64oVwhcY-6Pr7C3ByIlGgiSR-jICllG-8KKkviu_VYOPcASQIXMN-ZxQVjQHmqoTZ_pkj4woWPJ0JL_PBm0Ok_ChTvMSfgjWSrKq2uDvuvXXtGonoOE5Gj9TrIx02GRIE-h6--V3HJ-2mcG9WvkN9vgD-zlUe4dA9D62ekMfIAuQU0eByYDF8HuLoOt3hE2Awes-pwIcXxBxuT5i-xsOqqrgySDF7msA0cRIL")'}}>
                </div>
            </div>
        </header>
    );
};

export default Header;
