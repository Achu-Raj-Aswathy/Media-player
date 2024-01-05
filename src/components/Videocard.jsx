import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { addToHistory, deleteVideo } from '../services/allAPI';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function Videocard({ displayVideo, setDeleteVideoStatus }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async() => {
        setShow(true);
        // 3 data needed to be inserted 1)caption, 2)Link, 3)timestamp
        const {caption,embededLink} = displayVideo;
        const today = new Date;
        console.log("=======today=====",today);
        const timeStamp = new Intl.DateTimeFormat('en-US',{
            year:'numeric',
            month:'2-digit',
            hour:'2-digit',
            minute:'2-digit',
            second:'2-digit'
        }).format(today)
        console.log(timeStamp);
        let videoDetails = {
            caption:caption,
            embededLink:embededLink,
            timeStamp:timeStamp
        }
        await addToHistory(videoDetails)
    }
    console.log("1");
    console.log(displayVideo);
    const removeVideo = async (id) => {
        const responce = await deleteVideo(id);
        setDeleteVideoStatus(true)
    }
    return (
        <>
            <Card style={{ width: '100%', height: "350px" }} onClick={handleShow}>
                <Card.Img variant="top" height="250px" width="100%" src={displayVideo.url} />
                <Card.Body>
                    <div className='d-flex align-items-center justify-content-enenly'>
                        <h6>{displayVideo.caption}</h6>
                        <Button variant='danger' className='ms-5' onClick={() => removeVideo(displayVideo.id)}>
                            <i class="fa-solid fa-trash"></i>
                        </Button>
                    </div>
                </Card.Body>
            </Card>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{displayVideo.caption}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <iframe width="100%" height="514" src={`${displayVideo.embededLink}?autoplay=1`} title="Goblin 도깨비 OST (Chanyeol, Punch) - Stay with me MV" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Videocard