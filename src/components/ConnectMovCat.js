import React, { Component } from 'react';
import axios from 'axios';


class ConnectMovCat extends Component {

    state = { listMovCat: [] }

    componentDidMount() {
        this.getMovCatList();
    }

    getMovCatList = () => {
        axios.get('http://localhost:2019/movcat')
            .then((res) => {
                // console.log(res.data)
                this.setState({ listMovCat: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnAddClick = () => {
        var namaMovie = this.refs.namaMovieAdd.value;
        var namaCat = this.refs.namaCatAdd.value;

        if (namaMovie === '' || namaCat === '') {
            window.alert('Semua kolom harus diisi')
        } else {
            axios.post('http://localhost:2019/addmovcat', {
                namaMovie, namaCat
            }).then((res) => {
                this.getMovCatList();
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    onBtnDeleteClick = (idmovie) => {
        if (window.confirm('Are you sure?')) {
            axios.post('http://localhost:2019/deletemovcat/' + idmovie)
                .then((res) => {
                    this.getMovCatList();
                }).catch((err) => {
                    console.log(err)
                    console.log(typeof idmovie)
                    console.log(idmovie)
                })
        }

    }

    getNamaMovie = () => {
        var nama_Movie = this.state.listMovCat.map(({ namaMovie }) => {
            return (
                <option>{namaMovie}</option>
            )
        })
        return nama_Movie
    }
    getNamaCategory = () => {
        var nama_category = this.state.listMovCat.map(({ namaCat }) => {
            return (
                <option>{namaCat}</option>
            )
        })
        return nama_category
    }

    renderBodyMovCat = () => {
        var listJSXMovCat = this.state.listMovCat.map(({ idmovie, namaMovie, namaCat }) => {
            return (
                <tr>
                    <td>{namaMovie}</td>
                    <td>{namaCat}</td>
                    <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(idmovie)} /></td>
                </tr>
            )

        })
        return listJSXMovCat;
    }

    render() {
        return (
            <div align="center" className="container-fluid">
                <h3>Connection List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Nama Movie</th>
                            <th>Nama Category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyMovCat()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <select ref="namaMovieAdd" className="form-control">{this.getNamaMovie()}</select>
                            </td>
                            <td>
                                <select ref="namaCatAdd" className="form-control">{this.getNamaCategory()}</select>
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
export default ConnectMovCat;
