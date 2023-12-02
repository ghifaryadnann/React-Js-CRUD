import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Latihanget = () => {
    const [data, setData] = useState(null)

    useEffect (()=> {
        axios.get("https://backendexample.sanbercloud.com/api/student-scores")
        .then((res)=> {
          setData(res.data)
          console.log(res.data)
        })
        .catch(() => {
          console.log("error")

        })
    },[])

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

  return (
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
  )
}

export default Latihanget