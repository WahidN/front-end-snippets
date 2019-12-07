/* eslint-disable prettier/prettier */
import axios from "axios";
import cookie from "vue-cookie";

const state = {
    selectedCategory: null,
    snippets: [],
    userSnippets: []
};

const getters = {
    ALL_SNIPPETS: state => state.snippets,
    GET_SNIPPETS: state => {
        return state.selectedCategory == null ? state.snippets : state.snippets.filter(s => s.category === state.selectedCategory)
    },
    USER_SNIPPETS: state => state.userSnippets,
    ACTIVE_CATEGORY: state => state.selectedCategory
}

const actions = {
    async fetchSnippets({
        commit
    }) {
        try {
            const {
                data
            } = await axios.get(`${process.env.VUE_APP_URI}snippets`);
            commit('setSnippets', data);
        } catch (error) {
            console.error("error in fetching snippets: ", error.message);
        }
    },

    async fetchUserSnippets({
        commit
    }) {
        try {
            const {
                data
            } = await axios.get(`${process.env.VUE_APP_URI}user-snippets`, {
                headers: {
                    'Authorization': `Bearer ${cookie.get('token')}`
                }
            });
            commit('setUserSnippets', data);
        } catch (error) {
            console.log(error)
        }
    },

    async addSnippet({
        commit
    }, {
        title,
        description,
        category,
        code
    }) {
        try {
            const response = await axios.post(
                `${process.env.VUE_APP_URI}snippets`, {
                    title: title,
                    description: description,
                    category: category,
                    code: code
                }, {
                    headers: {
                        'Authorization': `Bearer ${cookie.get('token')}`
                    }
                }
            );
            if (response.status === 200) {
                commit('newSnippet', {
                    title,
                    description,
                    category,
                    code
                });

                return response;
            }
        } catch (error) {
            console.error(error.message);
        }
    },

    async deleteSnippet({
        commit
    }, Id) {
        await axios.delete(
            `${process.env.VUE_APP_URI}snippets`, {
                data: {
                    Id: Id
                }
            }
        );
        commit('deleteSnippet', Id);
    },

    async updateSnippet({
        commit
    }, newSnippet) {
        const result = await axios.put(
            `${process.env.VUE_APP_URI}snippets/${newSnippet.Id}`, newSnippet
        );

        commit("updateSnippet", result.data);
        return result;
    }
};

const mutations = {
    setSnippets: (state, snippets) => state.snippets = snippets,
    setUserSnippets: (state, snippets) => state.userSnippets = snippets,
    newSnippet: (state, snippet) => state.snippets.unshift(snippet),
    deleteSnippet: (state, Id) => {
        state.snippets = state.snippets.filter(s => s._id !== Id);
        state.userSnippets = state.userSnippets.filter(s => s._id !== Id);
    },
    filterByCategory: (state, category) => state.selectedCategory = category,
    updateSnippet: (state, newSnippet) => {
        let oldSnippet = state.snippets.find(s => s._id === newSnippet._id)
        if (oldSnippet) {
            oldSnippet = newSnippet;
        }
    }

};

export default {
    state,
    getters,
    actions,
    mutations
}