import React from "react"

const PokemonPictureSmall = ({ imageUrl, altText, drafted }) => {
    const style = {
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }

    const imageStyle = {
        marginRight: "8px",
        maxWidth: "40px",
        maxHeight: "40px"
    }

    return (
        <div style={style}>
            <img src={imageUrl} alt={altText} style={imageStyle} />
        </div>
    )
}

export default PokemonPictureSmall
