import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function AxiosFunctional() {
    let [data, setData] = useState([])
    let [inp1, setInp1] = useState("")
    let [inp2, setInp2] = useState("")
    let [inp3, setInp3] = useState("")

    function Getdata() {
        axios.get("http://localhost:3000/product.json")
            .then((res) => setData(res.data.products))
            .catch(console.log)
    }
    useEffect(() => {
        Getdata();
    })
    function Inp1(e) {
        setInp1(e.target.value)
        e.preventDefault();
    }
    function Inp2(e) {
        setInp2(e.target.value)
        e.preventDefault();
    }
    function Inp3(e) {
        setInp3(e.target.value)
        e.preventDefault();
    }
    function Formsubmit(e) {
        axios("http://localhost:4001/products", {
            method: 'POST',
            data: {
                "name": inp1,
                "userid": inp2,
                "address": inp3
            },
            headers: { "Content-Type": "application/json" }
        })
        
        e.preventDefault();
    }
    function ListUpdat(e) {
        axios(`http://localhost:4001/products/${e.target.value}`, {
            method: 'PUT',
            data: {
                "name": inp1,
                "userid": inp2,
                "address": inp3
            },
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        })
        e.preventDefault();
    }
    function ListDelet(e) {
        axios(`http://localhost:4001/products/${e.target.value}`, {
            method: 'DELETE',
            headers: { "content-type": "application/json; charset=UTF-8" }
        })
        e.preventDefault();
    }
    return (
        <>
            <div className='container my-5'>
                <form className='row border border-dark rounded'>
                    <input type="text" className="form-control col m-2" onChange={(e) => Inp1(e)} placeholder="enter your name" />
                    <input type="text" className="form-control col m-2" onChange={(e) => Inp2(e)} placeholder="enter userID" />
                    <input type="text" className="form-control col m-2" onChange={(e) => Inp3(e)} placeholder="enter address" />
                    <button onClick={(e) => Formsubmit(e)} className="btn btn-primary">submit</button>
                </form>
                <table className='table table-striped border border-4 m-auto'>
                <thead>
                    <tr className="border bg-info">
                        <th>Id</th>
                        <th>Name</th>
                        <th>Userid</th>
                        <th>Address</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map((x) => {
                            return (
                                <tr key={x.id} className="border">
                                    <th>{x.id}</th>
                                    <th>{x.name}</th>
                                    <th>{x.userid}</th>
                                    <th>{x.address}</th>
                                    <td><button className='btn btn-success rounded' onClick={(e) => ListUpdat(e)} value={x.id}>Update</button></td>
                                    <td><button className='btn btn-danger rounded' onClick={(e) => ListDelet(e)} value={x.id}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )

}