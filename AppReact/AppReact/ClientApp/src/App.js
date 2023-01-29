import { useEffect, useState } from "react";
import { useRef } from 'react';
import { format } from 'date-fns'

import Footer from "./components/Footer"
import Header from "./components/Header"

const App = () => {
    const [CustomerInvoices, setCustomerInvoices] = useState([])
    const [addInvoice] = useState({ show: true });

    useEffect(() => {
        fetch("api/CustomerInvoice/GetCustomerInvoices")
            .then(response => { return response.json() })
            .then(responseJson => {

                setCustomerInvoices(responseJson)
            })
    }, [])

    const dateRef = useRef(null);
    const statusRef = useRef(null);
    const amountRef = useRef(null);

    const idToEditRef = useRef(null);
    const statusToEditRef = useRef(null);
    const dateToEditRef = useRef(null);
    const amountToEditRef = useRef(null);

    const AddPannel = () => (
        <div>
            <div>
                <div style={title}>Date:</div>
                <input style={box} placeholder="Format: 01.01.2023" ref={dateRef} type="text"></input>
            </div>
            <div>
                <div style={title}>Status:</div>
                <input style={box} ref={statusRef} type="text"></input>
            </div>
            <div>
                <div style={title}>Amount:</div>
                <input style={box} ref={amountRef} type="text"></input>
            </div>
            <input type="button" style={addTop} value="Add Invoice" onClick={Add}></input>
        </div>
    )
    const EditPannel = () => (
        <tr>
            <td><input disabled ref={idToEditRef} type="text"></input></td>
            <td><input ref={dateToEditRef} type="text"></input></td>
            <td><input ref={statusToEditRef} type="text"></input></td>
            <td><input ref={amountToEditRef} type="text"></input></td>
            <td><input type="button" onClick={EditInvoice} value="Update Invoice"></input></td>
        </tr>
    )

    const addTop = {
        marginTop: "20px"
    };
    const title = {
        marginTop: "10px",
        color: "white",
        width: "70px",
        color: "black"
    };
    const box = {
        width: "150px"
    };

    function Edit(event) {
        const currentInvoice = CustomerInvoices.filter(invoice =>
            invoice.id === parseInt(event.target.id)
        );

        if (currentInvoice && currentInvoice.length > 0) {
            idToEditRef.current.value = currentInvoice[0].id;
            dateToEditRef.current.value = currentInvoice[0].date;
            statusToEditRef.current.value = currentInvoice[0].status;
            amountToEditRef.current.value = currentInvoice[0].amount;
        }
    }

    function EditInvoice() {
        let id = idToEditRef.current.value;
        let date = dateToEditRef.current.value;
        let status = statusToEditRef.current.value;
        let amount = amountToEditRef.current.value;

        fetch(`api/CustomerInvoice/EditCustomerInvoice/` + id + '/' + date + '/' + status + '/' + amount, {
            method: "GET",
        });

        refreshPage();
    }

    function refreshPage() {
        window.location.reload(false);
    }

    function Add() {
        let date = dateRef.current.value;
        let status = statusRef.current.value;
        let amount = amountRef.current.value;

        fetch(`api/CustomerInvoice/CreateCustomerInvoice/` + date + '/' + status + '/' + amount, {
            method: "GET",
        })

        refreshPage();
    }

    return (
        <div className="container">
            <Header />
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-striped">
                        <thead>
                            <EditPannel />
                            <tr>
                                <th>Id</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                CustomerInvoices.map((item) => (
                                    <tr key={item.id}>
                                        <td><div id={item.id}>{item.id}</div></td>
                                        <td>{format(new Date(item.date), 'dd/MM/yyyy')}</td>
                                        <td>{item.status}</td>
                                        <td>{item.amount}</td>
                                        <td><input type="button" id={item.id} value="Edit" onClick={Edit}></input></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <AddPannel />
            <Footer />
        </div>
    )
}

export default App;