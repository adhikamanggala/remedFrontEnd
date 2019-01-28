import React, { Component } from 'react';
import axios from 'axios';

class ManageMovies extends Component {


    state = { listMovie: [], selectEdit: 0 }

    componentDidMount() {
        this.getMovieList();
    }

    getMovieList = () => {
        axios.get('http://localhost:2019/movies')
            .then((res) => {
                // console.log(res.data)
                this.setState({ listMovie: res.data, selectEdit: 0 })
            }).catch((err) => {
                console.log()
            })
    }

    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;
        var tahun = this.refs.tahunAdd.value;
        var description = this.refs.descAdd.value;

        if (nama === '' || tahun === '' || description === '') {
            window.alert('Semua kolom harus diisi')
        } else {
            axios.post('http://localhost:2019/addmovies', {
                nama, tahun, description
            }).then((res) => {
                this.getMovieList();
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    onBtnDeleteClick = (id) => {
        if (window.confirm('Are you sure?')) {
            axios.post('http://localhost:2019/deletemovies/' + id)
                .then((res) => {
                    this.getMovieList();
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
        var tahun = this.refs.tahunEdit.value;
        var description = this.refs.descEdit.value;
        console.log(description)
        axios.post('http://localhost:2019/editmovies/' + id, {
            nama, tahun, description
        }).then((res) => {
            console.log(res.data)
            this.getMovieList();
        }).catch((err) => {
            console.log(err)

        })
    }


    renderBodyProduct = () => {
        var listJSXProduct = this.state.listMovie.map(({ id, nama, tahun, description, }) => {
            if (id === this.state.selectEdit) {
                return (
                    <tr>
                        <td>{id}</td>
                        <td><input type="text" ref="namaEdit" defaultValue={nama} /></td>
                        <td><input type="number" ref="tahunEdit" defaultValue={tahun} /></td>
                        <td><textarea ref="descEdit" defaultValue={description} /></td>
                        <td><input className="btn btn-success" type="button" value="Save" onClick={() => this.onBtnSaveClick(id)} /></td>
                        <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({ selectEdit: 0 })} /></td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{id}</td>
                    <td>{nama}</td>
                    <td>{tahun}</td>
                    <td>{description}</td>
                    <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.onBtnEditClick(id)} /></td>
                    <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id)} /></td>
                </tr>
            )
        })
        return listJSXProduct;
    }

    render() {
        return (
            <div align="center" className="container-fluid">
                <h3>Movie List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Tahun</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyProduct()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td>
                                <input ref="namaAdd" type="text" placeholder="Nama Product" />
                            </td>
                            <td>
                                <input ref="tahunAdd" type="number" placeholder="Tahun" />
                            </td>
                            <td>
                                <textarea ref="descAdd" placeholder="Enter the description here"></textarea>
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
export default ManageMovies;
