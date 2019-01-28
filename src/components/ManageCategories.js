import React, { Component } from 'react';
import axios from 'axios';

class ManageCategories extends Component {

    state = { listCategory: [], selectEdit: 0 }

    componentDidMount() {
        this.getCategoryList();
    }

    getCategoryList = () => {
        axios.get('http://localhost:2019/categories')
            .then((res) => {
                // console.log(res.data)
                this.setState({ listCategory: res.data, selectEdit: 0 })
            }).catch((err) => {
                console.log()
            })
    }

    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;

        if (nama === '') {
            window.alert('Semua kolom harus diisi')
        } else {
            axios.post('http://localhost:2019/addcategories', {
                nama
            }).then((res) => {
                this.getCategoryList();
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    onBtnDeleteClick = (id) => {
        if (window.confirm('Are you sure?')) {
            axios.post('http://localhost:2019/deletecategories/' + id)
                .then((res) => {
                    this.getCategoryList();
                }).catch((err) => {
                    console.log(err)
                    console.log(typeof id)
                    console.log(id)
                })
        }

    }

    onBtnEditClick = (id) => {
        this.setState({ selectEdit: id })
    }

    onBtnSaveClick = (id) => {
        var nama = this.refs.namaEdit.value;
        axios.post('http://localhost:2019/editcategories/' + id, {
            nama
        }).then((res) => {
            console.log(res.data)
            this.getCategoryList();
        }).catch((err) => {
            console.log(err)

        })
    }


    renderBodyCategories = () => {
        var listJSXCat = this.state.listCategory.map(({ id, nama }) => {
            if (id === this.state.selectEdit) {
                return (
                    <tr>
                        <td>{id}</td>
                        <td><input type="text" ref="namaEdit" defaultValue={nama} /></td>
                        <td><input className="btn btn-success" type="button" value="Save" onClick={() => this.onBtnSaveClick(id)} /></td>
                        <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({ selectEdit: 0 })} /></td>
                    </tr>
                )
            } else {
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.onBtnEditClick(id)} /></td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id)} /></td>
                    </tr>
                )
            }
        })
        return listJSXCat;
    }

    render() {
        return (
            <div align="center" className="container-fluid">
                <h3>Category List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyCategories()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td>
                                <input ref="namaAdd" type="text" placeholder="Nama Product" />
                            </td>

                            <td>
                                <input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick} />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}
export default ManageCategories;
