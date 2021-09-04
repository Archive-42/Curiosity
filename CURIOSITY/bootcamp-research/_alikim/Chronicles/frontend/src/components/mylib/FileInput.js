import React from 'react'


export default function FileInput({ file, setFile }) {

  const handleChange = (e) => {
    if (e.target.files.length) {
      const newFile = Array.from(e.target.files)[0]
      newFile.src = window.URL.createObjectURL(newFile)
      console.log("handling file change", newFile)
      setFile(newFile)
    }
  }

  if (!file) {
    return (<div className="fil-con">
      <input
        type="file"
        accept="image/*"
        name="user_file"
        onChange={handleChange}
        className="fil"
      />
    </div>
    )

  } else {
    return (<div className="fil-con">
      <input
        type="file"
        accept="image/*"
        name="user_file"
        onChange={handleChange}
        className="fil"
      />
      {file.src && <>
        <img className="thumbnail" src={file.src} alt={`Thumbnail of ${file.name}`} />
        <div className="thumbnail-caption">{file.name}</div>
      </>}
      {file && !file.src && <>
        <img className="thumbnail" src={file} alt={`Thumbnail of ${file.name}`} />
        <div className="thumbnail-caption">{file}</div>
      </>}
    </div>)
  }
}


// const handleSubmit = async (e) => {
//   // e.preventDefault()
//   // console.log("e content", e)
//   console.log("target content", e.target)

//   // const res = await fetch(`/api/upload`, {
//   //   method: "POST",
//   //   headers: { "Content-Type": "images/*" },
//   //   body: JSON.stringify(e.target.value)
//   // })
//   // setSrc(res)
// }

// return (
//   <form action="/upload" method="POST" encType="multipart/form-data" onSubmit={handleSubmit} >
//     <label>Upload File
//       <input type="file" name="user_file" onChange={handleChange} />
//     </label>
//     <button>Upload</button>
//   </form>
// )
// }