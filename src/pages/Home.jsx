import React, { useState } from 'react'
import Add from '../components/Add'
import Category from '../components/Category'
import View from '../components/View'
import { useNavigate } from 'react-router-dom'

function Home() {
    //usenavigate() : hook used to navigate from one page to another page
    const navigateByUrl = useNavigate()

    // craeate a state for state lifting
    const [uploadVideoStatus,setUploadVideoStatus] = useState({}) 
  return (
    <>
        
        <div className='container mb-5 mt-5 d-flex justify-content-between align-item-center'>
            <div className='add_videos'>
                <Add setUploadVideoStatus={setUploadVideoStatus} />
            </div>
            <div>
                <h5 style={{fontSize:"26px", cursor:"pointer"}} onClick= {() => navigateByUrl('/watch')}>Watch History</h5>
            </div>

        </div>
        <div className='container mb-5 mt-5 d-flex justify-content-between align-item-center'>
            <div className='col-md-6 mt-5'>
                <h4>All Videos</h4>
                <View uploadVideoStatus={uploadVideoStatus} />
            </div>
            <div className=' mt-5'>
                <Category/>
            </div>
        </div>




        {/* 
        
        import Videocard from '../components/Videocard'
        <Videocard/> */}
    </>
  )
}

export default Home