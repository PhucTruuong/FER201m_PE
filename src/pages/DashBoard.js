import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import '../css/dashboard.css'

const DashBoard = () => {

    const URL = 'https://64b1f3c9062767bc4826b53c.mockapi.io/api/v1/StaffManagement';
    const [products, setProducts] = useState([]);

    const getListProducts = async () => {
        const res = await axios.get(`${URL}`);
        if (res.status === 200) {
            setProducts(res.data);
        }
    }

    useEffect(() => {
        getListProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure that you want to delete a product with ID: ${id}`)) {
            const res = await axios.delete(`${URL}/${id}`);
            if (res.status === 200) {
                getListProducts();
                toast.success("Deleted Successfully ~");
            } else {
                toast.error("Delete: Error!");
            }
        }
    }
    return (
        <div className="staff-table">
            <div className="btn-add">
                <Link to={'/add/'}>
                    <button className='add-staff-btn'>ADD NEW PRODUCTS</button>
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((products) => (
                        <tr key={products.id}>
                            <td>{products.id}</td>
                            <td style={{ maxWidth: '5rem'}}>{products.name}</td>
                            <td><img src={products.image} alt={products.id}/></td>
                            <td>{products.price}</td>
                            <td>{products.rating}</td>
                            <td>{products.category}</td>
                            <td style={{ maxWidth: '5rem'}}>{products.description}</td>
                            <td>
                                <Link to={`/update/${products.id}`}><button>Edit</button></Link>
                                <button onClick={() => handleDelete(products.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashBoard;