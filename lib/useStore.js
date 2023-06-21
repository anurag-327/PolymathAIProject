import {create} from "zustand"


export const useStore=create(((set) =>({
    user:null,
    setUser:(item) => set((state) => ({user:item})),
    resetUser:() => set((state) => ({user:null})),
    session:null,
    setSession:(item) => set((state) => ({session:item})),
    resetSession:() => set((state) => ({session:null})),
    news:[],
    setNews:(item) => set((state) => ({news:item})),
    deleteNews:(id) => set((state) => ({news: state.news.filter(item => item.id!=id)})),
    bookmark:[],
    
    initializeBookmark:(item) => set((state) => ({bookmark:item})),
    setBookmark:(item) => set((state) => ({bookmark:[item,...state.bookmark]})),

    filterBookmark:(id) => set((state) => ({bookmark: state.bookmark.filter(item => item.id!=id)})),
    globalLoading:true,
    setGlobalLoading:(val) => set((state) => ({globalLoading:val}))
})))
