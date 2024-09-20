import Header from "../../components/header.jsx"
import Feature from "../../components/feature.jsx"
import Footer from "../../components/footer.jsx"
import chat from "../../assets/images/icon-chat.webp"
import security from "../../assets/images/icon-security.webp"
import money from "../../assets/images/icon-money.webp"
import data from "../../assets/data.json"

export default function Home() {
    const covers = [chat, money, security]
    return(
        <>
            <Header />
            <div className="hero">                
                <section className="hero-content">
                    <h2 className="sr-only">Promoted Content</h2>
                    {(data.tags).map((el) => (<p className="subtitle">{el}</p>))}
                    <p className="text">Open a savings account with Argent Bank today !</p>
                </section>
            </div>
            {data.features.headers.map((el, index) =>
                <Feature 
                    key={index}
                    src={covers[index]}
                    header={el}
                    description={data.features.descriptions[index]}
                />
            )}
            <Footer />
        </>
    )
}