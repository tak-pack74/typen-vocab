const initialState: string[] = [];

const prefixReducer = (state = initialState, action:any) => {
    switch (action.type) {
        default:
            return state;
        case("push"):
            return state;
    };
}


export default prefixReducer;