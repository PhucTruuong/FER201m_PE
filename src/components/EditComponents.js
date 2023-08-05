import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../css/edit.css'

const URL = 'https://64b1f3c9062767bc4826b53c.mockapi.io/api/v1/StaffManagement';

const initialState = {
    name: '',
    image: '',
    price: '',
    rating: '',
    category: '',
    description: '',
}
    
const error_init = {
    name_err: '',
    image_err: '',
    price_err: '',
    rating_err: '',
    category_error: '',
    description_err: '',
}

const EditComponents = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState(initialState);
    const { name, image, price, rating, category, description} = state;
    const [errors, setErrors] = useState(error_init);

    const getOneStaff = async (id) => {
        const res = await axios.get(`${URL}/${id}`);
        if (res.status === 200) {
            setState(res.data);
        }
    }

    useEffect(() => {
        if (id) getOneStaff(id);
    }, [id]);

    const updateProduct = async (productID, data) => {
        const res = await axios.put(`${URL}/${productID}`, data);
        if (res.status === 200) {
            toast.success(`Updated product with ID: ${productID} successfully ~`);
            navigate('/dashboard');
        }
    }

    const addNewProduct = async (data) => {
        const res = await axios.post(`${URL}`, data);
        if (res.status === 200 || res.status === 201) {
            toast.success("New Product has been added successfully ~");
            navigate('/dashboard');
        }
    }

    // validate
    const validateForm = () => {
        let isValid = true;
        let errors = { ...error_init };

        if (name.trim() === '' || name.length < 2) {
            errors.name_err = 'Name is Required';
            if (name.length < 2) {
                errors.name_err = 'Name must be more than 2 words';
            }
            isValid = false;
        }

        if (image.trim() === '') {
            errors.image_err = 'Image is required';
            isValid = false;
        }

        if (isNaN(price) || parseInt(price) < 1 || price === '' || parseInt(price) > 1000000000) {
            errors.price_err = 'Price must be a positive number, more than 0 and smaller than 1000000000';
            isValid = false;
        }

        if (isNaN(rating) || parseInt(rating) < 1 || rating === '' || parseInt(rating) > 5) {
            errors.price_err = 'Rating must be a positive number, more than 0 and smaller than 5';
            isValid = false;
        }
        if (category.trim() === '') {
            errors.category_error = 'Categorry is required';
            isValid = false;
        }
        if (description.trim() === '') {
            errors.description_err = 'Description is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            if (id) updateProduct(id, state);
            else addNewProduct(state);
        } else {
            toast.error("Some info is invalid ~ Pls check again");
        }
    }

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setState((state) => ({ ...state, [name]: value }));
    }
    return (
        <div>
            
            <div className="form">
                <h2>{id ? "Update Form" : "Add New Product"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input className="input-box" type="text" name='name'
                         style={{ paddingRight: '0', width: '19.4rem'}}
                         value={state.name} onChange={handleInputChange} />
                        {errors.name_err && <span className='error'>{errors.name_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="image">Image: </label>
                        <input className="input-box" type="text" 
                            style={{ paddingRight: '0', width: '19.4rem'}}
                            name='image' value={state.image} onChange={handleInputChange}
                        />
                        {errors.image_err && <span className='error'>{errors.image_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="price">Price: </label>
                        <input className="input-box" type="number" 
                        style={{ paddingRight: '0', width: '19.4rem'}}
                        name='price' value={state.price} onChange={handleInputChange}/>
                        {errors.price_err && <span className='error'>{errors.price_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="rating">Rating: </label>
                        <input className="input-box" type="text"
                         style={{ paddingRight: '0', width: '19.4rem'}}
                         name='rating' value={state.rating} onChange={handleInputChange} />
                        {errors.rating_err && <span className='error'>{errors.rating_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="category">Category: </label>
                        <input className="input-box" type="text"
                         style={{ paddingRight: '0', width: '19.4rem'}}
                         name='category' value={state.category} onChange={handleInputChange} />
                        {errors.category_error && <span className='error'>{errors.category_error}</span>}
                    </div>
                    <div>
                        <label htmlFor="description">Description: </label>
                        <input className="input-box" type="text"
                         style={{ paddingRight: '0', width: '19.4rem'}}
                         name='description' value={state.description} onChange={handleInputChange} />
                        {errors.description_err && <span className='error'>{errors.description_err}</span>}
                    </div>
                    <button type='submit' className='form-button'>{id ? "Update" : "Submit"}</button>
                </form>
            </div>
        </div>
        
    );
};

export default EditComponents;