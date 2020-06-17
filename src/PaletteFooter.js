import React from 'react';

function PaletteFooter(props) {
    const { paletteName, emoji } = props;

    return (
        <footer className="Palette-Footer">
            {paletteName}
            <span className="emoji">{emoji}</span>
        </footer>
    )
}

export default PaletteFooter;