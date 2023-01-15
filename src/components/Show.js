import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { database } from '../firebase/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Show = () => {

    const [products, setProduct] = useState( [] )

    const productsCollection = collection(database, 'products')

    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        // console.log(data.docs)
        setProduct(
            data.docs.map( (doc) => ({...doc.data(), id:doc.id}))
        )
        // console.log(products)
    }
    
    
    const deleteProduct = async (id) => { // base dito kukunin mo lang yun ID then
        const productDoc = doc(database, 'products', id)
        await deleteDoc(productDoc)
        getProducts()
    }
    const confirmDelete = (id) => {
        MySwal.fire({
            title: 'Delete the product?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) { 
                deleteProduct(id)               
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })    
    }
    
    
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='d-grid gap-2'>
                            <Link to='/create' className='btn btn-secondary mt-2 mb-2'>Create</Link>
                        </div>

                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                { products.map((product) =>(
                                    <tr key={product.id}>
                                        <td>{product.description}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <Link to={`/edit/${product.id}`} className='btn btn-light'><i className='fa-solid fa-pencil'></i></Link>
                                            <button onClick={ () => { confirmDelete(product.id)}} className='btn btn-danger'><i className='fa-solid fa-trash'></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Show