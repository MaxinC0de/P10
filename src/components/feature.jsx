export default function Feature({src, header, description}) { 

    return(
        <section>
            <h2 className="sr-only">Features</h2>
            <div className="feature-item">
                <img className="feature-icon" src={src} alt="" />
                <h3 className="feature-item-title">{header}</h3>
                <p>{description}</p>
            </div>
        </section>
    )
}