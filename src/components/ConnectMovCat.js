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
        var nama_movie = this.refs.namaMovieAdd.value;
        var nama_category = this.refs.namaCatAdd.value;

        if (nama_movie === '' || nama_category === '') {
            window.alert('Semua kolom harus diisi')
        } else {
            axios.post('http://localhost:2019/addmovcat', {
                nama_movie, nama_category
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
        var namaMovie = this.state.listMovCat.map(({ nama_movie }) => {
            return (
                <option>{nama_movie}</option>
            )
        })
        return namaMovie
    }
    getNamaCategory = () => {
        var namaCategory = this.state.listMovCat.map(({ nama_category }) => {
            return (
                <option>{nama_category}</option>
            )
        })
        return namaCategory
    }

    renderBodyMovCat = () => {
        var listJSXMovCat = this.state.listMovCat.map(({ idmovie, nama_movie, nama_category }) => {
            return (
                <tr>
                    <td>{nama_movie}</td>
                    <td>{nama_category}</td>
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
