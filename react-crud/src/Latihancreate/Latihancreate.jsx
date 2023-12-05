import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput, Button } from 'flowbite-react';
import { useState, useEffect } from 'react';
import axios from 'axios';



const Latihancreate = () => {
    const [data, setData] = useState(null)
    const [fetchStatus, setFetchStaus] = useState (true)
    const [currentID, setCurrentId] = useState (-1)
    const [input, setInput] = useState ({
      name : "",
      course : "",
      score : "",
    })

    useEffect (()=> {
      if (fetchStatus === true) {
        axios.get("https://backendexample.sanbercloud.com/api/student-scores")
        .then((res)=> {
          setData(res.data)
          console.log(res.data)
        })
        .catch(() => {
          console.log("error")

        })
        setFetchStaus(false)
      }
    },[fetchStatus, setFetchStaus])


    const handleDelete = (event) => {
      const conf = window.confirm("apakah yakin ingin hapus?")
      let idData = parseInt(event.target.value)

      
      if (conf){
        axios.delete(`https://backendexample.sanbercloud.com/api/student-scores/${idData}`)
      .then((res) => {
        alert("Berhasil Di apus")
        setFetchStaus(true)
      })
      .catch((err) => {
        alert(err)

      })

      }

      
    }

    const handleNilai = (score) => {
      if (score >= 80){
        return "A"
      } else if (score >= 70 && score < 80){
        return "B"
      } else if (score >= 60 && score < 70){
        return "C"
      } else if (score >=50 && score < 60){
        return "D"
      } else{
        return "E"
      }
    }

    const handleInput = (event) => {
      let name = event.target.name
      let value = event.target.value

      // setInput((prevInput) => ({...prevInput, [name] : value}))
      if (name === "name") {
        setInput({ ...input, name: value });
      } else if (name === "course") {
        setInput({ ...input, course: value });
      } else if (name === "score") {
        setInput({ ...input, score: value });
      }
  
    }

    const handleSubmit = (event) => {
      event.preventDefault()

      let {name, course, score} = input
      
      if (currentID === -1 ){
        axios.post("https://backendexample.sanbercloud.com/api/student-scores",{name, course, score})
      .then ((res) => {
        console.log(res)
        setFetchStaus(true)
      })

      } else {
        axios.put(`https://backendexample.sanbercloud.com/api/student-scores/${currentID}`, {name,course,score})
        setFetchStaus(true)
      }

      setCurrentId(-1)

      setInput ({
        name : "",
        course : "",
        score : "",
      })
     
    }

    const handleEdit = (event) => {
      let idData = parseInt(event.target.value)

      setCurrentId(idData)

      axios.get(`https://backendexample.sanbercloud.com/api/student-scores/${idData}`)
      .then ((res) => {
        let data = res.data
        
        setInput({
          name : data.name,
          course : data.course,
          score : data.score
        })
      })
    }
   

  return (
    <div>

      <div className="overflow-x-auto">
     
      <Table>
        <TableHead>
          <TableHeadCell>Nomer</TableHeadCell>
          <TableHeadCell>Nama</TableHeadCell>
          <TableHeadCell>Mata Kuliah</TableHeadCell>
          <TableHeadCell>Nilai</TableHeadCell>
          <TableHeadCell>Index Nilai</TableHeadCell>
          <TableHeadCell>Action</TableHeadCell>
        </TableHead>


        <TableBody className="divide-y">
          {data !== null && data.map((res, index) => {
              return (
                <>
                  <TableRow key={res.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" >
                    {index + 1}
                    </TableCell>
                    <TableCell>{res.name}</TableCell>
                    <TableCell>{res.course}</TableCell>
                    <TableCell>{res.score}</TableCell>
                    <TableCell>{handleNilai(res.score)}</TableCell>
                    <button onClick={handleDelete} value={res.id} className="bg-red-500 hover:bg-red-700 p-2 m-1 rounded-xl text-white">Delete</button>
                    <button onClick={handleEdit} value={res.id} className="bg-red-500 hover:bg-red-700 p-2 m-1 rounded-xl text-white">Edit</button>
                  </TableRow>
                </>
              )
          })}
          
          
        </TableBody>
      </Table>
    </div>
    <div className='flex justify-center items-center h-screen w-full bg-slate-500'>
      <form onSubmit={handleSubmit} className="flex w-3/4  flex-col gap-4 mt-5">
      <div>
        <div className="mb-2 block">
          <h2>Nama</h2>
        </div>
        <TextInput  type="text" placeholder="John doe" name="name" value={input.name} onChange={handleInput} required minLength="4"/>
      </div>
      <div>
        <div className="mb-2 block">
          <h2>Mata Kuliah</h2>
        </div>
        <TextInput  type="text" name='course' placeholder="Algoritma" value={input.course} onChange={handleInput} />
      </div>
      <div>
        <div className="mb-2 block">
          <h2>Nilai</h2>
        </div>
        <TextInput  type="text" name='score' placeholder="70" value={input.score} onChange={handleInput} />
      </div>
      <Button type='submit'> SUBMIT</Button>
    </form>
    
    </div>
    
    </div>
  )
}

export default Latihancreate