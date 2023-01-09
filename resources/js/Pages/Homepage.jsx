import { Link, Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Navbar';
import NewsLists from '@/Components/Homepage/NewsLists';
import Page from '@/Components/Page';

export default function Homepage (props) {
    console.log ('proops', props)
    return (
        <div className = "min-h-screen bg-slate-50">
            <Head title = {props.title} />
            <Navbar user = {props.auth.user} />
            <div className = 'flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-6 p-4'>
                <NewsLists news =  {props.news.data} />
            </div>
            <div className='flex justify-center items-center'>
                <Page meta = {props.news.meta} />
            </div>
        </div>
    )
}