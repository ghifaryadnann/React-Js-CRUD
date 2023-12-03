import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput, Button } from 'flowbite-react';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Latihancreate = () => {
    const [data, setData] = useState(null)
    const [fetchStatus, setFetchStaus] = useState (true)
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

      setInput((prevInput) => ({...prevInput, [name] : value}))

   
    }

    const handleSubmit = (event) => {
      event.preventDefault()

      let {name, course, score} = input
      
      axios.post("https://backendexample.sanbercloud.com/api/student-scores",{name, course, score})
      .then ((res) => {
        console.log(res)
        setFetchStaus(true)
      })

      

      setInput ({
        name : "",
        course : "",
        score : "",
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
        </TableHead>


        <TableBody className="divide-y">
          {data !== null && data.map((res, index) => {
              return (
                <>
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" key={index}>
                    {index + 1}
                    </TableCell>
                    <TableCell>{res.name}</TableCell>
                    <TableCell>{res.course}</TableCell>
                    <TableCell>{res.score}</TableCell>
                    <TableCell>{handleNilai(res.score)}</TableCell>
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