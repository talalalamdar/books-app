import React from "react"

export const BookItem = (props) => {
    const { title,
        imageLinks,
        authors,
        pageCount,
        publishedDate,
        infoLink } = props.book.volumeInfo

    return (
        <div>
            <a href={infoLink}>
                <div>
                    <h6>{title.length > 35 ? title.substr(0, 35) + "..." : title}</h6><br />
                    {imageLinks ?
                        <img className="img-thumbnail" src={imageLinks.thumbnail} alt={`${title}-book`} /> :
                        <img className="unknown-thumbnail" src="https://vignette.wikia.nocookie.net/burningsuns/images/4/40/BurningSuns_unknown_book_render_1.png/revision/latest?cb=20151227170239" alt={`${title}-book`} />
                    }
                </div>
            </a>
            <div className="details-div">
                <small className="text-muted details-text">
                    - Authors: {authors ? authors : "unknown"}. <br />
                    - Pages: {pageCount ? pageCount : "unknown"} <br />
                    - Published date: {publishedDate ? publishedDate : "unknown"} <br />
                    - Country: {props.book.accessInfo.country ? props.book.accessInfo.country : "unknown"}
                </small>
            </div>
        </div>
    )
}