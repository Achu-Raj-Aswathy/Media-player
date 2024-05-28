import React from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addCategory, deleteCategory, getVideoDetailsById, updateCategory } from '../services/allAPI';
import { getAllCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Category() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categoryName, setCategoryName] = useState()
  const [allCategory, setAllCategory] = useState([])
  const handleAddCategory = async () => {
    if (categoryName) {
      let body = {
        categoryName: categoryName,
        allVideos: []
      }
      const response = await addCategory(body);
      if (response.status == 201) {
        toast.success(`Successfully added the category ${categoryName}`);
        setCategoryName("")
        handleClose();
        getAllCategories();
      }
      else {
        toast.error("Something went wrong")
      }
    }
    else {
      toast.warn("Please enter a category name")
    }
  }

  const getAllCategories = async () => {
    const response = await getAllCategory();
    const { data } = response;
    console.log("===all categories===");
    console.log(response);
    setAllCategory(data)
  }
  useEffect(() => {
    getAllCategories();
  }, [])

  const handleDelete = async(id) => {
    await deleteCategory(id);
    getAllCategories();
  }

  const dragOver = (e)=>{
    e.preventDefault()
    console.log("Inside category dragover");
  }

  const videoDrop = async(e, categoryID) => {
    console.log(`Videocard dropped inside category with id ${categoryID}`);
    const videoid = e.dataTransfer.getData("videoID")
    console.log(`Video with id ${videoid} need to be placed in category with id ${categoryID}`);
    const res = await getVideoDetailsById(videoid);
    console.log("===video need to be dropped===");
    const {data} = res;
    console.log(data);
    let selectedCategory = allCategory?.find((item)=>item.id == categoryID)
    console.log("===Selected category===");
    console.log(selectedCategory);
    selectedCategory.allVideos.push(data);
    console.log("===final category with video data===");
    console.log(selectedCategory);
    const result = await updateCategory(categoryID,selectedCategory)
  }

  return (
    <>
      <div>
        <button onClick={handleShow} className='btn btn-warning ms-5'>Add New Category</button>
      </div>
      <div className='ms-1'>
        {
          allCategory.length > 0 ?
            allCategory.map((item) => (
              <div className='m-5 border border-secondary rounded p-3' droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6>{item.categoryName}</h6>
                  <button className='btn btn-danger ms-3' onClick={()=>handleDelete(item.id)}>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
            :
            <p>No categories to display</p>
        }
      </div>
      
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i class="fa-solid fa-film text-warning me-3"></i>
            Add Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please fill the form</p>
          <Form className='border border-secondary p-3 rounded'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter Category Name" onChange={(e) => setCategoryName(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" className='btn-warning' onClick={handleAddCategory}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='dark'></ToastContainer>
    </>
  )
}

export default Category