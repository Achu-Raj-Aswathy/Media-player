import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { uploadvideo } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({setUploadVideoStatus}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [video, setVideo] = useState({
        id:"",
        caption:"",
        url:"",
        embededLink:"" 
    });
    console.log("====video details====");
    console.log(video);

    const handleupLoad= async() =>{
        const {id, caption , url, embededLink} = video
        if ( !id || !caption || !url || !embededLink) {
            toast.warn("Please fill the form completely")
            // alert("Please fill the form completely")
        }
        else{
            const response= await uploadvideo(video);
            // console.log("======Response===========");
            // console.log(response);

            if(response.status== 201){
                toast.success(`Successfully inserted the video ${video.caption}`)
                setUploadVideoStatus(response.data)
                handleClose();
            }
            else{
                toast.error("Something went wrong")
                // alert("Something went wrong")
            }
        }
    }

    const embededVideoLink=(e)=>{
        const { value } = e.target;
        console.log(value.slice(-11));
        const videoLink = `http://www.youtube.com/embed/${value.slice(-11)}`;
        setVideo({...video,embededLink:videoLink})
    }
    return (
        <>
            <div className='d-flex align-items-center'>
                <h5>Upload New Video</h5>
                <button className='btn' onClick={handleShow}><i class="fa-solid fa-cloud-arrow-up fs-5 ms-2" style={{ color: "white" }}></i></button>
            </div>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><i class="fa-solid fa-film text-warning me-3"></i>
                        Upload Video
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please fill the form </p>
                    <Form className='border border-secondary p-3 rounded'>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter Video ID" onChange={(e)=>setVideo({...video,id:e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter Video Caption" onChange={(e)=>setVideo({...video,caption:e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter Video Image URL" onChange={(e)=>setVideo({...video,url:e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter Video Youtube Link" onChange={(e)=> embededVideoLink(e)} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" className='btn-warning'onClick={handleupLoad}>Upload</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position='top-center' theme='dark'></ToastContainer>
        </>
    )
}

export default Add