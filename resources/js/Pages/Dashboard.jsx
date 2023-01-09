import React, {useState, useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Dashboard(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [kategori, setKategori] = useState('');
    const [isNotif, setIsNotif] = useState(false)
    
    const handleSubmit = () => {
        const data = {
            title, description, kategori
        }
        Inertia.post ('/news', data)
        setIsNotif(true)
        setTitle('')
        setDescription('')
        setKategori('')
    }

    useEffect(() => {
        if (!props.myNews) {
            Inertia.get('/news')
        }
        return;
    }, [])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Berita Anime Saya</h2>}
        >
            <Head title="Dashboard" />

            <div className="p-4">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        {isNotif && <div className="alert alert-success shadow-lg">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{props.flash.message}</span>
                            </div>
                        </div>
                        }
                        <input type="text" placeholder="Judul" className="m-2 input input-bordered w-full " onChange={(title) => setTitle(title.target.value)} value = {title} />
                        <input type="text" placeholder="Deskripsi" className="m-2 input input-bordered w-full " onChange={(description) => setDescription(description.target.value)} value = {description} />
                        <input type="text" placeholder="Kategori" className="m-2 input input-bordered w-full " onChange={(kategori) => setKategori(kategori.target.value)} value = {kategori} />
                        <button className='btn btn-primary m-2' onClick={() => handleSubmit()} >POST</button>
                    </div>
                </div>

                <div className='p-4'>
                    {props.myNews && props.myNews.length > 0 ? props.myNews.map((news, i) => {
                        return (
                            <div key = {i} className="card w-full lg:w-96 bg-base-100 shadow-xl m-3">
                                <div className="card-body">
                                    <h2 className="card-title">{news.title}</h2>
                                    <p>{news.description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-intline">{news.kategori}</div>
                                        <div className="badge badge-outline">
                                            <Link href={route('edit.news')} method = "get" data = {{id : news.id}} as="button">
                                                Edit
                                            </Link>
                                        </div>
                                        <div className="badge badge-outline">
                                            <Link href={route('delete.news')} method = "post" data = {{id : news.id}} as="button">
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <p>Kamu Belum Memiliki Berita</p> }
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
