"use client"
import { useRef, useState } from 'react';
import { IoImageOutline, IoCopyOutline } from "react-icons/io5";
import Image from 'next/image';

function HomePage() {
  const [uploadImg, setUploadImg] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const inputReference = useRef(null);

  async function handleUpload() {
    const formData = new FormData();
    formData.append('image', inputReference.current.files[0]);

    ;

    try {
      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        body: formData,
        headers: {
          // "Authorization": `Bearer ${process.env.IMGUR_SECRET}`
          "Authorization": `Bearer a5843723dab9cef9cdfdda0893d31003ced21bd9`
        },

      });





      const data = response.json();

      if (response.ok) {
        console.log(response)
      }

      // setImageUrl(data.data.link);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  function handleUploadTrigger() {
    inputReference.current.click();
  }

  function updateUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className='w-full h-[100%] my-auto'>
      <h1 className="text-center font-2xl">Upload your Image and receive a URL</h1>
      <div className="w-full md:w-[80%] lg:w-[60%] mx-auto">
        <div className="my-5 p-4 border-black border-dashed border-2 rounded-lg">
          <div className='flex flex-col items-center gap-4'>
            <div className='flex flex-col items-center justify-center gap-4'>
              {uploadImg ? (
                <Image src={uploadImg} width={400} height={300} alt="Uploaded Image" />
              ) : (
                <IoImageOutline onClick={handleUploadTrigger} className='text-6xl opacity-60' />
              )}
              <button className='text-blue-500 font-semibold' onClick={handleUploadTrigger}>Upload a file</button>
            </div>
            <span>PNG, JPG, GIF up to 10MB</span>
          </div>
          <input
            ref={inputReference}
            type="file"
            name="image"
            onChange={updateUpload}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <div className='flex flex-col items-center justify-center'>
        {uploadImg && (
          <button className='bg-blue-700 px-4 py-2 rounded' onClick={handleUpload}>Upload</button>
        )}
        {imageUrl && (
          <div className='my-4 p-4 bg-green-400 shadow flex items-center gap-4'>
            <span className='text-green-600'>{imageUrl}</span>  <IoCopyOutline className='text-2xl' />
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
