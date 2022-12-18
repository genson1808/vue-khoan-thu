import * as acs from "@/store/modules/consts.js";

const state = {
    loading: false,
    toasts: [],
    errs: [],
    isCollapsed: false,
};

const mutations = {
    SET_LOADING(state, payload) {
        state.loading = payload;
    },
    SET_ERRORS(state, payload) {
        state.errs = payload;
    },
    ADD_TOAST(state, payload) {
        state.toasts.push(payload);
    },
    CLEAR_TOAST(state, payload) {
        const index = state.toasts.findIndex((toast) => toast.title === payload); // find toast
        state.toasts.splice(index, 1); // remove toast from array
        state.toasts = [];
    },
    SET_COLLAPSED(state, payload) {
        state.isCollapsed = payload;
    }
};

const actions = {
    setLoading({commit}, isLoading) {
        commit(acs.GET_EMPLOYEES_MUTATION, isLoading);
    },
    setErrors({commit}, errors) {
        commit(acs.SET_ERRORS_MUTATION, errors);
    },
    addToast({commit}, toast) {
        commit(acs.ADD_TOAST_MUTATION, toast);
    },
    clearToast({commit}, title) {
        commit(acs.CLEAR_TOAST_MUTATION, title);
    },
    setNoData({commit}, {name, value}) {
        commit(acs.SET_NO_DATA_MUTATION, {name, value});
    },
    setCollapsed({commit}, value) {
        commit(acs.SET_COLLAPSED_MUTATION, value)
    }
};

const getters = {
    isLoading: (state) => state.loading,
    toasts: (state) => state.toasts,
    noData: (state) => state.noData,
    errs: (state) => state.errs,
    collapsed: (state) => state.isCollapsed,
};

const appModule = {
    state,
    mutations,
    actions,
    getters,
};

export default appModule;