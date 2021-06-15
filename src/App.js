import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import {filterByStock, loadData, loadExactPage, loadNewPage, sortByLowToHigh, sortByHighToLow} from "./store";

class App extends Component {

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const pageQueryParam = params.get('page');
        if (!pageQueryParam) {
            window.history.pushState({page: 1}, "title 1", "?page=1");
        } else {

        }
        this.props.dispatch(loadData({count: 40}));
    }

    filterByInput(e){
        let input = e.target.value;
        this.props.dispatch(filterByStock({value: input}))
    }

    nextPage() {
        this.props.dispatch(loadNewPage({page: 1}))
    }

    previousPage() {
        this.props.dispatch(loadNewPage({page: -1}));
    }

    goToPage(page) {
        this.props.dispatch(loadExactPage({page}))
    }

    sortByInput(e){
        let value = e.target.value;
        let direction = value.endsWith('asc') ? "asc" : "desc";

        if (value.startsWith('price')){
            this.props.dispatch(sortByLowToHigh({direction}))
        }else {
            this.props.dispatch(sortByHighToLow({direction}));
        }
    }

    render() {
        let products = this.props.state.filteredProducts;
        return (
            <div className="App">
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Pagination, Filtering and Sorting with React
                            </h1>
                            <h2 className="subtitle">
                                A detailed guide
                            </h2>
                        </div>
                    </div>
                </section>
                <section className='section'>
                    <div className='container'>
                        <nav className="pagination" role="navigation" aria-label="pagination">
                            <button className="button pagination-previous" onClick={() => {
                                this.previousPage()
                            }}>Previous
                            </button>
                            <button className="button pagination-next" onClick={() => {
                                this.nextPage()
                            }}>Next page
                            </button>
                            <ul className="pagination-list">
                                {
                                    [...Array(this.props.state.filteredPages)].map((value, index) => (
                                        <button
                                            className={`button pagination-link ${this.props.state.currentPage === index + 1 ? "is-current" : ""}`}
                                            aria-label="Page 1"
                                            onClick={() => this.goToPage(index + 1)}
                                            aria-current="page">
                                            {index + 1}
                                        </button>
                                    ))
                                }
                            </ul>
                        </nav>

                    </div>
                </section>
                <section className='section'>
                    <div className='container'>
                        <div>
                            <div className="field is-grouped" style={{alignItems: "center"}}>
                                <div className="control">
                                    <div className="select">
                                        <select onChange={e => {
                                            this.sortByInput(e)
                                        }}>
                                            <option value="" disabled selected>Sort by</option>

                                            <option value='price_asc'>Price - Lowest to Highest</option>
                                            <option value='price_desc'>Price - Highest to Lowest</option>

                                            <option value='date_asc'>Name - Oldest to latest</option>
                                            <option value='date_desc'>Name - Latest to oldest</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="search">
                <input type="text" className="earchInput" />
                <SearchIcon className="searchIcon" />
            </div>

                                <div className='control' style={{minWidth: "300px"}}>
                                    <input onChange={e => {
                                        this.filterByInput(e);
                                    }} style={{width: "100%"}} placeholder='Filter by' type='text'/>
                                </div>
                            </div>
                        </div>
                        <div className='tile is-ancestor' style={{flexWrap: "wrap"}}>
                            {
                                products && products.length && products.map(product => (
                                    <div className='tile is-parent is-3'>
                                        <div className='tile is-child box'>
                                            <p>
                                                <b>Id: </b>
                                                {product.id}
                                            </p>
                                            <p>
                                                <b>Title: </b>
                                                {product.title}
                                            </p>
                                            <p>
                                                <b>Description: </b>
                                                {product.description}
                                            </p>
                                            <p>
                                                <b>Price: </b>
                                                {product.price}
                                            </p>
                                            <p>
                                                <b>OriginalPrice: </b>
                                                {product.originalPrice}
                                            </p>
                                            <p>
                                                <b>DiscountPercent: </b>
                                                {product.discountPercent}
                                            </p>
                                            <p>
                                                <b>CreatedDate: </b>
                                                {product.createdDate}
                                            </p>
                                            <p>
                                                <b>ProductImage: </b>
                                                {product.productImage}
                                            </p>
                                            
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {state};
}

export default connect(mapStateToProps)(App);