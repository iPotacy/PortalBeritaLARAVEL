import React, { useState } from 'react';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Navbar';
import { Inertia } from '@inertiajs/inertia';

export default function EditNews (props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [kategori, setKategori] = useState('');
    
    const handleSubmit = () => {
        const data = {
            id : props.myNews.id, title, description, kategori
        }
        Inertia.post ('/news/update', data)
        setTitle('')
        setDescription('')
        setKategori('')
    }

    return (
        <div className = "min-h-screen bg-slate-50">
            <Head title = {props.title} />
            <Navbar user = {props.auth.user} />
            <div className="card w-full lg:w-96 bg-base-100 shadow-xl m-3">
                <div className="card-body">
                    <input type="text" placeholder="Judul" className="m-2 input input-bordered w-full " onChange={(title) => setTitle(title.target.value)} defaultValue = {props.myNews.title} />
                    <input type="text" placeholder="Deskripsi" className="m-2 input input-bordered w-full " onChange={(description) => setDescription(description.target.value)} defaultValue = {props.myNews.description} />
                    <input type="text" placeholder="Kategori" className="m-2 input input-bordered w-full " onChange={(kategori) => setKategori(kategori.target.value)} defaultValue = {props.myNews.kategori} />
                    <button className='btn btn-primary m-2' onClick={() => handleSubmit()} >UPDATE</button>
                </div>
            </div>
        </div>
    )
}