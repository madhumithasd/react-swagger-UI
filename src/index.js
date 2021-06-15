import generate from "../helpers/data";
const initialState = {
    appliedFilters: []
};

const SORT_BY_LOW_TO_HIGH = "SORT_BY_LOW_TO_HIGH";
const SORT_BY_HIGH_TO_LOW = "SORT_BY_HIGH_TO_LOW";
const SORT_BY_LATEST_PRODUCT = "SORT_BY_LATEST_PRODUCT";
const SORT_BY_OLDEST_PRODUCT = "SORT_BY_OLDEST_PRODUCT";
const LOAD_DATA = "LOAD_DATA";
const FILTER_BY_STOCK = "FILTER_BY_STOCK";
const FILTER_BY_PRICE = "FILTER_BY_PRICE";
const FILTER_BY_DELIVERY = "FILTER_BY_DELIVERY";
const LOAD_NEW_PAGE = "LOAD_NEW_PAGE";
const LOAD_EXACT_PAGE = "LOAD_EXACT_PAGE";

export const sortByLowToHigh = payload => ({
    type: SORT_BY_LOW_TO_HIGH,
    payload
});

export const sortByHighToLow = payload => ({
    type: SORT_BY_HIGH_TO_LOW,
    payload
});

export const sortByLatestProduct = payload => ({
    type: SORT_BY_LATEST_PRODUCT,
    payload
});

export const sortByOldestProduct = payload => ({
    type: SORT_BY_OLDEST_PRODUCT,
    payload
});

export const loadData = (payload) => ({
    type: LOAD_DATA,
    payload
});
export const filterByStock = (payload) => ({
    type: FILTER_BY_STOCK,
    payload
});

export const filterByPrice = (payload) => ({
    type: FILTER_BY_PRICE,
    payload
});

export const filterByDelivery = (payload) => ({
    type: FILTER_BY_DELIVERY,
    payload
});

export const loadNewPage = (payload) => ({
    type: LOAD_NEW_PAGE,
    payload
});

export const loadExactPage = (payload) => ({
    type: LOAD_EXACT_PAGE,
    payload
});

const filterStore = (state = initialState, action) => {
    switch (action.type) {
            case SORT_BY_LOW_TO_HIGH:
                const sortByLowToHighstate = Object.assign({}, state);
                let sortedLowToHighArr = action.payload.direction === "desc" ?
                    sortAsc(state.filteredProducts, 'price') :
                    sortDesc(state.filteredProducts, 'price');

                    sortByLowToHighstate.filteredProducts = sortedLowToHighArr;
                    sortByLowToHighstate.appliedFilters = addFilterIfNotExists(SORT_BY_LOW_TO_HIGH, sortByLowToHighstate.appliedFilters);
                    sortByLowToHighstate.appliedFilters = removeFilter(SORT_BY_LOW_TO_HIGH, sortByLowToHighstate.appliedFilters);

                return sortByLowToHighstate;

        case SORT_BY_HIGH_TO_LOW:
            let sortByHighToLowState = Object.assign({}, state);
            let sortedHighToLowArr = action.payload.direction === "asc" ?
                sortAsc(state.filteredProducts, 'price') :
                sortDesc(state.filteredProducts, 'price');

                sortByHighToLowState.filteredProducts = sortedHighToLowArr;
                sortByHighToLowState.appliedFilters = addFilterIfNotExists(SORT_BY_HIGH_TO_LOW, sortByHighToLowState.appliedFilters);
                sortByHighToLowState.appliedFilters = removeFilter(SORT_BY_HIGH_TO_LOW, sortByHighToLowState.appliedFilters);

            return sortByHighToLowState;

            case SORT_BY_LATEST_PRODUCT:
            let sortByLatestProductState = Object.assign({}, state);
            let sortedLatestProductArr = action.payload.direction === "desc" ?
                sortAsc(state.filteredProducts, 'date') :
                sortDesc(state.filteredProducts, 'date');

                sortByLatestProductState.filteredProducts = sortedLatestProductArr;
                sortByLatestProductState.appliedFilters = addFilterIfNotExists(SORT_BY_LATEST_PRODUCT, sortByLatestProductState.appliedFilters);
                sortByLatestProductState.appliedFilters = removeFilter(SORT_BY_LATEST_PRODUCT, sortByLatestProductState.appliedFilters);

            return sortByLatestProductState;

            case SORT_BY_OLDEST_PRODUCT:
            let sortByOldestProductState = Object.assign({}, state);
            let sortedOldestProductArr  = action.payload.direction === "asc" ?
                sortAsc(state.filteredProducts, 'date') :
                sortDesc(state.filteredProducts, 'date');

                sortByOldestProductState.filteredProducts = sortedOldestProductArr ;
                sortByOldestProductState.appliedFilters = addFilterIfNotExists(SORT_BY_OLDEST_PRODUCT, sortByOldestProductState.appliedFilters);
                sortByOldestProductState.appliedFilters = removeFilter(SORT_BY_OLDEST_PRODUCT, sortByOldestProductState.appliedFilters);

            return sortByOldestProductState ;

        case FILTER_BY_PRICE:
            //filter by price
            return state;
        case FILTER_BY_STOCK:
            let newState = Object.assign({}, state);
            let stock = action.payload.value;
            let filteredStocks = state.products.filter(product => {
                return product.name.toLowerCase().includes(stock) ||
                    product.designer.toLowerCase().includes(stock);
            });

            let appliedFilters = state.appliedFilters;

            if (stock) {
                appliedFilters = addFilterIfNotExists(FILTER_BY_STOCK, appliedFilters);

                newState.filteredProducts = filteredStocks;
                newState.filteredCount = newState.filteredProducts.length;
                newState.filteredPages = Math.ceil(newState.filteredCount / newState.countPerPage);

            } else {
                appliedFilters = removeFilter(FILTER_BY_STOCK, appliedFilters);

                if (appliedFilters.length === 0) {
                    newState.filteredProducts = newState.products;
                    newState.filteredCount = newState.filteredProducts.length;
                    newState.filteredPages = Math.ceil(newState.filteredCount / newState.countPerPage);
                }
            }
            return newState;

            
            
        case LOAD_DATA:
            let count = action.payload.count;
            let countPerPage = action.payload.countPerPage || 20;

            //round up
            let totalPages = Math.ceil(count / countPerPage);

            let products = generate(count);
            return {
                ...state,
                products,
                filteredProducts: products.slice(0, countPerPage),
                currentCount: countPerPage,
                countPerPage,
                totalCount: count,
                currentPage: 1,
                totalPages: totalPages,
                filteredPages: totalPages
            };
        case LOAD_NEW_PAGE:
            //Clone the previous state
            let loadNewPageState = Object.assign({}, state);
            //How many pages should be added. Will always be 1 or -1
            let addPages = action.payload.page;
            //add it to the current
            loadNewPageState.currentPage += addPages;

            let perPage = loadNewPageState.countPerPage; //20 by default

            let nextProducts;
            if (addPages === 1){
                //Moving from page 1 to 2 will cause ‘upperCount’ to be 40
                let upperCount = loadNewPageState.currentCount + perPage;
                let lowerCount = loadNewPageState.currentCount; //This hasn’t been changed. It will remain 20.

                loadNewPageState.currentCount += loadNewPageState.countPerPage;
                nextProducts = loadNewPageState.products.slice(lowerCount, upperCount);
            }

            if (addPages ===-1){
                let upperCount = loadNewPageState.currentCount; //40
                let lowerCount = loadNewPageState.currentCount - perPage; //20

                loadNewPageState.currentCount -= loadNewPageState.countPerPage;
                nextProducts = loadNewPageState.products.slice(lowerCount - perPage, upperCount - perPage);
            }

            loadNewPageState.filteredProducts = nextProducts;
            // Don't use window.history.pushState() here in production
            // It's better to keep redirections predictable
            window.history.pushState({page: 1}, "title 1", `?page=${loadNewPageState.currentPage}`);
            return loadNewPageState;
        case LOAD_EXACT_PAGE:
            const exactPageState = Object.assign({}, state);
            const exactPage = action.payload.page;
            let upperCountExact = exactPageState.countPerPage * exactPage;
            let lowerCountExact = upperCountExact - exactPageState.countPerPage;

            let exactProducts = exactPageState.products.slice(lowerCountExact, upperCountExact);
            exactPageState.filteredProducts = exactProducts;
            exactPageState.currentCount = upperCountExact;
            exactPageState.currentPage = exactPage;
            window.history.pushState({page: 1}, "title 1", `?page=${exactPageState.currentPage}`);

            return exactPageState;

        default:
            return state;

    }
};

export default filterStore;

function sortAsc(arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) return 1;

        if (b[field]> a[field]) return -1;

        return 0;
    })
}

function sortDesc(arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) return -1;

        if (b[field]> a[field]) return 1;

        return 0;
    })
}

function addFilterIfNotExists(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    if (index===-1) appliedFilters.push(filter);

    return appliedFilters;
}

function removeFilter(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    appliedFilters.splice(index, 1);
    return appliedFilters;
}