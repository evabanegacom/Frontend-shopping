const initState = {
    order: null
}

const orderReducer = (state=initState, action) => {
    switch (action.type) {
        case 'CREATE_ORDER':
            return { order: action.payload.data}
        
        case 'CLEAR_ORDER':
            return {order: null }
        default:
            return state;
    }
}

export default orderReducer