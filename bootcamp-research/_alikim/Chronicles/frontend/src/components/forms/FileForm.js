import React, { useState } from 'react'


export default function FileForm() {
  const [src, setSrc] = useState("")

  const handleChange = (e) => console.log("file changed", e.target.value)

  const handleSubmit = async (e) => {
    // e.preventDefault()
    // console.log("e content", e)
    console.log("target content", e.target)

    // const res = await fetch(`/api/upload`, {
    //   method: "POST",
    //   headers: { "Content-Type": "images/*" },
    //   body: JSON.stringify(e.target.value)
    // })
    // setSrc(res)
  }

  return (
    <form action="/upload" method="POST" encType="multipart/form-data" onSubmit={handleSubmit} >
      <img src={"http://iris-isle-bucket.s3.amazonaws.com/kiki.jpg"} alt="uploaded image" />
      <label>Upload File
        <input type="file" name="user_file" onChange={handleChange} />
      </label>
      <button>Upload</button>
    </form>
  )
}

// export default function FileFormFancy() {
//   const [file, setFile] = useState("")

//   const handleChange = (e) => setFile(e.target.value)

//   const handleUpload = async (e) => {
//     e.preventDefault()
//     const res = await fetch(`/upload-file`, {
//       method: "POST",
//       headers: {"Content-Type": },
//       body: JSON.stringify(file), 
//     })
//     const uploadedFile = await res.json()
//     console.log("uploaded!", uploadedFile)
//   }

//   return (
//     <form enctype="multipart/form-data" onSubmit={handleUpload} >
//       <label>Upload File
//         <input type="file" value={file} onChange={handleChange} />
//       </label>
//       <button>Upload</button>
//     </form>
//   )
// }