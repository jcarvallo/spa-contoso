import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext({});

export const StateProvider = ({ reducer, initialState, children }: any) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);
export const initialState = {
    title: 'Contoso University',
    isLogo: true,
    navBar: [{ href: '/departament', label: 'Departments' },
    { href: '#', label: 'Courses' },
    { href: '#', label: 'Instructors' }],
    back: false,
    user: {},
    dashboard:false
};

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'changeHeader':
            let changeHeader = Object.keys(state.user).length > 0 ?
                action.back === undefined ? action.dashboard ?
                        {
                            ...state,
                            title: action.title,
                            isLogo: true,
                            back: false,
                            dashboard : action.dashboard

                        }
                       :
                        {
                            ...state,
                            title: action.title,
                            isLogo: false,
                            back: false,
                            dashboard:false
                        }
                    : {
                        ...state,
                        title: action.title,
                        isLogo: false,
                        back: true,
                        dashboard: false
                    }
                : { ...state }


            return changeHeader;
        case 'initialState':
            return initialState;
        case 'setUser':
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}
export const useStateValue = () => useContext(StateContext);