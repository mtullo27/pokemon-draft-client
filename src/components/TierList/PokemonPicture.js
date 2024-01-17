import React from "react"

const PokemonPicture = ({ imageUrl, altText, drafted }) => {
    const style = {
        width: "80px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }

    const imageStyle = {
        marginRight: "8px",
        maxWidth: "80px",
        maxHeight: "80px",
        filter: drafted === "x" ? "grayscale(100%)" : "none"
    }

    return (
        <div style={style}>
            <img src={imageUrl} alt={altText} style={imageStyle} />
        </div>
    )
}

export default PokemonPicture
