import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { database } from '../firebase/firebase'

const Create = () => {

    const [ description, setDescription ] = useState('')
    const [ stock, setStock ] = useState(0)
    const navigate = useNavigate()

    const productCollection = collection(database, 'products')

    const store = async (e) => { // connected ine sa form 
        e.preventDefault()
        await addDoc( productCollection, { description: description, stock: stock } )
        navigate('/')
        // console.log(e.target[0].value)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1>Create Product</h1>

                    <form onSubmit={store}>
                        <div className='mb-3'>
                            <label className='form-label'>Description</label>
                            <input
                                value={description}
                                onChange={ (e) => setDescription(e.target.value)}
                                text='text'
                                className='form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Stock</label>
                            <input
                                value={stock}
                                onChange={ (e) => setStock(e.target.value)}
                                text='number'
                                className='form-control'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>Store</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create