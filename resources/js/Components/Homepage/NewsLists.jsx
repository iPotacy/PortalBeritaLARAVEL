const isNews = (news) => {
    return news.map ((data , i ) => {
        return <div key = {i} className="card w-full lg:w-96 bg-base-100 shadow-xl">
        <figure>
            <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{data.title}</h2>
            <p>{data.description}</p>
            <div className="card-actions justify-end">
                <div className="badge badge-intline">{data.kategori}</div> 
                <div className="badge badge-outline">{data.author}</div>
            </div>
        </div>
    </div>
    })
}

const noNews = () => {
    return (
        <div>
            Nothing
        </div>
    )
}
 


const NewsLists = ({ news }) => {
    return !news ? noNews() : isNews(news)
}
export default NewsLists 