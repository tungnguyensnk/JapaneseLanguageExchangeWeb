import React from 'react'
import "./Bookmark.css"

const Bookmark = (props) => {
    const {content} = props
    return (
        <button className="faq-button-bookmark">{content}</button>
    )
}

export default Bookmark