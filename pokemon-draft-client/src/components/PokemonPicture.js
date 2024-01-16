import React from "react"

const PokemonPicture = ({ imageUrl, altText }) => {
    return (
        <div
            style={{
                width: "100px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <img
                src={imageUrl}
                alt={altText}
                style={{
                    marginRight: "8px",
                    maxWidth: "100px",
                    maxHeight: "100px"
                }}
            />
        </div>
    )
}

export default PokemonPicture
