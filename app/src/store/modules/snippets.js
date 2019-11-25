/* eslint-disable prettier/prettier */
import axios from "axios";

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
            } = await axios.get("http://localhost:3000/snippets");
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
            } = await axios.get("http://localhost:3000/user-snippets");
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
            console.log(title);

            const response = await axios.post(
                "http://localhost:3000/snippets", {
                    title: title,
                    description: description,
                    category: category,
                    code: code
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
            "http://localhost:3000/snippets", {
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
        console.log('store:', newSnippet);
        await axios.put(
            `http://localhost:3000/snippets/${newSnippet.Id}`, newSnippet
        );

        commit("updateSnippet", newSnippet)
    }
};

const mutations = {
    setSnippets: (state, snippets) => state.snippets = snippets,
    setUserSnippets: (state, snippets) => state.userSnippets = snippets,
    newSnippet: (state, snippet) => state.snippets.unshift(snippet),
    deleteSnippet: (state, Id) => state.snippets = state.snippets.filter(s => s._id !== Id),
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