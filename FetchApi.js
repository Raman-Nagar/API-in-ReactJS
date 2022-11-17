import React from 'react'

export class FetchApi extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: [], inp1: " ", inp2: " ", inp3: " " };
        this.ListUpdat = this.ListUpdat.bind(this);
        this.ListDelet = this.ListDelet.bind(this);
        this.Formsubmit = this.Formsubmit.bind(this);
        this.Inp1 = this.Inp1.bind(this);
        this.Inp2 = this.Inp2.bind(this);
        this.Inp3 = this.Inp3.bind(this);
    }
    componentDidMount() {
        fetch("http://localhost:3000/product.json")
            .then((x) => x.json())
            .then((res) => this.setState({ data: res.products }))
            .catch(console.log)
    }
    Inp1(e) {
        this.setState({ inp1: e.target.value })
        e.preventDefault();
    }
    Inp2(e) {
        this.setState({ inp2: e.target.value })
        e.preventDefault();
    }
    Inp3(e) {
        this.setState({ inp3: e.target.value })
        e.preventDefault();
    }
    Formsubmit(e) {
        fetch("http://localhost:4001/products", {
            method: 'POST',
            body: JSON.stringify({
                "name": this.state.inp1,
                "userid": this.state.inp2,
                "address": this.state.inp3
            }),
            headers: { "content-type": "application/json; charset=UTF-8" }
        })
        e.preventDefault();
    }
    ListUpdat(e) {
        fetch(`http://localhost:4001/products/${e.target.value}`, {
            method: 'PUT',
            body: JSON.stringify({
                "name": this.state.inp1,
                "userid": this.state.inp2,
                "address": this.state.inp3
            }),
            headers: { "content-type": "application/json; charset=UTF-8" }
        })
        e.preventDefault();
    }
    ListDelet(e) {
        fetch(`http://localhost:4001/products/${e.target.value}`, {
            method: 'DELETE',
            headers: { "content-type": "application/json; charset=UTF-8" }
        })
        e.preventDefault();
    }
    render() {
        return (
            <>
                <div className='container my-5'>
                    <form className='row border border-dark rounded'>
                        <input type="text" className="form-control col m-2" onChange={(e) => this.Inp1(e)} placeholder="enter your name"/>
                        <input type="text" className="form-control col m-2" onChange={(e) => this.Inp2(e)} placeholder="enter userID"/>
                        <input type="text" className="form-control col m-2" onChange={(e) => this.Inp3(e)} placeholder="enter address"/>
                        <button onClick={(e) => this.Formsubmit(e)} className="btn btn-primary">submit</button>
                    </form>
                    <table className='table table-striped border border-4 m-auto'>
                        <tr className="border bg-info">
                            <th>Id</th>
                            <th>Name</th>
                            <th>Userid</th>
                            <th>Address</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        <tbody>
                            {this.state.data.map((x) => {
                                return (
                                    <tr key={x.id} className="border">
                                        <th>{x.id}</th>
                                        <th>{x.name}</th>
                                        <th>{x.userid}</th>
                                        <th>{x.address}</th>
                                        <td><button className='btn btn-success rounded' onClick={(e) => this.ListUpdat(e)} value={x.id}>Update</button></td>
                                        <td><button className='btn btn-danger rounded' onClick={(e) => this.ListDelet(e)} value={x.id}>Delete</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}