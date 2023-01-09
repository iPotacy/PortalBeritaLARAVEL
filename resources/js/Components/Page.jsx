import { Link } from "@inertiajs/inertia-react"

const Page = ( {meta} ) => {
    console.log(meta)
    const prev = meta.links[0].url;
    const next = meta.links[meta.links.length - 1].url;
    const current_page = meta.current_page;

    return (
        <>
            <div className="btn-group">
            {prev && <Link href = {prev} className="btn btn-outline"> « </Link>}
            <Link className="btn btn-outline">{current_page}</Link>
            {next && <Link href = {next} className="btn btn-outline"> » </Link>}

            </div>
        </>
    )
}

export default Page